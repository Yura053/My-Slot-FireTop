import { NAMES, type Sym } from "@/lib/slot/config";

const SHAPES: Record<Sym, React.ReactNode> = {
  cherry: (
    <>
      <path
        d="M50 18 Q36 38 30 64 M50 18 Q62 38 68 62"
        stroke="#2e7d32"
        strokeWidth="4"
        fill="none"
      />
      <ellipse cx="62" cy="20" rx="14" ry="7" fill="#43a047" />
      <circle cx="30" cy="72" r="17" fill="#d32f2f" />
      <circle cx="68" cy="70" r="17" fill="#c62828" />
      <circle cx="24" cy="66" r="4" fill="#ff8a80" />
      <circle cx="62" cy="64" r="4" fill="#ff8a80" />
    </>
  ),
  plum: (
    <>
      <ellipse cx="50" cy="58" rx="30" ry="26" fill="#7b3fa0" />
      <ellipse cx="40" cy="50" rx="8" ry="5" fill="#b388d6" />
      <path
        d="M50 32 Q52 20 58 16"
        stroke="#4e342e"
        strokeWidth="3"
        fill="none"
      />
      <ellipse
        cx="68"
        cy="24"
        rx="14"
        ry="7"
        fill="#43a047"
        transform="rotate(-25 68 24)"
      />
    </>
  ),
  melon: (
    <>
      <path d="M10 36 A40 40 0 0 0 90 36 Z" fill="#2e7d32" />
      <path d="M18 36 A32 32 0 0 0 82 36 Z" fill="#e53950" />
      <circle cx="38" cy="48" r="2.5" fill="#222" />
      <circle cx="50" cy="56" r="2.5" fill="#222" />
      <circle cx="62" cy="48" r="2.5" fill="#222" />
      <circle cx="50" cy="42" r="2.5" fill="#222" />
    </>
  ),
  bell: (
    <>
      <path
        d="M50 12 C34 12 30 32 30 48 L20 72 L80 72 L70 48 C70 32 66 12 50 12 Z"
        fill="#e0a82e"
        stroke="#9a6b00"
        strokeWidth="2"
      />
      <circle cx="50" cy="80" r="8" fill="#c68a00" />
      <ellipse cx="42" cy="36" rx="5" ry="12" fill="#f7d774" />
    </>
  ),
  star: (
    <polygon
      points="50,8 61,38 93,38 67,57 77,90 50,70 23,90 33,57 7,38 39,38"
      fill="#f5c518"
      stroke="#b8860b"
      strokeWidth="3"
    />
  ),
  bar: (
    <>
      <rect
        x="8"
        y="28"
        width="84"
        height="44"
        rx="6"
        fill="#4a4a4a"
        stroke="#d0d0d0"
        strokeWidth="3"
      />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        fill="#fff"
        fontFamily="Arial, sans-serif"
      >
        BAR
      </text>
    </>
  ),
  seven: (
    <text
      x="50"
      y="82"
      textAnchor="middle"
      fontSize="96"
      fontWeight="700"
      fill="#e53935"
      stroke="#ff9800"
      strokeWidth="3"
      fontFamily="Arial, sans-serif"
    >
      7
    </text>
  ),
};

export default function Symbol({ name }: { name: Sym }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={NAMES[name]}>
      {SHAPES[name]}
    </svg>
  );
}
