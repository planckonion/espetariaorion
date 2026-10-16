const arquivos = import.meta.glob("../assets/*.jpg", { eager: true, import: "default" }) as Record<string, string>;

// Reaproveitamento enquanto faltam fotos próprias de cada categoria.
const alias: Record<string, string> = { "frango-bacon": "medalhao-frango", "ambiente-mesas": "hero-brasa" };

export function img(nome: string): string | null {
  return arquivos[`../assets/${nome}.jpg`] ?? (alias[nome] ? arquivos[`../assets/${alias[nome]}.jpg`] ?? null : null);
}
