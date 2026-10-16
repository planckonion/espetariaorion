import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet } from "./Sheet";
import { useCart } from "@/lib/cart";
import { brl, negocio, waLink } from "@/data/negocio";
import { mensagemPedido, subtotal } from "@/lib/pedido";

const campo = "w-full min-h-11 rounded-xl border border-gold/25 bg-navy/60 px-3 text-cream placeholder:text-cream-2/60 focus:outline-none focus:ring-2 focus:ring-gold";

export function CartSheet() {
  const { linhas, aberto, setAberto, setQtd } = useCart();
  const tipos = ["Entrega", "Retirada", ...(negocio.servicos.consumoLocal ? ["Consumo no local"] : [])];
  const pags = [...negocio.pagamento, "Dinheiro", ...(negocio.aceitaPix ? ["Pix"] : [])];
  const [f, setF] = useState({ nome: "", tipo: "Retirada", endereco: "", bairro: "", referencia: "", pagamento: pags[0], troco: "", obs: "" });
  const [erro, setErro] = useState("");
  const sub = subtotal(linhas);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const enviar = () => {
    if (!linhas.length) return setErro("Seu pedido está vazio.");
    if (!f.nome.trim()) return setErro("Informe seu nome.");
    if (f.tipo === "Entrega" && (!f.endereco.trim() || !f.bairro.trim())) return setErro("Informe endereço e bairro.");
    setErro("");
    window.open(waLink(mensagemPedido(linhas, f, negocio.taxaEntrega)), "_blank");
  };

  return (
    <Sheet aberto={aberto} onClose={() => setAberto(false)} titulo="Seu pedido"
      rodape={linhas.length ? (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-cream-2"><span>Subtotal</span><span>{brl(sub)}</span></div>
          {f.tipo === "Entrega" && <div className="flex justify-between text-sm text-cream-2"><span>Entrega</span><span>{negocio.taxaEntrega == null ? "a combinar" : brl(negocio.taxaEntrega)}</span></div>}
          <div className="flex justify-between font-semibold text-cream"><span>Total</span><span>{brl(sub + (f.tipo === "Entrega" ? negocio.taxaEntrega ?? 0 : 0))}</span></div>
          {erro && <p role="alert" className="text-sm text-ember">{erro}</p>}
          <button onClick={enviar} className="btn-gold w-full">Enviar pedido pelo WhatsApp</button>
        </div>
      ) : undefined}>
      {!linhas.length ? (
        <div className="grid h-full place-items-center text-center text-cream-2">
          <div><ShoppingBag className="mx-auto mb-3 h-10 w-10 text-gold" /><p className="text-pretty">Seu pedido ainda está vazio. Escolha seus espetos no cardápio.</p></div>
        </div>
      ) : (
        <div className="space-y-5">
          <ul className="space-y-3">
            {linhas.map((l, i) => (
              <li key={i} className="glass flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-cream">{l.nome}</p>
                  {l.obs && <p className="text-xs text-cream-2">obs: {l.obs}</p>}
                  <p className="text-sm text-gold">{l.preco == null ? "Consulte" : brl(l.preco * l.qtd)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button aria-label="Diminuir" onClick={() => setQtd(i, l.qtd - 1)} className="btn-icon"><Minus className="h-4 w-4" /></button>
                  <span className="w-6 text-center">{l.qtd}</span>
                  <button aria-label="Aumentar" onClick={() => setQtd(i, l.qtd + 1)} className="btn-icon"><Plus className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <label className="block text-sm text-cream-2">Seu nome*<input className={campo} value={f.nome} onChange={(e) => set("nome", e.target.value)} /></label>
            <fieldset><legend className="mb-1 text-sm text-cream-2">Como prefere?</legend>
              <div className="grid grid-cols-2 gap-2">{tipos.map((t) => <button key={t} type="button" onClick={() => set("tipo", t)} className={`chip ${f.tipo === t ? "chip-on" : ""}`}>{t}</button>)}</div>
            </fieldset>
            {f.tipo === "Entrega" && <>
              <input className={campo} placeholder="Endereço*" value={f.endereco} onChange={(e) => set("endereco", e.target.value)} aria-label="Endereço" />
              <input className={campo} placeholder="Bairro*" value={f.bairro} onChange={(e) => set("bairro", e.target.value)} aria-label="Bairro" />
              <input className={campo} placeholder="Ponto de referência" value={f.referencia} onChange={(e) => set("referencia", e.target.value)} aria-label="Referência" />
            </>}
            <fieldset><legend className="mb-1 text-sm text-cream-2">Pagamento</legend>
              <div className="grid grid-cols-2 gap-2">{pags.map((p) => <button key={p} type="button" onClick={() => set("pagamento", p)} className={`chip ${f.pagamento === p ? "chip-on" : ""}`}>{p}</button>)}</div>
            </fieldset>
            {f.pagamento === "Dinheiro" && <input className={campo} placeholder="Troco para quanto?" value={f.troco} onChange={(e) => set("troco", e.target.value)} aria-label="Troco" />}
            <textarea className={`${campo} py-2`} rows={2} placeholder="Observações" value={f.obs} onChange={(e) => set("obs", e.target.value)} aria-label="Observações" />
          </div>
        </div>
      )}
    </Sheet>
  );
}
