import { DEFY26_PHOTOS } from '../data/archive'

// DeFy'26 photos in a block grid. Each frame is covered by lime pixels that
// dissolve cell by cell when it scrolls in; the photo drifts a little inside
// its frame (parallax) and the caption rises on hover.

const COLS = 8
const ROWS = 6
// fixed pseudo-random order so the dissolve looks scattered but is stable
const ORDER = Array.from({ length: COLS * ROWS }, (_, i) => ((i * 29) % (COLS * ROWS)) / (COLS * ROWS))

export function Gallery() {
  return (
    <>
    <div className="gallery rail-m">
      {DEFY26_PHOTOS.map((p) => (
        <figure key={p.src} className={`ph ph--${p.slot} chamfer`} data-reveal>
          <div className="ph__img">
            <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" data-speed="0.06" />
          </div>
          <div className="ph__px" aria-hidden="true">
            {ORDER.map((d, i) => (
              <span key={i} style={{ ['--d' as string]: d }} />
            ))}
          </div>
          <figcaption className="ph__cap">
            <span className="ph__k">DeFy&rsquo;26</span>
            {p.caption}
          </figcaption>
        </figure>
      ))}
    </div>
    <p className="swipe" aria-hidden="true">Swipe for more photos</p>
    </>
  )
}
