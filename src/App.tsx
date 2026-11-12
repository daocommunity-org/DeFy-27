import { useEffect } from 'react'
import { Footer, Nav } from './components/Layout'
import { Mark27 } from './components/Marks'
import { Button } from './components/ui'
import { SiteMotion } from './lib/motion'
import { RouterProvider, useRouter, type Route } from './lib/router'
import Archive from './pages/Archive'
import Home from './pages/Home'
import Sponsor from './pages/Sponsor'

const SITE = 'https://defy27.vercel.app'
const META: Record<Route, { title: string; description: string; path: string }> = {
  '/': {
    title: "DeFy'27 · 24-hour Web3 & Blockchain Hackathon · VIT Chennai, 9–10 Jan 2027",
    description:
      "DeFy'27 is a free 24-hour Web3 and blockchain hackathon at VIT Chennai, 9–10 January 2027. Teams of 4–6 build a product and its business model and pitch for the Grand Prize. Registrations open on Unstop.",
    path: '/',
  },
  '/sponsor': {
    title: "Sponsor DeFy'27 · Reach India's next Web3 founders",
    description: "Sponsorship tiers, problem-statement bounties and audience numbers for DeFy'27, the 24-hour Web3 hackathon at VIT Chennai.",
    path: '/sponsor',
  },
  '/archive': {
    title: "Past editions · DeFy'27",
    description: 'DeFy by the numbers: 1,500+ team submissions, builders from IITs, NITs, BITS and 90+ engineering colleges, and the brands that backed it.',
    path: '/archive',
  },
  '404': { title: "Page not found · DeFy'27", description: 'This page does not exist.', path: '/' },
}

/** Keeps the head in step with the route for crawlers that run JS and for shares. */
function applyMeta(m: (typeof META)[Route]) {
  document.title = m.title
  const set = (sel: string, attr: string, v: string) => document.querySelector(sel)?.setAttribute(attr, v)
  set('meta[name="description"]', 'content', m.description)
  set('link[rel="canonical"]', 'href', SITE + m.path)
  set('meta[property="og:url"]', 'content', SITE + m.path)
  set('meta[property="og:title"]', 'content', m.title)
  set('meta[property="og:description"]', 'content', m.description)
}

function NotFound() {
  return (
    <section className="nf">
      <div className="wrap nf__in">
        <Mark27 className="nf__27" title="" />
        <h1 className="h1">This block was never mined.</h1>
        <p className="lede">The page you followed doesn&rsquo;t exist. Head back to the main chain.</p>
        <Button to="/" icon="right">
          Back to home
        </Button>
      </div>
    </section>
  )
}

function Pages() {
  const { route } = useRouter()
  useEffect(() => {
    applyMeta(META[route])
  }, [route])
  return (
    <main id="main" key={route} className="page" tabIndex={-1}>
      {route === '/' && <Home />}
      {route === '/sponsor' && <Sponsor />}
      {route === '/archive' && <Archive />}
      {route === '404' && <NotFound />}
    </main>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          const m = document.getElementById('main')
          m?.focus()
          m?.scrollIntoView()
        }}
      >
        Skip to content
      </a>
      <SiteMotion />
      <Nav />
      <Pages />
      <Footer />
    </RouterProvider>
  )
}
