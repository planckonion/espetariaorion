import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, CalendarDays, ShoppingBag } from "lucide-react";
import { Orion } from "./Orion";
import { useCart } from "@/lib/cart";
import { InstalarBotao } from "./Instalar";
import { CartSheet } from "./CartSheet";

export function Header() {
  const { count, setAberto } = useCart();
  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto max-w-[480px] border-b border-gold/15 bg-sky/70 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Espetaria Orion — início">
          <Orion mini animado={false} className="h-8 w-6" />
          <span className="font-display text-xl font-bold tracking-[0.2em] gold-text">ORION</span>
        </Link>
        <div className="flex items-center gap-1">
          <InstalarBotao />
          <button onClick={() => setAberto(true)} aria-label={`Abrir pedido (${count} itens)`} className="btn-icon relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-sky">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { count, setAberto } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px]";
  const cls = (p: string) => `${item} ${path === p ? "text-gold-light" : "text-cream-2"}`;
  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] border-t border-gold/20 bg-sky/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <Link to="/" className={cls("/")}><Home className="h-5 w-5" />Início</Link>
      <Link to="/cardapio" className={cls("/cardapio")}><BookOpen className="h-5 w-5" />Cardápio</Link>
      <Link to="/reservar" className={cls("/reservar")}><CalendarDays className="h-5 w-5" />Reservar</Link>
      <button onClick={() => setAberto(true)} className={`${item} relative text-cream-2`}>
        <ShoppingBag className="h-5 w-5" />Pedido
        {count > 0 && <span className="absolute left-1/2 top-1.5 ml-2 grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-sky">{count}</span>}
      </button>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/plaquinha") return <>{children}</>;
  return (
    <div className="relative mx-auto min-h-dvh max-w-[480px] overflow-x-clip">
      <Header />
      <main className="pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(3.5rem+env(safe-area-inset-top))]">{children}</main>
      <BottomNav />
      <CartSheet />
    </div>
  );
}
