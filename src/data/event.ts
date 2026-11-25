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
  /** Round 1 (idea submission) window, as set on Unstop. */
  submissionsOpen: new Date('2026-11-11T23:59:00+05:30').getTime(),
  submissionsClose: new Date('2026-12-15T23:59:00+05:30').getTime(),
  submissionsCloseLabel: '15 December 2026, 11:59 PM IST',
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
    when: '11 Nov – 15 Dec',
    title: 'Idea submission',
    body: `Every registered team answers the Round 1 questions on Unstop. Judges shortlist the top ${EVENT_SHORTLISTED} teams and invite them to VIT Chennai.`,
    from: EVENT.submissionsOpen,
    to: EVENT.submissionsClose,
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
    label: 'Round 2 · finals',
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

/** What a Round 1 submission must cover, as published on Unstop. `help` is our plain-words hint. */
export const QUESTIONS = [
  { q: 'What problem are you solving?', help: 'Name who has the problem, how they cope with it today and why that falls short.' },
  { q: 'What is your solution?', help: 'Say what you will build and how someone would use it.' },
  { q: 'How does it fit your track?', help: 'Name one track and explain why your idea belongs there.' },
  { q: 'How does Web3 contribute to it?', help: 'Say what goes on-chain and what would be lost without it.' },
  { q: 'What is its business value and real-world impact?', help: 'Say who pays or benefits, and how it keeps running and grows after the hackathon.' },
]

/** The scored parameters set on the Unstop round. */
export const CRITERIA = ['Innovation and originality', 'Technical complexity', 'Feasibility', 'Real-world impact', 'Scalability and sustainability']

export const RULES = [
  { k: 'Web3', v: 'All projects must be Web3-based. The organisers may make an exception for an exceptionally strong project, case by case.' },
  { k: 'Team', v: 'Teams have 4 to 6 members. Every member joins the team on Unstop and completes registration.' },
  { k: 'Track', v: 'Pick one of the three tracks and find your own problem statement within it.' },
  { k: 'Qualifying', v: 'Only teams that qualify in Round 1 are invited to Round 2, which is the final round.' },
  { k: 'In person', v: 'Round 2 is offline at VIT Chennai. Shortlisted teams must RSVP and attend.' },
  { k: 'Same project', v: 'In Round 2 you build the project you proposed in Round 1, in the same track.' },
  { k: 'Conduct', v: 'Everyone taking part follows the MLH Code of Conduct.' },
]

export const FAQS = [
  { q: 'I’ve registered. What do I do now?', a: `Check that all your teammates have joined on Unstop, pick a track, then answer the Round 1 questions there. Submit by ${EVENT.submissionsCloseLabel}. Registering alone doesn’t enter you into shortlisting.` },
  { q: 'Is Round 1 online or offline?', a: 'Online. It is running now on Unstop, so you don’t need to travel for it. Only Round 2, the final round, is held in person at VIT Chennai.' },
  { q: 'Does my project have to be Web3?', a: 'Yes, all projects must be Web3-based. The organisers may make an exception for an exceptionally strong project, but that is decided case by case.' },
  { q: 'What will I be asked in Round 1?', a: 'Your submission must cover five things: the problem, your solution, how it fits your track, how Web3 contributes, and its business value and real-world impact.' },
  { q: 'Do I need a working prototype for Round 1?', a: 'No. Round 1 is an idea submission. You build the working solution in Round 2, at the 24-hour hackathon.' },
  { q: 'Is there a given problem statement?', a: 'You choose one of the three tracks (DeFi, Public Goods or Open Innovation) and identify your own problem statement within it.' },
  { q: 'How is Round 1 judged?', a: `On ${CRITERIA.map((c) => c.toLowerCase()).join(', ')}.` },
  {
    q: 'How does selection work?',
    a: `Judges shortlist the top ${EVENT_SHORTLISTED} teams from Round 1. Those teams RSVP and build for 24 hours at VIT Chennai in Round 2. From those teams only, judges pick ${EVENT_FINALISTS} finalists in each track, who pitch for the Grand Prize. You can’t reach the finals without being shortlisted and attending.`,
  },
  { q: 'What happens if we’re shortlisted?', a: 'You’ll be notified, and your team then completes the RSVP to confirm it will attend Round 2 in person.' },
  { q: 'Can we change our idea after Round 1?', a: 'No. The project you build in Round 2 must match your Round 1 submission and the track you chose.' },
  { q: 'Who can take part?', a: 'Undergraduate and postgraduate students, including engineering, management, arts, commerce, sciences, law and medical.' },
  { q: 'How big can my team be?', a: 'Teams of 4 to 6. Mix developers, designers and someone who can pitch the business: judges score both.' },
  { q: 'Is there an entry fee?', a: 'No. Registering and competing are both free.' },
  { q: 'When and where is DeFy’27?', a: `Round 1 is online until ${EVENT.submissionsCloseLabel}. Round 2 runs 9–10 January 2027 at M.G. Auditorium, VIT Chennai. Dates are tentative: any change will be announced on Unstop.` },
  { q: 'What do finalists pitch?', a: 'Both the working prototype and the business behind it. Finalists present an investor-style pitch to the judging panel for the Grand Prize.' },
  { q: 'Is there a code of conduct?', a: 'Yes. DeFy’27 follows the MLH Code of Conduct. Every participant, mentor, judge and sponsor agrees to it when they take part.' },
  { q: 'Who organises DeFy?', a: 'The DAO Community and BIC, VIT Chennai’s entrepreneurship club. DeFy’27 is the 4th edition.' },
]

/** Confirmed speakers, judges and mentors. Empty slots on the homepage show
 *  "Revealing soon" until there are four people here. */
export type Person = { name: string; role: string; kind: 'Guest speaker' | 'Speaker' | 'Judge' | 'Mentor'; org: string; orgLogo?: string; session?: string }
export const PEOPLE: Person[] = []
