const S: [number, number, number, string?][] = [
  [30, 20, 1.6], [42, 24, 1.4], [50, 20, 1.6], [62, 24, 1.4], [70, 20, 1.6],
  [38, 42, 1.8, "#FFB27A"], [50, 44, 2.2, "#FFB27A"], [62, 42, 1.8],
  [44, 66, 1.4], [50, 68, 1.4], [56, 66, 1.4],
  [40, 92, 1.6], [50, 96, 2.0, "#CFE3FF"], [60, 92, 1.6],
  [30, 120, 1.2], [70, 120, 1.2],
];
const L: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [4, 7],
  [5, 6], [6, 7],
  [5, 8], [7, 10],
  [8, 9], [9, 10],
  [8, 11], [10, 12],
  [11, 13], [12, 14],
];

export function Orion({ className = "", animado = true, mini = false }: { className?: string; animado?: boolean; mini?: boolean }) {
  return (
    <svg viewBox={mini ? "20 8 72 112" : "0 0 100 150"} className={className} aria-hidden="true">
      <defs>
        <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation={mini ? 1.2 : 1.6} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="#E5C158" strokeWidth={mini ? 1 : 0.4} opacity={mini ? 0.8 : 0.55} fill="none">
        {L.map(([a, b], i) => (
          <line key={i} x1={S[a]![0]} y1={S[a]![1]} x2={S[b]![0]} y2={S[b]![1]} pathLength={1}
            className={animado ? "orion-line" : ""} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </g>
      {S.map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={mini ? r * 1.6 : r} fill={c ?? "#F2D98B"} filter="url(#glow)"
          className={animado ? "orion-star" : ""} style={{ animationDelay: `${(i % 5) * 0.7}s` }} />
      ))}
    </svg>
  );
}

export function Divisor() {
  return (
    <div className="my-10 flex items-center gap-3 px-6" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <Orion mini animado={false} className="h-8 w-6" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}
