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
  if (el) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    const on = () => setRoute(readRoute())
    window.addEventListener(HASH_MODE ? 'hashchange' : 'popstate', on)
    return () => window.removeEventListener(HASH_MODE ? 'hashchange' : 'popstate', on)
  }, [])

  // Land on a deep link like /sponsor#tiers.
  useEffect(() => {
    if (!HASH_MODE && location.hash) requestAnimationFrame(() => scrollToId(location.hash.slice(1)))
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
    else if (changing) window.scrollTo(0, 0)
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
