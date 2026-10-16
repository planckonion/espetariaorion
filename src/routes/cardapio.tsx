import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, LayoutGrid } from "lucide-react";
import { categorias, type Item } from "@/data/cardapio";
import { Icone } from "@/components/Icone";
import { ItemCard } from "@/components/ItemCard";
import { ItemModal } from "@/components/ItemModal";
import { Sheet } from "@/components/Sheet";
import { Titulo } from "@/components/Titulo";
import { Rodape } from "@/components/Rodape";

const t = "Cardápio — Espetaria Orion | Uberlândia/MG";
const d = "Espetos de carne bovina, frango com bacon, medalhão, coração, linguiça, porções e bebidas. Peça pelo WhatsApp.";
export const Route = createFileRoute("/cardapio")({
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Cardapio,
});

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Cardapio() {
  const [q, setQ] = useState("");
  const [atual, setAtual] = useState(categorias[0]!.id);
  const [sheet, setSheet] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  const lista = useMemo(() => categorias
    .map((c) => ({ ...c, itens: c.itens.filter((i) => !q || norm(i.nome + c.nome + i.descricao).includes(norm(q))) }))
    .filter((c) => c.itens.length), [q]);

  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setAtual(e.target.id)), { rootMargin: "-120px 0px -65% 0px" });
    document.querySelectorAll("[data-cat]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [lista]);

  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  const ir = (id: string) => { setSheet(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const nomeAtual = categorias.find((c) => c.id === atual)?.nome;

  return (
    <>
      <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-30 border-b border-gold/15 bg-sky/85 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar no cardápio" aria-label="Buscar no cardápio"
              className="h-11 w-full rounded-xl border border-gold/25 bg-navy/60 pl-9 pr-3 text-sm text-cream placeholder:text-cream-2/60 focus:outline-none focus:ring-2 focus:ring-gold" />
          </label>
          <button onClick={() => setSheet(true)} className="btn-outline min-h-11 px-3 text-sm"><LayoutGrid className="h-4 w-4" />Categorias</button>
        </div>
        <p className="mt-1 truncate text-center font-serif-it text-sm text-gold" aria-live="polite">{nomeAtual}</p>
      </div>

      <div className="pt-6">
        <Titulo rotulo="Feito na brasa" titulo="Cardápio" sub="Toque em um item para ver detalhes. Preços sob consulta no WhatsApp." />
        <div className="grid grid-cols-2 gap-2 px-5">
          {categorias.map((c) => (
            <button key={c.id} onClick={() => ir(c.id)} className="glass flex min-h-14 items-center gap-2 px-3 text-left text-sm text-cream">
              <Icone nome={c.icone} className={`h-5 w-5 shrink-0 ${c.id === "destaque" ? "text-ember" : "text-gold"}`} />
              <span className="min-w-0">{c.nome}</span>
            </button>
          ))}
        </div>

        {lista.length === 0 && <p className="mt-10 px-5 text-center text-cream-2">Nada encontrado para “{q}”.</p>}
        {lista.map((c) => (
          <section key={c.id} id={c.id} data-cat className="scroll-mt-36 px-5 pt-10">
            <h2 className="mb-4 text-center font-display text-xl gold-text">{c.id === "destaque" ? "Destaque da casa" : c.nome}</h2>
            <div className="space-y-3">{c.itens.map((i) => <ItemCard key={i.id} item={i} onOpen={setItem} />)}</div>
          </section>
        ))}
      </div>

      <Rodape />
      <Sheet aberto={sheet} onClose={() => setSheet(false)} titulo="Categorias" alto={false}>
        <div className="grid grid-cols-2 gap-2 pb-4">
          {categorias.map((c) => (
            <button key={c.id} onClick={() => ir(c.id)} className={`chip flex items-center gap-2 text-left ${atual === c.id ? "chip-on" : ""}`}>
              <Icone nome={c.icone} className="h-4 w-4 shrink-0" />{c.nome}
            </button>
          ))}
        </div>
      </Sheet>
      <ItemModal item={item} onClose={() => setItem(null)} />
    </>
  );
}
