import { useEffect, useState } from "react";
import { Minus, Plus, MessageCircle } from "lucide-react";
import type { Item } from "@/data/cardapio";
import { brl } from "@/data/negocio";
import { useCart } from "@/lib/cart";
import { Sheet } from "./Sheet";
import { Foto } from "./Foto";
import { perguntar } from "./ItemCard";

export function ItemModal({ item, onClose }: { item: Item | null; onClose: () => void }) {
  const { add } = useCart();
  const [qtd, setQtd] = useState(1);
  const [obs, setObs] = useState("");
  useEffect(() => { setQtd(1); setObs(""); }, [item]);
  if (!item) return null;
  return (
    <Sheet aberto onClose={onClose} titulo={item.nome}
      rodape={item.preco == null ? (
        <a href={perguntar(item.nome)} target="_blank" rel="noreferrer" className="btn-gold w-full"><MessageCircle className="h-4 w-4" />Perguntar no WhatsApp</a>
      ) : (
        <button className="btn-gold w-full" onClick={() => { add({ id: item.id, nome: item.nome, preco: item.preco, qtd, obs: obs.trim() || undefined }); onClose(); }}>
          Adicionar · {brl(item.preco * qtd)}
        </button>
      )}>
      <Foto nome={item.imagem} alt={item.nome} className="aspect-square w-full rounded-2xl" eager />
      <p className="mt-4 text-cream-2 text-pretty">{item.descricao}</p>
      <p className="mt-2 font-semibold text-gold-light">{item.preco == null ? "Consulte" : brl(item.preco)}</p>
      {item.preco != null && (
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button className="btn-icon border border-gold/30" aria-label="Diminuir" onClick={() => setQtd(Math.max(1, qtd - 1))}><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center text-xl">{qtd}</span>
            <button className="btn-icon border border-gold/30" aria-label="Aumentar" onClick={() => setQtd(qtd + 1)}><Plus className="h-4 w-4" /></button>
          </div>
          <textarea rows={2} value={obs} onChange={(e) => setObs(e.target.value)} placeholder='Observação (ex.: "ao ponto", "sem pimenta")' aria-label="Observação"
            className="w-full rounded-xl border border-gold/25 bg-navy/60 p-3 text-cream placeholder:text-cream-2/60 focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
      )}
    </Sheet>
  );
}
