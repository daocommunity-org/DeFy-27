# DeFy'27 website

Vite + React + TypeScript. Three pages: Home (`/`), Sponsor (`/sponsor`), Past editions (`/archive`).
Design system is taken from the DeFy'27 sponsorship deck: Michroma + Space Grotesk, deck lime `#a3f552` on `#0b0c0a`, dot grid, corner brackets, the outlined arrow.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run typecheck  # optional, build doesn't depend on it
```

Deploy: push to the Vercel project. `vercel.json` sets the Vite build, the SPA rewrite (so `/sponsor` works on refresh) and the security headers from `security.md` §3.

## Where to change things

| What | File |
|---|---|
| Register / WhatsApp / shortlisted links (null = hidden or disabled) | `src/config/links.ts` |
| Contact emails, phones, handles | `src/config/links.ts` |
| Dates, rounds, agenda, tracks, FAQ | `src/data/event.ts` |
| Hacking start/end time (drives the countdown) | `EVENT.start` / `EVENT.end` in `src/data/event.ts` |
| Sponsor tiers, bounty, audience numbers | `src/data/sponsorship.ts` |
| Past sponsors, community partners, logos | `src/data/sponsors.ts` + `public/logos/` |
| DeFy'26 stats, winning builds | `src/data/archive.ts` |
| Colours, type, spacing | top of `src/styles/global.css` |

`PAST_PROJECTS` in `src/data/archive.ts` is empty, so the "Winning builds" section on Past editions is hidden. Add entries and it appears.

The sponsorship deck is served from `public/DeFy27-Sponsorship-Deck.pdf` and linked from the Sponsor page. Set `LINKS.sponsorDeck` to `null` to stop offering it.

## Assets

- `src/components/Marks.tsx`: the glowing "27" and the "Defy" wordmark, traced to SVG from the deck cover.
- `public/logos/sponsors/`: deck-slide logos were cut from the deck as white marks; the rest are from the DeFy'26 site.
- `public/logos/organizers/`: The DAO Community and BIC marks from the deck.
