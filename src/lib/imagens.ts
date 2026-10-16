const arquivos = import.meta.glob("../assets/*.jpg", { eager: true, import: "default" }) as Record<string, string>;

export function img(nome: string): string | null {
  return arquivos[`../assets/${nome}.jpg`] ?? null;
}
