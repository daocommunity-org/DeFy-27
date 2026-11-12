// Event facts. Source: DeFy'27 sponsorship deck (Nov 2026).
// Times are pinned to IST so the countdown is right in every timezone.

export const EVENT = {
  name: "DeFy'27",
  edition: '4th edition',
  tagline: 'Defy the ordinary',
  dates: '9–10 January 2027',
  datesShort: '9–10 Jan 2027',
  venue: 'M.G. Auditorium, VIT Chennai',
  city: 'VIT Chennai',
  format: '24-hour Web3 hackathon',
  /** Registrations on Unstop close at the end of this day (IST). */
  registrationCloses: new Date('2026-12-15T23:59:59+05:30').getTime(),
  registrationClosesLabel: '15 December 2026',
  registrationClosesShort: '15 Dec',
  // TODO(ops): confirm the hacking start and end hours.
  start: new Date('2027-01-09T09:00:00+05:30').getTime(),
  end: new Date('2027-01-10T20:00:00+05:30').getTime(),
}

export type Round = {
  id: string
  label: string
  when: string
  title: string
  body: string
  /** Phase window used to light up the live progress rail. */
  from: number
  to: number
}

export const ROUNDS: Round[] = [
  {
    id: 'r1',
    label: 'Round 1 · Online',
    when: 'December 2026',
    title: 'Ideation',
    body: 'Teams submit an idea and a proposed tech stack. The top 30 move on.',
    from: new Date('2026-12-01T00:00:00+05:30').getTime(),
    to: EVENT.start,
  },
  {
    id: 'r2',
    label: 'Round 2 · 9–10 Jan',
    when: '9–10 January',
    title: '24-hour hackathon',
    body: 'Teams build the prototype and the pitch deck. Judges pick the top 6.',
    from: EVENT.start,
    to: new Date('2027-01-10T14:00:00+05:30').getTime(),
  },
  {
    id: 'r3',
    label: 'Round 3 · 10 Jan',
    when: '10 January',
    title: 'Pitching finals',
    body: 'The top 6 pitch their prototype and business model for the Grand Prize.',
    from: new Date('2027-01-10T14:00:00+05:30').getTime(),
    to: EVENT.end,
  },
]

export const AGENDA = [
  { day: 'Sat 9 Jan', items: ['Inauguration', 'Speaker sessions', 'Hacking begins', 'Initial judging', 'Overnight hacking'] },
  { day: 'Sun 10 Jan', items: ['Final judging', 'Hacking ends', 'Pitching finals + winners'], highlight: 'Pitching finals + winners' },
]

export const PILLARS = [
  { title: 'Build', body: 'Working Web3 prototypes, not slideware.' },
  { title: 'Pitch', body: 'A business model and an investor-style pitch to a judging panel.' },
  { title: 'Launch', body: '6 finalist teams, ready for partnership or investment.' },
]

// PROVISIONAL: DeFy'26's tracks carried forward. Swap once Core confirms '27 tracks.
export const TRACKS = [
  { id: 'defi', title: 'DeFi', icon: 'coins', body: 'Lending, liquidity, derivatives, payments. Rewire how value moves on-chain.' },
  { id: 'public-goods', title: 'Public Goods', icon: 'globe', body: 'Infrastructure, identity, governance and access. The things everything else stands on.' },
  { id: 'open', title: 'Open Innovation', icon: 'spark', body: "No category and no ceiling. If it's on-chain and audacious, it belongs here." },
] as const

export const FAQS = [
  { q: 'When and where is DeFy’27?', a: 'The hackathon runs 9–10 January 2027 at M.G. Auditorium, VIT Chennai. Round 1 (ideation) happens online in December 2026.' },
  { q: 'How does selection work?', a: 'Teams submit an idea and a proposed tech stack in Round 1. The top 30 teams are invited to the 24-hour hackathon, and judges pick 6 finalists for the pitching round.' },
  { q: 'How big can my team be?', a: 'Teams of 4 to 6. Mix developers, designers and someone who can pitch the business: judges score both.' },
  { q: 'Is there an entry fee?', a: 'No. Registering and competing are both free.' },
  { q: 'What do finalists pitch?', a: 'Both the working prototype and the business behind it. Finalists present an investor-style pitch to the judging panel for the Grand Prize.' },
  { q: 'Are registrations open?', a: 'Yes, they’re open now on Unstop and close on 15 December 2026. Register your team there, then submit your idea and proposed tech stack in Round 1.' },
  { q: 'Is there a code of conduct?', a: 'Yes. DeFy’27 follows the MLH Code of Conduct. Every participant, mentor, judge and sponsor agrees to it when they take part.' },
  { q: 'Who organises DeFy?', a: 'The DAO Community and BIC, VIT Chennai’s entrepreneurship club. DeFy’27 is the 4th edition.' },
]
