import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export function Sheet({ aberto, onClose, titulo, children, rodape, alto = true }: {
  aberto: boolean; onClose: () => void; titulo: string; children: ReactNode; rodape?: ReactNode; alto?: boolean;
}) {
  useEffect(() => {
    if (!aberto) return;
    const o = document.body.style.overflow; document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = o; window.removeEventListener("keydown", k); };
  }, [aberto, onClose]);
  if (!aberto) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={titulo}>
      <div className="absolute inset-0 bg-sky/80 backdrop-blur-sm fade-in" onClick={onClose} />
      <div className={`sheet-up absolute inset-x-0 bottom-0 mx-auto flex max-w-[480px] flex-col rounded-t-3xl border border-gold/30 bg-sky-1 ${alto ? "h-[90dvh]" : "max-h-[90dvh]"}`}>
        <div className="flex items-center justify-between gap-2 border-b border-gold/20 px-5 py-3">
          <h2 className="font-display text-lg text-gold-light">{titulo}</h2>
          <button onClick={onClose} aria-label="Fechar" className="grid h-11 w-11 place-items-center rounded-full text-gold hover:bg-navy"><X className="h-5 w-5" /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 py-4">{children}</div>
        {rodape && <div className="border-t border-gold/20 px-5 pt-3 pb-safe">{rodape}</div>}
      </div>
    </div>
  );
}
