// Tental Dental Studio — 3D animated single-page site (React + three.js)
// Setup:  npm create vite@latest tental -- --template react
//         cd tental && npm i three
//         is file ko src/App.jsx me paste karein, phir: npm run dev
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CSS = `@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600&display=swap");
:root{
  --ink:#0F2733; --ink-2:#3C5561; --porcelain:#F3F7F7; --white:#FFFFFF;
  --aqua:#2FA7A0; --aqua-deep:#1C7C77; --sky:#D8EEEE; --gum:#E7838C; --line:#D3E2E2;
  --radius-lg:28px; --radius-sm:12px;
  --display:"Bricolage Grotesque", "Segoe UI", system-ui, sans-serif;
  --body:"Figtree", "Segoe UI", system-ui, sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{font-family:var(--body);color:var(--ink);background:var(--porcelain);line-height:1.6;overflow-x:hidden}
img{max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
:focus-visible{outline:3px solid var(--aqua);outline-offset:3px;border-radius:6px}
.wrap{width:min(1180px,92vw);margin-inline:auto}

/* Loader */
.loader{position:fixed;inset:0;background:var(--ink);z-index:100;display:grid;place-items:center;transition:clip-path 1s cubic-bezier(.77,0,.18,1)}
.loader.done{clip-path:inset(0 0 100% 0)}
.loader svg{width:64px;animation:pulse 1.1s ease-in-out infinite}
.loader p{color:var(--sky);font-family:var(--display);margin-top:14px;letter-spacing:.02em;text-align:center}
@keyframes pulse{50%{transform:scale(.86) rotate(-6deg);opacity:.6}}

/* Nav */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;transition:background .4s,box-shadow .4s}
.nav.scrolled{background:rgba(243,247,247,.86);backdrop-filter:blur(14px);box-shadow:0 1px 0 var(--line)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;height:76px}
.logo{display:flex;align-items:center;gap:10px;font-family:var(--display);font-weight:800;font-size:1.35rem}
.logo svg{width:30px}
.menu{display:flex;gap:6px;list-style:none}
.menu a{position:relative;padding:8px 14px;border-radius:99px;font-weight:500;color:var(--ink-2);transition:color .3s}
.menu a::after{content:"";position:absolute;inset:0;border-radius:99px;background:var(--sky);transform:scale(.6);opacity:0;transition:.35s cubic-bezier(.3,1.4,.5,1);z-index:-1}
.menu a:hover,.menu a.active{color:var(--ink)}
.menu a.active::after,.menu a:hover::after{transform:scale(1);opacity:1}
.btn{display:inline-flex;align-items:center;gap:8px;border:0;cursor:pointer;padding:14px 26px;border-radius:99px;font-weight:600;background:var(--ink);color:var(--white);transition:transform .3s cubic-bezier(.3,1.6,.5,1),background .3s}
.btn:hover{transform:translateY(-3px);background:var(--aqua-deep)}
.btn.ghost{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--ink)}
.btn.ghost:hover{background:var(--ink);color:var(--white)}
.burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer;position:relative}
.burger span{position:absolute;left:10px;right:10px;height:2px;background:var(--ink);transition:.4s}
.burger span:nth-child(1){top:16px}.burger span:nth-child(2){top:26px}
.burger.open span:nth-child(1){top:21px;transform:rotate(45deg)}
.burger.open span:nth-child(2){top:21px;transform:rotate(-45deg)}

/* Hero */
.hero{min-height:100vh;display:grid;align-items:center;position:relative;padding-top:76px;overflow:hidden}
.hero .wrap{display:grid;grid-template-columns:1.05fr 1fr;align-items:center;gap:20px}
.hero h1{font-family:var(--display);font-size:clamp(2.6rem,6vw,5.2rem);line-height:.98;letter-spacing:-.035em;font-weight:800}
.hero h1 .ln{display:block;overflow:hidden}
.hero h1 .ln span{display:inline-block;transform:translateY(110%);transition:transform 1.1s cubic-bezier(.2,.9,.2,1)}
.ready .hero h1 .ln span{transform:none}
.hero h1 .ln:nth-child(2) span{transition-delay:.12s}
.hero h1 .ln:nth-child(3) span{transition-delay:.24s}
.hero p.lead{font-size:1.15rem;color:var(--ink-2);max-width:46ch;margin:26px 0 34px}
.hero .ctas{display:flex;gap:12px;flex-wrap:wrap}
.fade{opacity:0;transform:translateY(20px);transition:1s cubic-bezier(.2,.9,.2,1) .5s}
.ready .fade{opacity:1;transform:none}
.stage{position:relative;height:min(640px,70vh)}
.stage canvas{width:100%!important;height:100%!important;display:block}
.blob{position:absolute;inset:10% 6%;border-radius:50%;background:radial-gradient(circle at 40% 35%,var(--sky),transparent 65%);filter:blur(10px);z-index:-1;animation:breathe 7s ease-in-out infinite}
@keyframes breathe{50%{transform:scale(1.08)}}
.chip{position:absolute;background:var(--white);border-radius:18px;padding:12px 16px;box-shadow:0 18px 40px -18px rgba(15,39,51,.35);font-size:.9rem;display:flex;gap:10px;align-items:center;animation:float 6s ease-in-out infinite}
.chip b{font-family:var(--display);font-size:1.2rem}
.chip i{width:10px;height:10px;border-radius:50%;background:var(--aqua);box-shadow:0 0 0 5px rgba(47,167,160,.2)}
.chip.c1{top:14%;left:0}.chip.c2{bottom:14%;right:2%;animation-delay:-3s}
@keyframes float{50%{transform:translateY(-14px)}}
.strip{display:flex;gap:34px;margin-top:46px;color:var(--ink-2);font-size:.95rem;flex-wrap:wrap}
.strip strong{display:block;color:var(--ink);font-family:var(--display);font-size:1.05rem}

/* Sections */
section{padding:120px 0}
.head{max-width:640px;margin-bottom:56px}
.head h2{font-family:var(--display);font-size:clamp(2rem,4vw,3.3rem);line-height:1.05;letter-spacing:-.03em;font-weight:700}
.head p{color:var(--ink-2);margin-top:14px;font-size:1.08rem}
.reveal{opacity:0;transform:translateY(50px) rotateX(12deg);transform-origin:top;transition:1s cubic-bezier(.2,.9,.2,1)}
.reveal.in{opacity:1;transform:none}

/* Services */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;perspective:1200px}
.card{background:var(--white);border-radius:var(--radius-lg);padding:32px;position:relative;overflow:hidden;transform-style:preserve-3d;transition:transform .2s ease-out,box-shadow .4s;border:1px solid var(--line)}
.card:hover{box-shadow:0 30px 60px -30px rgba(15,39,51,.4)}
.card .ic{width:58px;height:58px;border-radius:18px;background:var(--sky);display:grid;place-items:center;margin-bottom:22px;transform:translateZ(40px)}
.card .ic svg{width:28px;stroke:var(--aqua-deep)}
.card h3{font-family:var(--display);font-size:1.4rem;transform:translateZ(30px)}
.card p{color:var(--ink-2);margin:8px 0 18px;transform:translateZ(20px)}
.card .price{font-weight:600;color:var(--aqua-deep);transform:translateZ(25px);display:inline-block}
.card .shine{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(47,167,160,.14),transparent 45%);opacity:0;transition:opacity .3s}
.card:hover .shine{opacity:1}

/* Process */
.process{background:var(--ink);color:var(--porcelain);border-radius:48px;margin:0 2vw}
.process .head p{color:#A9C2C6}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;position:relative}
.steps::before{content:"";position:absolute;top:27px;left:0;height:2px;width:var(--prog,0%);background:var(--aqua);transition:width 1.8s cubic-bezier(.2,.9,.2,1)}
.step .n{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:var(--ink);border:2px solid var(--aqua);font-family:var(--display);font-weight:700;position:relative;margin-bottom:22px}
.step h3{font-family:var(--display);font-size:1.25rem;margin-bottom:6px}
.step p{color:#A9C2C6;font-size:.98rem}

/* Doctors */
.docs{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.doc{text-align:left}
.doc .ph{aspect-ratio:4/5;border-radius:var(--radius-lg);background:linear-gradient(160deg,var(--sky),#B6DCDA);display:grid;place-items:center;font-family:var(--display);font-size:4rem;font-weight:800;color:var(--aqua-deep);overflow:hidden;position:relative;margin-bottom:18px}
.doc .ph::after{content:"";position:absolute;inset:0;background:var(--ink);transform:translateY(101%);transition:transform .6s cubic-bezier(.7,0,.2,1)}
.doc .ph span{position:relative;z-index:1;transition:color .6s,transform .6s}
.doc:hover .ph::after{transform:none}
.doc:hover .ph span{color:var(--sky);transform:scale(1.15) rotate(-4deg)}
.doc h3{font-family:var(--display);font-size:1.3rem}
.doc p{color:var(--ink-2)}

/* Results */
.results .wrap{display:grid;grid-template-columns:1fr 1.1fr;gap:60px;align-items:center}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:36px}
.stats b{font-family:var(--display);font-size:2.8rem;line-height:1;display:block;letter-spacing:-.03em}
.stats span{color:var(--ink-2)}
.ba{position:relative;border-radius:var(--radius-lg);overflow:hidden;background:var(--gum);aspect-ratio:16/10;user-select:none;touch-action:none;cursor:ew-resize}
.ba svg{position:absolute;inset:0;width:100%;height:100%}
.ba .after{clip-path:inset(0 0 0 var(--pos,50%))}
.ba .bar{position:absolute;top:0;bottom:0;left:var(--pos,50%);width:3px;background:var(--white);transform:translateX(-50%)}
.ba .bar::after{content:"⇆";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:50%;background:var(--white);display:grid;place-items:center;color:var(--ink);font-size:1.2rem;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.ba .tag{position:absolute;bottom:14px;background:rgba(15,39,51,.75);color:#fff;padding:4px 12px;border-radius:99px;font-size:.85rem}
.ba .tag.l{left:14px}.ba .tag.r{right:14px}

/* Reviews */
.reviews{overflow:hidden}
.track{display:flex;gap:20px;width:max-content;animation:marquee 40s linear infinite}
.reviews:hover .track{animation-play-state:paused}
@keyframes marquee{to{transform:translateX(-50%)}}
.rev{width:360px;background:var(--white);border:1px solid var(--line);border-radius:var(--radius-lg);padding:28px}
.rev .stars{color:#E5A93B;letter-spacing:2px}
.rev p{margin:12px 0 18px;font-size:1.02rem}
.rev small{color:var(--ink-2)}

/* Contact */
.contact .wrap{display:grid;grid-template-columns:.9fr 1.1fr;gap:48px}
.info{display:grid;gap:22px;align-content:start}
.info div{padding-bottom:18px;border-bottom:1px solid var(--line)}
.info strong{font-family:var(--display);display:block;font-size:1.1rem}
.info span{color:var(--ink-2)}
form.box{background:var(--white);border-radius:var(--radius-lg);padding:36px;border:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:18px;position:relative;overflow:hidden}
.field{display:grid;gap:6px}
.field.full{grid-column:1/-1}
.field label{font-weight:600;font-size:.92rem}
.field input,.field select,.field textarea{border:1.5px solid var(--line);background:var(--porcelain);border-radius:var(--radius-sm);padding:13px 14px;transition:border-color .3s,box-shadow .3s,background .3s}
.field textarea{min-height:120px;resize:vertical}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--aqua);background:var(--white);box-shadow:0 0 0 4px rgba(47,167,160,.15)}
.field.err input,.field.err select,.field.err textarea{border-color:#C8475A;animation:shake .4s}
.field .msg{color:#B03A4B;font-size:.85rem;min-height:1em}
@keyframes shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
form.box .btn{grid-column:1/-1;justify-content:center;padding:16px}
.btn .spin{width:18px;height:18px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:rot .8s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
.success{position:absolute;inset:0;background:var(--white);display:grid;place-items:center;text-align:center;padding:30px;clip-path:circle(0% at 50% 100%);transition:clip-path .9s cubic-bezier(.7,0,.2,1)}
.success.show{clip-path:circle(150% at 50% 100%)}
.success svg{width:84px;margin:0 auto 16px}
.success svg path{stroke-dasharray:60;stroke-dashoffset:60;transition:stroke-dashoffset .8s .6s}
.success.show svg path{stroke-dashoffset:0}
.success h3{font-family:var(--display);font-size:1.8rem}
.success p{color:var(--ink-2);margin:8px 0 20px}

footer{padding:40px 0;border-top:1px solid var(--line);color:var(--ink-2);font-size:.95rem}
footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
.totop{position:fixed;right:22px;bottom:22px;width:50px;height:50px;border-radius:50%;border:0;background:var(--aqua);color:#fff;font-size:1.3rem;cursor:pointer;z-index:40;transform:scale(0);transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.totop.show{transform:scale(1)}

@media (max-width:920px){
  .menu{position:fixed;inset:76px 0 auto 0;flex-direction:column;background:var(--porcelain);padding:20px 4vw 30px;gap:4px;clip-path:inset(0 0 100% 0);transition:clip-path .5s cubic-bezier(.7,0,.2,1);box-shadow:0 20px 30px -20px rgba(0,0,0,.2)}
  .menu.open{clip-path:inset(0 0 0 0)}
  .menu a{display:block;font-size:1.2rem;padding:12px 14px}
  .burger{display:block}
  .nav .btn.book{display:none}
  .hero .wrap,.results .wrap,.contact .wrap{grid-template-columns:1fr}
  .stage{height:380px;order:-1}
  .grid,.docs{grid-template-columns:1fr 1fr}
  .steps{grid-template-columns:1fr 1fr}
  .steps::before{display:none}
  section{padding:84px 0}
}
@media (max-width:600px){
  .grid,.docs,.steps{grid-template-columns:1fr}
  form.box{grid-template-columns:1fr;padding:24px}
  .rev{width:290px}
  .chip{display:none}
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  .reveal,.fade,.hero h1 .ln span{opacity:1;transform:none}
}

/* Treatment in action (alternating 3D rows) */
.care .rows{display:grid;gap:110px}
.feature{display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:center}
.feature.flip{grid-template-columns:1.1fr 1fr}
.feature.flip .copy{order:2}
.feature .copy h3{font-family:var(--display);font-size:clamp(1.7rem,3vw,2.5rem);line-height:1.08;letter-spacing:-.025em;font-weight:700}
.feature .copy>p{color:var(--ink-2);margin:16px 0 22px;font-size:1.06rem;max-width:48ch}
.feature ul{list-style:none;display:grid;gap:12px;margin-bottom:28px}
.feature li{display:flex;gap:12px;align-items:flex-start}
.feature li::before{content:"";flex:none;width:22px;height:22px;margin-top:2px;border-radius:50%;background:var(--sky) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231C7C77' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 12.5l4 4 8-9'/%3E%3C/svg%3E") center/14px no-repeat}
.feature .meta{display:flex;gap:28px;margin-bottom:26px;color:var(--ink-2);font-size:.95rem}
.feature .meta strong{display:block;color:var(--ink);font-family:var(--display);font-size:1.25rem}
.scene{position:relative;height:500px;border-radius:40px;background:radial-gradient(120% 90% at 50% 0%,var(--white),var(--sky));overflow:hidden;cursor:grab}
.scene canvas{display:block;width:100%!important;height:100%!important}
.scene .live{position:absolute;left:20px;bottom:20px;background:var(--white);border-radius:99px;padding:9px 16px 9px 12px;display:flex;gap:10px;align-items:center;font-size:.9rem;font-weight:500;box-shadow:0 14px 30px -16px rgba(15,39,51,.35)}
.scene .live i{width:9px;height:9px;border-radius:50%;background:var(--gum);animation:blink 1.4s infinite}
.scene .live span{display:inline-block}
.scene .live span.swap{animation:swap .5s cubic-bezier(.2,.9,.2,1)}
.scene .hint{position:absolute;right:20px;top:18px;font-size:.82rem;color:var(--ink-2)}
@keyframes blink{50%{opacity:.25}}
@keyframes swap{from{opacity:0;transform:translateY(8px)}}
.feature .scene.reveal{transform:translateY(60px) scale(.94);transform-origin:center}
.feature .scene.reveal.in{transform:none}
@media (max-width:920px){
  .feature,.feature.flip{grid-template-columns:1fr;gap:28px}
  .feature.flip .copy{order:0}
  .scene{height:380px;border-radius:28px}
  .care .rows{gap:80px}
}
`;

// ---------- 3D: hero tooth ----------
function initTooth(THREE, host) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.3, 7.5);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0x2fa7a0, 2.2, 20); rim.position.set(-4, -1, -2); scene.add(rim);
  const warm = new THREE.PointLight(0xe7838c, 1.1, 20); warm.position.set(4, -3, 2); scene.add(warm);

  const enamel = new THREE.MeshPhysicalMaterial({ color: 0xfbfdfd, roughness: 0.18, metalness: 0.02, clearcoat: 1, clearcoatRoughness: 0.08});

  // Tooth: crown with cusps + two roots
  const tooth = new THREE.Group();
  const crownGeo = new THREE.SphereGeometry(1, 96, 96);
  const p = crownGeo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    v.x *= 1.15; v.z *= 1.0; v.y *= 0.85;
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

  // Orbit ring + sparkles
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.018, 16, 160), new THREE.MeshBasicMaterial({ color: 0x2fa7a0, transparent: true, opacity: 0.55 }));
  ring.rotation.x = Math.PI / 2.4; scene.add(ring);
  const bubbles = new THREE.Group();
  const bubbleMat = new THREE.MeshPhysicalMaterial({ color: 0xd8eeee, roughness: 0.05, transmission: 0.6, transparent: true, opacity: 0.85, clearcoat: 1 });
  for (let i = 0; i < 26; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.04 + Math.random() * 0.12, 20, 20), bubbleMat);
    const a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 1.4;
    b.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 4, Math.sin(a) * r - 0.5);
    b.userData = { a, r, s: 0.2 + Math.random() * 0.5, y: b.position.y };
    bubbles.add(b);
  }
  scene.add(bubbles);

  const mouse = { x: 0, y: 0 };
  const onMove = (e) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
  window.addEventListener("pointermove", onMove);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  resize(); window.addEventListener("resize", resize);

  // Intro spin-in
  let intro = 0, raf, t0 = performance.now();
  tooth.scale.setScalar(0.01);
  const loop = (now) => {
    const t = (now - t0) / 1000;
    intro = Math.min(1, intro + 0.018);
    const e = 1 - Math.pow(1 - intro, 3);
    tooth.scale.setScalar(0.01 + e * 0.99);
    const scrollSpin = window.scrollY * 0.003;
    tooth.rotation.y += ((reduce ? 0.3 : t * 0.45) + mouse.x * 1.2 + scrollSpin - tooth.rotation.y) * 0.06 + (1 - e) * 0.25;
    tooth.rotation.x += (mouse.y * 0.5 - tooth.rotation.x) * 0.06;
    tooth.position.y = 0.45 + (reduce ? 0 : Math.sin(t * 1.3) * 0.12);
    ring.rotation.z = t * 0.25;
    bubbles.children.forEach((b) => {
      const d = b.userData;
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

// ---------- 3D: doctor + patient treatment scenes ----------
function initTreatment(THREE, host, variant) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05, ...o });
  const C = { chair: mat(0x1c7c77), chairSoft: mat(0x2fa7a0), metal: mat(0xc9d6d8, { metalness: 0.6, roughness: 0.3 }),
    coat: mat(0xffffff), scrub: mat(0x1c7c77), skin: mat(0xe2a983), skin2: mat(0xc98e6a), shirt: mat(0xe7838c),
    pants: mat(0x3c5561), dark: mat(0x0f2733), hair: mat(0x2b1d17), floor: mat(0xa9d3d0, { roughness: 1 }) };

  const mesh = (geo, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
  const capsule = (r, len, m) => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(r, r, len, 24), m)); g.add(mesh(new THREE.SphereGeometry(r, 24, 16), m, 0, len / 2, 0)); g.add(mesh(new THREE.SphereGeometry(r, 24, 16), m, 0, -len / 2, 0)); return g; };
  const place = (o, x, y, z, rz = 0, rx = 0, ry = 0) => { o.position.set(x, y, z); o.rotation.set(rx, ry, rz); return o; };

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9fc9c7, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 0.7);
  sun.position.set(3, 7, 4); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4 });
  scene.add(sun);

  const world = new THREE.Group(); scene.add(world);
  const floor = mesh(new THREE.CylinderGeometry(2.9, 2.9, 0.12, 64), C.floor, 0, -0.06, 0); world.add(floor);

  // Dental chair
  world.add(mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.1, 32), C.metal, 0.3, 0.05, 0));
  world.add(mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.75, 20), C.metal, 0.3, 0.45, 0));
  world.add(mesh(new THREE.BoxGeometry(1.3, 0.2, 0.85), C.chair, 0.45, 0.88, 0));
  world.add(place(mesh(new THREE.BoxGeometry(1.1, 0.18, 0.85), C.chair), 1.55, 0.72, 0, -0.32));
  world.add(place(mesh(new THREE.BoxGeometry(1.35, 0.2, 0.85), C.chair), -0.72, 1.12, 0, -0.38));
  world.add(place(mesh(new THREE.BoxGeometry(0.42, 0.16, 0.55), C.chairSoft), -1.48, 1.44, 0, -0.38));

  // Patient (reclined)
  const patient = new THREE.Group(); world.add(patient);
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
  const pHead = mesh(new THREE.SphereGeometry(0.24, 32, 24), C.skin2, -1.32, 1.82, 0); patient.add(pHead);
  patient.add(place(mesh(new THREE.SphereGeometry(0.25, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), C.hair), -1.38, 1.8, 0, Math.PI / 2 + 0.5));
  const bib = mesh(new THREE.BoxGeometry(0.34, 0.02, 0.4), mat(0x9fd6d1), -1.0, 1.72, 0); bib.rotation.z = -0.38; patient.add(bib);
  const mouth = mesh(new THREE.SphereGeometry(0.05, 16, 12), mat(0x7a2e36), -1.25, 2.02, 0.0); patient.add(mouth);

  // Doctor
  const doc = new THREE.Group(); world.add(place(doc, -1.3, 0, -1.05));
  doc.add(mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.9, 16), C.scrub, -0.12, 0.45, 0));
  doc.add(mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.9, 16), C.scrub, 0.12, 0.45, 0));
  doc.add(mesh(new THREE.BoxGeometry(0.22, 0.1, 0.3), C.dark, -0.12, 0.05, 0.05));
  doc.add(mesh(new THREE.BoxGeometry(0.22, 0.1, 0.3), C.dark, 0.12, 0.05, 0.05));
  doc.add(mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.25, 28), C.coat, 0, 1.45, 0));
  doc.add(mesh(new THREE.SphereGeometry(0.3, 28, 16), C.coat, 0, 2.05, 0));
  doc.add(mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.14, 16), C.skin, 0, 2.3, 0));
  const dHead = new THREE.Group(); doc.add(place(dHead, 0, 2.55, 0, 0, 0.35));
  dHead.add(mesh(new THREE.SphereGeometry(0.23, 32, 24), C.skin));
  dHead.add(place(mesh(new THREE.SphereGeometry(0.245, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2), C.scrub), 0, 0.03, 0));
  dHead.add(place(mesh(new THREE.SphereGeometry(0.2, 24, 16, -0.9, 1.8, 1.45, 0.9), mat(0x9fd6d1, { side: THREE.DoubleSide })), 0, -0.02, 0.06, 0, 0, 0));
  dHead.add(mesh(new THREE.SphereGeometry(0.03, 10, 10), C.dark, -0.08, 0.05, 0.21));
  dHead.add(mesh(new THREE.SphereGeometry(0.03, 10, 10), C.dark, 0.08, 0.05, 0.21));
  // Working arm (pivot at shoulder, reaches to patient's mouth)
  const arm = new THREE.Group(); doc.add(place(arm, 0.28, 2.0, 0.1));
  const upper = mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.95, 16), C.coat, 0, 0, 0.47); upper.rotation.x = Math.PI / 2; arm.add(upper);
  const hand = mesh(new THREE.SphereGeometry(0.08, 16, 12), mat(0x7fd1c3), 0, 0, 0.98); arm.add(hand);
  const tool = new THREE.Group(); arm.add(place(tool, 0, 0, 1.05));
  // Second arm resting forward
  const arm2 = new THREE.Group(); doc.add(place(arm2, -0.3, 2.0, 0.05, 0, 0.55));
  const up2 = mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.7, 16), C.coat, 0, -0.3, 0.12); up2.rotation.x = 0.4; arm2.add(up2);
  arm2.add(mesh(new THREE.SphereGeometry(0.08, 16, 12), mat(0x7fd1c3), 0, -0.62, 0.26));

  const mouthWorld = new THREE.Vector3();
  const aimArm = () => { mouth.getWorldPosition(mouthWorld); mouthWorld.y += 0.05; arm.lookAt(mouthWorld); };

  // Lamp
  const lampPole = mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.1, 12), C.metal, -2.3, 1.55, 0.6); world.add(lampPole);
  world.add(mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.08, 24), C.metal, -2.3, 0.04, 0.6));
  const lampArm = mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 12), C.metal, -1.8, 3.08, 0.35); lampArm.rotation.set(0.45, 0, Math.PI / 2 - 0.1); world.add(lampArm);
  const lampHead = mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.14, 32), C.coat, -1.3, 3.0, 0.1); lampHead.rotation.set(-0.2, 0, 0.25); world.add(lampHead);
  const extras = new THREE.Group(); world.add(extras);
  let tick = () => {};

  if (variant === "checkup") {
    tool.add(place(mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.35, 8), C.metal), 0, 0, 0.12, 0, Math.PI / 2));
    tool.add(place(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.01, 20), mat(0xffffff, { metalness: 1, roughness: 0.05 })), 0, 0, 0.3, 0, 0.6));
    const beam = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.3, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff6d8, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }));
    place(beam, -1.3, 2.35, 0.05); extras.add(beam);
    const spot = new THREE.SpotLight(0xfff3d0, 1.2, 6, 0.5, 0.5); spot.position.set(-1.3, 2.95, 0.1); spot.target = pHead; world.add(spot);
    // floating check marks
    const ticks = [];
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.025, 10, 30), mat(0x2fa7a0, { emissive: 0x2fa7a0, emissiveIntensity: 0.4 }));
      s.position.set(-0.6 + i * 0.4, 2.6, 0.6); extras.add(s); ticks.push(s);
    }
    tick = (t) => {
      beam.material.opacity = 0.18 + Math.sin(t * 2) * 0.05;
      ticks.forEach((s, i) => { const k = (t * 0.5 + i / 3) % 1; s.position.y = 2.2 + k * 1.2; s.material.opacity = 1 - k; s.material.transparent = true; s.scale.setScalar(0.6 + k * 0.6); s.rotation.y = t + i; });
    };
  }

  if (variant === "scan") {
    tool.add(place(mesh(new THREE.BoxGeometry(0.1, 0.08, 0.5), C.coat), 0, 0, 0.1));
    tool.add(place(mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), mat(0x2fa7a0, { emissive: 0x2fa7a0, emissiveIntensity: 1 })), 0, -0.04, 0.3));
    // holographic jaw scan
    const holo = new THREE.Group(); place(holo, 0.55, 2.95, -0.5); holo.scale.setScalar(0.8); extras.add(holo);
    const wire = new THREE.MeshBasicMaterial({ color: 0x2fa7a0, wireframe: true, transparent: true, opacity: 0.55 });
    const solid = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7fd1c3, emissiveIntensity: 0.35, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * (0.12 + (i / 9) * 0.76), r = 0.75;
      const w = i === 0 || i === 9 ? 0.2 : i < 3 || i > 6 ? 0.17 : 0.13;
      const t1 = new THREE.Mesh(new THREE.BoxGeometry(w, 0.26, 0.17, 3, 3, 3), i % 2 ? wire : solid);
      t1.position.set(Math.cos(a) * r, 0, Math.sin(a) * r - 0.35); t1.lookAt(0, 0, -0.35); holo.add(t1);
    }
    const gum = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.09, 12, 48, Math.PI * 0.8), new THREE.MeshBasicMaterial({ color: 0xe7838c, wireframe: true, transparent: true, opacity: 0.45 }));
    gum.rotation.set(Math.PI / 2, 0, Math.PI * 0.1); gum.position.set(0, -0.15, -0.35); holo.add(gum);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.2), new THREE.MeshBasicMaterial({ color: 0x2fa7a0, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }));
    plane.rotation.x = -Math.PI / 2; holo.add(plane);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.012, 8, 80), new THREE.MeshBasicMaterial({ color: 0x2fa7a0 })); ring.rotation.x = Math.PI / 2; holo.add(ring);
    // beam from wand to hologram
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const line = new THREE.Line(lineGeo, new THREE.LineDashedMaterial({ color: 0x2fa7a0, dashSize: 0.08, gapSize: 0.06 })); world.add(line);
    const a = new THREE.Vector3(), b = new THREE.Vector3();
    tick = (t) => {
      holo.rotation.y = Math.sin(t * 0.5) * 0.6;
      holo.position.y = 2.95 + Math.sin(t * 1.2) * 0.06;
      plane.position.y = Math.sin(t * 1.8) * 0.2;
      ring.position.y = plane.position.y;
      tool.getWorldPosition(a); holo.getWorldPosition(b);
      world.worldToLocal(a); world.worldToLocal(b);
      lineGeo.setFromPoints([a, b]); line.computeLineDistances(); line.material.dashOffset = -t;
    };
  }

  if (variant === "whitening") {
    tool.add(place(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 10), C.metal), 0, 0, 0.1, 0, Math.PI / 2));
    // blue LED whitening device above mouth
    const dev = new THREE.Group(); place(dev, -1.25, 2.3, 0.02); extras.add(dev);
    dev.add(mesh(new THREE.BoxGeometry(0.5, 0.1, 0.22), C.coat));
    const glow = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.02, 0.16), new THREE.MeshBasicMaterial({ color: 0x6fb6ff }));
    glow.position.y = -0.06; dev.add(glow);
    const devArm = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 10), C.metal, -1.25, 2.65, 0.03); extras.add(devArm);
    const blue = new THREE.PointLight(0x5aa8ff, 1.6, 2.5); blue.position.set(-1.25, 2.1, 0.02); extras.add(blue);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.3, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0x6fb6ff, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide }));
    place(cone, -1.25, 2.13, 0.02); extras.add(cone);
    const sparks = [];
    const star = new THREE.OctahedronGeometry(0.06);
    for (let i = 0; i < 14; i++) {
      const s = new THREE.Mesh(star, new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffffff : 0x9fd0ff, transparent: true }));
      s.userData = { o: Math.random(), x: (Math.random() - 0.5) * 1.2, z: (Math.random() - 0.5) * 0.9 }; extras.add(s); sparks.push(s);
    }
    tick = (t) => {
      const pulse = 0.5 + Math.sin(t * 3) * 0.5;
      blue.intensity = 1 + pulse * 1.2; cone.material.opacity = 0.18 + pulse * 0.2;
      sparks.forEach((s) => { const k = (t * 0.35 + s.userData.o) % 1; s.position.set(-1.25 + s.userData.x * k, 2.1 + k * 1.3, s.userData.z * k); s.material.opacity = 1 - k; s.rotation.y = t * 3; });
    };
    // doctor steps back a bit for this one
    doc.position.set(-1.5, 0, -1.15);
  }

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  resize(); window.addEventListener("resize", resize);

  const mouse = { x: 0, y: 0 };
  const onMove = (e) => { const r = host.getBoundingClientRect(); mouse.x = (e.clientX - r.left) / r.width - 0.5; mouse.y = (e.clientY - r.top) / r.height - 0.5; };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", () => { mouse.x = 0; mouse.y = 0; });

  // Only animate when on screen; play an entrance when first seen
  let visible = false, raf = null, seen = 0, t0 = performance.now(), yaw = 0, pitch = 0;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }, { threshold: 0.05 });
  io.observe(host);

  function loop(now) {
    if (!visible) { raf = null; return; }
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
    } else if (t < 0.1) { aimArm(); tick(1); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }

  return () => {
    io.disconnect(); if (raf) cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    host.removeEventListener("pointermove", onMove);
    renderer.dispose(); host.removeChild(renderer.domElement);
  };
}

// ---------- UI ----------
const SERVICES = [
  { t: "Checkup & cleaning", d: "Exam, scaling and polishing, with a written report of your teeth.", p: "From ₹999", i: <path d="M4 12h16M12 4v16" /> },
  { t: "Braces & aligners", d: "Metal, ceramic or clear aligners planned with a 3D preview.", p: "From ₹35,000", i: <path d="M3 12c3-4 15-4 18 0M3 12c3 4 15 4 18 0M8 10v4M12 9.5v5M16 10v4" /> },
  { t: "Root canal", d: "Single-sitting rotary root canal with proper numbing.", p: "From ₹4,500", i: <path d="M12 3v18M8 7l4 4 4-4M8 15l4 4 4-4" /> },
  { t: "Dental implants", d: "Titanium implants and crowns that look and bite like real teeth.", p: "From ₹28,000", i: <path d="M8 4h8l-1 6H9zM10 10h4M10 13h4M10.5 16h3M11 19h2" /> },
  { t: "Teeth whitening", d: "In-clinic whitening, several shades lighter in about an hour.", p: "From ₹6,000", i: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M5 19l2-2" /></> },
  { t: "Kids dentistry", d: "Gentle first visits, sealants and fluoride for little teeth.", p: "From ₹799", i: <><circle cx="12" cy="12" r="9" /><path d="M8.5 14c2 2 5 2 7 0M9 9.5h.01M15 9.5h.01" /></> },
];
const REVIEWS = [
  { q: "My root canal was done in one sitting and I felt nothing. Honestly surprised.", n: "Karan J.", s: "Root canal" },
  { q: "Dr. Neha made my 6-year-old actually excited to come back. That says it all.", n: "Priya S.", s: "Kids dentistry" },
  { q: "Clear aligners, clear pricing. They showed me the end result before we started.", n: "Aditya R.", s: "Aligners" },
  { q: "Got an implant after years of avoiding it. Painless and it feels like my own tooth.", n: "Meera V.", s: "Implant" },
  { q: "Spotless clinic and they were on time. Rare for any doctor in Delhi!", n: "Rahul T.", s: "Checkup" },
];
const MENU = [["home", "Home"], ["services", "Treatments"], ["care", "In the chair"], ["process", "First visit"], ["doctors", "Doctors"], ["results", "Results"], ["reviews", "Reviews"], ["contact", "Contact"]];
const DOCTORS = [["AS", "Dr. Ananya Sharma", "Orthodontist, braces & aligners"], ["RM", "Dr. Rohan Mehta", "Implants & oral surgery"], ["NK", "Dr. Neha Kapoor", "Children's dentistry"]];
const STEPS = [["Quick chat", "Tell us what's bothering you and any past dental worry."], ["3D scan", "A digital intraoral scan and low-dose X-ray if needed."], ["Your plan", "See your teeth on screen and choose from clear options."], ["Treatment", "Start the same day or book a time that suits you."]];
const STATS = [[12000, "Smiles treated"], [18, "Years of practice"], [850, "Implants placed"], [98, "% would recommend us"]];

const CARE = [
  { v: "checkup", h: "A checkup that doesn't feel rushed",
    p: "Your dentist checks every tooth under a bright, shadow-free light, then cleans and polishes. You get a simple report of what's healthy and what needs watching.",
    li: ["Full exam of teeth, gums and bite", "Scaling and polishing to remove tartar", "Written report you can keep"],
    meta: [["30 min", "In the chair"], ["₹999", "Checkup & cleaning"]], cta: "Book a checkup",
    steps: ["Examining each tooth", "Checking gum health", "Polishing and cleaning"] },
  { v: "scan", h: "See your teeth in 3D before anything starts",
    p: "A small wand scans your mouth in about two minutes. The 3D model appears on screen right away, so you see exactly what we see, with no messy moulds.",
    li: ["No gag-inducing impression trays", "Plan braces, aligners and crowns on the model", "Compare scans over time"],
    meta: [["2 min", "Full-mouth scan"], ["Free", "With any treatment plan"]], cta: "Book a 3D scan",
    steps: ["Scanning upper teeth", "Building 3D model", "Model ready to review"] },
  { v: "whitening", h: "Whitening under a gentle blue light",
    p: "After protecting your gums, we apply the whitening gel and activate it with a cool LED light. Most patients go several shades lighter in a single visit.",
    li: ["Gums shielded before the gel goes on", "Low-heat LED, no burning sensation", "Shade checked before and after"],
    meta: [["60 min", "Single sitting"], ["₹6,000", "In-clinic whitening"]], cta: "Book whitening",
    steps: ["Protecting the gums", "Activating with LED light", "Checking the new shade"] },
];

function TreatmentScene({ variant, steps }) {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  useEffect(() => initTreatment(THREE, ref.current, variant), [variant]);
  useEffect(() => { const id = setInterval(() => setI((n) => (n + 1) % steps.length), 2600); return () => clearInterval(id); }, [steps.length]);
  return (
    <div className="scene reveal" ref={ref}>
      <span className="hint">Move to rotate</span>
      <div className="live"><i /><span key={i} className={i ? "swap" : ""}>{steps[i]}</span></div>
    </div>
  );
}

const ToothIcon = ({ fill }) => (
  <svg viewBox="0 0 64 64"><path d="M32 12c-6-6-20-6-22 6-2 10 4 14 6 24 1 6 3 12 6 12 4 0 3-12 10-12s6 12 10 12c3 0 5-6 6-12 2-10 8-14 6-24-2-12-16-12-22-6z" fill={fill} /></svg>
);

function Counter({ end }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / 1800);
        setVal(Math.round(end * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);
  return <b ref={ref}>{val.toLocaleString("en-IN")}{val === end && end > 100 ? "+" : ""}</b>;
}

function TiltCard({ s, style }) {
  const ref = useRef(null);
  const move = (e) => {
    const c = ref.current, r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.transform = `rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg) translateZ(10px)`;
    c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
  };
  return (
    <article ref={ref} className="card reveal" style={style} onPointerMove={move} onPointerLeave={() => (ref.current.style.transform = "")}>
      <div className="shine" />
      <div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.i}</svg></div>
      <h3>{s.t}</h3><p>{s.d}</p><span className="price">{s.p}</span>
    </article>
  );
}

function BeforeAfter() {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const update = (x) => { const r = ref.current.getBoundingClientRect(); setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))); };
  const teeth = (fill) => (
    <g fill={fill}>
      <rect x="30" y="70" width="52" height="110" rx="22" /><rect x="88" y="62" width="62" height="124" rx="24" />
      <rect x="156" y="56" width="42" height="134" rx="18" /><rect x="204" y="56" width="42" height="134" rx="18" />
      <rect x="252" y="62" width="62" height="124" rx="24" /><rect x="320" y="70" width="52" height="110" rx="22" />
    </g>
  );
  return (
    <div ref={ref} className="ba reveal" style={{ "--pos": pos + "%" }}
      onPointerDown={(e) => { setDrag(true); e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX); }}
      onPointerMove={(e) => drag && update(e.clientX)} onPointerUp={() => setDrag(false)}>
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice"><rect width="400" height="250" fill="#E7838C" />{teeth("#DCC48C")}</svg>
      <svg className="after" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice"><rect width="400" height="250" fill="#E7838C" />{teeth("#FBFDFD")}</svg>
      <div className="bar" /><span className="tag l">Before</span><span className="tag r">After</span>
    </div>
  );
}

const RULES = {
  name: (v) => (v.trim().length < 2 ? "Enter your full name" : ""),
  phone: (v) => (!/^[+\d][\d\s-]{8,14}$/.test(v.trim()) ? "Enter a valid phone number" : ""),
  email: (v) => (v && !/^\S+@\S+\.\S+$/.test(v) ? "Enter a valid email, or leave it blank" : ""),
  service: (v) => (!v ? "Choose a treatment" : ""),
};
const EMPTY = { name: "", phone: "", email: "", service: "", date: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const blur = (k) => () => RULES[k] && setErrors({ ...errors, [k]: RULES[k](form[k]) });

  const submit = (e) => {
    e.preventDefault();
    const errs = Object.fromEntries(Object.keys(RULES).map((k) => [k, RULES[k](form[k])]));
    setErrors(errs); setShakeKey((n) => n + 1);
    if (Object.values(errs).some(Boolean)) return;
    setSending(true);
    console.log("Form data:", form); // TODO: yahan apna API / EmailJS / Formspree call lagayein
    setTimeout(() => { setSending(false); setDone(true); setForm(EMPTY); }, 1200);
  };

  const Field = ({ id, label, full, children }) => (
    <div key={errors[id] ? id + shakeKey : id} className={`field${full ? " full" : ""}${errors[id] ? " err" : ""}`}>
      <label htmlFor={id}>{label}</label>{children}<span className="msg">{errors[id]}</span>
    </div>
  );

  return (
    <form className="box reveal" noValidate onSubmit={submit}>
      {Field({ id: "name", label: "Full name", children: <input id="name" value={form.name} onChange={set("name")} onBlur={blur("name")} autoComplete="name" /> })}
      {Field({ id: "phone", label: "Phone", children: <input id="phone" type="tel" value={form.phone} onChange={set("phone")} onBlur={blur("phone")} autoComplete="tel" /> })}
      {Field({ id: "email", label: "Email", children: <input id="email" type="email" value={form.email} onChange={set("email")} onBlur={blur("email")} autoComplete="email" /> })}
      {Field({ id: "service", label: "Treatment", children: (
        <select id="service" value={form.service} onChange={set("service")} onBlur={blur("service")}>
          <option value="">Choose one</option>{SERVICES.map((s) => <option key={s.t}>{s.t}</option>)}
        </select>) })}
      {Field({ id: "date", label: "Preferred date", full: true, children: <input id="date" type="date" value={form.date} onChange={set("date")} /> })}
      {Field({ id: "message", label: "Anything we should know?", full: true, children: <textarea id="message" value={form.message} onChange={set("message")} placeholder="Pain, sensitivity, past treatment…" /> })}
      <button className="btn" type="submit" disabled={sending}>{sending ? <><span className="spin" /> Sending</> : "Request appointment"}</button>
      <div className={`success${done ? " show" : ""}`}>
        <div>
          <svg viewBox="0 0 84 84" fill="none"><circle cx="42" cy="42" r="40" fill="#D8EEEE" /><path d="M26 43l11 11 21-23" stroke="#1C7C77" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h3>Request received</h3><p>We'll call you shortly to confirm your appointment.</p>
          <button type="button" className="btn ghost" onClick={() => setDone(false)}>Send another request</button>
        </div>
      </div>
    </form>
  );
}

export default function App() {
  const stageRef = useRef(null);
  const stepsRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Loader + 3D scene
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    const cleanup = initTooth(THREE, stageRef.current);
    return () => { clearTimeout(t); cleanup(); };
  }, []);

  // Scroll state
  useEffect(() => {
    const on = () => setScrolled(window.scrollY);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Active menu, reveals, steps progress
  useEffect(() => {
    const aio = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section").forEach((s) => aio.observe(s));
    const rio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const sibs = [...e.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
      e.target.style.transitionDelay = sibs.indexOf(e.target) * 0.1 + "s";
      e.target.classList.add("in"); rio.unobserve(e.target);
    }), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => rio.observe(el));
    const sio = new IntersectionObserver(([e]) => { if (e.isIntersecting) { stepsRef.current.style.setProperty("--prog", "100%"); sio.disconnect(); } }, { threshold: 0.4 });
    sio.observe(stepsRef.current);
    return () => { aio.disconnect(); rio.disconnect(); sio.disconnect(); };
  }, []);

  return (
    <div className={ready ? "ready" : ""}>
      <style>{CSS}</style>
      <div className={`loader${ready ? " done" : ""}`}><div><ToothIcon fill="#F3F7F7" /><p>Tental</p></div></div>

      <header className={`nav${scrolled > 20 ? " scrolled" : ""}`}>
        <div className="wrap">
          <a href="#home" className="logo"><ToothIcon fill="#2FA7A0" />Tental</a>
          <ul className={`menu${menuOpen ? " open" : ""}`}>
            {MENU.map(([id, label]) => (
              <li key={id}><a href={"#" + id} className={active === id ? "active" : ""} onClick={() => setMenuOpen(false)}>{label}</a></li>
            ))}
          </ul>
          <a href="#contact" className="btn book">Book a visit</a>
          <button className={`burger${menuOpen ? " open" : ""}`} aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="wrap">
            <div>
              <h1>{["Calm, careful", "dentistry for", "the whole family."].map((l) => <span className="ln" key={l}><span>{l}</span></span>)}</h1>
              <p className="lead fade">Checkups, braces, implants and whitening under one roof, with digital scans instead of messy moulds and numbing that actually works.</p>
              <div className="ctas fade"><a href="#contact" className="btn">Book a visit</a><a href="#services" className="btn ghost">See treatments</a></div>
              <div className="strip fade">
                <div><strong>Mon – Sat</strong>9:00 am to 8:00 pm</div>
                <div><strong>Emergency line</strong>+91 98100 00000</div>
              </div>
            </div>
            <div className="stage" ref={stageRef}>
              <div className="blob" />
              <div className="chip c1"><i /><div><b>4.9</b> rating from 1,200+ patients</div></div>
              <div className="chip c2"><div><b>Same-day</b><br />appointments open</div></div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="wrap">
            <div className="head reveal"><h2>Treatments we offer</h2><p>Clear prices up front. Your dentist explains every option before anything starts.</p></div>
            <div className="grid">{SERVICES.map((s) => <TiltCard key={s.t} s={s} />)}</div>
          </div>
        </section>

        <section className="care" id="care">
          <div className="wrap">
            <div className="head reveal"><h2>What your treatment actually looks like</h2><p>Drag or move over each scene to look around the chair.</p></div>
            <div className="rows">
              {CARE.map((c, idx) => (
                <div className={`feature${idx % 2 ? " flip" : ""}`} key={c.v}>
                  <div className="copy reveal">
                    <h3>{c.h}</h3><p>{c.p}</p>
                    <ul>{c.li.map((l) => <li key={l}>{l}</li>)}</ul>
                    <div className="meta">{c.meta.map(([a, b2]) => <div key={a}><strong>{a}</strong>{b2}</div>)}</div>
                    <a href="#contact" className="btn">{c.cta}</a>
                  </div>
                  <TreatmentScene variant={c.v} steps={c.steps} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="wrap">
            <div className="head reveal"><h2>What happens on your first visit</h2><p>About 45 minutes, start to finish.</p></div>
            <div className="steps" ref={stepsRef}>
              {STEPS.map(([h, p], i) => <div className="step reveal" key={h}><div className="n">{i + 1}</div><h3>{h}</h3><p>{p}</p></div>)}
            </div>
          </div>
        </section>

        <section id="doctors">
          <div className="wrap">
            <div className="head reveal"><h2>Meet your dentists</h2><p>Specialists who have been practising together for over a decade.</p></div>
            <div className="docs">
              {DOCTORS.map(([ini, n, r]) => <div className="doc reveal" key={n}><div className="ph"><span>{ini}</span></div><h3>{n}</h3><p>{r}</p></div>)}
            </div>
          </div>
        </section>

        <section className="results" id="results">
          <div className="wrap">
            <div className="reveal">
              <div className="head" style={{ marginBottom: 0 }}><h2>Whitening you can see in one sitting</h2><p>Drag the slider to compare a typical before and after shade.</p></div>
              <div className="stats">{STATS.map(([n, l]) => <div key={l}><Counter end={n} /><span>{l}</span></div>)}</div>
            </div>
            <BeforeAfter />
          </div>
        </section>

        <section className="reviews" id="reviews">
          <div className="wrap"><div className="head reveal"><h2>What patients say</h2></div></div>
          <div className="track">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div className="rev" key={i}><div className="stars">★★★★★</div><p>“{r.q}”</p><strong>{r.n}</strong><br /><small>{r.s}</small></div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <div className="info reveal">
              <div className="head" style={{ marginBottom: 10 }}><h2>Book a visit</h2><p>Send the form and we'll call within 2 working hours to confirm your time.</p></div>
              <div><strong>Clinic</strong><span>22, Green Park Main, New Delhi 110016</span></div>
              <div><strong>Phone</strong><span>+91 98100 00000</span></div>
              <div><strong>Email</strong><span>hello@tental.in</span></div>
              <div><strong>Hours</strong><span>Mon – Sat, 9:00 am to 8:00 pm</span></div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer><div className="wrap"><span>© 2026 Tental Dental Studio, New Delhi</span><span>Made with care for healthy smiles</span></div></footer>
      <button className={`totop${scrolled > 600 ? " show" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0 })}>↑</button>
    </div>
  );
}
