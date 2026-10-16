export function Titulo({ rotulo, titulo, sub }: { rotulo?: string; titulo: string; sub?: string }) {
  return (
    <div className="mb-6 px-5 text-center">
      {rotulo && <p className="font-serif-it text-lg text-gold">{rotulo}</p>}
      <h2 className="font-display text-2xl font-bold gold-text text-balance">{titulo}</h2>
      {sub && <p className="mx-auto mt-2 max-w-sm text-sm text-cream-2 text-pretty">{sub}</p>}
    </div>
  );
}
