"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Close, Menu } from "./Icons";

const links = [
  { id: "perfil", label: "Perfil" },
  { id: "competencias", label: "Competências" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "formacao", label: "Formação" },
  { id: "contato", label: "Contato" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-colors duration-500 ${
            scrolled ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent"
          }`}
        >
          <a href="#topo" className="group flex items-center gap-2.5" aria-label="Início">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-accent-2 font-display text-sm font-extrabold">
              <span className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,transparent,#2dd4bf_25%,transparent_50%)] opacity-70" />
              <span className="absolute inset-[2px] rounded-[10px] bg-ink" />
              <span className="relative text-accent">SA</span>
            </span>
            <span className="hidden font-display text-sm font-bold sm:block">
              Sony Anderson
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative block rounded-lg px-3.5 py-2 text-sm transition-colors ${
                    active === l.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg border border-accent/25 bg-accent/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contato"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.04] lg:block"
          >
            Vamos conversar
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-4xl font-extrabold"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
