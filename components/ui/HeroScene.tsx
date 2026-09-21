"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03070d, 0.055);

    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 2.4, mobile ? 13.5 : 11.8);
    camera.lookAt(0, 2.0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    host.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.position.set(mobile ? 1.25 : 1.7, -1.6, 0);
    scene.add(world);

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x07121f,
      metalness: 0.86,
      roughness: 0.18,
      transmission: 0.12,
      transparent: true,
      opacity: 0.98,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      emissive: 0x071a33,
      emissiveIntensity: 0.5
    });
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x5f8cff, transparent: true, opacity: 0.72 });
    const heights = mobile ? [4.7, 6.6, 8.8, 6.0, 4.4] : [5.1, 7.2, 9.4, 6.4, 4.8];
    const xs = [-3.2, -1.6, 0, 1.65, 3.2];

    heights.forEach((height, i) => {
      const geo = new THREE.BoxGeometry(i === 2 ? 1.25 : 1.05, height, 1.05);
      const mesh = new THREE.Mesh(geo, glass.clone());
      mesh.position.set(xs[i], height / 2, i === 2 ? -0.2 : 0.2 + Math.abs(i - 2) * 0.12);
      mesh.rotation.y = (i - 2) * -0.035;
      world.add(mesh);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
      edges.position.copy(mesh.position);
      edges.rotation.copy(mesh.rotation);
      world.add(edges);

      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, height * 0.82, 1.09),
        new THREE.MeshBasicMaterial({ color: 0x4d86ff, transparent: true, opacity: i === 2 ? 0.95 : 0.38 })
      );
      strip.position.set(xs[i] + 0.36, height / 2, 0.01);
      world.add(strip);
    });

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(5.2, 5.8, 0.55, 6),
      new THREE.MeshPhysicalMaterial({ color: 0x050b12, metalness: 1, roughness: 0.26, clearcoat: 1 })
    );
    base.position.y = -0.18;
    world.add(base);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x4386ff, transparent: true, opacity: 0.8 });
    [4.15, 4.7].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.025 + index * 0.006, 10, 90), ringMaterial.clone());
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.15 + index * 0.12;
      world.add(ring);
    });

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 26),
      new THREE.MeshPhysicalMaterial({ color: 0x02060a, metalness: 0.95, roughness: 0.42, transparent: true, opacity: 0.82 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.45;
    scene.add(ground);

    const grid = new THREE.GridHelper(30, 34, 0x315fba, 0x10213d);
    grid.position.y = -0.42;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.18;
    scene.add(grid);

    scene.add(new THREE.AmbientLight(0x5d74a3, 0.65));
    const key = new THREE.PointLight(0x6294ff, 90, 24, 2);
    key.position.set(0, 7, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x9fc1ff, 55, 18, 2);
    rim.position.set(-6, 5, -5);
    scene.add(rim);

    const count = mobile ? 140 : 320;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = Math.random() * 15 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0x78a2ff, size: 0.025, transparent: true, opacity: 0.62 }));
    scene.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    const onPointer = (event: PointerEvent) => {
      if (mobile || reduced) return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      if (!reduced) {
        world.rotation.y += ((pointerX * 0.045 + Math.sin(t * 0.11) * 0.015) - world.rotation.y) * 0.028;
        world.rotation.x += ((-pointerY * 0.016) - world.rotation.x) * 0.03;
        particles.rotation.y = t * 0.008;
        key.position.x = Math.sin(t * 0.35) * 2.2;
      }
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(render);
    };
    render();

    const resize = () => {
      if (!host) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
      if (reduced) renderer.render(scene, camera);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      particleGeo.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mats = Array.isArray(object.material) ? object.material : [object.material];
          mats.forEach((material) => material.dispose());
        }
      });
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="hero-three" aria-hidden="true" />;
}
