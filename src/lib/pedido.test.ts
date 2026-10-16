import { describe, it, expect } from "vitest";
import { mensagemPedido, subtotal } from "./pedido";

describe("pedido", () => {
  it("soma subtotal ignorando preço null", () => {
    expect(subtotal([{ id: "a", nome: "A", preco: 10, qtd: 2 }, { id: "b", nome: "B", preco: null, qtd: 1 }])).toBe(20);
  });
  it("entrega sem taxa sai como a combinar", () => {
    const m = mensagemPedido([{ id: "a", nome: "Espeto", preco: 10, qtd: 2 }], { nome: "Ana", tipo: "Entrega", endereco: "Rua X", bairro: "Centro", pagamento: "Cartão de crédito" }, null);
    expect(m).toContain("*Entrega:* a combinar");
    expect(m).toContain("- 2x Espeto");
  });
});
