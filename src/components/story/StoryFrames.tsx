const lime = "#b4f01b";
const copper = "#e09a55";
const beige = "#f0ebe1";

function GlowDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id={`${id}-dusk`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#161228" />
        <stop offset="0.5" stopColor="#5c3044" />
        <stop offset="1" stopColor="#e09050" />
      </linearGradient>
    </defs>
  );
}

function Pcb({ glowId, x = 210, y = 118 }: { glowId: string; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="220" height="140" fill="#243528" />
      <rect x="8" y="8" width="204" height="124" fill="#6e8148" />
      <path d="M28 108h70v-36h48" fill="none" stroke={copper} strokeWidth="5" />
      <path d="M36 40h64v28" fill="none" stroke={copper} strokeWidth="5" />
      <path d="M150 48h36" fill="none" stroke={copper} strokeWidth="5" />
      <rect x="40" y="58" width="46" height="32" fill="#161816" />
      <rect x="112" y="96" width="22" height="10" fill="#2a241c" />
      <circle cx="186" cy="48" r="8" fill={lime} filter={`url(#${glowId})`} />
      <circle cx="16" cy="16" r="4" fill="#141816" />
      <circle cx="204" cy="16" r="4" fill="#141816" />
      <circle cx="16" cy="124" r="4" fill="#141816" />
      <circle cx="204" cy="124" r="4" fill="#141816" />
    </g>
  );
}

export function FrameArt({ beat, className = "" }: { beat: number; className?: string }) {
  const id = `story-glow-${beat}`;
  const frame = beat === 8 ? 0 : beat;

  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-[#0c1a14] ${className}`}>
      <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
        <GlowDefs id={id} />
        {frame === 0 ? (
          <>
            <rect width="640" height="400" fill="#0c1a14" />
            <ellipse cx="320" cy="200" rx="180" ry="110" fill={lime} opacity="0.13" />
            <Pcb glowId={id} />
          </>
        ) : null}
        {frame === 1 ? (
          <>
            <rect width="640" height="400" fill={`url(#${id}-dusk)`} />
            <rect y="250" width="640" height="150" fill="#3a3424" />
            {Array.from({ length: 28 }, (_, i) => (
              <rect
                key={i}
                x={30 + i * 21}
                y={188 + (i % 4) * 10}
                width="3"
                height={62 - (i % 5) * 6}
                fill={i % 3 === 0 ? "#d2c08a" : "#a88448"}
              />
            ))}
            <circle cx="180" cy="150" r="18" fill="#c4b8ae" opacity="0.35" />
            <circle cx="240" cy="120" r="26" fill="#c4b8ae" opacity="0.28" />
            <circle cx="400" cy="140" r="20" fill="#c4b8ae" opacity="0.3" />
            <circle cx="520" cy="168" r="10" fill="#ffb060" />
          </>
        ) : null}
        {frame === 2 ? (
          <>
            <rect width="640" height="400" fill="#14120e" />
            {Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={320 + Math.cos(a) * 40}
                  y1={200 + Math.sin(a) * 24}
                  x2={320 + Math.cos(a) * (120 + (i % 3) * 16)}
                  y2={200 + Math.sin(a) * (70 + (i % 4) * 10)}
                  stroke={i % 2 === 0 ? "#e2c56a" : "#8ea04a"}
                  strokeWidth="3"
                />
              );
            })}
            <path d="M120 300c40-80 80-40 100-120" fill="none" stroke="#c4a15a" strokeWidth="4" />
            <path d="M500 310c-30-90-70-40-90-130" fill="none" stroke="#a88448" strokeWidth="4" />
          </>
        ) : null}
        {frame === 3 ? (
          <>
            <rect width="640" height="400" fill="#101614" />
            <rect x="120" y="78" width="400" height="28" fill="#3e4642" />
            <rect x="150" y="168" width="340" height="16" fill="#6e8148" />
            {Array.from({ length: 14 }, (_, i) => (
              <line
                key={i}
                x1={168 + i * 22}
                y1="176"
                x2={176 + i * 22}
                y2="176"
                stroke="#e2c56a"
                strokeWidth="2"
              />
            ))}
            <rect x="120" y="250" width="400" height="28" fill="#343c38" />
            <path d="M300 106v62M340 106v62" stroke={beige} strokeWidth="2" opacity="0.35" />
          </>
        ) : null}
        {frame === 4 ? (
          <>
            <rect width="640" height="400" fill="#0c1a14" />
            <Pcb glowId={id} />
            <path d="M430 90v-28M470 150v-20M250 70v-24" stroke={copper} strokeWidth="2" opacity="0.7" />
          </>
        ) : null}
        {frame === 5 ? (
          <>
            <rect width="640" height="400" fill="#0c1a14" />
            <ellipse cx="320" cy="210" rx="200" ry="120" fill="none" stroke={lime} strokeOpacity="0.35" />
            <Pcb glowId={id} x={210} y={130} />
          </>
        ) : null}
        {frame === 6 ? (
          <>
            <rect width="640" height="400" fill="#14120f" />
            <line x1="320" y1="36" x2="320" y2="364" stroke={beige} strokeOpacity="0.2" />
            <g transform="translate(36 150) rotate(-18)">
              <rect width="180" height="100" fill="#0e6b3c" />
              <path d="M16 70h60v-24h40" fill="none" stroke="#d4b15a" strokeWidth="4" />
            </g>
            <rect x="70" y="250" width="70" height="22" fill="#3d4a3a" transform="rotate(-8 70 250)" />
            <rect x="120" y="268" width="54" height="16" fill="#2c2c28" />
            <rect x="48" y="272" width="40" height="14" fill="#5c5346" />
            <text x="90" y="80" fill={beige} opacity="0.7" fontSize="18" fontFamily="Raleway, sans-serif">
              FR-4
            </text>
            <g transform="translate(390 130)">
              <rect width="180" height="112" fill="#243528" />
              <rect x="8" y="8" width="164" height="96" fill="#6e8148" />
              <circle cx="150" cy="28" r="7" fill={lime} filter={`url(#${id})`} />
            </g>
            <text x="430" y="80" fill={lime} fontSize="18" fontFamily="Raleway, sans-serif">
              Bisket
            </text>
          </>
        ) : null}
        {frame === 7 ? (
          <>
            <rect width="640" height="400" fill="#1c1712" />
            <ellipse cx="320" cy="280" rx="180" ry="36" fill="#3a2a1c" />
            <rect x="200" y="250" width="36" height="10" fill="#6e8148" transform="rotate(-20 200 250)" />
            <rect x="360" y="246" width="42" height="10" fill="#6e8148" transform="rotate(16 360 246)" />
            <rect x="300" y="258" width="28" height="8" fill="#243528" />
            <path d="M320 250v-70" stroke="#3f6b32" strokeWidth="4" />
            <path d="M320 200c-28 8-36-20-20-36" fill="#6ea84a" />
            <path d="M320 186c26 4 34-22 16-34" fill="#8fbf3a" />
            <circle cx="318" cy="168" r="6" fill={lime} />
          </>
        ) : null}
      </svg>
    </div>
  );
}
