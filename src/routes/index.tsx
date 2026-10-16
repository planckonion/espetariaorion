import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Music, Tent, PartyPopper, Wifi, Star, MapPin, MessageCircle, CreditCard, Clock, ChevronRight } from "lucide-react";
import { Orion, Divisor } from "@/components/Orion";
import { Foto } from "@/components/Foto";
import { Icone } from "@/components/Icone";
import { Titulo } from "@/components/Titulo";
import { ItemCard } from "@/components/ItemCard";
import { ItemModal } from "@/components/ItemModal";
import { Rodape } from "@/components/Rodape";
import { InstalarBotao } from "@/components/Instalar";
import { categorias, astros, combos, type Item } from "@/data/cardapio";
import { negocio, waLink } from "@/data/negocio";
import { img } from "@/lib/imagens";

const titulo = "Espetaria Orion — Espetos na brasa em Uberlândia/MG";
const desc = "Espetos na brasa, bebida gelada e música ao vivo em Uberlândia/MG. Veja o cardápio, peça pelo WhatsApp e reserve sua mesa.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: desc },
      { property: "og:title", content: titulo },
      { property: "og:description", content: desc },
      { property: "og:type", content: "restaurant" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Restaurant", name: negocio.nome, slogan: negocio.slogan,
        servesCuisine: ["Churrasco", "Espetaria"], telephone: "+55-34-99148-9663", acceptsReservations: true,
        address: { "@type": "PostalAddress", streetAddress: "Av. Araguari", addressLocality: "Uberlândia", addressRegion: "MG", addressCountry: "BR" },
        geo: { "@type": "GeoCoordinates", latitude: -18.9077595, longitude: -48.2776748 },
      }),
    }],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = () => { if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * 0.25}px)`; };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const selos = [
    { i: Music, t: "Música ao vivo" }, { i: Tent, t: "Mesas na cobertura" },
    { i: PartyPopper, t: "Espaço para eventos" }, { i: Wifi, t: "Wi-Fi grátis" },
  ];
  return (
    <section className="relative -mt-[calc(3.5rem+env(safe-area-inset-top))] flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-24 text-center">
      {img("hero-brasa") && (
        <img src={img("hero-brasa")!} alt="Espetos variados na churrasqueira com brasa viva e fagulhas" width={1024} height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-70" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-sky/90 via-sky/40 to-sky" />
      <div ref={ref} className="pointer-events-none absolute inset-x-0 top-10 flex justify-center">
        <Orion className="h-[62vh] max-h-[520px] w-auto opacity-90" />
      </div>
      <div className="relative rise">
        <p className="font-serif-it text-xl text-gold-light">Jantar sob as estrelas</p>
        <h1 className="mt-1 font-display font-bold leading-none">
          <span className="block text-2xl tracking-[0.3em] gold-text">ESPETARIA</span>
          <span className="block text-6xl tracking-[0.15em] shimmer">ORION</span>
        </h1>
        <p className="mt-3 font-serif-it text-2xl text-cream">O sabor da brasa</p>
        <p className="mx-auto mt-3 max-w-xs text-sm text-cream-2 text-pretty">Espetos na brasa, bebida gelada e música ao vivo, para jantar em família e com amigos.</p>
        <div className="mt-6 grid gap-3">
          <Link to="/cardapio" className="btn-gold">Ver cardápio</Link>
          <Link to="/reservar" className="btn-outline">Reservar mesa</Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-2">
          {selos.map(({ i: I, t }) => (
            <li key={t} className="glass flex min-h-12 items-center gap-2 px-3 py-2 text-left text-xs text-cream">
              <I className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />{t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Home() {
  const [aberto, setAberto] = useState<Item | null>(null);
  const espetos = categorias.filter((c) => c.espeto && c.id !== "destaque");
  const outros = categorias.filter((c) => !c.espeto);
  const destaque = categorias.find((c) => c.id === "destaque")!;
  const temHorario = Object.values(negocio.horarios).some(Boolean);

  return (
    <>
      <Hero />
      <div className="mt-6"><InstalarBotao variante="card" /></div>

      <Divisor />
      <section>
        <Titulo rotulo="Direto da brasa" titulo="Nossos espetos" sub="Escolha sua constelação de sabores." />
        <div className="grid grid-cols-2 gap-3 px-5">
          <Link to="/cardapio" hash="destaque" className="glass relative col-span-2 overflow-hidden">
            <Foto nome={destaque.imagem} alt="Espeto de frango com bacon" className="aspect-[16/9] w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-sky via-sky/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-left">
              <span className="badge-ember">Destaque</span>
              <p className="mt-1 font-display text-xl text-cream">Frango com Bacon</p>
            </div>
          </Link>
          {espetos.map((c) => (
            <Link key={c.id} to="/cardapio" hash={c.id} className="glass overflow-hidden">
              <Foto nome={c.imagem} alt={c.nome} className="aspect-square w-full" />
              <p className="flex min-h-12 items-center justify-center gap-1 px-2 text-center font-display text-sm text-cream">{c.nome}</p>
            </Link>
          ))}
        </div>
      </section>

      <Divisor />
      <section>
        <Titulo rotulo="Os mais pedidos" titulo="Os astros da brasa" />
        <div className="grid grid-cols-2 gap-3 px-5">
          {astros.map((i) => (
            <button key={i.id} onClick={() => setAberto(i)} className="glass overflow-hidden text-left">
              <Foto nome={i.imagem} alt={i.nome} className="aspect-square w-full" />
              <div className="p-3">
                <p className="font-display text-sm leading-tight text-cream">{i.nome}</p>
                <p className="mt-1 text-xs text-gold">{i.preco == null ? "Consulte" : ""}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Divisor />
      <section>
        <Titulo rotulo="Para acompanhar" titulo="Acompanhamentos e bebidas" />
        <div className="space-y-3 px-5">{outros.flatMap((c) => c.itens).map((i) => <ItemCard key={i.id} item={i} onOpen={setAberto} />)}</div>
      </section>

      {combos.length > 0 && (
        <><Divisor /><section><Titulo titulo="Combos" /><div className="space-y-3 px-5">{combos.map((i) => <ItemCard key={i.id} item={i} onOpen={setAberto} />)}</div></section></>
      )}

      <Divisor />
      <section className="px-5">
        <div className="glass relative overflow-hidden p-6 text-center">
          <Orion animado={false} className="pointer-events-none absolute -right-6 -top-4 h-56 opacity-40" />
          <p className="font-serif-it text-lg text-gold">Reservas e eventos</p>
          <h2 className="font-display text-2xl font-bold gold-text">Sua noite sob as estrelas</h2>
          <p className="relative mx-auto mt-3 max-w-xs text-sm text-cream-2">Aniversário, resenha ou evento? Reserve sua mesa ou o espaço privativo.</p>
          <Link to="/reservar" className="btn-gold relative mt-5 w-full">Reservar agora</Link>
        </div>
      </section>

      <Divisor />
      <section>
        <Titulo rotulo="Nosso espaço" titulo="Um lugar para todos" />
        {/* CONFIRMAR COM O DONO: substituir pela foto real do carrinho quando enviada */}
        <div className="px-5"><Foto nome="ambiente-mesas" alt="Mesas sob a cobertura à noite com luzes quentes" className="aspect-video w-full rounded-2xl" /></div>
        <ul className="mt-4 grid grid-cols-2 gap-2 px-5">
          {negocio.diferenciais.map((d) => (
            <li key={d.texto} className="glass flex min-h-12 items-center gap-2 px-3 py-2 text-xs text-cream">
              <Icone nome={d.icone} className="h-4 w-4 shrink-0 text-gold" />{d.texto}
            </li>
          ))}
        </ul>
      </section>

      <Divisor />
      <section className="px-5 text-center">
        <Titulo rotulo="Quem veio, aprovou" titulo="Avaliações no Google" />
        <div className="glass p-6">
          <p className="font-display text-5xl gold-text">{negocio.avaliacao.nota.toFixed(1).replace(".", ",")}</p>
          <div className="mt-2 flex justify-center gap-1" aria-label={`Nota ${negocio.avaliacao.nota} de 5`}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
          </div>
          <p className="mt-2 text-sm text-cream-2">{negocio.avaliacao.total} avaliações no Google</p>
          <a href={negocio.avaliacao.url} target="_blank" rel="noreferrer" className="btn-outline mt-4 w-full">Ver avaliações no Google</a>
        </div>
      </section>

      <Divisor />
      <section className="px-5">
        <Titulo rotulo="Venha nos visitar" titulo="Onde estamos" />
        <div className="glass space-y-4 p-5 text-sm">
          <p className="flex gap-3 text-cream"><MapPin className="h-5 w-5 shrink-0 text-gold" />{negocio.endereco}</p>
          <div className="flex gap-3 text-cream">
            <Clock className="h-5 w-5 shrink-0 text-gold" />
            {temHorario ? (
              <ul>{Object.entries(negocio.horarios).filter(([, v]) => v).map(([d, v]) => <li key={d} className="capitalize">{d}: {v}</li>)}</ul>
            ) : <span>Jantar · consulte os horários</span>}
          </div>
          <p className="flex gap-3 text-cream"><CreditCard className="h-5 w-5 shrink-0 text-gold" />{[...negocio.pagamento, ...(negocio.aceitaPix ? ["Pix"] : [])].join(" · ")}</p>
          <div className="grid gap-2">
            <a href={negocio.mapsUrl} target="_blank" rel="noreferrer" className="btn-gold">Como chegar <ChevronRight className="h-4 w-4" /></a>
            <a href={waLink("Olá! Gostaria de saber os horários de funcionamento.")} target="_blank" rel="noreferrer" className="btn-outline"><MessageCircle className="h-4 w-4" />Falar no WhatsApp</a>
          </div>
        </div>
      </section>

      <Rodape />
      <ItemModal item={aberto} onClose={() => setAberto(null)} />
    </>
  );
}
