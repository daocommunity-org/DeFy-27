import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'

// The DeFy'27 visual language: everything is built from blocks.
// · GlyphField — a live mosaic of symbol cells (◎ ✕ □ ⌗ + · /) with solid
//   lime blocks, driven by a slow noise field and lit up by the pointer.
// · PixelCluster — a block shape drawn from a tiny bitmap, cells pop in.
// · DotMatrix — the 4×4 dot clusters from the reference posters.

/* ── value noise ─────────────────────────────────────────────────── */

function hash(x: number, y: number) {
  let h = (x * 374761393 + y * 668265263) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}
const smooth = (t: number) => t * t * (3 - 2 * t)
function noise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = smooth(x - xi)
  const yf = smooth(y - yi)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf
}

type Glyph = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // empty · / + x □ ◎ ⌗ ■

function drawGlyph(ctx: CanvasRenderingContext2D, g: Glyph, x: number, y: number, s: number) {
  const c = s / 2
  const r = s * 0.34
  const cx = x + c
  const cy = y + c
  switch (g) {
    case 1: // dot
      ctx.fillRect(cx - 1, cy - 1, 2, 2)
      break
    case 2: // slash
      ctx.beginPath()
      ctx.moveTo(cx - r * 0.6, cy - r * 0.6)
      ctx.lineTo(cx + r * 0.6, cy + r * 0.6)
      ctx.stroke()
      break
    case 3: // plus
      ctx.beginPath()
      ctx.moveTo(cx - r * 0.7, cy)
      ctx.lineTo(cx + r * 0.7, cy)
      ctx.moveTo(cx, cy - r * 0.7)
      ctx.lineTo(cx, cy + r * 0.7)
      ctx.stroke()
      break
    case 4: // cross
      ctx.save()
      ctx.lineWidth *= 1.9
      ctx.beginPath()
      ctx.moveTo(cx - r, cy - r)
      ctx.lineTo(cx + r, cy + r)
      ctx.moveTo(cx + r, cy - r)
      ctx.lineTo(cx - r, cy + r)
      ctx.stroke()
      ctx.restore()
      break
    case 5: // square ring
      ctx.strokeRect(cx - r, cy - r, r * 2, r * 2)
      ctx.fillRect(cx - r * 0.35, cy - r * 0.35, r * 0.7, r * 0.7)
      break
    case 6: // target
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2)
      ctx.stroke()
      break
    case 7: // quad
      for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
        ctx.fillRect(cx + dx * r * 0.55 - r * 0.42, cy + dy * r * 0.55 - r * 0.42, r * 0.84, r * 0.84)
      break
    case 8: // solid block
      ctx.fillRect(x, y, s + 0.5, s + 0.5)
      break
  }
}

export function GlyphField({ cell = 26, className = '', color = '#a3f552', density = 1, solids = true }: { cell?: number; className?: string; color?: string; density?: number; solids?: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext('2d')
    const host = cv?.parentElement
    if (!cv || !ctx || !host) return
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let visible = true
    const ptr = { x: -1e4, y: -1e4 }
    const seed = Math.random() * 100

    const size = () => {
      const r = host.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      cv.style.width = `${w}px`
      cv.style.height = `${h}px`
    }

    const frame = (t: number) => {
      // ~20fps is plenty for a slow field and keeps it light
      if (t - last < 48 && !reduce) {
        raf = requestAnimationFrame(frame)
        return
      }
      last = t
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      ctx.strokeStyle = color
      ctx.lineWidth = 1.4
      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)
      const s = reduce ? 0 : t / 9000
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // two octaves: big regions + local texture
          const n = noise(i * 0.09 + seed + s, j * 0.09 - s * 0.6) * 0.75 + noise(i * 0.31 - s, j * 0.31 + seed) * 0.25
          const x = i * cell
          const y = j * cell
          const dx = x + cell / 2 - ptr.x
          const dy = y + cell / 2 - ptr.y
          const near = Math.max(0, 1 - Math.hypot(dx, dy) / 150)
          const v = n * density + near * 0.35
          let g: Glyph = 0
          if (v > 0.84) g = solids ? 8 : 5
          else if (v > 0.7) g = ([5, 6, 7, 4] as Glyph[])[(hash(i, j) * 4) | 0]
          else if (v > 0.6) g = ([6, 5, 4] as Glyph[])[(hash(j, i) * 3) | 0]
          else if (v > 0.52) g = ([3, 4, 2] as Glyph[])[(hash(i + 7, j) * 3) | 0]
          else if (v > 0.45) g = hash(i, j + 3) > 0.5 ? 2 : 1
          else if (v > 0.38 && hash(i + 1, j) > 0.6) g = 1
          if (!g) continue
          ctx.globalAlpha = g === 8 ? 1 : 0.55 + near * 0.45
          drawGlyph(ctx, g, x, y, cell)
        }
      }
      ctx.globalAlpha = 1
      if (!reduce && visible) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }
    size()
    start()
    const ro = new ResizeObserver(() => {
      size()
      start()
    })
    ro.observe(host)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    io.observe(host)
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      ptr.x = e.clientX - r.left
      ptr.y = e.clientY - r.top
    }
    const out = () => {
      ptr.x = -1e4
      ptr.y = -1e4
    }
    const section = host.closest('section') ?? host
    section.addEventListener('pointermove', move as EventListener, { passive: true })
    section.addEventListener('pointerleave', out)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      section.removeEventListener('pointermove', move as EventListener)
      section.removeEventListener('pointerleave', out)
    }
  }, [cell, color, density, solids, reduce])

  return <canvas ref={ref} className={`glyphfield ${className}`} aria-hidden="true" />
}

/** A block shape from a bitmap ('#' = cell). Cells pop in when the cluster
 *  scrolls into view (CSS, via [data-reveal]). */
export function PixelCluster({ map, className = '', tone = 'lime' }: { map: string[]; className?: string; tone?: 'lime' | 'violet' | 'ink' }) {
  const rows = map.length
  const cols = Math.max(...map.map((r) => r.length))
  const cells: { x: number; y: number; k: number }[] = []
  map.forEach((r, y) =>
    [...r].forEach((ch, x) => {
      if (ch === '#') cells.push({ x, y, k: (x * 7 + y * 13) % 9 })
    }),
  )
  return (
    <svg className={`pix pix--${tone} ${className}`} viewBox={`0 0 ${cols} ${rows}`} aria-hidden="true" data-reveal>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="1.02" height="1.02" style={{ ['--k' as string]: c.k }} />
      ))}
    </svg>
  )
}

/** 4×4-ish dot cluster from the reference posters. */
export function DotMatrix({ pattern = ['####', '#.##', '##.#', '.###'], className = '' }: { pattern?: string[]; className?: string }) {
  const rows = pattern.length
  const cols = Math.max(...pattern.map((r) => r.length))
  return (
    <svg className={`dots ${className}`} viewBox={`0 0 ${cols * 10} ${rows * 10}`} aria-hidden="true">
      {pattern.flatMap((r, y) => [...r].map((ch, x) => (ch === '#' ? <circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="3.9" /> : null)))}
    </svg>
  )
}
