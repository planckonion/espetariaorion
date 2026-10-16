import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Orion } from "@/components/Orion";

export const Route = createFileRoute("/plaquinha")({
  head: () => ({ meta: [{ title: "Plaquinha QR — Espetaria Orion" }, { name: "description", content: "Plaquinha para impressão com QR Code do cardápio da Espetaria Orion." }, { property: "og:title", content: "Plaquinha QR — Espetaria Orion" }, { property: "og:description", content: "Escaneie e veja o cardápio." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Plaquinha,
});

function Plaquinha() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(`${window.location.origin}/cardapio`), []);
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
      <div className="relative w-full max-w-[148mm] rounded-3xl border-2 border-gold/60 bg-sky-1 p-8 text-center shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)]">
        <Orion animado={false} className="mx-auto h-24" />
        <p className="mt-2 font-display text-4xl font-bold tracking-[0.2em] gold-text">ORION</p>
        <p className="font-serif-it text-xl text-gold">O sabor da brasa</p>
        {url && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&data=${encodeURIComponent(url)}`} alt="QR Code do cardápio" className="mx-auto mt-6 w-56 rounded-xl bg-cream p-2" />}
        <p className="mt-5 font-display text-xl text-cream">Escaneie e veja o cardápio</p>
      </div>
      <button onClick={() => window.print()} className="btn-gold print:hidden">Imprimir</button>
    </div>
  );
}
