import { useEffect, useRef, useState } from 'react'

export function useReducedMotion() {
  const [reduce, setReduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

/** Wall-clock time, re-read every `ms`. Always derived from Date.now() so a
 *  backgrounded tab never drifts; resyncs the moment the tab is visible. */
export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const tick = () => setNow(Date.now())
    const id = window.setInterval(tick, ms)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [ms])
  return now
}

/** True once the element has scrolled into view (fires once). */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen] as const
}

/** Counts 0 → target once `start` is true. Renders the final value straight
 *  away when motion is reduced, so the number is never wrong at rest. */
export function useCountUp(target: number, start: boolean, duration = 1400) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(target)
  useEffect(() => {
    if (!start || reduce) {
      setV(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const step = (t: number) => {
      // rAF's timestamp can predate t0 by a frame; clamp so it never goes negative
      const p = Math.max(0, Math.min(1, (t - t0) / duration))
      const eased = 1 - Math.pow(1 - p, 4)
      setV(target * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    setV(0)
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration, reduce])
  return v
}
