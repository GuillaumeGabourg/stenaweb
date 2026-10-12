"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

// Domain-warped fbm field: ink ground, deep green body, acid-lime crests.
// The pointer pushes a soft swirl into the flow; grain is baked into the shader.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseAmt;
uniform float uIntro;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float aspect = uRes.x / uRes.y;
  // Entrance: the field settles from a slow zoom inside the shader, so it stays sharp (no upscaled canvas).
  float zoom = mix(1.45, 1.0, uIntro);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.2 / zoom;
  float t = uTime * 0.06;

  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0) * 2.2 / zoom;
  vec2 d = p - m;
  // Wide, gentle swirl: a soft lean of the flow rather than a tight vortex.
  float fall = exp(-dot(d, d) * 0.9) * uMouseAmt;
  float ang = fall * 1.1;
  p = m + mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * d;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 3.4 * r);

  vec3 ink = vec3(0.039, 0.039, 0.039);
  vec3 moss = vec3(0.09, 0.16, 0.03);
  vec3 lime = vec3(0.773, 1.0, 0.2);

  float body = smoothstep(0.25, 0.85, f);
  float crest = smoothstep(0.62, 0.95, f * (0.75 + 0.5 * length(r)));
  vec3 col = mix(ink, moss, body);
  col = mix(col, lime, crest * 0.95);
  col += lime * fall * 0.08;

  // Keep the type corner (bottom-left) calm and dark for legibility.
  float calm = smoothstep(1.15, 0.1, length((uv - vec2(0.0, 0.0)) * vec2(1.2, 1.6)));
  col = mix(col, ink, calm * 0.72);
  // Vignette
  col *= 1.0 - 0.45 * pow(length(uv - 0.5) * 1.25, 2.2);
  // Grain
  col += (hash(gl_FragCoord.xy + fract(uTime) * 91.0) - 0.5) * 0.045;
  col = mix(ink, col, uIntro);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function ShaderField({ className, introOnReady = false }: { className?: string; introOnReady?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl", { antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uMouseAmt = gl.getUniformLocation(prog, "uMouseAmt");
    const uIntro = gl.getUniformLocation(prog, "uIntro");

    // Render below native resolution: the field is soft, this keeps it cheap.
    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.6;
    const resize = () => {
      const w = Math.floor(canvas.clientWidth * scale);
      const h = Math.floor(canvas.clientHeight * scale);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6, amt: 0, tamt: 0 };
    let moved = false;
    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - b.left) / b.width;
      mouse.ty = 1 - (e.clientY - b.top) / b.height;
      // First contact: start the swirl where the pointer is instead of sliding in from the default spot.
      if (!moved) {
        moved = true;
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.tamt = 1;
    };
    window.addEventListener("pointermove", onMove);

    const reduced = prefersReducedMotion();
    const intro = { v: reduced || !introOnReady ? 1 : 0 };
    let introTween: gsap.core.Tween | undefined;
    const offReady = introOnReady && !reduced
      ? onReady(() => {
          introTween = gsap.to(intro, { v: 1, duration: 3.2, ease: "power3.out" });
        })
      : () => {};

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    let last = start;
    // Exponential smoothing in real time, so the feel is identical at 60, 120 or 144 Hz.
    const ease = (rate: number, dt: number) => 1 - Math.exp(-rate * dt);
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visible || document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * ease(2.2, dt);
      mouse.y += (mouse.ty - mouse.y) * ease(2.2, dt);
      mouse.tamt *= Math.exp(-0.6 * dt);
      mouse.amt += (mouse.tamt - mouse.amt) * ease(1.6, dt);
      gl.uniform1f(uTime, 40 + (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseAmt, mouse.amt);
      gl.uniform1f(uIntro, intro.v);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (reduced) {
      gl.uniform1f(uTime, 40);
      gl.uniform2f(uMouse, 0.7, 0.6);
      gl.uniform1f(uMouseAmt, 0);
      gl.uniform1f(uIntro, 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(frame);
    }
    canvas.dataset.ready = "1";

    return () => {
      cancelAnimationFrame(raf);
      offReady();
      introTween?.kill();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [introOnReady]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
