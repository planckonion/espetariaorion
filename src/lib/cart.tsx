import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Linha } from "./pedido";

type Ctx = {
  linhas: Linha[]; aberto: boolean; setAberto: (v: boolean) => void;
  add: (l: Linha) => void; setQtd: (i: number, q: number) => void; limpar: () => void; count: number;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = "orion-carrinho";

export function CartProvider({ children }: { children: ReactNode }) {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setLinhas(JSON.parse(s)); } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(linhas)); } catch { /* ignore */ }
  }, [linhas]);
  const add = (l: Linha) => setLinhas((p) => {
    const i = p.findIndex((x) => x.id === l.id && (x.obs ?? "") === (l.obs ?? ""));
    if (i >= 0) { const n = [...p]; n[i] = { ...n[i], qtd: n[i].qtd + l.qtd }; return n; }
    return [...p, l];
  });
  const setQtd = (i: number, q: number) => setLinhas((p) => q <= 0 ? p.filter((_, j) => j !== i) : p.map((x, j) => j === i ? { ...x, qtd: q } : x));
  return (
    <CartCtx.Provider value={{ linhas, aberto, setAberto, add, setQtd, limpar: () => setLinhas([]), count: linhas.reduce((s, l) => s + l.qtd, 0) }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => useContext(CartCtx)!;
