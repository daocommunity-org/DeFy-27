import { useMemo, useState } from 'react'
import { CONTACT } from '../config/links'
import { BOUNTY, TIERS, inrShort, type Tier } from '../data/sponsorship'
import { Icon } from './Icon'

// Tier board + package builder. Tiers stack, so picking one lights it and
// every tier below it; the bar underneath adds Problem Statement Bounties
// and keeps a running "from" figure.

const DISPLAY = [...TIERS].reverse() // deck order: Title → Basic

export function PackageBuilder() {
  const [sel, setSel] = useState<Tier['id']>('pro')
  const [bounties, setBounties] = useState(1)
  const idx = TIERS.findIndex((t) => t.id === sel)
  const tier = TIERS[idx]

  const totals = useMemo(() => {
    const lo = tier.min + bounties * BOUNTY.min
    const hi = tier.min + bounties * BOUNTY.max
    return { lo, hi }
  }, [tier, bounties])

  const perkCount = TIERS.slice(0, idx + 1).reduce((n, t) => n + t.perks.length, 0) + (bounties ? BOUNTY.perks.length : 0)
  const summary = `${tier.name} tier${bounties ? ` + ${bounties} problem statement bount${bounties > 1 ? 'ies' : 'y'}` : ''}`
  const mail = `mailto:${CONTACT.emails[0]}?subject=${encodeURIComponent(`DeFy'27 sponsorship: ${summary}`)}&body=${encodeURIComponent(
    `Hi DeFy team,\n\nWe're interested in the ${summary} (from ${inrShort(totals.lo)}).\n\nCompany:\nContact:\n`,
  )}`

  return (
    <div className="pb">
      <div className="tiers" role="group" aria-label="Choose a sponsorship tier">
        {DISPLAY.map((t) => {
          const rank = TIERS.indexOf(t)
          const on = rank <= idx
          const top = t.id === sel
          return (
            <button
              type="button"
              key={t.id}
              className={`tier ${on ? 'is-on' : ''} ${top ? 'is-top' : ''}`}
              aria-pressed={top}
              onClick={() => setSel(t.id)}
            >
              <span className="tier__name">{t.name}</span>
              <span className="tier__price">{inrShort(t.min)}+</span>
              <span className={`tier__chip ${top ? 'tier__chip--lime' : ''}`}>{rank === 0 ? 'Includes' : `Everything in ${TIERS[rank - 1].name}, plus`}</span>
              <ul className="tier__perks">
                {t.perks.map((p) => (
                  <li key={p}>
                    <Icon name="check" className="tier__tick" />
                    {p}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      <div className="pbar">
        <div className="pbar__cell">
          <span className="pbar__k">Your tier</span>
          <span className="pbar__v">{tier.name}</span>
          <span className="pbar__s">{perkCount} benefits included</span>
        </div>
        <div className="pbar__cell">
          <span className="pbar__k" id="bounty-lbl">Problem statement bounties</span>
          <div className="stepper" role="group" aria-labelledby="bounty-lbl">
            <button type="button" onClick={() => setBounties(Math.max(0, bounties - 1))} disabled={bounties === 0} aria-label="Remove a bounty">
              <Icon name="minus" />
            </button>
            <output aria-live="polite">{bounties}</output>
            <button type="button" onClick={() => setBounties(Math.min(4, bounties + 1))} disabled={bounties === 4} aria-label="Add a bounty">
              <Icon name="plus" />
            </button>
          </div>
          <span className="pbar__s">
            {inrShort(BOUNTY.min)}–{inrShort(BOUNTY.max)} each
          </span>
        </div>
        <div className="pbar__cell pbar__cell--total">
          <span className="pbar__k">Package from</span>
          <span className="pbar__total">{inrShort(totals.lo)}</span>
          <span className="pbar__s">{bounties ? `Up to ${inrShort(totals.hi)} depending on bounty scope` : 'Tier minimum'}</span>
        </div>
        <a className="btn btn--lime pbar__cta" href={mail}>
          <span>Enquire about this package</span>
          <Icon name="arrow" className="btn__ico" />
        </a>
      </div>
    </div>
  )
}
