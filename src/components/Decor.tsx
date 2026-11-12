import { useEffect, useState } from 'react'
import { useInView, useReducedMotion } from '../lib/hooks'

// Decorative motifs lifted from the deck: honeycomb, node graph, cube stack,
// terminal prompt. All aria-hidden, all drawn in currentColor/tokens.

const hexPts = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')

/** Honeycomb that fades in from the left, one cell lit (deck slide 02). */
export function HexField({ cols = 10, rows = 4, lit = [6, 1] }: { cols?: number; rows?: number; lit?: [number, number] }) {
  const r = 18
  const w = Math.sqrt(3) * r
  const cells = []
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const cx = w / 2 + x * w + (y % 2 ? w / 2 : 0)
      const cy = r + y * r * 1.5
      const isLit = x === lit[0] && y === lit[1]
      cells.push(
        <polygon
          key={`${x}-${y}`}
          points={hexPts(cx, cy, r - 1.5)}
          className={isLit ? 'hex hex--lit' : 'hex'}
          style={{ opacity: isLit ? 1 : Math.max(0.08, (x / cols) * 0.9) }}
        />,
      )
    }
  return (
    <svg className="decor hexfield" viewBox={`0 0 ${cols * w + w / 2} ${rows * r * 1.5 + r / 2}`} aria-hidden="true">
      {cells}
    </svg>
  )
}

/** Six hex nodes on dashed links, with packets travelling along them. */
export function NodeGraph() {
  const N = [
    [40, 110], [150, 50], [150, 170], [270, 110], [360, 50], [360, 170],
  ] as const
  const E = [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [3, 5]] as const
  return (
    <svg className="decor nodegraph" viewBox="0 0 400 220" aria-hidden="true">
      {E.map(([a, b], i) => (
        <g key={i}>
          <line x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} className="ng-edge" />
          <circle r="2.6" className="ng-packet" style={{ offsetPath: `path('M${N[a][0]} ${N[a][1]} L${N[b][0]} ${N[b][1]}')`, animationDelay: `${i * 0.7}s` }} />
        </g>
      ))}
      {N.map(([x, y], i) => (
        <g key={i} className={i === 3 ? 'ng-node ng-node--hub' : 'ng-node'}>
          <polygon points={hexPts(x, y, 20)} />
          <circle cx={x} cy={y} r="3.5" />
        </g>
      ))}
    </svg>
  )
}

/** Isometric cube stack (deck slide 08). */
export function Cubes() {
  const cube = (x: number, y: number, s: number, k: number) => {
    const h = s * 0.58
    return (
      <g key={k} className="cube" style={{ animationDelay: `${k * 0.4}s` }}>
        <polygon points={`${x},${y} ${x + s},${y + h} ${x},${y + 2 * h} ${x - s},${y + h}`} className="cube__top" />
        <polygon points={`${x - s},${y + h} ${x},${y + 2 * h} ${x},${y + 2 * h + s * 1.1} ${x - s},${y + h + s * 1.1}`} className="cube__side" />
        <polygon points={`${x + s},${y + h} ${x},${y + 2 * h} ${x},${y + 2 * h + s * 1.1} ${x + s},${y + h + s * 1.1}`} className="cube__side cube__side--r" />
      </g>
    )
  }
  return (
    <svg className="decor cubes" viewBox="0 0 200 190" aria-hidden="true">
      {cube(100, 8, 44, 0)}
      {cube(52, 84, 44, 1)}
      {cube(148, 84, 44, 2)}
    </svg>
  )
}

/** Types a line once, like the deck's `> broadcast(...)` prompt. */
export function TerminalLine({ text }: { text: string }) {
  const reduce = useReducedMotion()
  const [ref, seen] = useInView<HTMLParagraphElement>(0.6)
  const [n, setN] = useState(text.length)
  useEffect(() => {
    if (!seen || reduce) return
    setN(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setN(i)
      if (i >= text.length) window.clearInterval(id)
    }, 38)
    return () => window.clearInterval(id)
  }, [seen, reduce, text])
  return (
    <p ref={ref} className="term" aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, n)}
        <span className="term__caret">_</span>
      </span>
    </p>
  )
}

