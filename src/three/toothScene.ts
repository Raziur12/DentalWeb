import * as THREE from "three";
import type { SceneDisposer } from "@/types";

export function initToothScene(host: HTMLDivElement): SceneDisposer {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.3, 7.5);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0x2fa7a0, 2.2, 20);
  rim.position.set(-4, -1, -2);
  scene.add(rim);
  const warm = new THREE.PointLight(0xe7838c, 1.1, 20);
  warm.position.set(4, -3, 2);
  scene.add(warm);

  const enamel = new THREE.MeshPhysicalMaterial({
    color: 0xfbfdfd,
    roughness: 0.18,
    metalness: 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });

  const tooth = new THREE.Group();
  const crownGeo = new THREE.SphereGeometry(1, 96, 96);
  const p = crownGeo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    v.x *= 1.15;
    v.z *= 1.0;
    v.y *= 0.85;
    if (v.y > 0.35) v.y += 0.16 * Math.abs(Math.sin(v.x * 2.6) * Math.cos(v.z * 2.6)) - 0.08;
    if (v.y < 0) v.y *= 0.7;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  crownGeo.computeVertexNormals();
  tooth.add(new THREE.Mesh(crownGeo, enamel));
  [-0.48, 0.48].forEach((x) => {
    const root = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.1, 1.7, 48, 8), enamel);
    root.position.set(x, -1.2, 0);
    root.rotation.z = x > 0 ? 0.16 : -0.16;
    tooth.add(root);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), enamel);
    tip.position.set(x * 1.3, -2.05, 0);
    tooth.add(tip);
  });
  tooth.position.y = 0.45;
  scene.add(tooth);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.3, 0.018, 16, 160),
    new THREE.MeshBasicMaterial({ color: 0x2fa7a0, transparent: true, opacity: 0.55 })
  );
  ring.rotation.x = Math.PI / 2.4;
  scene.add(ring);

  const bubbles = new THREE.Group();
  const bubbleMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8eeee,
    roughness: 0.05,
    transmission: 0.6,
    transparent: true,
    opacity: 0.85,
    clearcoat: 1,
  });
  for (let i = 0; i < 26; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.04 + Math.random() * 0.12, 20, 20), bubbleMat);
    const a = Math.random() * Math.PI * 2;
    const r = 2 + Math.random() * 1.4;
    b.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 4, Math.sin(a) * r - 0.5);
    b.userData = { a, r, s: 0.2 + Math.random() * 0.5, y: b.position.y };
    bubbles.add(b);
  }
  scene.add(bubbles);

  const mouse = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onMove);

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  let intro = 0;
  let raf = 0;
  const t0 = performance.now();
  tooth.scale.setScalar(0.01);

  const loop = (now: number) => {
    const t = (now - t0) / 1000;
    intro = Math.min(1, intro + 0.018);
    const e = 1 - Math.pow(1 - intro, 3);
    tooth.scale.setScalar(0.01 + e * 0.99);
    const scrollSpin = window.scrollY * 0.003;
    tooth.rotation.y +=
      ((reduce ? 0.3 : t * 0.45) + mouse.x * 1.2 + scrollSpin - tooth.rotation.y) * 0.06 + (1 - e) * 0.25;
    tooth.rotation.x += (mouse.y * 0.5 - tooth.rotation.x) * 0.06;
    tooth.position.y = 0.45 + (reduce ? 0 : Math.sin(t * 1.3) * 0.12);
    ring.rotation.z = t * 0.25;
    bubbles.children.forEach((b) => {
      const d = b.userData as { a: number; r: number; s: number; y: number };
      b.position.x = Math.cos(d.a + t * d.s * 0.4) * d.r;
      b.position.z = Math.sin(d.a + t * d.s * 0.4) * d.r - 0.5;
      b.position.y = d.y + Math.sin(t * d.s * 2 + d.a) * 0.3;
    });
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", resize);
    renderer.dispose();
    host.removeChild(renderer.domElement);
  };
}
