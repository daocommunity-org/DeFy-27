// Vector marks traced from the DeFy'27 sponsorship deck (cover slide).
// Fill is currentColor, so colour them with CSS.

type MarkProps = { className?: string; title?: string }

export function Mark27({ className, title = "27" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 1433 415" role="img" aria-label={title}>
      <path fill="currentColor" fillRule="evenodd" d="M738,31 738,138 757,127 778,119 816,111 860,107 1190,107 1207,109 1215,112 1228,121 1238,136 1237,153 1229,164 1222,170 1222,173 979,411 979,413 1131,413 1416,150 1425,139 1432,121 1431,70 1427,57 1417,38 1404,24 1391,15 1371,6 1351,1 830,0 800,4 772,12 760,17ZM1,31 1,138 28,123 51,116 72,112 123,107 311,107 371,109 393,111 405,115 414,115 428,119 432,123 432,132 428,136 380,158 376,157 367,161 362,161 361,163 340,168 339,170 331,170 328,173 318,174 304,179 301,178 300,180 62,239 48,244 31,253 13,269 3,287 1,296 1,335 4,353 13,372 24,384 43,398 62,407 80,412 116,414 696,413 696,304 454,302 453,300 440,300 428,297 418,297 411,294 403,294 402,292 396,291 387,283 389,278 396,271 407,267 414,261 427,258 434,253 445,251 452,247 461,245 464,242 473,241 479,237 485,237 495,232 536,219 612,188 643,172 663,159 687,137 695,119 695,78 693,67 688,53 679,37 669,26 652,14 630,5 605,0 92,0 54,6 32,13 17,20Z" />
    </svg>
  )
}

export function DefyWordmark({ className, title = "Defy" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 480 108" role="img" aria-label={title}>
      <path fill="currentColor" fillRule="evenodd" d="M358,102 374,106 399,107 413,105 428,99 442,86 470,41 479,23 459,24 432,69 403,69 375,23 356,23 371,51 390,81 422,82 415,88 403,92 375,92 358,88ZM127,36 127,68 130,74 138,80 231,81 239,79 243,76 243,63 233,66 150,66 145,61 146,59 235,58 239,56 243,50 243,34 239,28 227,23 143,23 133,27ZM144,44 150,38 224,38 226,40 224,45ZM0,11 0,81 100,81 106,79 114,72 117,65 117,27 114,21 107,14 97,11ZM17,31 19,29 93,29 100,36 100,56 97,61 91,64 19,64 17,62ZM249,23 249,41 260,40 262,42 262,81 280,81 280,41 350,40 349,23 280,22 281,18 284,16 349,19 348,5 275,0 270,2 265,7 263,11 262,23Z" />
    </svg>
  )
}

/** The outlined diagonal arrow that recurs through the deck. */
export function DeckArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-2 -2 424 393" aria-hidden="true" fill="none">
      <path
        pathLength={1}
        d="M69 0H350L419 60V329L350 388V115L58 388H0V339L298 60H0Z"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
  )
}
