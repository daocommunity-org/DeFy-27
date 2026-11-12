// Sponsorship offer. Source: DeFy'27 sponsorship deck, slides 05, 08, 09, 10.
// Amounts are in rupees. Each tier stacks on the one below it.

export type Tier = {
  id: 'basic' | 'plus' | 'pro' | 'title'
  name: string
  min: number
  perks: string[]
}

/** Ordered lowest → highest so stacking is a simple slice. */
export const TIERS: Tier[] = [
  {
    id: 'basic',
    name: 'Basic',
    min: 50_000,
    perks: ['Social media marketing', 'Brand mentions in event emails', 'Mentions at pre-DeFy events', 'Logo on event T-shirts', 'Stickers and swag'],
  },
  {
    id: 'plus',
    name: 'Plus',
    min: 75_000,
    perks: ['Recruitment mail after the event', 'Workshop segment', 'Sponsored challenge for participants'],
  },
  {
    id: 'pro',
    name: 'Pro',
    min: 150_000,
    perks: ['LinkedIn & GitHub profile access', 'Speaker session', 'Finalist judge seat', 'Feature in the event brochure'],
  },
  {
    id: 'title',
    name: 'Title',
    min: 250_000,
    perks: ['DeFy’27 co-hosted by you', 'Exclusive brand-specific pre-DeFy events', '2 exclusive problem statements'],
  },
]

export const BOUNTY = {
  min: 50_000,
  max: 80_000,
  perks: ['A dedicated problem statement', 'Brand association with the challenge', 'A custom challenge brief, built with you'],
}

export const AUDIENCE = [
  { value: 'Top 1%', label: 'Web3-savvy builders from VIT Chennai and India’s premier engineering colleges' },
  { value: '1,000+', label: 'Participants expected at DeFy’27, and growing' },
  { value: '25,000+', label: 'Engineering students reached, plus LinkedIn, X and Instagram' },
  { value: '40,000+', label: 'Students on the VIT Chennai campus' },
]

export const BENEFITS = [
  { key: 'Engage', icon: 'mic', head: 'A direct line to top Web3 talent', body: 'Mentor, judge and run sessions with India’s top 1% of blockchain developers.' },
  { key: 'Reach', icon: 'broadcast', head: '25,000+ students, one event', body: 'Brand presence across campuses, LinkedIn, X and Instagram, before, during and after.' },
  { key: 'Connect', icon: 'link', head: 'First look at 6 startups', body: 'Meet founding teams before they scale, to invest, partner or acquire.' },
  { key: 'Recruit', icon: 'user', head: 'Hire before anyone else', body: 'Early access to students skilled in blockchain, crypto and decentralized systems.' },
] as const

/** ₹2,50,000 → "₹2.5L", ₹75,000 → "₹75K" (deck style). */
export function inrShort(n: number): string {
  if (n >= 100_000) {
    const l = n / 100_000
    return `₹${Number.isInteger(l) ? l : l.toFixed(1).replace(/\.0$/, '')}L`
  }
  return `₹${Math.round(n / 1000)}K`
}
