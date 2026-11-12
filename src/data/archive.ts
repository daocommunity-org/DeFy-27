// Past editions. Source: DeFy'27 sponsorship deck, slides 02 and 03.

export const DEFY26 = {
  headline: { value: 1500, suffix: '+', label: 'Team submissions from across India' },
  // Participant-facing numbers only. Sponsorship totals and partner counts
  // live on the Sponsor page, where they matter.
  reach: { value: 200, suffix: 'K+', label: 'Social media reach across LinkedIn, X and Instagram' },
  rating: 4.0,
  institutions: ['IITs', 'NITs', 'BITS', 'VIT', 'SRM', 'MIT'],
  record: 'A sponsorship record in our campus’s 15-year history.',
  voices: [{ name: 'Siddharth Menon', org: 'WazirX', note: 'Industry voice in the room at DeFy’26' }],
}

export type PastProject = {
  edition: string
  team: string
  project: string
  award: string
  summary: string
  href?: string
}

// TODO(core): add winning builds here. The "Winning builds" section on the
// Past editions page stays hidden while this list is empty.
export const PAST_PROJECTS: PastProject[] = []

/** DeFy'26 photos (public/photos). `slot` places them in the gallery grid. */
export const DEFY26_PHOTOS = [
  { src: '/photos/defy26-stage.jpg', w: 1500, h: 2000, slot: 'tall', caption: 'Defy the limits: the opening on the main stage', alt: 'DeFy logo on the big lime screen behind the VIT Chennai podium at the DeFy’26 opening' },
  { src: '/photos/defy26-hacking.jpg', w: 2000, h: 1333, slot: 'wide', caption: 'Mentors at the tables through the night', alt: 'A mentor walking a team through their code on the DeFy’26 hacking floor, laptops and cables across the desks' },
  { src: '/photos/defy26-speakers.jpg', w: 2000, h: 1500, slot: 'a', caption: 'Industry speaker sessions', alt: 'An industry speaker and two hosts seated on stage under a DeFy speaker slide' },
  { src: '/photos/defy26-crew.jpg', w: 2000, h: 1333, slot: 'b', caption: 'The crew behind DeFy’26', alt: 'The DeFy’26 organising team in DeFy t-shirts posing together on the auditorium stage' },
] as const
