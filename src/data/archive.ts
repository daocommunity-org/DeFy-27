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
