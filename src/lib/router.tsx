import { createContext, useCallback, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'

// A ~60-line router: three static pages don't need a dependency.
// Path mode (default) gives real URLs: /, /sponsor, /archive (+ #section).
// Hash mode (#sponsor) exists only for the single-file preview build.
declare const __HASH_ROUTER__: boolean
const HASH_MODE = typeof __HASH_ROUTER__ !== 'undefined' && __HASH_ROUTER__

export type Route = '/' | '/sponsor' | '/archive' | '404'
const KNOWN: Route[] = ['/', '/sponsor', '/archive']

function readRoute(): Route {
  const raw = HASH_MODE ? '/' + location.hash.replace(/^#/, '') : location.pathname.replace(/\/+$/, '') || '/'
  const r = (raw === '/' || raw === '' ? '/' : raw) as Route
  if (HASH_MODE && !KNOWN.includes(r)) return '/'
  return KNOWN.includes(r) ? r : '404'
}

type Ctx = { route: Route; go: (to: string) => void }
const RouterCtx = createContext<Ctx>({ route: '/', go: () => {} })

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  // Glide via the smooth scroller when it's running. Lenis already honours
  // the CSS scroll-padding-top (nav height + 12px), so no extra offset.
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2 })
  else el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    const on = () => setRoute(readRoute())
    window.addEventListener(HASH_MODE ? 'hashchange' : 'popstate', on)
    return () => window.removeEventListener(HASH_MODE ? 'hashchange' : 'popstate', on)
  }, [])

  // Land on a deep link like /#guide: jump straight there, then re-align when
  // fonts and the page finish loading (both change the height of what's above),
  // unless the visitor has started moving around by then.
  useEffect(() => {
    if (HASH_MODE || !location.hash) return
    const id = location.hash.slice(1)
    let live = true
    const jump = () => {
      const el = live ? document.getElementById(id) : null
      if (!el) return
      const lenis = window.__lenis
      if (lenis) {
        lenis.resize()
        lenis.scrollTo(el, { immediate: true, force: true })
      } else el.scrollIntoView({ behavior: 'instant' })
    }
    const stop = () => (live = false)
    const input = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    input.forEach((e) => window.addEventListener(e, stop, { passive: true }))
    const first = window.setTimeout(jump, 0)
    document.fonts?.ready.then(jump)
    window.addEventListener('load', jump)
    const last = window.setTimeout(() => {
      jump()
      stop()
    }, 1500)
    return () => {
      stop()
      window.clearTimeout(first)
      window.clearTimeout(last)
      window.removeEventListener('load', jump)
      input.forEach((e) => window.removeEventListener(e, stop))
    }
  }, [])

  const go = useCallback((to: string) => {
    const [path, id] = to.split('#') as [string, string | undefined]
    const target = (path || '/') as Route
    const changing = target !== readRoute()
    if (HASH_MODE) {
      if (changing) location.hash = target === '/' ? '' : target.slice(1)
    } else {
      history.pushState(null, '', to)
    }
    setRoute(KNOWN.includes(target) ? target : '404')
    if (id) requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)))
    else if (changing) {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    }
  }, [])

  return <RouterCtx.Provider value={{ route, go }}>{children}</RouterCtx.Provider>
}

export const useRouter = () => useContext(RouterCtx)

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { go } = useRouter()
  const [path, id] = to.split('#')
  const href = HASH_MODE ? (id ? `#${id}` : path === '/' ? '#' : `#${path.slice(1)}`) : to
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    go(to)
  }
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
