// The ONLY place outbound CTA links live (DEFY27-BUILD-SPEC.md §10).
// A null value means "we don't have it yet": every component that reads
// one renders its own fallback (disabled or hidden), never a dead link.
// Got the link? Edit one line here, redeploy, done.

export const LINKS = {
  /** Registrations are OPEN. Paste the registration URL here (Devfolio, Unstop, form…).
   *  While it's null, Register buttons scroll to the #register block on the homepage. */
  register: 'https://unstop.com/o/d7bXJy5' as string | null,
  /** Shown on Register buttons: "Register on Unstop". */
  registerPlatform: 'Unstop',
  /** WhatsApp community. null → button hidden. */
  whatsappCommunity: 'https://chat.whatsapp.com/HM7x66noOUj1Ab8qtXXOqP' as string | null,
  /** Shortlisted teams after Round 1. null → button hidden. */
  shortlistedTeams: null as string | null,
  /** MLH Code of Conduct. */
  mlhCodeOfConduct: 'https://mlh.io/code-of-conduct',
  /** Sponsorship deck PDF served from /public. Set to null to stop offering it. */
  sponsorDeck: '/DeFy27-Sponsorship-Deck.pdf' as string | null,
}

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/daovitcc/' },
  { label: 'Instagram', href: 'https://www.instagram.com/daovitcc/' },
  { label: 'X', href: 'https://x.com/daovitcc' },
] as const

export const CONTACT = {
  emails: ['chennai.daocommunity@vit.ac.in', 'bic.vitchennai@gmail.com'],
  phones: [
    { name: 'Nitish Kumar', number: '+91 92824 28826' },
    { name: 'Srivats', number: '+91 98409 82968' },
  ],
  handles: ['@daocommunity_', '@bic_vitc'],
}
