import { HexField } from '../components/Decor'
import { Gallery } from '../components/Gallery'
import { Icon } from '../components/Icon'
import { Mark27 } from '../components/Marks'
import { Button, CountUp, Eyebrow, Frame, LogoTile, RegisterButton, SectionHead, Stars } from '../components/ui'
import { DEFY26, PAST_PROJECTS } from '../data/archive'
import { ALL_BRANDS, COMMUNITY } from '../data/sponsors'

function ArchiveHero() {
  return (
    <section className="ahero">
      <div className="wrap ahero__in">
        <div className="ahero__copy">
          <Eyebrow>Past editions</Eyebrow>
          <h1 className="display">Every edition raised the bar. The fourth is loading.</h1>
          <p className="lede">What DeFy has built so far: the teams, the colleges, the partners and the numbers behind them.</p>
        </div>
        <ol className="lineage" aria-label="DeFy editions">
          <li className="lineage__item">
            <span className="lineage__yr">DeFy&rsquo;25</span>
            <span className="lineage__k">Previous edition</span>
          </li>
          <li className="lineage__item">
            <span className="lineage__yr">DeFy&rsquo;26</span>
            <span className="lineage__k">1,500+ submissions</span>
          </li>
          <li className="lineage__item lineage__item--now">
            <span className="lineage__yr">
              DeFy&rsquo;<Mark27 className="lineage__27" title="27" />
            </span>
            <span className="lineage__k">4th edition · Jan 2027</span>
          </li>
        </ol>
      </div>
    </section>
  )
}

function Numbers() {
  const r = DEFY26.rating
  return (
    <Frame id="defy26">
      <SectionHead eyebrow="Last edition" title="DeFy’26, by the numbers" aside={<HexField cols={12} />} />
      <div className="bento">
        <div className="card bento__big rv">
          <p className="bento__k">Participation</p>
          <div>
            <span className="numbers__big">
              <CountUp value={DEFY26.headline.value} suffix={DEFY26.headline.suffix} />
            </span>
            <p>{DEFY26.headline.label}</p>
          </div>
        </div>
        <div className="card bento__half tilt rv" style={{ ['--d' as string]: '60ms' }}>
          <p className="bento__k">Participant rating</p>
          <span className="bento__v">
            <CountUp value={r} decimals={1} />
            <small> / 5</small>
          </span>
          <Stars r={r} />
        </div>
        <div className="card bento__half tilt rv" style={{ ['--d' as string]: '120ms' }}>
          <p className="bento__k">Social media</p>
          <span className="bento__v bento__v--lime">
            <CountUp value={DEFY26.reach.value} suffix={DEFY26.reach.suffix} />
          </span>
          <p>{DEFY26.reach.label}</p>
        </div>
        <div className="card bento__colleges rv">
          <p className="bento__k">Builders came from</p>
          <div className="pills">
            {DEFY26.institutions.map((i) => (
              <span key={i} className="chip">
                {i}
              </span>
            ))}
          </div>
          <p className="muted">and 90+ premier engineering colleges across India.</p>
        </div>
      </div>
    </Frame>
  )
}

function Projects() {
  if (PAST_PROJECTS.length === 0) return null
  return (
    <Frame id="builds">
      <SectionHead eyebrow="Winning builds" title="What teams shipped" />
      <div className="projects">
        {PAST_PROJECTS.map((p) => (
          <article key={p.edition + p.project} className="card project rv">
            <div className="project__top">
              <span className="chip chip--lime">{p.award}</span>
              <span className="muted">{p.edition}</span>
            </div>
            <h3 className="h3">{p.project}</h3>
            <p className="project__team">{p.team}</p>
            <p>{p.summary}</p>
            {p.href && (
              <a className="textlink" href={p.href} target="_blank" rel="noopener noreferrer">
                View project <Icon name="arrow" />
              </a>
            )}
          </article>
        ))}
      </div>
    </Frame>
  )
}

function Wall() {
  return (
    <Frame id="sponsors">
      <SectionHead eyebrow="Past sponsors & partners" title="Brands that backed DeFy" sub={DEFY26.record} />
      <div className="wall rv">
        {ALL_BRANDS.map((b) => (
          <LogoTile key={b.name} b={b} />
        ))}
      </div>
      <div className="community rv">
        <div className="community__copy">
          <Eyebrow>Community partners</Eyebrow>
          <p className="community__lede">Communities across India that brought builders to DeFy, including</p>
        </div>
        <div className="community__logos">
          {COMMUNITY.map((b) => (
            <figure key={b.name} className="community__logo">
              <LogoTile b={b} size="sm" />
              <figcaption>{b.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Voices() {
  return (
    <Frame id="voices" tone="raised">
      <div className="voices">
        <Eyebrow>In the room</Eyebrow>
        {DEFY26.voices.map((v) => (
          <div key={v.name} className="voice rv">
            <span className="voice__mono" aria-hidden="true">
              {v.name
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </span>
            <div>
              <p className="voice__name">{v.name}</p>
              <p className="voice__org">{v.org}</p>
              <p className="muted">{v.note}</p>
            </div>
          </div>
        ))}
        <div className="voices__cta">
          <p className="h3">Want to be part of the next one?</p>
          <div className="hero__cta">
            <Button to="/sponsor" icon="arrow">
              Sponsor DeFy&rsquo;27
            </Button>
            <RegisterButton variant="ghost" />
          </div>
        </div>
      </div>
    </Frame>
  )
}

export default function Archive() {
  return (
    <>
      <ArchiveHero />
      <Numbers />
      <Frame id="photos">
        <SectionHead eyebrow="In frames" title="DeFy’26, from the floor" />
        <Gallery />
      </Frame>
      <Projects />
      <Wall />
      <Voices />
    </>
  )
}
