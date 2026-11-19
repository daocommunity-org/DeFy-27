import Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from './hooks'
import { useRouter } from './router'

// One scroll loop for the whole site.
//  [data-speed="0.2"]   parallax: drifts against scroll by speed × distance
//                       from the viewport centre
//  [data-reveal]        gets .is-in once it enters (pixel pops, wipes)
//  [data-hscroll]       a tall pinned section; its --p (0→1) drives a
//                       horizontal track inside it
//  html --scroll-p      page progress, for the progress bar

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SiteMotion() {
  const { route } = useRouter()
  const reduce = useReducedMotion()

  // Smooth, inertial wheel scrolling for the whole site (Lenis). Touch keeps
  // native scrolling; reduced-motion users get plain scrolling.
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 })
    window.__lenis = lenis
    let id = 0
    const loop = (t: number) => {
      lenis.raf(t)
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      delete window.__lenis
    }
  }, [reduce])

  useEffect(() => {
    const root = document.documentElement
    const reveal = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (es) => {
              for (const e of es)
                if (e.isIntersecting) {
                  e.target.classList.add('is-in')
                  io?.unobserve(e.target)
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
          )
        : null
    reveal.forEach((el) => (io && !reduce ? io.observe(el) : el.classList.add('is-in')))

    const para = Array.from(document.querySelectorAll<HTMLElement>('[data-speed]'))
    const pins = Array.from(document.querySelectorAll<HTMLElement>('[data-hscroll]'))
    // A pinned horizontal section only pins when its track really overflows
    // the viewport by a meaningful amount; otherwise it lays out as a grid.
    const measure = () => {
      // Decide phone vs desktop BEFORE touching layout: un-pinning the track
      // briefly makes it very wide, and mobile browsers widen the viewport to
      // fit overflow, so innerWidth can't be trusted mid-measure.
      const vw = document.documentElement.clientWidth
      const small = reduce || matchMedia('(max-width: 860px)').matches
      for (const el of pins) {
        const track = el.querySelector<HTMLElement>('[data-htrack]')
        if (small || !track) {
          el.classList.remove('is-pinned')
          el.classList.add('is-static')
          el.style.height = ''
          continue
        }
        el.classList.remove('is-pinned', 'is-static')
        el.style.height = ''
        const shift = track.scrollWidth - vw
        if (shift > 160) {
          el.classList.add('is-pinned')
          el.style.setProperty('--shift', String(shift))
          el.style.height = `${window.innerHeight + shift}px`
        } else el.classList.add('is-static')
      }
    }
    measure()
    let raf = 0
    // Progress bar: write the transform straight onto the bar. (A CSS var on
    // <html> would restyle the entire page every frame.)
    const bar = document.querySelector<HTMLElement>('.sprog span')
    const speeds = para.map((el) => Number(el.dataset.speed))
    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      const max = root.scrollHeight - vh
      // 1) read everything first…
      const progress = max > 0 ? window.scrollY / max : 0
      const paraRects = reduce ? [] : para.map((el) => (el.parentElement ?? el).getBoundingClientRect())
      const pinRects = pins.map((el) => el.getBoundingClientRect())
      // 2) …then write, so the browser lays out once per frame, not per element.
      if (bar) bar.style.transform = `scaleX(${progress.toFixed(4)})`
      paraRects.forEach((r, i) => {
        if (r.bottom < -200 || r.top > vh + 200) return
        const d = r.top + r.height / 2 - vh / 2
        para[i].style.transform = `translate3d(0, ${(-d * speeds[i]).toFixed(1)}px, 0)`
      })
      pinRects.forEach((r, i) => {
        const span = r.height - vh
        const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
        pins[i].style.setProperty('--p', p.toFixed(4))
      })
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onResize = () => {
      measure()
      on()
    }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(onResize)
    return () => {
      io?.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', onResize)
    }
  }, [route, reduce])

  return (
    <div className="sprog" aria-hidden="true">
      <span />
    </div>
  )
}
