"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/profile";
import { ArrowUpRight, Check, Copy, GitHub, LinkedIn, Mail, Phone } from "./Icons";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const links = [
  { label: "LinkedIn", value: "linkedin.com/in/sonyvlhn", href: profile.contact.linkedin, icon: LinkedIn },
  { label: "GitHub", value: "github.com/sonyvlhn", href: profile.contact.github, icon: GitHub },
  { label: "WhatsApp", value: profile.contact.phone, href: profile.contact.whatsapp, icon: Phone },
  { label: "E-mail", value: profile.contact.email, href: `mailto:${profile.contact.email}`, icon: Mail },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.contact.email}`;
    }
  };

  return (
    <section id="contato" className="relative overflow-hidden pb-10 pt-28 md:pt-36">
      {/* faixa infinita */}
      <div className="mask-fade-x mb-20 flex overflow-hidden" aria-hidden>
        <div className="flex shrink-0 animate-marquee gap-8 whitespace-nowrap [--marquee-duration:30s]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-none tracking-tight">
              <span className={i % 2 ? "outline-text" : "text-fg"}>Vamos conversar</span>
              <span className="mx-8 text-accent">↗</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              <span>06</span>
              <span className="h-px w-12 bg-accent/60" />
              <span>Contato</span>
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Tem um projeto ou uma vaga?{" "}
              <span className="text-gradient animate-shine">Me chame.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Estou em Macapá, AP, e aberto a oportunidades em desenvolvimento web, suporte, infraestrutura e DevOps.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-accent px-7 py-4 text-lg font-semibold text-ink"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full" />
                  <Mail className="relative" />
                  <span className="relative">Enviar e-mail</span>
                </a>
              </Magnetic>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-2xl border border-line px-5 py-4 font-mono text-sm text-muted transition-colors hover:border-accent/60 hover:text-fg"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    className="text-accent"
                  >
                    {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
                  </motion.span>
                </AnimatePresence>
                {copied ? "Copiado!" : profile.contact.email}
              </button>
            </div>
          </Reveal>

          <div className="divide-y divide-line border-y border-line">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={i * 0.08} x={30} y={0}>
                <div>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group relative flex items-center gap-5 overflow-hidden py-6"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-accent/5 transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-line text-muted transition-all duration-300 group-hover:rotate-[-8deg] group-hover:border-accent group-hover:text-accent">
                      <l.icon />
                    </span>
                    <span className="relative flex-1">
                      <span className="block font-mono text-xs uppercase tracking-widest text-muted">{l.label}</span>
                      <span className="block break-all font-display text-lg font-semibold transition-transform duration-300 group-hover:translate-x-2">
                        {l.value}
                      </span>
                    </span>
                    <ArrowUpRight className="relative text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <footer className="mt-28 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row">
          <span>© {new Date().getFullYear()} Sony Anderson · Macapá, AP</span>
          <span className="font-mono text-xs">
            Feito com Next.js, TypeScript, Tailwind e Framer Motion
          </span>
          <a href="#topo" className="group inline-flex items-center gap-2 hover:text-accent">
            Voltar ao topo
            <ArrowUpRight width={16} height={16} className="-rotate-45 transition-transform group-hover:-translate-y-1" />
          </a>
        </footer>
      </div>
    </section>
  );
}
