import { useEffect, useState } from "react";
import { Download, Share, Copy, X } from "lucide-react";
import { Sheet } from "./Sheet";

type BIP = Event & { prompt: () => Promise<void> };
let deferred: BIP | null = null;

function useInstall() {
  const [, force] = useState(0);
  const [standalone, setStandalone] = useState(true);
  useEffect(() => {
    setStandalone(window.matchMedia("(display-mode: standalone)").matches);
    const h = (e: Event) => { e.preventDefault(); deferred = e as BIP; force((n) => n + 1); };
    window.addEventListener("beforeinstallprompt", h);
    return () => window.removeEventListener("beforeinstallprompt", h);
  }, []);
  return standalone;
}

export function InstalarBotao({ variante = "icone" }: { variante?: "icone" | "card" }) {
  const standalone = useInstall();
  const [sheet, setSheet] = useState<null | "ios" | "inapp">(null);
  const [oculto, setOculto] = useState(true);
  const [copiado, setCopiado] = useState(false);
  useEffect(() => {
    try { const t = Number(localStorage.getItem("orion-install-dismiss") || 0); setOculto(Date.now() - t < 14 * 864e5); } catch { setOculto(false); }
  }, []);
  if (standalone) return null;

  const abrir = async () => {
    const ua = navigator.userAgent;
    if (/Instagram|FBAN|FBAV|WhatsApp/i.test(ua)) return setSheet("inapp");
    if (deferred) { await deferred.prompt(); deferred = null; return; }
    setSheet("ios");
  };
  const dispensar = () => { try { localStorage.setItem("orion-install-dismiss", String(Date.now())); } catch { /* */ } setOculto(true); };

  const sheetEl = (
    <Sheet aberto={!!sheet} onClose={() => setSheet(null)} titulo="Instalar aplicativo" alto={false}>
      {sheet === "inapp" ? (
        <div className="space-y-4 pb-4 text-center text-cream-2">
          <p className="text-pretty">Para instalar, abra este site no navegador do seu celular (Chrome ou Safari).</p>
          <button className="btn-gold w-full" onClick={async () => { try { await navigator.clipboard.writeText(location.href); setCopiado(true); } catch { /* */ } }}>
            <Copy className="h-4 w-4" />{copiado ? "Link copiado!" : "Copiar link"}
          </button>
        </div>
      ) : (
        <ol className="space-y-3 pb-4 text-cream-2">
          <li className="flex items-center gap-3"><Share className="h-5 w-5 shrink-0 text-gold" />Toque em <b className="text-cream">Compartilhar</b> no navegador.</li>
          <li className="flex items-center gap-3"><Download className="h-5 w-5 shrink-0 text-gold" />Escolha <b className="text-cream">Adicionar à Tela de Início</b>.</li>
        </ol>
      )}
    </Sheet>
  );

  if (variante === "card") {
    if (oculto) return null;
    return (
      <div className="glass relative mx-5 flex items-center gap-3 p-4">
        <Download className="h-6 w-6 shrink-0 text-gold" />
        <p className="min-w-0 flex-1 text-sm text-cream-2 text-pretty">Tenha o cardápio da Orion na tela do seu celular.</p>
        <button onClick={abrir} className="btn-outline min-h-11 px-3 text-sm">Instalar</button>
        <button onClick={dispensar} aria-label="Dispensar" className="btn-icon"><X className="h-4 w-4" /></button>
        {sheetEl}
      </div>
    );
  }
  return (
    <>
      <button onClick={abrir} aria-label="Instalar aplicativo (opcional)" className="btn-icon"><Download className="h-5 w-5" /></button>
      {sheetEl}
    </>
  );
}
