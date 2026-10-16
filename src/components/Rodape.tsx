import { Orion } from "./Orion";
import { negocio } from "@/data/negocio";

export function Rodape() {
  return (
    <footer className="mt-12 border-t border-gold/15 px-6 pb-6 pt-10 text-center">
      <Orion className="mx-auto h-28 w-20" animado={false} />
      <p className="mt-3 font-display text-2xl tracking-[0.2em] gold-text">ORION</p>
      <p className="font-serif-it text-gold">{negocio.slogan}</p>
      <div className="mt-4 space-y-1 text-sm text-cream-2">
        <p><a href={negocio.telefoneLink} className="hover:text-gold">{negocio.telefoneExibicao}</a></p>
        <p>{negocio.endereco}</p>
        {negocio.instagram && <p><a href={negocio.instagram} className="hover:text-gold">Instagram</a></p>}
      </div>
      <p className="mt-6 text-xs text-cream-2/70">Site por NeuroDyne</p>
    </footer>
  );
}
