"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Objetos cromados da marca.
 *  - "sphere": esfera com fitas onduladas separadas por sulcos (herói)
 *  - "ring":   arco cromado em órbita (CTA final)
 *
 * Reflexos vêm de um estúdio virtual gerado em tempo de execução (caixa preta
 * com faixas de luz brancas, pré-filtrada com PMREM): nenhum HDR baixado.
 * Custo controlado: geometria menor no celular, DPR limitado, renderização
 * pausada fora da tela e um único quadro com prefers-reduced-motion.
 */

export type ChromeVariant = "sphere" | "ring";

function useStudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const studio = new THREE.Scene();
    // cúpula em gradiente: topo claro, horizonte brilhante, chão escuro
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(12, 48, 24),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        vertexShader:
          "varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: `varying vec3 vDir;
          void main(){
            float y = vDir.y;
            vec3 c = mix(vec3(0.05), vec3(0.85), smoothstep(0.15, 0.98, y));
            c = mix(vec3(0.015), c, smoothstep(-0.55, 0.0, y));
            c += vec3(1.1) * exp(-pow((y + 0.04) / 0.035, 2.0));
            c += vec3(0.25) * exp(-pow((y - 0.35) / 0.02, 2.0));
            gl_FragColor = vec4(c, 1.0);
          }`,
      }),
    );
    studio.add(dome);
    const strip = (w: number, h: number, x: number, y: number, z: number, ry: number, rx = 0, intensity = 1) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(intensity, intensity, intensity), side: THREE.DoubleSide }),
      );
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, 0);
      studio.add(m);
    };
    // softboxes: luz principal no topo, recortes laterais altos, contra-luz e preenchimento frontal
    strip(16, 5, 0, 8.5, -1, 0, Math.PI / 2, 3.2);
    strip(4, 16, -8.5, 0, 0, Math.PI / 2, 0, 2.6);
    strip(2.2, 16, 8.5, 0, -1, -Math.PI / 2, 0, 2.2);
    strip(22, 1.4, 0, -1.5, -9, 0, 0, 2.4);
    strip(7, 2.2, 0, 2.5, 9, Math.PI, 0, 1.4);
    strip(16, 6, 0, -8.5, 0, 0, -Math.PI / 2, 0.35);
    const env = pmrem.fromScene(studio, 0.02).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
      studio.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
    };
  }, [gl, scene]);
}

/**
 * Fitas e sulcos calculados por pixel no shader (bump procedural com derivadas
 * de tela): bordas nítidas em qualquer resolução, sobre uma esfera lisa e leve.
 */
const GROOVE_GLSL = /* glsl */ `
  varying vec3 vObjPos;
  float cdGroove(vec3 p) {
    vec3 n = normalize(p);
    float lat = asin(clamp(n.y, -1.0, 1.0));
    float lon = atan(n.z, n.x);
    float f = 10.0 * (lat + 0.22 * sin(lon + lat * 1.2));
    return abs(sin(f));
  }
  float cdHeight(vec3 p) {
    float g = cdGroove(p);
    return -(1.0 - smoothstep(0.0, 0.34, g)) * 0.05 + 0.012 * g * g;
  }
  uniform mat3 normalMatrix;
`;

function applyGrooves(material: THREE.MeshPhysicalMaterial) {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vObjPos;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvObjPos = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${GROOVE_GLSL}`)
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float cdG = cdGroove(vObjPos);
        float cdW = fwidth(cdG);
        diffuseColor.rgb *= mix(0.04, 1.0, smoothstep(0.03 - cdW, 0.36 + cdW, cdG));`,
      )
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
        {
          // gradiente analítico da altura no espaço do objeto (sem ruído de derivada de tela)
          vec3 p = normalize(vObjPos);
          const float e = 0.0012;
          vec3 grad = vec3(
            cdHeight(p + vec3(e, 0.0, 0.0)) - cdHeight(p - vec3(e, 0.0, 0.0)),
            cdHeight(p + vec3(0.0, e, 0.0)) - cdHeight(p - vec3(0.0, e, 0.0)),
            cdHeight(p + vec3(0.0, 0.0, e)) - cdHeight(p - vec3(0.0, 0.0, e))
          ) / (2.0 * e);
          grad -= p * dot(grad, p);
          normal = normalize(normalMatrix * normalize(p - grad * 1.1)) * faceDirection;
        }`,
      );
  };
  material.customProgramCacheKey = () => "cd-grooves-v2";
}

function ChromeObject({
  variant,
  detail,
  animate,
  pointer,
  onSlow,
}: {
  variant: ChromeVariant;
  detail: number;
  animate: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
  onSlow?: () => void;
}) {
  // Guarda de desempenho: mede os primeiros quadros (após 1 s de aquecimento).
  // Abaixo de ~25 fps, o 3D é desligado e a imagem estática volta.
  const perf = useRef({ t: 0, frames: 0, sum: 0, done: false });
  useStudioEnvironment();
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    if (variant === "ring") return new THREE.TorusGeometry(1, 0.075, 48, 320);
    return new THREE.SphereGeometry(1, detail * 2, detail);
  }, [variant, detail]);

  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#cfcfcf"),
        metalness: 1,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.25,
      });
    if (variant === "sphere") applyGrooves(m);
    return m;
  }, [variant]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    const pf = perf.current;
    if (!pf.done && animate) {
      pf.t += delta;
      if (pf.t > 1) {
        pf.frames++;
        pf.sum += delta;
        if (pf.frames >= 45) {
          pf.done = true;
          if (pf.sum / pf.frames > 1 / 25) onSlow?.();
        }
      }
    }
    const g = group.current;
    const m = inner.current;
    if (!g || !m) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    // inclinação suave em direção ao cursor
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, (variant === "ring" ? 1.1 : 0.32) + p.y * 0.25, 3, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, (variant === "ring" ? 0.35 : -0.18) - p.x * 0.18, 3, delta);
    if (animate) {
      m.rotation.y += delta * (variant === "ring" ? 0.22 : 0.12);
      g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <group ref={group} rotation={[variant === "ring" ? 1.1 : 0.32, 0, variant === "ring" ? 0.35 : -0.18]}>
      <mesh ref={inner} geometry={geometry} material={material} scale={variant === "ring" ? [1, 1, 1] : 1} />
      {variant === "ring" && (
        <mesh rotation={[0, 0, 0.6]} scale={0.72} geometry={geometry} material={material} />
      )}
    </group>
  );
}

export default function ChromeScene({
  variant = "sphere",
  className = "",
  onReady,
  onSlow,
}: {
  variant?: ChromeVariant;
  className?: string;
  onReady?: () => void;
  onSlow?: () => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const visible = useRef(true);

  const env = useMemo(() => {
    if (typeof window === "undefined") return { mobile: false, reduce: false };
    return {
      mobile: !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.innerWidth < 768,
      reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  }, []);

  useEffect(() => {
    if (env.mobile || env.reduce) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [env]);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <Canvas
        dpr={env.mobile ? [1, 1.5] : [1, 1.75]}
        frameloop={env.reduce ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, variant === "ring" ? 3.6 : 4.3], fov: 35 }}
        onCreated={({ gl, setFrameloop }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          // pausa a renderização quando o objeto sai da tela
          if (!env.reduce && wrap.current && "IntersectionObserver" in window) {
            new IntersectionObserver(([e]) => {
              if (!e) return;
              visible.current = e.isIntersecting;
              setFrameloop(e.isIntersecting ? "always" : "never");
            }).observe(wrap.current);
          }
          requestAnimationFrame(() => onReady?.());
        }}
      >
        <ChromeObject variant={variant} detail={env.mobile ? 64 : 112} animate={!env.reduce} pointer={pointer} onSlow={onSlow} />
      </Canvas>
    </div>
  );
}
