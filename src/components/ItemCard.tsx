import { MessageCircle, Plus } from "lucide-react";
import type { Item } from "@/data/cardapio";
import { brl, waLink } from "@/data/negocio";
import { Foto } from "./Foto";

export const perguntar = (nome: string) => waLink(`Olá! Gostaria de saber o preço e as opções de: ${nome}`);

export function ItemCard({ item, onOpen }: { item: Item; onOpen: (i: Item) => void }) {
  return (
    <article className="glass flex gap-3 p-3">
      <button onClick={() => onOpen(item)} className="shrink-0" aria-label={`Ver detalhes de ${item.nome}`}>
        <Foto nome={item.imagem} alt={item.nome} className="h-24 w-24 rounded-xl" />
      </button>
      <div className="flex min-w-0 flex-1 flex-col">
        <button onClick={() => onOpen(item)} className="text-left">
          {item.destaque && <span className="badge-ember mb-1">Destaque</span>}
          <h3 className="font-display text-base leading-tight text-cream">{item.nome}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-cream-2">{item.descricao}</p>
        </button>
        <div className="mt-auto pt-2">
          {item.preco == null ? (
            <a href={perguntar(item.nome)} target="_blank" rel="noreferrer" className="btn-outline w-full min-h-11 text-sm">
              <MessageCircle className="h-4 w-4" />Consulte no WhatsApp
            </a>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-gold-light">{brl(item.preco)}</span>
              <button onClick={() => onOpen(item)} className="btn-gold min-h-11 px-4 text-sm"><Plus className="h-4 w-4" />Adicionar</button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
