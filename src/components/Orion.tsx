const S: [number, number, number, string?][] = [
  [30, 30, 2.0, "#FF8C42"], // Betelgeuse (ombro esquerdo, laranja)
  [70, 30, 1.6],            // Bellatrix (ombro direito)
  [40, 55, 1.6],            // Alnitak (cinturão)
  [50, 55, 1.8],            // Alnilam (cinturão, central)
  [60, 55, 1.6],            // Mintaka (cinturão)
  [47, 68, 1.2, "#CFE3FF"], // Espada 1
  [50, 78, 1.4, "#CFE3FF"], // Espada 2 (central)
  [53, 88, 1.2, "#CFE3FF"], // Espada 3
  [35, 108, 1.6],           // Saiph (pé esquerdo)
  [65, 108, 2.0, "#CFE3FF"],// Rigel (pé direito, azul-branco)
];
const L: [number, number][] = [
  [0, 2], // Betelgeuse - Alnitak
  [1, 4], // Bellatrix - Mintaka
  [2, 3], [3, 4], // Cinturão (3 estrelas alinhadas)
  [3, 6], // Alnilam - Espada
  [5, 6], [6, 7], // Espada vertical
  [0, 8], // Betelgeuse - Saiph
  [1, 9], // Bellatrix - Rigel
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
