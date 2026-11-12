import { Countdown } from '../components/Countdown'
import { Icon } from '../components/Icon'
import { DefyWordmark, Mark27 } from '../components/Marks'
import { Gallery } from '../components/Gallery'
import { DotMatrix, GlyphField, PixelCluster } from '../components/Pixel'
import { Accordion, CountUp, Frame, RegisterButton, SectionHead, Stars } from '../components/ui'
import { LINKS } from '../config/links'
import { DEFY26 } from '../data/archive'
import { AGENDA, EVENT, FAQS, PILLARS, ROUNDS, TRACKS } from '../data/event'
import { ALL_BRANDS, COMMUNITY, CURRENT_SPONSORS, ORGANIZERS, type CurrentSponsor } from '../data/sponsors'
import { AUDIENCE } from '../data/sponsorship'
import { useNow } from '../lib/hooks'
import { Link } from '../lib/router'

/* bitmaps for the block shapes ('#' = one cell) */
const BLK_A = ['..######', '..######', '######..', '######..', '##..####', '##..####', '########']
const BLK_B = ['##..', '####', '..##', '####']
const BLK_D = ['####....', '####....', '########', '..######', '....####']

/* ── hero ─────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__art" aria-hidden="true">
        <div className="hero__field" data-speed="-0.1">
          <GlyphField cell={26} solids={false} />
        </div>
        <div className="hero__blk hero__blk--a" data-speed="0.16">
          <PixelCluster map={BLK_A} />
        </div>
        <div className="hero__blk hero__blk--b" data-speed="0.3">
          <PixelCluster map={BLK_B} tone="violet" />
        </div>
        <div className="hero__blk hero__blk--c" data-speed="0.06">
          <DotMatrix />
        </div>
      </div>

      <div className="wrap hero__in">
        <p className="hero__status">
          <span className="live" aria-hidden="true" />
          <span>Registrations open</span>
          <span className="hero__dim">Closes {EVENT.registrationClosesShort}</span>
        </p>
        <h1 className="hero__mark">
          <DefyWordmark className="hero__defy" title="" />
          <Mark27 className="hero__27" title="" />
          <span className="sr">DeFy&rsquo;27: 24-hour Web3 and blockchain hackathon at VIT Chennai</span>
        </h1>
        <p className="hero__title">
          24 hours to build the next block of Web3,{' '}
          <br className="hero__br" />
          <span className="lime">and the business that runs on it.</span>
        </p>
        <ul className="hero__meta">
          <li>{EVENT.datesShort}</li>
          <li>{EVENT.city}</li>
          <li>Teams of 4–6</li>
          <li>Free entry</li>
        </ul>
        <div className="hero__cta">
          <RegisterButton size="lg" />
          <Link to="/sponsor" className="hero__link">
            Sponsor DeFy&rsquo;27 <Icon name="arrow" />
          </Link>
        </div>
        <Countdown compact />
      </div>

      <div className="hero__strip">
        <div className="wrap hero__strip-in">
          <span className="hero__strip-k">Backed by</span>
          <ul>
            {CURRENT_SPONSORS.map((b) => (
              <li key={b.name} className={`hlogo hlogo--w${b.weight}`}>
                <a href={b.href} target="_blank" rel="noopener noreferrer" title={b.name}>
                  <img src={b.logo} alt={b.name} className={`hlogo__img hlogo__img--${b.name.toLowerCase()}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Ticker() {
  const items = [`Registrations close ${EVENT.registrationClosesShort}`, 'Entry free', 'Teams of 4–6', '24 hours', 'Web3 × Business', 'VIT Chennai', '9–10 Jan 2027', `Top ${EVENT.shortlisted} to VIT Chennai`, `${EVENT.finalistsPerTrack} finalists per track`]
  const row = [...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="ticker__i">
            {t}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── DeFy'26 in photos, right under the hero ─────────────────── */

function Photos() {
  return (
    <Frame id="photos" className="photos">
      <SectionHead eyebrow="DeFy’26 · last edition" title="This is what 24 hours at DeFy looks like" aside={<Link to="/archive" className="textlink">Past editions <Icon name="right" /></Link>} />
      <Gallery />
    </Frame>
  )
}

/* ── about ────────────────────────────────────────────────────── */

function About() {
  return (
    <Frame id="about" className="about">
      <div className="about__deco" data-speed="0.22">
        <PixelCluster map={BLK_D} />
      </div>
      <div className="about__grid">
        <div>
          <SectionHead n="01" eyebrow="What is DeFy" title="Built like a startup. Judged like one too." />
          <p className="lede" data-reveal>
            DeFy is a {EVENT.format} by The DAO Community and BIC at {EVENT.city}. You don&rsquo;t just ship a working prototype: you ship the business model behind it and pitch both to a judging panel.
          </p>
          <ul className="pillars" data-reveal>
            {PILLARS.map((p) => (
              <li key={p.title}>
                <span className="pillars__k">{p.title}</span>
                <span>{p.body}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="statpanel chamfer" data-reveal>
          <div className="statpanel__row">
            <span className="statpanel__v">
              <CountUp value={DEFY26.headline.value} suffix="+" />
            </span>
            <span className="statpanel__k">team submissions at DeFy&rsquo;26</span>
          </div>
          <div className="statpanel__row">
            <span className="statpanel__v">{EVENT.shortlisted}</span>
            <span className="statpanel__k">teams shortlisted to build at VIT Chennai</span>
          </div>
          <div className="statpanel__row">
            <span className="statpanel__v">{EVENT.finalistsPerTrack}</span>
            <span className="statpanel__k">finalists per track, picked from the shortlisted teams</span>
          </div>
          <div className="statpanel__row">
            <span className="statpanel__v">
              4<sup>th</sup>
            </span>
            <span className="statpanel__k">edition of DeFy</span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ── tracks ───────────────────────────────────────────────────── */

const TRACK_DOTS = [
  ['##..', '####', '.###', '..##'],
  ['.##.', '####', '####', '.##.'],
  ['#..#', '.##.', '.##.', '#..#'],
]

function Tracks() {
  return (
    <Frame id="tracks" tone="raised">
      <SectionHead n="02" eyebrow="Tracks" title="Pick your battleground" sub="Full briefs drop to registered teams first, along with sponsor problem statements and their bounties." />
      <div className="tracks">
        {TRACKS.map((t, i) => (
          <article key={t.id} className="track chamfer" data-reveal style={{ ['--i' as string]: i }}>
            <div className="track__top">
              <span className="track__id">TRK-0{i + 1}</span>
              <DotMatrix pattern={TRACK_DOTS[i]} className="track__dots" />
            </div>
            <h3 className="track__name">{t.title}</h3>
            <p className="track__body">{t.body}</p>
            <span className="track__go">
              <Icon name={t.icon} />
              <span>Build here</span>
              <Icon name="arrow" />
            </span>
          </article>
        ))}
      </div>
    </Frame>
  )
}

/* ── prizes + perks ───────────────────────────────────────────── */

const PERKS = [
  { k: 'Entry', v: 'Free', d: 'No fee to register, no fee to compete.' },
  { k: 'Bounties', v: 'Sponsor problem statements', d: 'Partners fund their own challenges, with prizes on top of the main pool.' },
  { k: 'Mentors', v: 'Industry judges & mentors', d: 'Partners sit on the finalist panel and run workshops and talks.' },
  { k: 'Careers', v: 'Get hired', d: 'Hiring partners see your work, your GitHub and your LinkedIn.' },
  { k: 'Swag', v: 'T-shirts & stickers', d: 'Event tees and swag for every team at the venue.' },
  { k: 'Network', v: 'Investor-style pitch', d: 'The finalists in every track pitch to people who back startups.' },
]

function Prizes() {
  return (
    <Frame id="prizes">
      <SectionHead n="03" eyebrow="Prizes & perks" title="What’s on the table" />
      <div className="prizes">
        <div className="pool chamfer" data-reveal>
          <span className="pool__k">Prize pool</span>
          <span className="pool__v" aria-label="Revealing soon">
            <span className="redact" style={{ ['--w' as string]: '1.1em' }} />
            <span className="redact" style={{ ['--w' as string]: '2.4em' }} />
            <span className="redact" style={{ ['--w' as string]: '1.6em' }} />
          </span>
          <span className="pool__s">Revealing soon. Grand Prize for the best product and pitch, plus sponsor bounties per track.</span>
          <GlyphField cell={18} density={0.92} className="pool__field" />
        </div>
        <ul className="perks">
          {PERKS.map((p, i) => (
            <li key={p.k} className="perk" data-reveal style={{ ['--i' as string]: i }}>
              <span className="perk__k">{p.k}</span>
              <span className="perk__v">{p.v}</span>
              <span className="perk__d">{p.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  )
}

/* ── how it works: pinned horizontal chain ────────────────────── */

const STEP_MAPS = [
  ['#..', '##.', '###'],
  ['###', '#.#', '###'],
  ['##.', '###', '.##'],
  ['###', '###', '###'],
]

function HowItWorks() {
  const now = useNow(60_000)
  const steps = [
    { id: 'reg', when: `Until ${EVENT.registrationClosesShort}`, title: 'Register your team', body: `Form a team of 4–6 and register on Unstop by ${EVENT.registrationClosesLabel}. Entry is free.`, from: 0, to: EVENT.registrationCloses, cta: true },
    ...ROUNDS.map((r) => ({ id: r.id, when: r.when, title: r.title, body: r.body, from: r.from, to: r.to, cta: false })),
  ]
  return (
    <section className="how" id="how" data-hscroll>
      <div className="how__sticky">
        <div className="wrap how__head">
          <SectionHead n="04" eyebrow="How it works" title="Four blocks to the Grand Prize" />
          <div className="how__bar" aria-hidden="true">
            <span />
          </div>
        </div>
        <ol className="how__track" data-htrack>
          {steps.map((s, i) => {
            const state = now >= s.to ? 'done' : now >= s.from ? 'live' : 'next'
            return (
              <li key={s.id} className={`step step--${state}`}>
                <div className="step__top">
                  <span className="step__n">0{i}</span>
                  <span className={`step__st step__st--${state}`}>{state === 'live' ? (s.id === 'reg' ? 'Open now' : 'Live') : state === 'done' ? 'Done' : s.when}</span>
                </div>
                <PixelCluster map={STEP_MAPS[i]} className="step__pix" tone={state === 'live' ? 'lime' : 'ink'} />
                <h3 className="step__title">{s.title}</h3>
                <p className="step__body">{s.body}</p>
                {s.cta && <RegisterButton label="Register" />}
                {i < steps.length - 1 && <span className="step__link" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ── selection: laid out explicitly ───────────────────────────── */

function Selection() {
  const steps = [
    { k: 'Step 1', t: 'Register', d: `Every team registers on Unstop by ${EVENT.registrationClosesLabel}. Entry is free.`, who: 'All teams' },
    { k: 'Step 2', t: 'Round 1 · online', d: 'Every registered team submits an idea and a proposed tech stack, from anywhere.', who: 'All teams' },
    { k: 'Step 3', t: 'Shortlist', d: `Judges shortlist the top ${EVENT.shortlisted} teams. Only these teams are invited to VIT Chennai.`, who: `${EVENT.shortlisted} teams` },
    { k: 'Step 4', t: '24-hour hackathon', d: `The ${EVENT.shortlisted} shortlisted teams build their prototype and pitch deck on campus, overnight.`, who: `${EVENT.shortlisted} teams` },
    { k: 'Step 5', t: 'Finalists', d: `From the shortlisted teams only, judges pick ${EVENT.finalistsPerTrack} finalists in each track.`, who: `${EVENT.finalistsPerTrack} per track` },
    { k: 'Step 6', t: 'Pitching finals', d: 'The finalists pitch their prototype and business model for the Grand Prize.', who: 'Finalists' },
  ]
  return (
    <Frame id="selection">
      <SectionHead n="05" eyebrow="Selection" title="Exactly how teams reach the finals" sub="No guesswork. Every finalist comes from the shortlisted teams who build at VIT Chennai." />
      <ol className="funnel">
        {steps.map((s, i) => (
          <li key={s.k} className={`funnel__row${i === 4 ? ' is-key' : ''}`} style={{ ['--w' as string]: `${100 - i * 9}%`, ['--i' as string]: i }} data-reveal>
            <span className="funnel__k">{s.k}</span>
            <span className="funnel__t">{s.t}</span>
            <span className="funnel__d">{s.d}</span>
            <span className="funnel__who">{s.who}</span>
          </li>
        ))}
      </ol>
      <p className="funnel__note" data-reveal>
        <strong>Important:</strong> the {EVENT.finalistsPerTrack} finalists in each track are chosen only from the {EVENT.shortlisted} shortlisted teams that come to VIT Chennai and take part in the 24-hour hackathon. If your team isn&rsquo;t shortlisted in Round 1, or doesn&rsquo;t attend the hackathon, it can&rsquo;t reach the finals.
      </p>
    </Frame>
  )
}

/* ── schedule ─────────────────────────────────────────────────── */

function Schedule() {
  return (
    <Frame id="schedule">
      <SectionHead n="06" eyebrow="Schedule" title="Two days, one night" sub={`${EVENT.dates} · ${EVENT.venue}. Exact timings go out to shortlisted teams.`} />
      <div className="sched">
        {AGENDA.map((d, di) => (
          <div key={d.day} className="sched__day chamfer" data-reveal style={{ ['--i' as string]: di }}>
            <p className="sched__h">
              <span>Day {di + 1}</span>
              {d.day}
            </p>
            <ol>
              {d.items.map((it) => (
                <li key={it} className={it === d.highlight ? 'is-hl' : ''}>
                  <span className="sched__dot" aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── people (honest placeholders) ─────────────────────────────── */

function People() {
  const roles = ['Judge', 'Mentor', 'Speaker', 'Judge']
  return (
    <Frame id="people" tone="raised">
      <SectionHead n="07" eyebrow="Judges, mentors & speakers" title="The room you’ll pitch to" sub="Founders, investors and protocol engineers. The line-up is revealed in drops, so watch our socials." />
      <div className="people">
        {roles.map((r, i) => (
          <div key={i} className="person chamfer" data-reveal style={{ ['--i' as string]: i }}>
            <div className="person__img">
              <DotMatrix pattern={['.####.', '##..##', '##..##', '.####.', '......', '######', '######']} />
            </div>
            <span className="person__role">{r}</span>
            <span className="person__name">Revealing soon</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── sponsors: this year big, a pitch band for new ones ───────── */

function Partner({ s, size }: { s: CurrentSponsor; size: 'lg' | 'md' }) {
  return (
    <a className={`partner partner--${size} chamfer`} href={s.href} target="_blank" rel="noopener noreferrer">
      <span className="partner__logo">
        <img src={s.logo} alt={s.name} loading="lazy" />
      </span>
      <span className="partner__name">
        {s.name}
        <Icon name="arrow" />
      </span>
    </a>
  )
}

function Sponsors() {
  const main = CURRENT_SPONSORS.filter((s) => s.tier === 'title' || s.tier === 'sponsor')
  const rest = CURRENT_SPONSORS.filter((s) => s.tier === 'platform' || s.tier === 'community')
  return (
    <Frame id="sponsors">
      <SectionHead n="08" eyebrow="Sponsors & partners" title="Powering DeFy’27" />
      <div className="partners" data-reveal>
        <div className="partners__main">
          {main.map((s) => (
            <Partner key={s.name} s={s} size="lg" />
          ))}
        </div>
        <div className="partners__rest">
          {rest.map((s) => (
            <Partner key={s.name} s={s} size="md" />
          ))}
        </div>
      </div>

      <div className="pitch chamfer" data-reveal>
        <div className="pitch__copy">
          <p className="pitch__k">For sponsors</p>
          <h3 className="pitch__t">Put your protocol in front of India&rsquo;s next Web3 founders.</h3>
          <div className="pitch__cta">
            <Link to="/sponsor" className="btn btn--dark">
              <span>See sponsor tiers</span>
              <Icon name="arrow" className="btn__ico" />
            </Link>
            {LINKS.sponsorDeck && (
              <a href={LINKS.sponsorDeck} className="btn btn--dark-ghost" download>
                <span>Deck · PDF</span>
                <Icon name="download" className="btn__ico" />
              </a>
            )}
          </div>
        </div>
        <dl className="pitch__stats">
          {AUDIENCE.slice(1).map((a) => (
            <div key={a.value}>
              <dt>{a.value}</dt>
              <dd>{a.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Frame>
  )
}

/* ── last edition ─────────────────────────────────────────────── */

function LastEdition() {
  return (
    <Frame id="numbers" tone="raised">
      <SectionHead n="09" eyebrow="DeFy’26 · last edition" title="The proof of work" />
      <div className="proof">
        <div className="proof__big" data-reveal>
          <span className="proof__v">
            <CountUp value={DEFY26.headline.value} suffix={DEFY26.headline.suffix} />
          </span>
          <span className="proof__k">{DEFY26.headline.label}</span>
        </div>
        <div className="proof__cell" data-reveal>
          <span className="proof__m">
            <CountUp value={DEFY26.rating} decimals={1} />
            <small>/5</small>
          </span>
          <Stars r={DEFY26.rating} />
          <span className="proof__k">Participant rating</span>
        </div>
        <div className="proof__cell" data-reveal>
          <span className="proof__m">
            <CountUp value={DEFY26.reach.value} suffix={DEFY26.reach.suffix} />
          </span>
          <span className="proof__k">{DEFY26.reach.label}</span>
        </div>
        <div className="proof__cell proof__cell--wide" data-reveal>
          <span className="proof__k proof__k--lime">Builders came from</span>
          <span className="pills">
            {DEFY26.institutions.map((i) => (
              <span key={i} className="chip">
                {i}
              </span>
            ))}
          </span>
          <span className="proof__k">and 90+ premier engineering colleges across India.</span>
        </div>
      </div>
      <Link to="/archive" className="textlink">
        Past editions <Icon name="right" />
      </Link>
    </Frame>
  )
}

/* ── past sponsors: quiet ─────────────────────────────────────── */

function PastSponsors() {
  return (
    <section className="past" aria-labelledby="past-h">
      <div className="wrap past__in">
        <p className="past__k" id="past-h">
          Previously backed by
        </p>
        <ul className="past__logos">
          {[...ALL_BRANDS, ...COMMUNITY].map((b) => (
            <li key={b.name}>
              <img src={b.logo} alt={b.name} title={b.name} loading="lazy" className={b.mono ? '' : 'is-color'} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── faq ──────────────────────────────────────────────────────── */

function Faq() {
  return (
    <Frame id="faq">
      <div className="faq">
        <div>
          <SectionHead n="10" eyebrow="FAQ" title="Before you register" />
          <div className="orgs" data-reveal>
            <p className="orgs__k">Organised by</p>
            <div className="orgs__logos">
              <img src={ORGANIZERS.dao.logo} alt="The DAO Community" />
              <span aria-hidden="true">×</span>
              <img src={ORGANIZERS.bic.logo} alt="BIC, VIT Chennai" />
            </div>
          </div>
        </div>
        <div data-reveal>
          <Accordion items={FAQS} />
        </div>
      </div>
    </Frame>
  )
}

/* ── final call ───────────────────────────────────────────────── */

function FinalCall() {
  return (
    <section className="final" id="register">
      <div className="final__field" data-speed="-0.1">
        <GlyphField cell={24} color="#0a0b09" density={0.95} />
      </div>
      <div className="wrap final__in">
        <div className="final__card chamfer" data-reveal>
          <p className="final__k">Block #027 is open</p>
          <h2 className="final__t">Registrations are open.</h2>
          <p className="final__s">Free entry. Teams of 4–6. Register by {EVENT.registrationClosesLabel} and submit your idea in Round 1. The top {EVENT.shortlisted} teams build at VIT Chennai for 24 hours, and {EVENT.finalistsPerTrack} finalists per track pitch for the Grand Prize.</p>
          <div className="final__cta">
            <RegisterButton size="lg" />
          </div>
          <div className="final__cd">
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Photos />
      <About />
      <Tracks />
      <Prizes />
      <HowItWorks />
      <Selection />
      <Schedule />
      <People />
      <Sponsors />
      <LastEdition />
      <PastSponsors />
      <Faq />
      <FinalCall />
    </>
  )
}
