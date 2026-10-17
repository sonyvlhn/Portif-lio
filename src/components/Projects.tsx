"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { ArrowUpRight, GitHub } from "./Icons";
import { PanelVisual, PhoneVisual, ShopVisual } from "./ProjectVisuals";
import SectionHeading from "./SectionHeading";

const visuals = [PanelVisual, ShopVisual, PhoneVisual];
type Project = (typeof profile.projects)[number];

function ProjectCard({
  p,
  i,
  total,
  progress,
}: {
  p: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Visual = visuals[i];
  // cards anteriores encolhem enquanto o próximo sobe por cima
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(45,212,191,0.12), transparent 70%)`;

  return (
    <div className="flex items-start justify-center md:sticky md:top-24 md:h-[calc(100svh-6rem)] md:items-center">
      <motion.article
        style={{ scale, rotateX: rx, rotateY: ry, transformPerspective: 1200, top: `${i * 24}px` }}
        className="group relative w-full origin-top overflow-hidden rounded-3xl border border-line bg-panel/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-9"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * 5);
          rx.set(-(py - 0.5) * 5);
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
          mx.set(-300);
          my.set(-300);
        }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
        <span
          aria-hidden
          className="outline-text pointer-events-none absolute -bottom-8 right-4 select-none font-display text-[9rem] font-extrabold leading-none opacity-60"
        >
          0{i + 1}
        </span>

        <div className="relative grid gap-8 md:grid-cols-[1fr_1.05fr] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{p.kind}</p>
            <h3 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">{p.title}</h3>
            <ul className="mt-5 space-y-2.5">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                  <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md border border-line bg-ink/60 px-2 py-1 font-mono text-[11px] text-muted">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-ink"
              >
                {p.href.includes("github") ? <GitHub width={16} height={16} /> : null}
                {p.linkLabel}
                <ArrowUpRight
                  width={16}
                  height={16}
                  className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
              {"secondary" in p && p.secondary && (
                <a
                  href={p.secondary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent/60"
                >
                  <GitHub width={16} height={16} />
                  {p.secondary.label}
                </a>
              )}
            </div>
          </div>

          <motion.div
            className="h-[300px] md:h-[340px]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Visual />
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = profile.projects;

  return (
    <section id="projetos" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" eyebrow="Projetos" title="Sistemas construídos de ponta a ponta." ghost="PROJETOS" />
        <div ref={ref} className="space-y-10 md:space-y-0">
          {items.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} total={items.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
