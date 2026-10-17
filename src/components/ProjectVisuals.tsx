"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function useTick(ms: number, size: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % size), ms);
    return () => clearInterval(t);
  }, [ms, size]);
  return i;
}

const Frame = ({ children, url }: { children: React.ReactNode; url: string }) => (
  <div className="relative h-full overflow-hidden rounded-xl border border-line bg-ink shadow-2xl shadow-black/50">
    <div className="flex items-center gap-1.5 border-b border-line bg-ink-2 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="h-2 w-2 rounded-full bg-white/15" />
      <span className="ml-2 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted">{url}</span>
    </div>
    {children}
  </div>
);

/* Painel Gestor: dashboard com gráfico vivo e aprovação de cadastro */
export function PanelVisual() {
  const tick = useTick(2400, 4);
  const sets = [
    [40, 70, 55, 85, 60, 92, 75],
    [65, 45, 80, 50, 90, 60, 70],
    [30, 85, 60, 75, 45, 80, 95],
    [55, 60, 90, 40, 70, 50, 85],
  ];
  return (
    <Frame url="painel.gestor/admin">
      <div className="flex h-[calc(100%-29px)]">
        <div className="hidden w-14 flex-col items-center gap-3 border-r border-line py-4 sm:flex">
          {[0, 1, 2, 3].map((n) => (
            <span key={n} className={`h-6 w-6 rounded-md ${n === 1 ? "bg-accent/30" : "bg-white/5"}`} />
          ))}
        </div>
        <div className="relative flex-1 p-4">
          <div className="mb-3 grid grid-cols-3 gap-2">
            {["Produtos", "Categorias", "Usuários"].map((l, n) => (
              <div key={l} className="rounded-lg border border-line bg-ink-2 p-2">
                <div className="font-mono text-[9px] text-muted">{l}</div>
                <motion.div
                  key={tick + l}
                  className="font-display text-sm font-bold text-fg"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {[128, 14, 6][n] + tick * (n + 1)}
                </motion.div>
              </div>
            ))}
          </div>
          <div className="flex h-28 items-end gap-2 rounded-lg border border-line bg-ink-2 p-3">
            {sets[tick].map((h, n) => (
              <motion.span
                key={n}
                className="flex-1 rounded-t bg-linear-to-t from-accent-2 to-accent"
                animate={{ height: `${h}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: n * 0.04 }}
              />
            ))}
          </div>
          <AnimatePresence>
            {tick % 2 === 0 && (
              <motion.div
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-accent/40 bg-ink/90 px-3 py-2 font-mono text-[10px] text-accent backdrop-blur"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
              >
                ✔ Cadastro aprovado pelo admin
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}

/* E-commerce: vitrine com skeleton, destaque e desconto */
export function ShopVisual() {
  const tick = useTick(1800, 6);
  return (
    <Frame url="loja/produtos">
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-7 flex-1 rounded-md border border-line bg-ink-2 px-2 font-mono text-[10px] leading-7 text-muted">
            🔍 pesquisar produtos…
          </div>
          <div className="h-7 w-14 rounded-md bg-accent/20" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, n) => {
            const featured = n === tick;
            return (
              <motion.div
                key={n}
                className={`relative overflow-hidden rounded-lg border p-1.5 ${featured ? "border-accent/60" : "border-line"} bg-ink-2`}
                animate={{ scale: featured ? 1.05 : 1, y: featured ? -3 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-white/5">
                  <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/10" />
                <div className="mt-1 h-1.5 w-1/2 rounded bg-accent/40" />
                <AnimatePresence>
                  {featured && (
                    <motion.span
                      className="absolute right-1 top-1 rounded bg-warm px-1 font-mono text-[9px] font-bold text-ink"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                    >
                      -15%
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

/* iFlash: catálogo mobile com preços e parcelamento */
export function PhoneVisual() {
  const tick = useTick(2200, 3);
  const items = [
    { n: "iPhone", p: "12x sem juros" },
    { n: "MacBook", p: "10x sem juros" },
    { n: "AirPods", p: "6x sem juros" },
  ];
  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        className="relative h-[300px] w-[160px] rounded-[2rem] border-[5px] border-[#1f2a33] bg-ink p-3 shadow-2xl shadow-black/60"
        animate={{ rotate: [-4, 4, -4], y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/10" />
        <div className="mb-2 font-display text-xs font-bold text-fg">iFlash</div>
        <div className="space-y-2">
          {items.map((it, n) => (
            <motion.div
              key={it.n}
              className="rounded-lg border bg-ink-2 p-2"
              animate={{ borderColor: n === tick ? "rgba(45,212,191,0.6)" : "rgba(28,42,51,1)" }}
            >
              <div className="text-[10px] font-semibold text-fg">{it.n}</div>
              <div className="font-mono text-[9px] text-accent">{it.p}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="absolute inset-x-3 bottom-4 rounded-lg bg-accent py-1.5 text-center text-[10px] font-bold text-ink"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Falar com consultor
        </motion.div>
      </motion.div>
    </div>
  );
}
