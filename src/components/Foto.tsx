import { useState } from "react";
import { img } from "@/lib/imagens";
import { Orion } from "./Orion";

export function Foto({ nome, alt, className = "", eager = false }: { nome: string; alt: string; className?: string; eager?: boolean }) {
  const src = img(nome);
  const [ok, setOk] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-navy to-sky-2 ${className}`}>
      {!src ? (
        <div className="absolute inset-0 grid place-items-center"><Orion mini animado={false} className="h-1/2 opacity-70" /></div>
      ) : (
        <>
          {!ok && <div className="absolute inset-0 animate-pulse bg-navy-2/40" />}
          <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onLoad={() => setOk(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${ok ? "opacity-100" : "opacity-0"}`} />
        </>
      )}
    </div>
  );
}
