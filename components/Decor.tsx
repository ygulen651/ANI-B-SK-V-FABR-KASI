/** Dalga bölüm geçişi. `from` üstteki, `to` alttaki zemin rengidir. */
export function Wave({
  color,
  className = "",
  flip = false,
  animated = false,
  variant = 0,
}: {
  color: string;
  className?: string;
  flip?: boolean;
  animated?: boolean;
  variant?: 0 | 1 | 2;
}) {
  const paths = [
    "M0 40 C 120 10 240 10 360 40 S 600 70 720 40 S 960 10 1080 40 S 1320 70 1440 40 V80 H0 Z",
    "M0 50 C 160 0 320 0 480 40 S 800 80 960 40 S 1280 0 1440 30 V80 H0 Z",
    "M0 30 C 180 70 360 70 540 35 S 900 0 1080 35 S 1300 60 1440 40 V80 H0 Z",
  ];
  const d = paths[variant];
  return (
    <div aria-hidden className={`pointer-events-none relative h-[42px] w-full overflow-hidden sm:h-[64px] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
        className={`absolute inset-y-0 left-0 h-full w-[200%] ${animated ? "wave-drift no-mobile-motion" : ""}`}
      >
        <path d={d} fill={color} />
        <path d={d} fill={color} transform="translate(1440 0)" />
      </svg>
    </div>
  );
}

/** Ölçülü bisküvi/çikolata kırıntıları */
export function Crumbs({ className = "", tone = "choco" }: { className?: string; tone?: "choco" | "cream" | "red" }) {
  const c = tone === "cream" ? "var(--cream-50)" : tone === "red" ? "var(--ani-red)" : "var(--choco-700)";
  const g = tone === "cream" ? "var(--cream-300)" : "var(--c-biskuvi)";
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={`pointer-events-none ${className}`}>
      <path d="M30 40 l9 -4 6 7 -3 9 -10 1 z" fill={g} opacity=".9" />
      <path d="M150 30 l7 2 2 7 -6 4 -6 -4 z" fill={c} opacity=".75" />
      <circle cx="170" cy="120" r="4" fill={c} opacity=".55" />
      <path d="M60 150 l11 -2 4 9 -8 6 -9 -5 z" fill={c} opacity=".8" />
      <circle cx="110" cy="80" r="3" fill={g} />
      <path d="M120 175 l6 -1 2 5 -5 3 -4 -3 z" fill={g} opacity=".9" />
      <circle cx="20" cy="110" r="2.5" fill={c} opacity=".6" />
    </svg>
  );
}

/** Bisküvi deseni gibi duran dekoratif rozet */
export function CookieBadge({ className = "", fill = "var(--c-biskuvi)" }: { className?: string; fill?: string }) {
  const teeth = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return `${(100 + Math.cos(a) * 92).toFixed(2)},${(100 + Math.sin(a) * 92).toFixed(2)}`;
  });
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className}>
      <polygon points={teeth.join(" ")} fill={fill} />
      <circle cx="100" cy="100" r="86" fill={fill} />
      {[...Array(12)].map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={(100 + Math.cos(a) * 62).toFixed(2)} cy={(100 + Math.sin(a) * 62).toFixed(2)} r="4" fill="rgba(91,51,29,.35)" />;
      })}
      <circle cx="100" cy="100" r="5" fill="rgba(91,51,29,.35)" />
    </svg>
  );
}

export function Arrow({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`btn-icon ${className}`}>
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
