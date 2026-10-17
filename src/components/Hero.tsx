"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { ArrowDown, GitHub, LinkedIn, Mail, MapPin } from "./Icons";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedWord({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-2 ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
          whileHover={{ y: -10, color: "#2dd4bf", transition: { type: "spring", stiffness: 400, damping: 12 } }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative block h-[1.4em] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[i]}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {/* gradiente num span interno: background-clip:text falha no elemento com will-change: transform */}
          <span className="text-gradient animate-shine">{profile.roles[i]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const chips = [
  { label: "Next.js", pos: "-left-6 top-[12%]", delay: 0 },
  { label: "Docker", pos: "-right-8 top-[30%]", delay: 1.2 },
  { label: "PostgreSQL", pos: "-left-10 bottom-[22%]", delay: 2.1 },
  { label: "Zabbix 7", pos: "-right-4 bottom-[8%]", delay: 0.6 },
];

function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 120, damping: 14 });
  const ry = useSpring(0, { stiffness: 120, damping: 14 });
  const gx = useSpring(50, { stiffness: 120, damping: 20 });
  const gy = useSpring(50, { stiffness: 120, damping: 20 });
  const glare = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18), transparent 50%)`,
  );

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[380px] [perspective:1000px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 16);
        rx.set(-(py - 0.5) * 16);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        gx.set(50);
        gy.set(50);
      }}
      data-cursor
    >
      {/* anéis girando atrás da foto */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/25">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-accent shadow-[0_0_20px_4px_rgba(45,212,191,0.6)]" />
        </div>
        <div className="absolute inset-[9%] animate-spin-slower rounded-full border border-line">
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 rounded-full bg-warm shadow-[0_0_16px_3px_rgba(245,158,107,0.6)]" />
        </div>
        <div className="absolute inset-[22%] rounded-full bg-accent/20 blur-3xl" />
      </div>

      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease }}
        className="relative"
      >
        {/* moldura com borda em gradiente girando */}
        <div className="relative overflow-hidden rounded-[2rem] p-[2px]">
          <div className="absolute inset-[-50%] animate-spin-slow bg-[conic-gradient(from_0deg,#0f6f68,#2dd4bf,#f59e6b,#0f6f68)]" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] bg-panel">
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "41% 69%" }}
              initial={{ scale: 1.8 }}
              animate={{ scale: 1.5 }}
              transition={{ duration: 2.2, delay: 0.4, ease }}
            >
              <Image
                src={profile.photo}
                alt="Foto de Sony Anderson"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover object-[50%_42%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
            <motion.div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
          </div>
        </div>

        {chips.map((c, i) => (
          <motion.span
            key={c.label}
            className={`absolute ${c.pos} hidden rounded-xl border border-line bg-ink-2/80 px-3 py-1.5 font-mono text-xs text-fg shadow-xl backdrop-blur-md sm:block`}
            style={{ transform: "translateZ(60px)" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: 1 + i * 0.15 },
              scale: { delay: 1 + i * 0.15, type: "spring" },
              y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay },
            }}
          >
            <span className="mr-1.5 text-accent">●</span>
            {c.label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="topo"
      ref={ref}
      className="relative flex min-h-svh items-center px-6 pb-24 pt-32 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-3.5 py-1.5 text-sm text-muted backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <MapPin width={15} height={15} className="text-accent" />
            {profile.location}
          </motion.p>

          <h1 className="font-display text-[clamp(3.2rem,10vw,7.5rem)] font-extrabold leading-[0.92] tracking-tight">
            <AnimatedWord text={profile.firstName} delay={0.15} />
            <br />
            <AnimatedWord text={profile.lastName} delay={0.35} className="text-accent" />
          </h1>

          <motion.p
            className="mt-6 font-display text-xl font-semibold text-fg md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <RoleRotator />
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease }}
          >
            {profile.headline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease }}
          >
            <Magnetic>
              <a
                href="#projetos"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3.5 font-semibold text-ink"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Ver projetos</span>
                <ArrowDown width={18} height={18} className="relative transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink-2/60 px-6 py-3.5 font-semibold backdrop-blur transition-colors hover:border-accent/60"
              >
                Fale comigo
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-2">
              {[
                { href: profile.contact.github, icon: GitHub, label: "GitHub" },
                { href: profile.contact.linkedin, icon: LinkedIn, label: "LinkedIn" },
                { href: `mailto:${profile.contact.email}`, icon: Mail, label: "E-mail" },
              ].map(({ href, icon: Icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Icon />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: photoY }}>
          <Portrait />
        </motion.div>
      </div>

      <motion.a
        href="#perfil"
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted md:flex"
      >
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-line">
          <motion.span
            className="mt-2 h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="font-mono tracking-widest">ROLE</span>
      </motion.a>
    </section>
  );
}
