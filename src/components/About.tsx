"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Terminal from "./Terminal";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="font-display text-2xl font-semibold leading-snug md:text-[1.75rem]">
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function MetricCard({ m, i }: { m: (typeof profile.metrics)[number]; i: number }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const bg = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(45,212,191,0.16), transparent 70%)`;
  return (
    <Reveal delay={i * 0.12}>
      <motion.div
        className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-2/60 p-6 backdrop-blur"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        onPointerLeave={() => {
          mx.set(-200);
          my.set(-200);
        }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
        <div className="relative font-display text-4xl font-extrabold text-accent md:text-5xl">
          {m.prefix}
          <Counter to={m.value} />
          <span className="text-2xl md:text-3xl">{m.suffix}</span>
        </div>
        <p className="relative mt-2 text-muted">{m.label}</p>
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-linear-to-r from-accent to-transparent"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section id="perfil" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="Perfil" title="Da operação ao código." ghost="PERFIL" />

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-8">
            <ScrollText text={profile.summary} />
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">{profile.summary2}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} x={40} y={0}>
            <Terminal />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {profile.metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
