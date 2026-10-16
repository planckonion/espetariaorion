// Cardápio — preços null = "Consulte". PREENCHER COM O DONO.
export type Item = {
  id: string;
  nome: string;
  descricao: string;
  preco: number | null;
  imagem: string;
  tags?: string[];
  destaque?: boolean;
};
export type Categoria = { id: string; nome: string; icone: string; imagem: string; itens: Item[]; espeto?: boolean };

export const categorias: Categoria[] = [
  {
    id: "destaque", nome: "Frango com Bacon", icone: "Flame", imagem: "frango-bacon", espeto: true,
    itens: [{ id: "frango-bacon", nome: "Espeto de Frango com Bacon", descricao: "Frango suculento envolto em bacon crocante, direto da brasa.", preco: null, imagem: "frango-bacon", destaque: true, tags: ["Destaque"] }],
  },
  {
    id: "bovina", nome: "Carne bovina", icone: "Beef", imagem: "espeto-bovina", espeto: true,
    itens: [{ id: "bovina", nome: "Espeto de Carne Bovina", descricao: "Carne macia, temperada e selada na brasa viva.", preco: null, imagem: "espeto-bovina" }],
  },
  {
    id: "medalhao", nome: "Medalhão de frango", icone: "Drumstick", imagem: "medalhao-frango", espeto: true,
    itens: [{ id: "medalhao", nome: "Espeto de Medalhão de Frango", descricao: "Medalhão dourado e suculento, no ponto certo da brasa.", preco: null, imagem: "medalhao-frango" }],
  },
  {
    id: "almondegas", nome: "Almôndegas", icone: "CircleDot", imagem: "almondegas", espeto: true,
    itens: [{ id: "almondegas", nome: "Espeto de Almôndegas", descricao: "Almôndegas temperadas e tostadas na brasa.", preco: null, imagem: "almondegas" }],
  },
  {
    id: "coracao", nome: "Coração de galinha", icone: "Heart", imagem: "coracao-galinha", espeto: true,
    itens: [{ id: "coracao", nome: "Espeto de Coração de Galinha", descricao: "Clássico da brasa: coraçãozinho bem temperado e tostado.", preco: null, imagem: "coracao-galinha" }],
  },
  {
    id: "linguica", nome: "Linguiça", icone: "Sparkles", imagem: "linguica", espeto: true,
    itens: [{ id: "linguica", nome: "Espeto de Linguiça", descricao: "Linguiça na brasa, por fora crocante e por dentro suculenta.", preco: null, imagem: "linguica" }],
  },
  {
    id: "acompanhamentos", nome: "Acompanhamentos", icone: "Salad", imagem: "acompanhamentos",
    itens: [{ id: "acompanhamentos", nome: "Acompanhamentos", descricao: "Para completar o seu espeto. Consulte as opções do dia.", preco: null, imagem: "acompanhamentos" }],
  },
  {
    id: "porcoes", nome: "Porções", icone: "UtensilsCrossed", imagem: "acompanhamentos",
    itens: [{ id: "porcoes", nome: "Porções", descricao: "Para dividir na mesa. Consulte as opções disponíveis.", preco: null, imagem: "acompanhamentos" }],
  },
  {
    id: "bebidas", nome: "Bebidas e cervejas", icone: "Beer", imagem: "bebidas",
    itens: [{ id: "bebidas", nome: "Bebidas e cervejas", descricao: "Cerveja trincando de gelada e bebidas para todos.", preco: null, imagem: "bebidas" }],
  },
];

export const combos: Item[] = []; // vazio = seção oculta

export const todosItens = categorias.flatMap((c) => c.itens);
export const astros = ["frango-bacon", "bovina", "coracao", "linguica"]
  .map((id) => todosItens.find((i) => i.id === id)!)
  .filter(Boolean);
