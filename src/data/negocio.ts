// Dados do negócio — edite aqui.
export const negocio = {
  nome: "Espetaria Orion",
  slogan: "O sabor da brasa",
  whatsapp: "5534991489663",
  telefoneExibicao: "(34) 99148-9663",
  telefoneLink: "tel:+5534991489663",
  // CONFIRMAR COM O DONO: número, bairro e nome da quadra
  endereco: "Av. Araguari, Uberlândia/MG",
  enderecoConfirmado: false,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=-18.9077595,-48.2776748",
  instagram: null as string | null, // CONFIRMAR COM O DONO
  servicos: {
    entrega: true,
    retirada: true,
    consumoLocal: false, // CONFIRMAR COM O DONO (refeição no local)
  },
  // CONFIRMAR COM O DONO: horários por dia. null = sem informação.
  horarios: {
    domingo: null, segunda: null, terca: null, quarta: null, quinta: null, sexta: null, sabado: null,
  } as Record<string, string | null>,
  // CONFIRMAR COM O DONO: horários de reserva
  horariosReserva: { inicio: "18:00", fim: "23:00", passoMin: 30 },
  pagamento: ["Cartão de crédito", "Cartão de débito", "Pagamento por aproximação"],
  aceitaPix: false, // CONFIRMAR COM O DONO
  taxaEntrega: null as number | null, // null = "a combinar"
  avaliacao: { nota: 5.0, total: 7, conferidoEm: "16/10/2026", url: "https://www.google.com/maps/search/?api=1&query=Espetaria+Orion+Uberl%C3%A2ndia" },
  diferenciais: [
    { icone: "Music", texto: "Música ao vivo" },
    { icone: "Trophy", texto: "Ambiente esportivo" },
    { icone: "Tent", texto: "Mesas na cobertura e externas" },
    { icone: "PartyPopper", texto: "Espaço privativo para eventos" },
    { icone: "CalendarCheck", texto: "Aceita reservas" },
    { icone: "Baby", texto: "Ambiente familiar, com fraldário" },
    { icone: "Wifi", texto: "Wi-Fi gratuito" },
    { icone: "Beer", texto: "Bar no local" },
    { icone: "Car", texto: "Estacionamento gratuito" },
    { icone: "Accessibility", texto: "Acessibilidade completa" },
    { icone: "Heart", texto: "Todos são bem-vindos" },
  ],
};

export const brl = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const waLink = (texto: string) =>
  `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;
