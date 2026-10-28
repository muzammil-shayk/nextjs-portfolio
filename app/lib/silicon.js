import { BufferGeometry, Float32BufferAttribute } from 'three';

// Shared, mutable scene state. GSAP (scroll) and pointer handlers write it,
// the R3F frame loop reads it. Never React state: it changes every frame.
export const silicon = {
  progress: 0,
  px: 0,
  py: 0,
  moved: -10,
  clickX: 0, // last click or tap, in -1..1 screen space
  clickY: 0,
  clickT: 0, // changes on every click so the frame loop notices
};

export const LAYERS = 4;
export const GAP = 3.6;
export const HALF = 6.2; // half-width of every layer
export const CORE = 1.3; // half-width of the lime core
export const layerY = i => -i * GAP;
export const CORE_Y = layerY(LAYERS - 1);

// Deterministic so the poster frame is identical on every load.
export function rng(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const OUT = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// Circuit traces fanning out of the core on every layer: straight runs joined
// by 45-degree jogs, like a routed PCB bus.
function buildPaths() {
  const rand = rng(11);
  const paths = [];
  for (let l = 0; l < LAYERS; l++) {
    const y = layerY(l) + 0.07;
    for (let k = 0; k < 28; k++) {
      const [ox, oz] = OUT[k % 4];
      const px = -oz;
      const pz = ox;
      const lane = ((k >> 2) - 3.2) * 0.36 + (rand() - 0.5) * 0.1;
      let x = ox * (CORE + 0.15) + px * lane;
      let z = oz * (CORE + 0.15) + pz * lane;
      const pts = [[x, y, z]];
      const jogs = 2 + (rand() < 0.5 ? 1 : 0);
      for (let j = 0; j < jogs; j++) {
        const run = 0.5 + rand() * 1.4;
        x += ox * run;
        z += oz * run;
        pts.push([x, y, z]);
        const s = (rand() < 0.5 ? -1 : 1) * (0.4 + rand() * 1.0);
        x += ox * Math.abs(s) + px * s;
        z += oz * Math.abs(s) + pz * s;
        pts.push([x, y, z]);
      }
      const along = x * ox + z * oz;
      const rest = (HALF - 0.35 - along) * (0.6 + rand() * 0.4);
      if (rest > 0.2) {
        x += ox * rest;
        z += oz * rest;
        pts.push([x, y, z]);
      }
      paths.push({ pts, seed: rand() });
    }
  }
  return paths;
}

export const paths = buildPaths();

// All traces as one flat ribbon mesh. aDist is the distance travelled from the
// core, so pulses can run outward and the network can grow in on load.
export function buildTraceGeometry() {
  const pos = [];
  const dist = [];
  const seed = [];
  const idx = [];
  const w = 0.04;
  for (const { pts, seed: s } of paths) {
    const base = pos.length / 3;
    let d = 0;
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(i - 1, 0)];
      const next = pts[Math.min(i + 1, pts.length - 1)];
      const cur = pts[i];
      if (i > 0) d += Math.hypot(cur[0] - prev[0], cur[2] - prev[2]);
      // Averaged normal of the two adjoining segments (a simple miter).
      const n = [0, 0];
      for (const [a, b] of [
        [prev, cur],
        [cur, next],
      ]) {
        const dx = b[0] - a[0];
        const dz = b[2] - a[2];
        const len = Math.hypot(dx, dz);
        if (len > 0) {
          n[0] += -dz / len;
          n[1] += dx / len;
        }
      }
      const nl = Math.hypot(n[0], n[1]) || 1;
      n[0] /= nl;
      n[1] /= nl;
      for (const sign of [-1, 1]) {
        pos.push(cur[0] + n[0] * w * sign, cur[1], cur[2] + n[1] * w * sign);
        dist.push(d);
        seed.push(s);
      }
      if (i < pts.length - 1) {
        const a = base + i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('aDist', new Float32BufferAttribute(dist, 1));
  g.setAttribute('aSeed', new Float32BufferAttribute(seed, 1));
  g.setIndex(idx);
  return g;
}

// Code glyphs: each rests on a trace (target) and starts scattered in a cloud.
export function buildGlyphGeometry(count) {
  const rand = rng(5);
  const target = [];
  const scatter = [];
  const data = [];
  for (let i = 0; i < count; i++) {
    const { pts } = paths[Math.floor(rand() * paths.length)];
    const s = Math.floor(rand() * (pts.length - 1));
    const t = rand();
    const a = pts[s];
    const b = pts[s + 1];
    target.push(
      a[0] + (b[0] - a[0]) * t + (rand() - 0.5) * 0.3,
      a[1] + 0.05 + rand() * 0.5,
      a[2] + (b[2] - a[2]) * t + (rand() - 0.5) * 0.3
    );
    const u = rand() * Math.PI * 2;
    const v = Math.acos(2 * rand() - 1);
    const r = 12 + rand() * 18;
    scatter.push(
      Math.sin(v) * Math.cos(u) * r,
      Math.cos(v) * r * 0.9 - 5,
      Math.sin(v) * Math.sin(u) * r
    );
    // glyph index, size, stagger phase, lime tint (about 1 in 5)
    data.push(
      Math.floor(rand() * 8),
      0.2 + rand() * 0.22,
      rand(),
      rand() < 0.2 ? 1 : 0
    );
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(target, 3));
  g.setAttribute('aScatter', new Float32BufferAttribute(scatter, 3));
  g.setAttribute('aData', new Float32BufferAttribute(data, 4));
  return g;
}
