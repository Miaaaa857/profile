import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './Ferrofluid.css'

const MAX_COLORS = 8
const DEFAULT_COLORS = ['#ff4b2b', '#ff7a3c', '#ffffff']

const hexToRGB = (hex) => {
  const value = hex.replace('#', '').padEnd(6, '0')
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255)
}

const prepColors = (input) => {
  const colors = (input?.length ? input : DEFAULT_COLORS).slice(0, MAX_COLORS)
  const values = Array.from({ length: MAX_COLORS }, (_, index) => hexToRGB(colors[Math.min(index, colors.length - 1)]))
  return { values, count: colors.length }
}

const flowVector = (direction) => ({ up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0] }[direction] || [0, -1])

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = `
precision highp float;
uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec3 uColor0; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
uniform vec3 uColor4; uniform vec3 uColor5; uniform vec3 uColor6; uniform vec3 uColor7;
uniform int uColorCount;
uniform vec2 uFlow;
uniform float uSpeed; uniform float uScale; uniform float uTurbulence; uniform float uFluidity;
uniform float uRimWidth; uniform float uSharpness; uniform float uShimmer; uniform float uGlow;
uniform float uOpacity; uniform float uMouseEnabled; uniform float uMouseStrength; uniform float uMouseRadius;
varying vec2 vUv;
#define PI 3.14159265

vec3 palette(float h) {
  int count = uColorCount; if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0; if (idx == 1) return uColor1; if (idx == 2) return uColor2;
  if (idx == 3) return uColor3; if (idx == 4) return uColor4; if (idx == 5) return uColor5;
  if (idx == 6) return uColor6; return uColor7;
}
float hash(vec3 p) { p = fract(p * .1031); p += dot(p, p.zyx + 33.33); return fract((p.x + p.y) * p.z); }
float smin(float a, float b, float k) { float r = exp2(-a / k) + exp2(-b / k); return -k * log2(r); }
float sinlerp(float a, float b, float w) { return mix(a, b, (sin(w * PI - PI / 2.0) + 1.0) / 2.0); }
float vn(vec2 p, float s, float seed) {
  vec2 cell = floor(p / s); vec2 rel = mod(p, s);
  float g1 = hash(vec3(cell, seed)); float g2 = hash(vec3(cell.x + 1.0, cell.y, seed));
  float g3 = hash(vec3(cell.x + 1.0, cell.y + 1.0, seed)); float g4 = hash(vec3(cell.x, cell.y + 1.0, seed));
  return sinlerp(sinlerp(g1, g2, rel.x / s), sinlerp(g4, g3, rel.x / s), rel.y / s);
}
float dbn(vec2 p, float s, float seed) {
  float o = s / 2.0;
  return (2.0 * vn(p, s, seed) + 1.5 * vn(p + vec2(o), s, seed + .1) +
    1.25 * vn(p + vec2(-o, o), s, seed + .2) + 1.125 * vn(p + vec2(o, -o), s, seed + .3) +
    vn(p - vec2(o), s, seed + .4)) / 7.0;
}
void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  float ref = 700.0 / max(uScale, .05); vec2 p = fragCoord / iResolution.y * ref;
  float spd = 200.0 * uSpeed; vec2 dir = uFlow; vec2 perp = vec2(-dir.y, dir.x);
  float d1 = vn(p + perp * (iTime * spd), 60.0, 10.0) * 50.0 * uTurbulence;
  float d2 = vn(p - perp * (iTime * spd), 120.0, 15.0) * 100.0 * uTurbulence;
  float peaks = dbn(p + d1 + dir * (iTime * spd * .5), 40.0, 1.0);
  float peaks2 = dbn(p + d2 - dir * (iTime * spd * .5), 40.0, 0.0);
  float merged = smin(peaks, peaks2, max(uFluidity, .001));
  float mouseGlow = 0.0;
  if (uMouseEnabled > .5) {
    vec2 mp = iMouse / iResolution.y * ref; float md = length(p - mp) / ref;
    mouseGlow = exp(-md * md / (max(uMouseRadius, .02) * max(uMouseRadius, .02))) * uMouseStrength;
  }
  float band = (uRimWidth - abs((merged - .4) * 2.0)) * 5.0;
  float light = clamp(band - vn(p + dir * (iTime * spd * .5), 60.0, 12.0) * uShimmer, 0.0, 1.0);
  light = pow(light, uSharpness) * uGlow * clamp(1.0 - mouseGlow, 0.0, 1.0);
  vec3 outputColor = palette(clamp(.5 + (peaks - peaks2) * .8, 0.0, 1.0)) * light;
  float alpha = clamp(max(outputColor.r, max(outputColor.g, outputColor.b)), 0.0, 1.0);
  gl_FragColor = vec4(outputColor, alpha * uOpacity);
}
`

export default function Ferrofluid({
  className = '', colors = DEFAULT_COLORS, backgroundColor = '#0d0d0c', speed = 0.3, scale = 1,
  turbulence = 1, fluidity = 0.1, rimWidth = 0.2, sharpness = 3, shimmer = 1, glow = 1.4,
  flowDirection = 'down', opacity = 1, mouseInteraction = true, mouseStrength = 1,
  mouseRadius = 0.3, mouseDampening = 0.15, dpr, paused = false
}) {
  const containerRef = useRef(null)
  const colorsKey = colors.join('|')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    const renderer = new Renderer({ dpr: dpr ?? Math.min(window.devicePixelRatio || 1, 2), alpha: true, antialias: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    container.appendChild(gl.canvas)
    const { values, count } = prepColors(colorsKey.split('|'))
    const uniforms = {
      iResolution: { value: [1, 1, 1] }, iMouse: { value: [0, 0] }, iTime: { value: 0 },
      ...Object.fromEntries(values.map((value, index) => [`uColor${index}`, { value }])),
      uColorCount: { value: count }, uFlow: { value: flowVector(flowDirection) }, uSpeed: { value: speed },
      uScale: { value: scale }, uTurbulence: { value: turbulence }, uFluidity: { value: fluidity },
      uRimWidth: { value: rimWidth }, uSharpness: { value: sharpness }, uShimmer: { value: shimmer },
      uGlow: { value: glow }, uOpacity: { value: opacity }, uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
      uMouseStrength: { value: mouseStrength }, uMouseRadius: { value: mouseRadius }
    }
    const program = new Program(gl, { vertex, fragment, uniforms })
    const geometry = new Triangle(gl)
    const mesh = new Mesh(gl, { geometry, program })
    let frame
    let lastTime = 0
    let target = [0, 0]

    const resize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1))
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1]
    }
    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect()
      const ratio = renderer.dpr || 1
      target = [(event.clientX - rect.left) * ratio, (rect.height - event.clientY + rect.top) * ratio]
    }
    const render = (time) => {
      frame = requestAnimationFrame(render)
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!paused && !reduceMotion) uniforms.iTime.value = time * 0.001
      const dt = lastTime ? (time - lastTime) / 1000 : 0
      lastTime = time
      const factor = mouseDampening <= 0 ? 1 : 1 - Math.exp(-dt / Math.max(mouseDampening, .0001))
      uniforms.iMouse.value[0] += (target[0] - uniforms.iMouse.value[0]) * factor
      uniforms.iMouse.value[1] += (target[1] - uniforms.iMouse.value[1]) * factor
      renderer.render({ scene: mesh })
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    if (mouseInteraction) window.addEventListener('pointermove', onPointerMove, { passive: true })
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas)
    }
  }, [colorsKey, dpr, paused, speed, scale, turbulence, fluidity, rimWidth, sharpness, shimmer, glow, flowDirection, opacity, mouseInteraction, mouseStrength, mouseRadius, mouseDampening])

  return <div ref={containerRef} className={`ferrofluid-container ${className}`} style={{ backgroundColor }} />
}
