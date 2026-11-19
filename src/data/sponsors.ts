// Sponsor record. Logos live in /public/logos.
// `mono: true` = logo is already a white mark (from the deck); others are
// full-colour and get greyed at rest, coloured on hover.

export type Brand = { name: string; logo: string; href?: string; mono?: boolean; tall?: boolean }

const L = (p: string) => `/logos/${p}`

/** Brands from the deck's "Brands that backed DeFy" slide. */
export const DECK_BRANDS: Brand[] = [
  { name: 'Jio', logo: L('sponsors/jio.png'), href: 'https://www.jio.com', mono: true },
  { name: 'Shardeum', logo: L('sponsors/shardeum.png'), href: 'https://shardeum.org', mono: true },
  { name: 'QuickNode', logo: L('sponsors/quicknode.png'), href: 'https://www.quicknode.com/', mono: true },
  { name: 'Devfolio', logo: L('sponsors/devfolio.png'), href: 'https://devfolio.co', mono: true },
  { name: 'INCO', logo: L('sponsors/inco.png'), mono: true },
  { name: 'Unstop', logo: L('sponsors/unstop.png'), href: 'https://unstop.com', mono: true },
  { name: 'Krypcore', logo: L('sponsors/krypcore.png'), href: 'https://krypcore.com', mono: true },
  { name: 'Thinkroot', logo: L('sponsors/thinkroot.png'), mono: true, tall: true },
]

/** Earlier sponsor record carried from the DeFy'26 site (BUILD-SPEC §6). */
export const EARLIER_BRANDS: Brand[] = [
  { name: 'ZKWallet', logo: L('sponsors/zkwallet.png'), href: 'https://zkinnovations.com', mono: true },
  { name: 'Gizmolab', logo: L('sponsors/gizmolab.png'), href: 'https://www.gizmolab.io', mono: true },
  { name: 'MTutor', logo: L('sponsors/mtutor.png'), href: 'https://www.m-tutor.com/' },
  { name: 'MOI Technology', logo: L('sponsors/moi.png'), href: 'https://moi.technology/', tall: true },
  { name: 'Qoneqt', logo: L('sponsors/qoneqt.png'), href: 'https://qoneqt.com' },
  { name: 'QuillAudits', logo: L('sponsors/quillaudits.png'), href: 'https://www.quillaudits.com/smart-contract-audit', tall: true },
]

export const ALL_BRANDS: Brand[] = [...DECK_BRANDS, ...EARLIER_BRANDS]

export const COMMUNITY: Brand[] = [
  { name: 'Odisha DAO', logo: L('community/odisha-dao.png') },
  { name: 'The Phoenix Guild Chennai', logo: L('community/phoenix-guild-chennai.png') },
  { name: 'Spider NITT', logo: L('community/spider-nitt.png') },
]

export const POWERED_BY: Brand[] = [
  { name: 'Devfolio', logo: L('powered/devfolio.png'), mono: true },
  { name: 'ETHIndia', logo: L('powered/ethindia.png'), mono: true },
]

export const ORGANIZERS = {
  dao: { name: 'The DAO Community', logo: L('organizers/dao-community.png') },
  bic: { name: 'BIC', logo: L('organizers/bic.png') },
}

/** DeFy'27's own partners: the big section on the homepage and the hero strip.
 *  Add an entry and drop the logo (white on transparent) in /public/logos/current/.
 *  Order = display order (hero strip and sponsors section). Unstop is the
 *  registration platform, not a sponsor, so it isn't listed here. */
/** `weight` sets how big the logo is drawn (3 = biggest): match it to the deal size. */
export type CurrentSponsor = Brand & { tier: 'title' | 'sponsor' | 'platform' | 'community'; role: string; weight: 1 | 2 | 3 }
export const CURRENT_SPONSORS: CurrentSponsor[] = [
  { name: 'ElevenLabs', logo: L('current/elevenlabs.svg'), href: 'https://elevenlabs.io', tier: 'sponsor', role: 'Sponsor', weight: 3, mono: true },
  { name: 'n8n', logo: L('current/n8n.svg'), href: 'https://n8n.io', tier: 'sponsor', role: 'Sponsor', weight: 3, mono: true },
  { name: 'CodeCrafters', logo: L('current/codecrafters.svg'), href: 'https://codecrafters.io', tier: 'sponsor', role: 'Sponsor', weight: 3, mono: true },
  { name: 'MLH', logo: L('current/mlh.svg'), href: 'https://mlh.io', tier: 'community', role: 'Community partner', weight: 2, mono: true },
]

