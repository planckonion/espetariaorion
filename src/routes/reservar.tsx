import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, Info } from "lucide-react";
import { Titulo } from "@/components/Titulo";
import { Orion } from "@/components/Orion";
import { Rodape } from "@/components/Rodape";
import { negocio, waLink } from "@/data/negocio";

const t = "Reservas e eventos — Espetaria Orion | Uberlândia/MG";
const d = "Reserve sua mesa ou o espaço privativo para aniversários, confraternizações e resenhas na Espetaria Orion.";
export const Route = createFileRoute("/reservar")({
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Reservar,
});

const campo = "w-full min-h-11 rounded-xl border border-gold/25 bg-navy/60 px-3 text-cream placeholder:text-cream-2/60 focus:outline-none focus:ring-2 focus:ring-gold [color-scheme:dark]";
const iso = (dt: Date) => dt.toISOString().slice(0, 10);

function Reservar() {
  // CONFIRMAR COM O DONO: horários de reserva
  const horarios = useMemo(() => {
    const { inicio, fim, passoMin } = negocio.horariosReserva;
    const toMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
    const out: string[] = [];
    for (let m = toMin(inicio); m <= toMin(fim); m += passoMin) out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
    return out;
  }, []);
  const [f, setF] = useState({ nome: "", tipo: "Mesa", pessoas: 2, data: "", hora: "", ocasiao: "", obs: "" });
  const [erro, setErro] = useState("");
  const [min, max] = useMemo(() => { const h = new Date(); const m = new Date(); m.setDate(h.getDate() + 60); return [iso(h), iso(m)]; }, []);
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  const enviar = () => {
    if (!f.nome.trim()) return setErro("Informe seu nome.");
    if (!f.data) return setErro("Escolha a data.");
    if (!f.hora) return setErro("Escolha o horário.");
    setErro("");
    const data = f.data.split("-").reverse().join("/");
    const msg = `*Pedido de reserva — Espetaria Orion*\n*Nome:* ${f.nome}\n*Tipo:* ${f.tipo === "Mesa" ? "Mesa" : "Evento no espaço privativo"}\n*Pessoas:* ${f.pessoas}\n*Data:* ${data}\n*Horário:* ${f.hora}${f.ocasiao ? `\n*Ocasião:* ${f.ocasiao}` : ""}${f.obs ? `\n*Observações:* ${f.obs}` : ""}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <>
      <div className="relative pt-8">
        <Orion animado={false} className="pointer-events-none absolute left-1/2 top-0 h-56 -translate-x-1/2 opacity-30" />
        <div className="relative"><Titulo rotulo="Sua noite sob as estrelas" titulo="Reservas e eventos" sub="Aniversário, resenha ou evento? Reserve sua mesa ou o espaço privativo." /></div>
      </div>
      <form className="glass mx-5 space-y-5 p-5" onSubmit={(e) => { e.preventDefault(); enviar(); }}>
        <label className="block space-y-1 text-sm text-cream-2">Seu nome*<input className={campo} value={f.nome} onChange={(e) => set("nome", e.target.value)} autoComplete="name" /></label>
        <fieldset><legend className="mb-1 text-sm text-cream-2">Tipo de reserva</legend>
          <div className="grid grid-cols-2 gap-2">{["Mesa", "Evento"].map((x) => <button type="button" key={x} onClick={() => set("tipo", x)} className={`chip ${f.tipo === x ? "chip-on" : ""}`}>{x === "Mesa" ? "Mesa" : "Espaço privativo"}</button>)}</div>
        </fieldset>
        <div><p className="mb-1 text-sm text-cream-2">Pessoas</p>
          <div className="flex items-center justify-center gap-6">
            <button type="button" aria-label="Menos pessoas" className="btn-icon border border-gold/30" onClick={() => set("pessoas", Math.max(1, f.pessoas - 1))}><Minus className="h-4 w-4" /></button>
            <span className="w-10 text-center font-display text-2xl text-cream" aria-live="polite">{f.pessoas}</span>
            <button type="button" aria-label="Mais pessoas" className="btn-icon border border-gold/30" onClick={() => set("pessoas", Math.min(60, f.pessoas + 1))}><Plus className="h-4 w-4" /></button>
          </div>
        </div>
        <label className="block space-y-1 text-sm text-cream-2">Data*<input type="date" className={campo} min={min} max={max} value={f.data} onChange={(e) => set("data", e.target.value)} /></label>
        <fieldset><legend className="mb-1 text-sm text-cream-2">Horário*</legend>
          <div className="grid grid-cols-3 gap-2">{horarios.map((h) => <button type="button" key={h} onClick={() => set("hora", h)} className={`chip ${f.hora === h ? "chip-on" : ""}`}>{h}</button>)}</div>
        </fieldset>
        <fieldset><legend className="mb-1 text-sm text-cream-2">Ocasião</legend>
          <div className="grid grid-cols-2 gap-2">{["Aniversário", "Confraternização", "Jogo / resenha", "Outro"].map((o) => <button type="button" key={o} onClick={() => set("ocasiao", f.ocasiao === o ? "" : o)} className={`chip ${f.ocasiao === o ? "chip-on" : ""}`}>{o}</button>)}</div>
        </fieldset>
        <textarea rows={3} className={`${campo} py-2`} placeholder="Observações" aria-label="Observações" value={f.obs} onChange={(e) => set("obs", e.target.value)} />
        {erro && <p role="alert" className="text-sm text-ember">{erro}</p>}
        <button type="submit" className="btn-gold w-full">Enviar reserva pelo WhatsApp</button>
        <p className="flex items-center justify-center gap-2 text-xs text-cream-2"><Info className="h-4 w-4 text-gold" />Reserva sujeita à confirmação.</p>
      </form>
      <Rodape />
    </>
  );
}
