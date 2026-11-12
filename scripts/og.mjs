// Renders public/og.png (1200×630), the social-share card, with no
// dependencies: polygons for the Defy/27 marks, a 5×7 pixel font, a glyph
// mosaic, then a hand-rolled PNG encoder. Run: node scripts/og.mjs
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const W = 1200
const H = 630
const S = 2 // supersample
const BW = W * S
const BH = H * S
const buf = new Float32Array(BW * BH * 3)

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const BG = hex('#080907')
const LIME = hex('#a3f552')
const INK = hex('#eef0e8')
const VIOLET = hex('#a58bff')
const GRID = hex('#141a10')
const DIM = hex('#3c4a2c')

function px(x, y, c, a = 1) {
  if (x < 0 || y < 0 || x >= BW || y >= BH) return
  const i = (y * BW + x) * 3
  buf[i] += (c[0] - buf[i]) * a
  buf[i + 1] += (c[1] - buf[i + 1]) * a
  buf[i + 2] += (c[2] - buf[i + 2]) * a
}
function rect(x, y, w, h, c, a = 1) {
  const x0 = Math.round(x * S)
  const y0 = Math.round(y * S)
  const x1 = Math.round((x + w) * S)
  const y1 = Math.round((y + h) * S)
  for (let j = y0; j < y1; j++) for (let i = x0; i < x1; i++) px(i, j, c, a)
}
function ring(x, y, s, c, t = 2) {
  rect(x, y, s, t, c)
  rect(x, y + s - t, s, t, c)
  rect(x, y, t, s, c)
  rect(x + s - t, y, t, s, c)
}

// even-odd scanline fill of polygon paths ("M x,y x,y ... Z M ...")
function fillPath(d, ox, oy, scale, c) {
  const polys = d
    .split('Z')
    .map((p) => p.replace('M', '').trim())
    .filter(Boolean)
    .map((p) => p.split(/\s+/).map((pt) => pt.split(',').map(Number)))
  const edges = []
  for (const poly of polys)
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i]
      const [x2, y2] = poly[(i + 1) % poly.length]
      edges.push([ox + x1 * scale, oy + y1 * scale, ox + x2 * scale, oy + y2 * scale])
    }
  let minY = Infinity
  let maxY = -Infinity
  for (const e of edges) {
    minY = Math.min(minY, e[1], e[3])
    maxY = Math.max(maxY, e[1], e[3])
  }
  for (let sy = Math.floor(minY * S); sy <= Math.ceil(maxY * S); sy++) {
    const y = (sy + 0.5) / S
    const xs = []
    for (const [x1, y1, x2, y2] of edges) {
      if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y)) xs.push(x1 + ((y - y1) / (y2 - y1)) * (x2 - x1))
    }
    xs.sort((a, b) => a - b)
    for (let k = 0; k + 1 < xs.length; k += 2) for (let sx = Math.round(xs[k] * S); sx < Math.round(xs[k + 1] * S); sx++) px(sx, sy, c)
  }
}

const DEFY =
  'M358,102 374,106 399,107 413,105 428,99 442,86 470,41 479,23 459,24 432,69 403,69 375,23 356,23 371,51 390,81 422,82 415,88 403,92 375,92 358,88ZM127,36 127,68 130,74 138,80 231,81 239,79 243,76 243,63 233,66 150,66 145,61 146,59 235,58 239,56 243,50 243,34 239,28 227,23 143,23 133,27ZM144,44 150,38 224,38 226,40 224,45ZM0,11 0,81 100,81 106,79 114,72 117,65 117,27 114,21 107,14 97,11ZM17,31 19,29 93,29 100,36 100,56 97,61 91,64 19,64 17,62ZM249,23 249,41 260,40 262,42 262,81 280,81 280,41 350,40 349,23 280,22 281,18 284,16 349,19 348,5 275,0 270,2 265,7 263,11 262,23Z'
const N27 =
  'M738,31 738,138 757,127 778,119 816,111 860,107 1190,107 1207,109 1215,112 1228,121 1238,136 1237,153 1229,164 1222,170 1222,173 979,411 979,413 1131,413 1416,150 1425,139 1432,121 1431,70 1427,57 1417,38 1404,24 1391,15 1371,6 1351,1 830,0 800,4 772,12 760,17ZM1,31 1,138 28,123 51,116 72,112 123,107 311,107 371,109 393,111 405,115 414,115 428,119 432,123 432,132 428,136 380,158 376,157 367,161 362,161 361,163 340,168 339,170 331,170 328,173 318,174 304,179 301,178 300,180 62,239 48,244 31,253 13,269 3,287 1,296 1,335 4,353 13,372 24,384 43,398 62,407 80,412 116,414 696,413 696,304 454,302 453,300 440,300 428,297 418,297 411,294 403,294 402,292 396,291 387,283 389,278 396,271 407,267 414,261 427,258 434,253 445,251 452,247 461,245 464,242 473,241 479,237 485,237 495,232 536,219 612,188 643,172 663,159 687,137 695,119 695,78 693,67 688,53 679,37 669,26 652,14 630,5 605,0 92,0 54,6 32,13 17,20Z'

// 5×7 pixel font
const F = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.####', '#....', '#....', '#....', '#....', '#....', '.####'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  6: ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'],
  G: ['.####', '#....', '#....', '#.###', '#...#', '#...#', '.####'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  0: ['.###.', '#..##', '#.#.#', '##..#', '#...#', '#...#', '.###.'],
  1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  3: ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
  7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  9: ['.###.', '#...#', '#...#', '.####', '....#', '....#', '.###.'],
  '-': ['.....', '.....', '.....', '.###.', '.....', '.....', '.....'],
  '·': ['.....', '.....', '.....', '..#..', '.....', '.....', '.....'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
}
function text(str, x, y, u, c) {
  let cx = x
  for (const ch of str) {
    const g = F[ch] ?? F[' ']
    g.forEach((row, j) => [...row].forEach((b, i) => b === '#' && rect(cx + i * u, y + j * u, u * 0.86, u * 0.86, c)))
    cx += 6 * u
  }
  return cx
}
const textW = (str, u) => str.length * 6 * u - u

// deterministic hash for the mosaic
const hash = (x, y) => {
  let h = (x * 374761393 + y * 668265263) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

/* ── compose ── */
for (let i = 0; i < BW * BH; i++) buf.set(BG, i * 3)
for (let x = 0; x < W; x += 60) rect(x, 0, 1, H, GRID)
for (let y = 0; y < H; y += 60) rect(0, y, W, 1, GRID)

// glyph mosaic on the right, denser towards the edge
const C = 26
for (let gy = 0; gy < H / C; gy++)
  for (let gx = 0; gx < W / C; gx++) {
    const x = gx * C
    const y = gy * C
    if (x < 700) continue
    const d = (x - 700) / 500
    const v = hash(gx, gy) * 0.55 + d * 0.6
    const k = hash(gy, gx)
    if (v > 0.98) rect(x + 2, y + 2, C - 4, C - 4, LIME)
    else if (v > 0.82) ring(x + 6, y + 6, C - 12, LIME, 2)
    else if (v > 0.68) {
      rect(x + C / 2 - 1, y + 7, 2, C - 14, k > 0.5 ? LIME : DIM)
      rect(x + 7, y + C / 2 - 1, C - 14, 2, k > 0.5 ? LIME : DIM)
    } else if (v > 0.55) rect(x + C / 2 - 1.5, y + C / 2 - 1.5, 3, 3, DIM)
  }
// big pixel blocks (as on the site hero)
const blk = ['..######', '..######', '######..', '######..', '##..####', '##..####', '########']
blk.forEach((r, j) => [...r].forEach((b, i) => b === '#' && rect(930 + i * 30, 70 + j * 30, 30.5, 30.5, LIME)))
;['##..', '####', '..##', '####'].forEach((r, j) => [...r].forEach((b, i) => b === '#' && rect(840 + i * 18, 420 + j * 18, 18.5, 18.5, VIOLET)))

// wordmark
fillPath(DEFY, 70, 120, 1.18, INK)
fillPath(N27, 655, 108, 0.115, LIME)

// copy, in pixel type
text('WEB3 HACKATHON', 74, 300, 6, LIME)
text('9-10 JAN 2027 · VIT CHENNAI', 74, 372, 4, INK)
const pill = 'REGISTRATIONS OPEN'
rect(70, 470, textW(pill, 4) + 40, 64, LIME)
text(pill, 90, 488, 4, BG)
text('ENTRY FREE · TEAMS OF 4-6', 74, 560, 3, INK)

/* ── downsample + PNG ── */
const raw = Buffer.alloc((W * 3 + 1) * H)
for (let y = 0; y < H; y++) {
  raw[y * (W * 3 + 1)] = 0
  for (let x = 0; x < W; x++)
    for (let c = 0; c < 3; c++) {
      let s = 0
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) s += buf[((y * S + j) * BW + (x * S + i)) * 3 + c]
      raw[y * (W * 3 + 1) + 1 + x * 3 + c] = Math.round(s / (S * S))
    }
}
const crcT = new Uint32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc = (b) => {
  let c = 0xffffffff
  for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type), data])
  const c = Buffer.alloc(4)
  c.writeUInt32BE(crc(td))
  return Buffer.concat([len, td, c])
}
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8
ihdr[9] = 2
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))])
writeFileSync(new URL('../public/og.png', import.meta.url), png)
console.log(`public/og.png ${png.length} bytes`)
