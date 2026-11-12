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

export function SiteMotion() {
  const { route } = useRouter()
  const reduce = useReducedMotion()

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
      for (const el of pins) {
        const track = el.querySelector<HTMLElement>('[data-htrack]')
        el.classList.remove('is-pinned', 'is-static')
        el.style.height = ''
        if (!track) continue
        const shift = track.scrollWidth - window.innerWidth
        if (!reduce && window.innerWidth > 860 && shift > 160) {
          el.classList.add('is-pinned')
          el.style.setProperty('--shift', String(shift))
          el.style.height = `${window.innerHeight + shift}px`
        } else el.classList.add('is-static')
      }
    }
    measure()
    let raf = 0
    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      const max = root.scrollHeight - vh
      root.style.setProperty('--scroll-p', String(max > 0 ? window.scrollY / max : 0))
      if (!reduce)
        for (const el of para) {
          const r = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect()
          if (r.bottom < -200 || r.top > vh + 200) continue
          const d = r.top + r.height / 2 - vh / 2
          el.style.setProperty('--py', `${(-d * Number(el.dataset.speed)).toFixed(1)}px`)
        }
      for (const el of pins) {
        const r = el.getBoundingClientRect()
        const span = r.height - vh
        const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
        el.style.setProperty('--p', p.toFixed(4))
      }
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
