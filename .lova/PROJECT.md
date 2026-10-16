# Memória do projeto (Lova Infinity)

## Visão geral
Espetaria Orion — site de espetaria/brasa em Uberlândia/MG (React 19 + TanStack Start/Router, Tailwind v4, shadcn/ui, Supabase). Pedido inicial: corrigir itens do cardápio sem imagem e corrigir/substituir o símbolo da constelação de Orion em todo lugar, com base em imagem de referência enviada pelo usuário.

## Stack e convenções
- Rotas em src/routes (arquivo = rota), src/routeTree.gen.ts NUNCA editar.
- src/integrations/supabase NUNCA editar.
- Componentes shadcn em src/components/ui.
- Imagens via src/lib/imagens.ts (import.meta.glob de ../assets/*.jpg com alias de reaproveitamento).
- Foto.tsx exibe Orion como placeholder quando img() retorna null.

## Mapa de arquivos
- src/components/Orion.tsx — símbolo da constelação (reescrito com base na imagem de referência public/orion-referencia.png) + Divisor.
- src/components/Foto.tsx — imagem com fallback Orion.
- src/components/Shell.tsx, Rodape.tsx — header/rodapé com Orion.
- src/routes/index.tsx, cardapio.tsx, reservar.tsx, plaquinha.tsx — páginas que usam Orion.
- src/data/cardapio.ts — categorias/itens do cardápio (preços null = "Consulte").
- src/data/negocio.ts — dados do negócio (endereço/horários/instagram a confirmar com o dono).
- src/lib/imagens.ts — resolução de imagens (assets/ vazio).
- src/styles.css — utilitários e animações .orion-line/.orion-star.
- public/orion-referencia.png — imagem de referência da constelação enviada pelo usuário.

## Decisões do usuário
- Símbolo de Orion deve refletir exatamente a imagem de referência: ombros Betelgeuse (esquerda, laranja) e Bellatrix (direita, azul-branco), cinturão com 3 estrelas alinhadas (Alnitak, Alnilam, Mintaka), espada vertical com 3 estrelas abaixo do cinturão, pés Saiph (esquerda) e Rigel (direita, azul-branco brilhante), linhas conectando ombros-cinturão-pés.

## Pendências
- [ ] Adicionar fotos dos itens do cardápio em assets/ (ou gerar placeholders) — depende do usuário enviar as imagens.
- [ ] Confirmar com o dono: endereço, horários, instagram, consumo local, aceita Pix, taxa de entrega.

## Banco de dados
Nenhuma alteração de banco necessária para este pedido.