import * as I from "lucide-react";

export function Icone({ nome, className = "h-5 w-5" }: { nome: string; className?: string }) {
  const C = (I as unknown as Record<string, I.LucideIcon>)[nome] ?? I.Star;
  return <C className={className} aria-hidden="true" />;
}
