'use client';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  EdgesGeometry,
  BoxGeometry,
  MathUtils,
  Matrix4,
  Raycaster,
  ShaderMaterial,
  Vector2,
  Vector3,
} from 'three';
import {
  CORE,
  CORE_Y,
  HALF,
  LAYERS,
  buildGlyphGeometry,
  buildTraceGeometry,
  layerY,
  silicon,
} from '../lib/silicon';

// Colours are written straight into the shaders as sRGB so they match the CSS
// tokens exactly (the canvas is `flat`: no tone mapping).
const COMMON = /* glsl */ `
  uniform float uTime;
  uniform float uAssemble;
  uniform vec3 uRo;
  uniform vec3 uRd;
  uniform vec3 uRo2; // ray of the last click or tap
  uniform vec3 uRd2;
  uniform float uPulse; // radius of the shockwave it sent, < 0 when idle
  const vec3 LIME = vec3(0.824, 1.0, 0.0);
  const vec3 PAPER = vec3(0.922, 0.933, 0.878);
  // Where the pointer ray meets the horizontal plane at height y (board space).
  float pointerGlow(vec3 p, float radius) {
    float t = (p.y - uRo.y) / (abs(uRd.y) < 1e-4 ? 1e-4 : uRd.y);
    vec3 h = uRo + uRd * t;
    return 1.0 - smoothstep(0.0, radius, distance(h.xz, p.xz));
  }
  // A ring that travels outward through every layer from where you clicked.
  float pulseRing(vec3 p) {
    if (uPulse < 0.0) return 0.0;
    float t = (p.y - uRo2.y) / (abs(uRd2.y) < 1e-4 ? 1e-4 : uRd2.y);
    vec3 h = uRo2 + uRd2 * t;
    float x = (distance(h.xz, p.xz) - uPulse) * 1.3;
    return exp(-x * x) * (1.0 - clamp(uPulse / 18.0, 0.0, 1.0));
  }
`;

const traceVert = /* glsl */ `
  ${COMMON}
  attribute float aDist;
  attribute float aSeed;
  varying float vDist;
  varying float vSeed;
  varying float vGlow;
  varying vec3 vPos;
  void main() {
    vDist = aDist;
    vSeed = aSeed;
    vPos = position;
    vGlow = pointerGlow(position, 3.4);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const traceFrag = /* glsl */ `
  ${COMMON}
  varying float vDist;
  varying float vSeed;
  varying float vGlow;
  varying vec3 vPos;
  void main() {
    // The network grows outward from the core while assembling.
    float edge = uAssemble * 16.0;
    float grown = 1.0 - smoothstep(edge - 1.5, edge, vDist);
    // A bright head with a long tail, travelling away from the core.
    float ph = fract(vDist * 0.11 - uTime * (0.22 + vSeed * 0.3) + vSeed * 9.0);
    float comet = exp(-ph * 10.0);
    vec3 col = PAPER * 0.24 + LIME * (comet * 1.2 + vGlow * 0.9 + pulseRing(vPos) * 1.6);
    gl_FragColor = vec4(col, grown);
  }
`;

const glyphVert = /* glsl */ `
  ${COMMON}
  attribute vec3 aScatter;
  attribute vec4 aData; // glyph, size, stagger, lime
  uniform float uScale;
  varying float vGlyph;
  varying float vLime;
  varying float vK;
  varying float vGlow;
  void main() {
    float k = clamp(uAssemble * 1.4 - aData.z * 0.4, 0.0, 1.0);
    k = k * k * (3.0 - 2.0 * k);
    vec3 p = mix(aScatter, position, k);
    // Loose glyphs drift; settled ones hover a little.
    float ph = aData.z * 40.0;
    p += (1.0 - k) * vec3(sin(uTime * 0.6 + ph), cos(uTime * 0.5 + ph * 1.3), sin(uTime * 0.4 + ph * 0.7)) * 0.7;
    p.y += sin(uTime * 1.2 + ph) * 0.05 * k;
    vGlow = max(pointerGlow(p, 2.8), pulseRing(p) * 1.4) * k;
    vGlyph = aData.x;
    vLime = aData.w;
    vK = k;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aData.y * (1.0 + vGlow * 0.9) * uScale / -mv.z;
  }
`;

const glyphFrag = /* glsl */ `
  ${COMMON}
  uniform sampler2D uAtlas;
  varying float vGlyph;
  varying float vLime;
  varying float vK;
  varying float vGlow;
  void main() {
    float col = mod(vGlyph, 4.0);
    float row = floor(vGlyph / 4.0);
    vec2 uv = vec2((col + gl_PointCoord.x) / 4.0, 1.0 - (row + gl_PointCoord.y) / 2.0);
    float a = texture2D(uAtlas, uv).a;
    vec3 c = mix(PAPER, LIME, max(vLime, vGlow));
    float o = a * (0.28 + vLime * 0.3 + vGlow * 0.7) * (0.35 + 0.65 * vK);
    gl_FragColor = vec4(c, o);
  }
`;

// One shared uniform set. Module scope: the scene is a singleton and writing to
// it from the frame loop must not allocate.
const U = {
  uTime: { value: 0 },
  uAssemble: { value: 0 },
  uRo: { value: new Vector3() },
  uRd: { value: new Vector3(0, -1, 0) },
  uRo2: { value: new Vector3() },
  uRd2: { value: new Vector3(0, -1, 0) },
  uPulse: { value: -1 },
  uScale: { value: 800 },
  uAtlas: { value: null },
};

const raycaster = new Raycaster();
const ndc = new Vector2();
const inv = new Matrix4();

function makeAtlas() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#fff';
  x.font = '700 100px ui-monospace, Menlo, Consolas, monospace';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  ['{', '}', '<', '>', '/', ';', '0', '1'].forEach((g, i) =>
    x.fillText(g, (i % 4) * 128 + 64, Math.floor(i / 4) * 128 + 68)
  );
  return new CanvasTexture(c);
}

function Scene({ narrow, still }) {
  const board = useRef();
  const core = useRef();
  const aura = useRef();
  const cur = useRef({
    click: 0,
    clickAt: -1,
    p: silicon.progress,
    assemble: still ? 1 : 0,
    px: 0,
    py: 0,
  });

  // Built by hand: R3F clones a `uniforms` prop, which would cut the link to U.
  const materials = useMemo(() => {
    const base = {
      uniforms: U,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    };
    return {
      trace: new ShaderMaterial({
        ...base,
        vertexShader: traceVert,
        fragmentShader: traceFrag,
        side: DoubleSide,
      }),
      glyph: new ShaderMaterial({
        ...base,
        vertexShader: glyphVert,
        fragmentShader: glyphFrag,
      }),
    };
  }, []);
  const traces = useMemo(() => buildTraceGeometry(), []);
  const glyphs = useMemo(
    () => buildGlyphGeometry(narrow ? 1100 : 2200),
    [narrow]
  );
  const edges = useMemo(
    () => new EdgesGeometry(new BoxGeometry(HALF * 2, 0.1, HALF * 2)),
    []
  );

  useLayoutEffect(() => {
    U.uAtlas.value = makeAtlas();
    return () => U.uAtlas.value?.dispose();
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    const c = cur.current;
    c.p = MathUtils.damp(c.p, silicon.progress, 5, dt);
    // Clock-based, so the intro takes the same time on slow and fast frames.
    const x = MathUtils.clamp((time - 0.3) / 2.8, 0, 1);
    c.assemble = still ? 1 : 1 - Math.pow(1 - x, 3);

    // Real pointer when it moved recently; otherwise a slow wander, so phones
    // and idle desktops still see the board tilt and the traces light up.
    const idle = performance.now() / 1000 - silicon.moved > 3;
    c.px = MathUtils.damp(
      c.px,
      idle ? Math.sin(time * 0.5) * 0.55 : silicon.px,
      4,
      dt
    );
    c.py = MathUtils.damp(
      c.py,
      idle ? Math.cos(time * 0.37) * 0.4 : silicon.py,
      4,
      dt
    );

    // The dive: from an overview of the whole stack down through every layer
    // to the core, which ends up filling the frame.
    const p = c.p;
    const az = 0.55 + p * 1.2;
    const r = MathUtils.lerp(narrow ? 25 : 16.5, 0.15, Math.pow(p, 1.25));
    const y = MathUtils.lerp(narrow ? 11 : 8.5, CORE_Y + 0.9, p);
    const cam = state.camera;
    cam.position.set(Math.sin(az) * r, y, Math.cos(az) * r);
    cam.lookAt(0, MathUtils.lerp(-2.2, CORE_Y, p), 0);
    cam.updateMatrixWorld();

    const fov = narrow ? 60 : 52;
    if (cam.fov !== fov) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }

    const b = board.current;
    b.rotation.x = c.py * 0.1 + Math.sin(time * 0.4) * 0.015;
    b.rotation.z = -c.px * 0.1;
    b.updateMatrixWorld();

    // Pointer ray expressed in board space, for the shaders.
    ndc.set(c.px, c.py);
    raycaster.setFromCamera(ndc, cam);
    inv.copy(b.matrixWorld).invert();
    U.uRo.value.copy(raycaster.ray.origin).applyMatrix4(inv);
    U.uRd.value.copy(raycaster.ray.direction).transformDirection(inv);

    // A click or tap sends a shockwave through the stack from that point.
    if (silicon.clickT !== c.click) {
      c.click = silicon.clickT;
      c.clickAt = time;
      ndc.set(silicon.clickX, silicon.clickY);
      raycaster.setFromCamera(ndc, cam);
      U.uRo2.value.copy(raycaster.ray.origin).applyMatrix4(inv);
      U.uRd2.value.copy(raycaster.ray.direction).transformDirection(inv);
    }
    const pulse = c.clickAt < 0 ? -1 : (time - c.clickAt) * 11;
    U.uPulse.value = pulse > 20 ? -1 : pulse;

    U.uTime.value = time;
    U.uAssemble.value = c.assemble;
    U.uScale.value =
      (state.size.height * state.gl.getPixelRatio()) /
      (2 * Math.tan(MathUtils.degToRad(fov) / 2));

    const breathe = 1 + Math.sin(time * 2) * 0.06;
    aura.current.scale.set(breathe * 1.5, 1, breathe * 1.5);
    core.current.visible = c.assemble > 0.05;
    aura.current.visible = core.current.visible;
  });

  return (
    <>
      <color attach="background" args={['#101400']} />
      <group ref={board}>
        {Array.from({ length: LAYERS }, (_, i) => (
          <group key={i} position={[0, layerY(i), 0]}>
            <mesh renderOrder={0}>
              <boxGeometry args={[HALF * 2, 0.1, HALF * 2]} />
              <meshBasicMaterial
                color="#1a2008"
                transparent
                opacity={0.28}
                depthWrite={false}
              />
            </mesh>
            <lineSegments geometry={edges} renderOrder={1}>
              <lineBasicMaterial color="#d2ff00" transparent opacity={0.4} />
            </lineSegments>
          </group>
        ))}

        <mesh geometry={traces} renderOrder={2} frustumCulled={false}>
          <primitive object={materials.trace} attach="material" />
        </mesh>

        <points geometry={glyphs} renderOrder={3} frustumCulled={false}>
          <primitive object={materials.glyph} attach="material" />
        </points>

        {/* The lime core, glowing up through the stack. */}
        <mesh ref={core} position={[0, CORE_Y + 0.3, 0]} renderOrder={4}>
          <boxGeometry args={[CORE * 2, 0.5, CORE * 2]} />
          <meshBasicMaterial color="#d2ff00" />
        </mesh>
        <mesh ref={aura} position={[0, CORE_Y + 0.3, 0]} renderOrder={4}>
          <boxGeometry args={[CORE * 2, 0.5, CORE * 2]} />
          <meshBasicMaterial
            color="#d2ff00"
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
        <mesh position={[0, (2 + CORE_Y) / 2, 0]}>
          <cylinderGeometry
            args={[CORE * 0.8, CORE * 0.8, 2 - CORE_Y, 4, 1, true]}
          />
          <meshBasicMaterial
            color="#d2ff00"
            transparent
            opacity={0.06}
            depthWrite={false}
            blending={AdditiveBlending}
            side={2}
          />
        </mesh>
      </group>
    </>
  );
}

export default function SiliconScene({ active, still, narrow, onReady }) {
  return (
    <Canvas
      aria-hidden="true"
      flat
      frameloop={still ? 'demand' : active ? 'always' : 'never'}
      dpr={[1, narrow ? 1.5 : 1.75]}
      camera={{ fov: narrow ? 60 : 52, near: 0.05, far: 200 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.6 }}
      onCreated={onReady}
    >
      <Scene narrow={narrow} still={still} />
    </Canvas>
  );
}
