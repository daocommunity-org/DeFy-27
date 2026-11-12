import { Cubes, TerminalLine } from '../components/Decor'
import { Icon } from '../components/Icon'
import { DeckArrow } from '../components/Marks'
import { PackageBuilder } from '../components/PackageBuilder'
import { Button, CopyRow, Eyebrow, Frame, LogoTile, SectionHead } from '../components/ui'
import { CONTACT, LINKS } from '../config/links'
import { DEFY26 } from '../data/archive'
import { EVENT } from '../data/event'
import { AUDIENCE, BENEFITS, BOUNTY, inrShort } from '../data/sponsorship'
import { DECK_BRANDS } from '../data/sponsors'

function LimeHero() {
  return (
    <section className="limehero">
      <span className="br br--tl" aria-hidden="true" />
      <span className="br br--tr" aria-hidden="true" />
      <div className="wrap limehero__in">
        <div className="limehero__copy">
          <p className="eyebrow eyebrow--ink">Why partner · DeFy&rsquo;27</p>
          <h1 className="display">Put your brand in front of India&rsquo;s next Web3 founders.</h1>
          <p className="limehero__lede">Engage the builders, reach their campuses, and meet six startup-ready teams before anyone else.</p>
          <div className="hero__cta">
            <Button to="/sponsor#tiers" variant="dark" icon="right">
              See the tiers
            </Button>
            {LINKS.sponsorDeck && (
              <Button href={LINKS.sponsorDeck} variant="dark-ghost" icon="download" download>
                Download the deck
              </Button>
            )}
          </div>
          <TerminalLine text="> broadcast(your_brand) → 25,000+ nodes" />
        </div>
        <DeckArrow className="limehero__arrow draw" />
      </div>
    </section>
  )
}

function Audience() {
  return (
    <Frame id="audience">
      <SectionHead eyebrow="The audience" title="Who you’ll meet" sub={`${EVENT.dates} · ${EVENT.venue}`} />
      <div className="aud">
        {AUDIENCE.map((a, i) => (
          <div key={a.value} className="card aud__card rv" style={{ ['--d' as string]: `${i * 70}ms` }}>
            <span className="aud__v">{a.value}</span>
            <p>{a.label}</p>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Benefits() {
  return (
    <Frame id="benefits">
      <SectionHead eyebrow="Sponsor benefits" title="What you get" aside={<Cubes />} />
      <div className="bens">
        {BENEFITS.map((b) => (
          <div key={b.key} className="ben rv">
            <span className="ben__key">
              <Icon name={b.icon} />
              {b.key}
            </span>
            <h3 className="ben__head">{b.head}</h3>
            <p className="ben__body">{b.body}</p>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Tiers() {
  return (
    <Frame id="tiers">
      <SectionHead
        eyebrow="Sponsorship tiers"
        title="Pick your level"
        aside={<p className="aside-note">Each tier stacks on the one below it. Tap a tier to see what&rsquo;s included, then add bounties.</p>}
      />
      <a className="titleseat" href={`mailto:${CONTACT.emails[0]}?subject=${encodeURIComponent("DeFy'27 title sponsorship")}`}>
        <span className="titleseat__plus" aria-hidden="true">
          +
        </span>
        <span className="titleseat__copy">
          <span className="titleseat__k">Title sponsor · 1 seat open</span>
          <span className="titleseat__t">Co-host DeFy&rsquo;27 and set two problem statements of your own.</span>
        </span>
        <span className="titleseat__go">
          Claim the seat <Icon name="arrow" />
        </span>
      </a>
      <PackageBuilder />
    </Frame>
  )
}

function Bounty() {
  return (
    <section className="bounty" id="bounty">
      <div className="bounty__dark">
        <span className="br br--tl" aria-hidden="true" />
        <span className="br br--bl" aria-hidden="true" />
        <div className="bounty__copy rv">
          <Eyebrow>Add-on</Eyebrow>
          <h2 className="h2">Problem Statement Bounty</h2>
          <p className="lede">Have a specific challenge in mind? Fund it, and the best teams build it.</p>
          <ol className="bounty__list">
            {BOUNTY.perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
          <p className="chip chip--ghost">None of these fit? Let&rsquo;s build a custom package.</p>
        </div>
      </div>
      <div className="bounty__lime">
        <span className="br br--tr" aria-hidden="true" />
        <span className="br br--br" aria-hidden="true" />
        <DeckArrow className="bounty__arrow" />
        <div className="bounty__price rv">
          <p className="eyebrow eyebrow--ink">Per problem statement</p>
          <p className="bounty__amt">
            {inrShort(BOUNTY.min)}–{inrShort(BOUNTY.max).replace('₹', '')}
          </p>
          <p>Stacks on top of any sponsorship tier.</p>
          <pre className="code" aria-label="Solidity snippet">
            <code>
              <span className="k">contract</span> DeFyBounty {'{'}
              {'\n  '}
              <span className="k">function</span> fund(<span className="t">bytes32</span> ps)
              {'\n    '}
              <span className="k">external payable</span>;{'\n'}
              {'}'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}

function Proof() {
  return (
    <Frame id="proof">
      <SectionHead eyebrow="Track record" title="Brands that backed DeFy" sub={`${DEFY26.record} Industry voices like Siddharth Menon of WazirX were in the room.`} />
      <div className="wall wall--8 rv">
        {DECK_BRANDS.map((b) => (
          <LogoTile key={b.name} b={b} />
        ))}
      </div>
      <div className="proof__stats rv">
        <div>
          <span className="proof__v">1,500+</span>
          <span className="muted">team submissions</span>
        </div>
        <div>
          <span className="proof__v">200K+</span>
          <span className="muted">social reach</span>
        </div>
      </div>
    </Frame>
  )
}

function Contact() {
  return (
    <Frame id="contact" tone="raised">
      <div className="contact">
        <div className="contact__head rv">
          <Eyebrow>Your next big collaboration starts here</Eyebrow>
          <h2 className="h1">
            Let&rsquo;s defy the ordinary <span className="lime">together.</span>
          </h2>
          {LINKS.sponsorDeck && (
            <Button href={LINKS.sponsorDeck} variant="ghost" icon="download" download>
              Sponsorship deck · PDF
            </Button>
          )}
        </div>
        <div className="contact__cols rv">
          <div className="contact__col contact__col--lime">
            <p className="contact__h">Email</p>
            {CONTACT.emails.map((e) => (
              <CopyRow key={e} icon="mail" value={e} href={`mailto:${e}`} />
            ))}
          </div>
          <div className="contact__col">
            <p className="contact__h">Call</p>
            {CONTACT.phones.map((p) => (
              <CopyRow key={p.number} icon="phone" label={p.name} value={p.number} href={`tel:${p.number.replace(/\s/g, '')}`} />
            ))}
          </div>
          <div className="contact__col">
            <p className="contact__h">Follow</p>
            {CONTACT.handles.map((h) => (
              <CopyRow key={h} icon="at" value={h} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

export default function Sponsor() {
  return (
    <>
      <LimeHero />
      <Audience />
      <Benefits />
      <Tiers />
      <Bounty />
      <Proof />
      <Contact />
    </>
  )
}
