import { useEffect, useState } from 'react'
import { EVENT } from '../data/event'
import { useNow } from '../lib/hooks'

const pad = (n: number, w = 2) => String(n).padStart(w, '0')

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 }
}

/** Counts to the next thing that matters: registrations closing, then
 *  hacking starting, then hacking ending. Renders "--" until mounted so a
 *  prerender never ships a stale number. `compact` is the one-line variant. */
export function Countdown({ compact = false }: { compact?: boolean }) {
  const now = useNow(1000)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const phase = now < EVENT.registrationCloses ? 'reg' : now < EVENT.start ? 'pre' : now < EVENT.end ? 'live' : 'done'
  if (phase === 'done')
    return (
      <div className="cd cd--state">
        <span className="cd__state">That&rsquo;s a wrap. See you at DeFy&rsquo;28.</span>
      </div>
    )

  const target = phase === 'reg' ? EVENT.registrationCloses : phase === 'pre' ? EVENT.start : EVENT.end
  const label = phase === 'reg' ? 'Registrations close in' : phase === 'pre' ? 'Hacking starts in' : 'Live now · hacking ends in'
  const t = split(target - now)
  const units = [
    { k: 'Days', s: 'd', v: pad(t.d, t.d > 99 ? 3 : 2) },
    { k: 'Hours', s: 'h', v: pad(t.h) },
    { k: 'Min', s: 'm', v: pad(t.m) },
    { k: 'Sec', s: 's', v: pad(t.s) },
  ]
  const aria = `${label} ${t.d} days ${t.h} hours`
  if (compact)
    return (
      <p className="cdc" role="timer" aria-label={aria}>
        <span className="cdc__k">{label}</span>
        <span className="cdc__v" aria-hidden="true">
          {units.map((u) => (
            <span key={u.k}>
              <b key={mounted ? u.v : 'x'}>{mounted ? u.v : '--'}</b>
              {u.s}
            </span>
          ))}
        </span>
      </p>
    )
  return (
    <div className="cd" role="timer" aria-label={aria}>
      <p className="cd__lbl">
        {phase === 'live' && <span className="pulse" aria-hidden="true" />}
        {label}
      </p>
      <div className="cd__units" aria-hidden="true">
        {units.map((u, i) => (
          <div className="cd__unit" key={u.k}>
            <span className="cd__num" key={mounted ? u.v : 'x'}>
              {mounted ? u.v : '--'}
            </span>
            <span className="cd__k">{u.k}</span>
            {i < 3 && <span className="cd__sep">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
