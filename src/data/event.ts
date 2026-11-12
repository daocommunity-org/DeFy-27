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
  /** Selection: Round 1 shortlists this many teams to VIT Chennai; judges then
   *  pick this many finalists in EACH track, only from those shortlisted teams. */
  shortlisted: 30,
  finalistsPerTrack: 10,
  /** Registrations on Unstop close at the end of this day (IST). */
  registrationCloses: new Date('2026-12-15T23:59:59+05:30').getTime(),
  registrationClosesLabel: '15 December 2026',
  registrationClosesShort: '15 Dec',
  // TODO(ops): confirm the hacking start and end hours.
  start: new Date('2027-01-09T09:00:00+05:30').getTime(),
  end: new Date('2027-01-10T20:00:00+05:30').getTime(),
}

const EVENT_SHORTLISTED = EVENT.shortlisted
const EVENT_FINALISTS = EVENT.finalistsPerTrack

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
    body: `Every registered team submits an idea and a proposed tech stack online. Judges shortlist the top ${EVENT_SHORTLISTED} teams and invite them to VIT Chennai.`,
    from: new Date('2026-12-01T00:00:00+05:30').getTime(),
    to: EVENT.start,
  },
  {
    id: 'r2',
    label: 'Round 2 · 9–10 Jan',
    when: '9–10 January',
    title: '24-hour hackathon',
    body: `Only the ${EVENT_SHORTLISTED} shortlisted teams build here, on campus, for 24 hours. From them, judges pick ${EVENT_FINALISTS} finalists in each track.`,
    from: EVENT.start,
    to: new Date('2027-01-10T14:00:00+05:30').getTime(),
  },
  {
    id: 'r3',
    label: 'Round 3 · 10 Jan',
    when: '10 January',
    title: 'Pitching finals',
    body: `The ${EVENT_FINALISTS} finalists in each track pitch their prototype and business model for the Grand Prize.`,
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
  { title: 'Launch', body: `${EVENT_FINALISTS} finalists per track, ready for partnership or investment.` },
]

// PROVISIONAL: DeFy'26's tracks carried forward. Swap once Core confirms '27 tracks.
export const TRACKS = [
  { id: 'defi', title: 'DeFi', icon: 'coins', body: 'Lending, liquidity, derivatives, payments. Rewire how value moves on-chain.' },
  { id: 'public-goods', title: 'Public Goods', icon: 'globe', body: 'Infrastructure, identity, governance and access. The things everything else stands on.' },
  { id: 'open', title: 'Open Innovation', icon: 'spark', body: "No category and no ceiling. If it's on-chain and audacious, it belongs here." },
] as const

export const FAQS = [
  { q: 'When and where is DeFy’27?', a: 'The hackathon runs 9–10 January 2027 at M.G. Auditorium, VIT Chennai. Round 1 (ideation) happens online in December 2026.' },
  {
    q: 'How does selection work?',
    a: `Step by step. 1) Every registered team submits an idea and a proposed tech stack online in Round 1. 2) Judges shortlist the top ${EVENT_SHORTLISTED} teams and invite them to VIT Chennai. 3) Those shortlisted teams build for 24 hours at the hackathon. 4) From the shortlisted teams only, judges pick ${EVENT_FINALISTS} finalists in each track. 5) The finalists pitch for the Grand Prize. You cannot become a finalist without being shortlisted and taking part in the hackathon at VIT Chennai.`,
  },
  { q: 'How big can my team be?', a: 'Teams of 4 to 6. Mix developers, designers and someone who can pitch the business: judges score both.' },
  { q: 'Is there an entry fee?', a: 'No. Registering and competing are both free.' },
  { q: 'What do finalists pitch?', a: 'Both the working prototype and the business behind it. Finalists present an investor-style pitch to the judging panel for the Grand Prize.' },
  { q: 'Are registrations open?', a: 'Yes, they’re open now on Unstop and close on 15 December 2026. Register your team there, then submit your idea and proposed tech stack in Round 1.' },
  { q: 'Is there a code of conduct?', a: 'Yes. DeFy’27 follows the MLH Code of Conduct. Every participant, mentor, judge and sponsor agrees to it when they take part.' },
  { q: 'Who organises DeFy?', a: 'The DAO Community and BIC, VIT Chennai’s entrepreneurship club. DeFy’27 is the 4th edition.' },
]
