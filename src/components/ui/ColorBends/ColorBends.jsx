import { useEffect, useRef } from 'react';
import './ColorBends.css';

const MAX_COLORS = 8;

const vertShaderSource = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragShaderSource = `
precision highp float;
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

function hexToRgbNormalized(hex) {
  const h = hex.replace('#', '').trim();
  const r = h.length === 3 ? parseInt(h[0] + h[0], 16) : parseInt(h.slice(0, 2), 16);
  const g = h.length === 3 ? parseInt(h[1] + h[1], 16) : parseInt(h.slice(2, 4), 16);
  const b = h.length === 3 ? parseInt(h[2] + h[2], 16) : parseInt(h.slice(4, 6), 16);
  return [r / 255, g / 255, b / 255];
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compilation error: ${info}`);
  }
  return shader;
}

export default function ColorBends({
  className = '',
  style,
  rotation = 90,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.15,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // References for dynamic params that can change without rebuilding the WebGL program
  const paramsRef = useRef({
    rotation,
    speed,
    colors,
    transparent,
    autoRotate,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    iterations,
    intensity,
    bandWidth
  });

  useEffect(() => {
    paramsRef.current = {
      rotation,
      speed,
      colors,
      transparent,
      autoRotate,
      scale,
      frequency,
      warpStrength,
      mouseInfluence,
      parallax,
      noise,
      iterations,
      intensity,
      bandWidth
    };
  }, [
    rotation,
    speed,
    colors,
    transparent,
    autoRotate,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    iterations,
    intensity,
    bandWidth
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL context options (high efficiency, 1.0 DPR clamp)
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power'
    });

    if (!gl) {
      console.warn('WebGL not supported for ColorBends, falling back to CSS background.');
      return;
    }

    let program = null;
    let positionBuffer = null;
    let rafId = null;

    try {
      const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
      const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

      program = gl.createProgram();
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
      }

      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    } catch (err) {
      console.error('Failed to initialize ColorBends WebGL program:', err);
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering NDC [-1, 1])
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]);

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uLocs = {
      uCanvas: gl.getUniformLocation(program, 'uCanvas'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uRot: gl.getUniformLocation(program, 'uRot'),
      uColorCount: gl.getUniformLocation(program, 'uColorCount'),
      uColors: gl.getUniformLocation(program, 'uColors'),
      uTransparent: gl.getUniformLocation(program, 'uTransparent'),
      uScale: gl.getUniformLocation(program, 'uScale'),
      uFrequency: gl.getUniformLocation(program, 'uFrequency'),
      uWarpStrength: gl.getUniformLocation(program, 'uWarpStrength'),
      uPointer: gl.getUniformLocation(program, 'uPointer'),
      uMouseInfluence: gl.getUniformLocation(program, 'uMouseInfluence'),
      uParallax: gl.getUniformLocation(program, 'uParallax'),
      uNoise: gl.getUniformLocation(program, 'uNoise'),
      uIterations: gl.getUniformLocation(program, 'uIterations'),
      uIntensity: gl.getUniformLocation(program, 'uIntensity'),
      uBandWidth: gl.getUniformLocation(program, 'uBandWidth')
    };

    // Prepare color uniform buffer
    const colorsFlat = new Float32Array(MAX_COLORS * 3);

    // Mouse pointer smoothing
    const pointer = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e) => {
      // Calculate normalized device coordinates [-1, 1] relative to window
      const x = (e.clientX / (window.innerWidth || 1)) * 2 - 1;
      const y = -((e.clientY / (window.innerHeight || 1)) * 2 - 1);
      pointer.targetX = x;
      pointer.targetY = y;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize handling (capped DPR = 1.0 to eliminate 4x pixel overhead on Retina/4K)
    let canvasWidth = 1;
    let canvasHeight = 1;

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth || 1;
      const h = container.clientHeight || window.innerHeight || 1;
      const dpr = 1.0; // Enforce DPR 1 for fluid gradient shader
      canvasWidth = Math.floor(w * dpr);
      canvasHeight = Math.floor(h * dpr);

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        gl.viewport(0, 0, canvasWidth, canvasHeight);
      }
    };

    handleResize();

    let resizeObserver = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', handleResize, { passive: true });
    }

    // Animation loop state
    let startTime = performance.now();
    let lastTime = startTime;
    let isPaused = false;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
      } else {
        isPaused = false;
        lastTime = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = window.innerWidth < 768;
    const targetFpsInterval = isMobile ? 1000 / 30 : 1000 / 60;
    let lastRenderTime = 0;

    const render = (now) => {
      rafId = requestAnimationFrame(render);

      if (isPaused || prefersReducedMotion) return;

      const elapsedSinceLastRender = now - lastRenderTime;
      if (elapsedSinceLastRender < targetFpsInterval) return;
      lastRenderTime = now - (elapsedSinceLastRender % targetFpsInterval);

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const totalElapsed = (now - startTime) / 1000;

      const p = paramsRef.current;

      // Pointer interpolation
      const smoothFactor = Math.min(1, dt * 6);
      pointer.currentX += (pointer.targetX - pointer.currentX) * smoothFactor;
      pointer.currentY += (pointer.targetY - pointer.currentY) * smoothFactor;

      // Calculate rotation
      const deg = (p.rotation % 360) + p.autoRotate * totalElapsed;
      const rad = (deg * Math.PI) / 180;

      // Flatten colors
      const validColors = (p.colors || []).filter(Boolean).slice(0, MAX_COLORS);
      colorsFlat.fill(0);
      validColors.forEach((hex, i) => {
        const [r, g, b] = hexToRgbNormalized(hex);
        colorsFlat[i * 3] = r;
        colorsFlat[i * 3 + 1] = g;
        colorsFlat[i * 3 + 2] = b;
      });

      // Set uniforms
      gl.uniform2f(uLocs.uCanvas, canvasWidth, canvasHeight);
      gl.uniform1f(uLocs.uTime, totalElapsed);
      gl.uniform1f(uLocs.uSpeed, p.speed);
      gl.uniform2f(uLocs.uRot, Math.cos(rad), Math.sin(rad));
      gl.uniform1i(uLocs.uColorCount, validColors.length);
      gl.uniform3fv(uLocs.uColors, colorsFlat);
      gl.uniform1i(uLocs.uTransparent, p.transparent ? 1 : 0);
      gl.uniform1f(uLocs.uScale, p.scale);
      gl.uniform1f(uLocs.uFrequency, p.frequency);
      gl.uniform1f(uLocs.uWarpStrength, p.warpStrength);
      gl.uniform2f(uLocs.uPointer, pointer.currentX, pointer.currentY);
      gl.uniform1f(uLocs.uMouseInfluence, p.mouseInfluence);
      gl.uniform1f(uLocs.uParallax, p.parallax);
      gl.uniform1f(uLocs.uNoise, p.noise);
      gl.uniform1i(uLocs.uIterations, p.iterations);
      gl.uniform1f(uLocs.uIntensity, p.intensity);
      gl.uniform1f(uLocs.uBandWidth, p.bandWidth);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    // Render once for static display if reduced motion
    if (prefersReducedMotion) {
      const p = paramsRef.current;
      const deg = p.rotation;
      const rad = (deg * Math.PI) / 180;
      const validColors = (p.colors || []).filter(Boolean).slice(0, MAX_COLORS);
      colorsFlat.fill(0);
      validColors.forEach((hex, i) => {
        const [r, g, b] = hexToRgbNormalized(hex);
        colorsFlat[i * 3] = r;
        colorsFlat[i * 3 + 1] = g;
        colorsFlat[i * 3 + 2] = b;
      });

      gl.uniform2f(uLocs.uCanvas, canvasWidth, canvasHeight);
      gl.uniform1f(uLocs.uTime, 0);
      gl.uniform1f(uLocs.uSpeed, p.speed);
      gl.uniform2f(uLocs.uRot, Math.cos(rad), Math.sin(rad));
      gl.uniform1i(uLocs.uColorCount, validColors.length);
      gl.uniform3fv(uLocs.uColors, colorsFlat);
      gl.uniform1i(uLocs.uTransparent, p.transparent ? 1 : 0);
      gl.uniform1f(uLocs.uScale, p.scale);
      gl.uniform1f(uLocs.uFrequency, p.frequency);
      gl.uniform1f(uLocs.uWarpStrength, p.warpStrength);
      gl.uniform2f(uLocs.uPointer, 0, 0);
      gl.uniform1f(uLocs.uMouseInfluence, p.mouseInfluence);
      gl.uniform1f(uLocs.uParallax, p.parallax);
      gl.uniform1f(uLocs.uNoise, p.noise);
      gl.uniform1i(uLocs.uIterations, p.iterations);
      gl.uniform1f(uLocs.uIntensity, p.intensity);
      gl.uniform1f(uLocs.uBandWidth, p.bandWidth);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } else {
      rafId = requestAnimationFrame(render);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', handleResize);

      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`color-bends-container ${className}`}
      style={{
        ...style,
        background: 'radial-gradient(circle at 50% 30%, #152228 0%, #080d10 60%, #050607 100%)'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
