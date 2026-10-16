import { brl } from "@/data/negocio";

export type Linha = { id: string; nome: string; preco: number | null; qtd: number; obs?: string | undefined };
export type Checkout = {
  nome: string; tipo: string; endereco?: string; bairro?: string; referencia?: string;
  pagamento: string; troco?: string; obs?: string;
};

export function subtotal(linhas: Linha[]) {
  return linhas.reduce((s, l) => s + (l.preco ?? 0) * l.qtd, 0);
}

export function mensagemPedido(linhas: Linha[], c: Checkout, taxa: number | null) {
  const sub = subtotal(linhas);
  const entrega = c.tipo === "Entrega" ? (taxa == null ? "a combinar" : brl(taxa)) : "—";
  const total = brl(sub + (c.tipo === "Entrega" && taxa ? taxa : 0)) + (c.tipo === "Entrega" && taxa == null ? " + entrega" : "");
  const itens = linhas
    .map((l) => `- ${l.qtd}x ${l.nome} — ${l.preco == null ? "Consulte" : brl(l.preco * l.qtd)}${l.obs ? ` (obs: ${l.obs})` : ""}`)
    .join("\n");
  const end = c.tipo === "Entrega" ? `\n*Endereço:* ${c.endereco}, ${c.bairro}${c.referencia ? ` (ref: ${c.referencia})` : ""}` : "";
  const pag = c.pagamento + (c.pagamento === "Dinheiro" && c.troco ? ` (troco para ${c.troco})` : "");
  return `*Novo pedido — Espetaria Orion*\n${itens}\n\n*Subtotal:* ${brl(sub)}\n*Entrega:* ${entrega}\n*Total:* ${total}\n\n*Cliente:* ${c.nome}\n*Tipo:* ${c.tipo}${end}\n*Pagamento:* ${pag}${c.obs ? `\n*Observações:* ${c.obs}` : ""}`;
}
