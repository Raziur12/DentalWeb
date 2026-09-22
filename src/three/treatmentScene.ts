import * as THREE from "three";
import type { SceneDisposer, TreatmentVariant } from "@/types";

export function initTreatmentScene(host: HTMLDivElement, variant: TreatmentVariant): SceneDisposer {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const mat = (color: number, o: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05, ...o });
  const C = {
    chair: mat(0x1c7c77),
    chairSoft: mat(0x2fa7a0),
    metal: mat(0xc9d6d8, { metalness: 0.6, roughness: 0.3 }),
    coat: mat(0xffffff),
    scrub: mat(0x1c7c77),
    skin: mat(0xe2a983),
    skin2: mat(0xc98e6a),
    shirt: mat(0xe7838c),
    pants: mat(0x3c5561),
    dark: mat(0x0f2733),
    hair: mat(0x2b1d17),
    floor: mat(0xa9d3d0, { roughness: 1 }),
  };

  const mesh = (geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => {
    const o = new THREE.Mesh(geo, m);
    o.position.set(x, y, z);
    o.castShadow = true;
    o.receiveShadow = true;
    return o;
  };
  const capsule = (r: number, len: number, m: THREE.Material) => {
    const g = new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(r, r, len, 24), m));
    g.add(mesh(new THREE.SphereGeometry(r, 24, 16), m, 0, len / 2, 0));
    g.add(mesh(new THREE.SphereGeometry(r, 24, 16), m, 0, -len / 2, 0));
    return g;
  };
  const place = <T extends THREE.Object3D>(o: T, x: number, y: number, z: number, rz = 0, rx = 0, ry = 0) => {
    o.position.set(x, y, z);
    o.rotation.set(rx, ry, rz);
    return o;
  };

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9fc9c7, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 0.7);
  sun.position.set(3, 7, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4 });
  scene.add(sun);

  const world = new THREE.Group();
  scene.add(world);
  const floor = mesh(new THREE.CylinderGeometry(2.9, 2.9, 0.12, 64), C.floor, 0, -0.06, 0);
  world.add(floor);

  // Dental chair
  world.add(mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.1, 32), C.metal, 0.3, 0.05, 0));
  world.add(mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.75, 20), C.metal, 0.3, 0.45, 0));
  world.add(mesh(new THREE.BoxGeometry(1.3, 0.2, 0.85), C.chair, 0.45, 0.88, 0));
  world.add(place(mesh(new THREE.BoxGeometry(1.1, 0.18, 0.85), C.chair), 1.55, 0.72, 0, -0.32));
  world.add(place(mesh(new THREE.BoxGeometry(1.35, 0.2, 0.85), C.chair), -0.72, 1.12, 0, -0.38));
  world.add(place(mesh(new THREE.BoxGeometry(0.42, 0.16, 0.55), C.chairSoft), -1.48, 1.44, 0, -0.38));

  // Patient (reclined)
  const patient = new THREE.Group();
  world.add(patient);
  patient.add(place(capsule(0.3, 0.75, C.shirt), -0.6, 1.47, 0, Math.PI / 2 - 0.38));
  patient.add(place(capsule(0.15, 0.55, C.pants), 0.45, 1.14, 0.15, Math.PI / 2));
  patient.add(place(capsule(0.15, 0.55, C.pants), 0.45, 1.14, -0.15, Math.PI / 2));
  patient.add(place(capsule(0.13, 0.7, C.pants), 1.45, 0.95, 0.15, Math.PI / 2 - 0.32));
  patient.add(place(capsule(0.13, 0.7, C.pants), 1.45, 0.95, -0.15, Math.PI / 2 - 0.32));
  patient.add(mesh(new THREE.SphereGeometry(0.1, 16, 12), C.dark, 1.85, 0.87, 0.15));
  patient.add(mesh(new THREE.SphereGeometry(0.1, 16, 12), C.dark, 1.85, 0.87, -0.15));
  patient.add(place(capsule(0.08, 0.55, C.shirt), -0.25, 1.52, 0.34, Math.PI / 2 - 0.25));
  patient.add(place(capsule(0.08, 0.55, C.shirt), -0.25, 1.52, -0.34, Math.PI / 2 - 0.25));
  patient.add(mesh(new THREE.SphereGeometry(0.1, 16, 12), C.skin2, 0.1, 1.42, 0.34));
  const pHead = mesh(new THREE.SphereGeometry(0.24, 32, 24), C.skin2, -1.32, 1.82, 0);
  patient.add(pHead);
  patient.add(
    place(
      mesh(new THREE.SphereGeometry(0.25, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), C.hair),
      -1.38,
      1.8,
      0,
      Math.PI / 2 + 0.5
    )
  );
  const bib = mesh(new THREE.BoxGeometry(0.34, 0.02, 0.4), mat(0x9fd6d1), -1.0, 1.72, 0);
  bib.rotation.z = -0.38;
  patient.add(bib);
  const mouth = mesh(new THREE.SphereGeometry(0.05, 16, 12), mat(0x7a2e36), -1.25, 2.02, 0.0);
  patient.add(mouth);

  // Doctor
  const doc = new THREE.Group();
  world.add(place(doc, -1.3, 0, -1.05));
  doc.add(mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.9, 16), C.scrub, -0.12, 0.45, 0));
  doc.add(mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.9, 16), C.scrub, 0.12, 0.45, 0));
  doc.add(mesh(new THREE.BoxGeometry(0.22, 0.1, 0.3), C.dark, -0.12, 0.05, 0.05));
  doc.add(mesh(new THREE.BoxGeometry(0.22, 0.1, 0.3), C.dark, 0.12, 0.05, 0.05));
  doc.add(mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.25, 28), C.coat, 0, 1.45, 0));
  doc.add(mesh(new THREE.SphereGeometry(0.3, 28, 16), C.coat, 0, 2.05, 0));
  doc.add(mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.14, 16), C.skin, 0, 2.3, 0));
  const dHead = new THREE.Group();
  doc.add(place(dHead, 0, 2.55, 0, 0, 0.35));
  dHead.add(mesh(new THREE.SphereGeometry(0.23, 32, 24), C.skin));
  dHead.add(place(mesh(new THREE.SphereGeometry(0.245, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2), C.scrub), 0, 0.03, 0));
  dHead.add(
    place(
      mesh(new THREE.SphereGeometry(0.2, 24, 16, -0.9, 1.8, 1.45, 0.9), mat(0x9fd6d1, { side: THREE.DoubleSide })),
      0,
      -0.02,
      0.06,
      0,
      0,
      0
    )
  );
  dHead.add(mesh(new THREE.SphereGeometry(0.03, 10, 10), C.dark, -0.08, 0.05, 0.21));
  dHead.add(mesh(new THREE.SphereGeometry(0.03, 10, 10), C.dark, 0.08, 0.05, 0.21));

  // Working arm (pivot at shoulder, reaches to patient's mouth)
  const arm = new THREE.Group();
  doc.add(place(arm, 0.28, 2.0, 0.1));
  const upper = mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.95, 16), C.coat, 0, 0, 0.47);
  upper.rotation.x = Math.PI / 2;
  arm.add(upper);
  const hand = mesh(new THREE.SphereGeometry(0.08, 16, 12), mat(0x7fd1c3), 0, 0, 0.98);
  arm.add(hand);
  const tool = new THREE.Group();
  arm.add(place(tool, 0, 0, 1.05));

  // Second arm resting forward
  const arm2 = new THREE.Group();
  doc.add(place(arm2, -0.3, 2.0, 0.05, 0, 0.55));
  const up2 = mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.7, 16), C.coat, 0, -0.3, 0.12);
  up2.rotation.x = 0.4;
  arm2.add(up2);
  arm2.add(mesh(new THREE.SphereGeometry(0.08, 16, 12), mat(0x7fd1c3), 0, -0.62, 0.26));

  const mouthWorld = new THREE.Vector3();
  const aimArm = () => {
    mouth.getWorldPosition(mouthWorld);
    mouthWorld.y += 0.05;
    arm.lookAt(mouthWorld);
  };

  // Lamp
  const lampPole = mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.1, 12), C.metal, -2.3, 1.55, 0.6);
  world.add(lampPole);
  world.add(mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.08, 24), C.metal, -2.3, 0.04, 0.6));
  const lampArm = mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 12), C.metal, -1.8, 3.08, 0.35);
  lampArm.rotation.set(0.45, 0, Math.PI / 2 - 0.1);
  world.add(lampArm);
  const lampHead = mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.14, 32), C.coat, -1.3, 3.0, 0.1);
  lampHead.rotation.set(-0.2, 0, 0.25);
  world.add(lampHead);
  const extras = new THREE.Group();
  world.add(extras);
  let tick: (t: number) => void = () => {};

  if (variant === "checkup") {
    tool.add(place(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.35, 8), C.metal), 0, 0, 0.12, 0, Math.PI / 2));
    tool.add(
      place(
        mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.01, 20), mat(0xffffff, { metalness: 1, roughness: 0.05 })),
        0,
        0,
        0.3,
        0,
        0.6
      )
    );
    const beam = new THREE.Mesh(
      new THREE.ConeGeometry(0.55, 1.3, 32, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xfff6d8, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide })
    );
    place(beam, -1.3, 2.35, 0.05);
    extras.add(beam);
    const spot = new THREE.SpotLight(0xfff3d0, 1.2, 6, 0.5, 0.5);
    spot.position.set(-1.3, 2.95, 0.1);
    spot.target = pHead;
    world.add(spot);
    const ticks: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(
        new THREE.TorusGeometry(0.1, 0.025, 10, 30),
        mat(0x2fa7a0, { emissive: 0x2fa7a0, emissiveIntensity: 0.4 })
      );
      s.position.set(-0.6 + i * 0.4, 2.6, 0.6);
      extras.add(s);
      ticks.push(s);
    }
    tick = (t) => {
      (beam.material as THREE.MeshBasicMaterial).opacity = 0.18 + Math.sin(t * 2) * 0.05;
      ticks.forEach((s, i) => {
        const k = (t * 0.5 + i / 3) % 1;
        s.position.y = 2.2 + k * 1.2;
        const m = s.material as THREE.MeshStandardMaterial;
        m.opacity = 1 - k;
        m.transparent = true;
        s.scale.setScalar(0.6 + k * 0.6);
        s.rotation.y = t + i;
      });
    };
  }

  if (variant === "scan") {
    tool.add(place(mesh(new THREE.BoxGeometry(0.1, 0.08, 0.5), C.coat), 0, 0, 0.1));
    tool.add(
      place(
        mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), mat(0x2fa7a0, { emissive: 0x2fa7a0, emissiveIntensity: 1 })),
        0,
        -0.04,
        0.3
      )
    );
    const holo = new THREE.Group();
    place(holo, 0.55, 2.95, -0.5);
    holo.scale.setScalar(0.8);
    extras.add(holo);
    const wire = new THREE.MeshBasicMaterial({ color: 0x2fa7a0, wireframe: true, transparent: true, opacity: 0.55 });
    const solid = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x7fd1c3,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.9,
    });
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * (0.12 + (i / 9) * 0.76);
      const r = 0.75;
      const w = i === 0 || i === 9 ? 0.2 : i < 3 || i > 6 ? 0.17 : 0.13;
      const t1 = new THREE.Mesh(new THREE.BoxGeometry(w, 0.26, 0.17, 3, 3, 3), i % 2 ? wire : solid);
      t1.position.set(Math.cos(a) * r, 0, Math.sin(a) * r - 0.35);
      t1.lookAt(0, 0, -0.35);
      holo.add(t1);
    }
    const gum = new THREE.Mesh(
      new THREE.TorusGeometry(0.75, 0.09, 12, 48, Math.PI * 0.8),
      new THREE.MeshBasicMaterial({ color: 0xe7838c, wireframe: true, transparent: true, opacity: 0.45 })
    );
    gum.rotation.set(Math.PI / 2, 0, Math.PI * 0.1);
    gum.position.set(0, -0.15, -0.35);
    holo.add(gum);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1.2),
      new THREE.MeshBasicMaterial({ color: 0x2fa7a0, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false })
    );
    plane.rotation.x = -Math.PI / 2;
    holo.add(plane);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.012, 8, 80), new THREE.MeshBasicMaterial({ color: 0x2fa7a0 }));
    ring.rotation.x = Math.PI / 2;
    holo.add(ring);
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const line = new THREE.Line(lineGeo, new THREE.LineDashedMaterial({ color: 0x2fa7a0, dashSize: 0.08, gapSize: 0.06 }));
    world.add(line);
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    tick = (t) => {
      holo.rotation.y = Math.sin(t * 0.5) * 0.6;
      holo.position.y = 2.95 + Math.sin(t * 1.2) * 0.06;
      plane.position.y = Math.sin(t * 1.8) * 0.2;
      ring.position.y = plane.position.y;
      tool.getWorldPosition(a);
      holo.getWorldPosition(b);
      world.worldToLocal(a);
      world.worldToLocal(b);
      lineGeo.setFromPoints([a, b]);
      line.computeLineDistances();
      (line.material as THREE.LineDashedMaterial & { dashOffset: number }).dashOffset = -t;
    };
  }

  if (variant === "whitening") {
    tool.add(place(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 10), C.metal), 0, 0, 0.1, 0, Math.PI / 2));
    const dev = new THREE.Group();
    place(dev, -1.25, 2.3, 0.02);
    extras.add(dev);
    dev.add(mesh(new THREE.BoxGeometry(0.5, 0.1, 0.22), C.coat));
    const glow = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.02, 0.16), new THREE.MeshBasicMaterial({ color: 0x6fb6ff }));
    glow.position.y = -0.06;
    dev.add(glow);
    const devArm = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 10), C.metal, -1.25, 2.65, 0.03);
    extras.add(devArm);
    const blue = new THREE.PointLight(0x5aa8ff, 1.6, 2.5);
    blue.position.set(-1.25, 2.1, 0.02);
    extras.add(blue);
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.28, 0.3, 32, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x6fb6ff, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide })
    );
    place(cone, -1.25, 2.13, 0.02);
    extras.add(cone);
    const sparks: THREE.Mesh[] = [];
    const star = new THREE.OctahedronGeometry(0.06);
    for (let i = 0; i < 14; i++) {
      const s = new THREE.Mesh(star, new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffffff : 0x9fd0ff, transparent: true }));
      s.userData = { o: Math.random(), x: (Math.random() - 0.5) * 1.2, z: (Math.random() - 0.5) * 0.9 };
      extras.add(s);
      sparks.push(s);
    }
    tick = (t) => {
      const pulse = 0.5 + Math.sin(t * 3) * 0.5;
      blue.intensity = 1 + pulse * 1.2;
      (cone.material as THREE.MeshBasicMaterial).opacity = 0.18 + pulse * 0.2;
      sparks.forEach((s) => {
        const d = s.userData as { o: number; x: number; z: number };
        const k = (t * 0.35 + d.o) % 1;
        s.position.set(-1.25 + d.x * k, 2.1 + k * 1.3, d.z * k);
        (s.material as THREE.MeshBasicMaterial).opacity = 1 - k;
        s.rotation.y = t * 3;
      });
    };
    doc.position.set(-1.5, 0, -1.15);
  }

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  const mouse = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width - 0.5;
    mouse.y = (e.clientY - r.top) / r.height - 0.5;
  };
  const onLeave = () => {
    mouse.x = 0;
    mouse.y = 0;
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);

  let visible = false;
  let raf = 0;
  let seen = 0;
  const t0 = performance.now();
  let yaw = 0;
  let pitch = 0;
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    },
    { threshold: 0.05 }
  );
  io.observe(host);

  function loop(now: number) {
    if (!visible) {
      raf = 0;
      return;
    }
    const t = (now - t0) / 1000;
    seen = Math.min(1, (now - t0) / 1600);
    const e = 1 - Math.pow(1 - seen, 3);
    world.scale.setScalar(0.6 + e * 0.4);
    world.rotation.y = (1 - e) * -1.2;
    yaw += (mouse.x * 0.9 + (reduce ? 0 : Math.sin(t * 0.25) * 0.25) - yaw) * 0.05;
    pitch += (mouse.y * 0.5 - pitch) * 0.05;
    const R = camera.aspect < 1 ? 11.5 : 9.6;
    camera.position.set(Math.sin(0.55 + yaw) * R, 3.8 + pitch * 2, Math.cos(0.55 + yaw) * R);
    camera.lookAt(-0.1, 1.2, 0);
    if (!reduce) {
      aimArm();
      arm.rotateX(Math.sin(t * 4) * 0.035);
      arm.rotateY(Math.sin(t * 2.3) * 0.03);
      dHead.rotation.z = Math.sin(t * 0.8) * 0.06;
      pHead.scale.y = 1 + Math.sin(t * 1.5) * 0.01;
      tick(t);
    } else if (t < 0.1) {
      aimArm();
      tick(1);
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }

  return () => {
    io.disconnect();
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    renderer.dispose();
    host.removeChild(renderer.domElement);
  };
}
