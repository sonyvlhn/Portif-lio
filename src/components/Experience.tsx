"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experiencia" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow="Experiência" title="Onde venho construindo minha trajetória." ghost="CARREIRA" />

        <div ref={ref} className="relative">
          {/* trilho e linha de progresso */}
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-line md:left-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-linear-to-b from-accent via-accent to-warm md:left-1/2"
          />

          <div className="space-y-16">
            {profile.experience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <div key={job.title + job.date} className="relative grid md:grid-cols-2 md:gap-16">
                  {/* marcador */}
                  <motion.span
                    className="absolute left-[11px] top-7 z-10 -translate-x-1/2 md:left-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-ink">
                      {job.current && (
                        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent/60" />
                      )}
                      <span className="h-2 w-2 rounded-full bg-accent" />
                    </span>
                  </motion.span>

                  {/* data no lado oposto (desktop) */}
                  <motion.div
                    className={`hidden pt-6 md:block ${left ? "order-2" : "order-1 text-right"}`}
                    initial={{ opacity: 0, x: left ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.9, ease }}
                  >
                    <span className="font-display text-3xl font-extrabold text-fg/80">{job.date}</span>
                    {job.current && (
                      <span className="mt-2 block font-mono text-xs uppercase tracking-widest text-accent">
                        ● posição atual
                      </span>
                    )}
                  </motion.div>

                  <motion.article
                    className={`group relative ml-10 rounded-2xl border border-line bg-ink-2/70 p-7 backdrop-blur transition-colors hover:border-accent/40 md:ml-0 ${
                      left ? "order-1" : "order-2"
                    }`}
                    initial={{ opacity: 0, x: left ? -60 : 60, rotate: left ? -2 : 2 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.9, ease }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="mb-3 block font-mono text-xs text-accent md:hidden">{job.date}</span>
                    <h3 className="font-display text-2xl font-bold">{job.title}</h3>
                    <p className="mt-1 text-muted">
                      <span className="font-semibold text-fg">{job.org}</span> · {job.place}
                    </p>
                    <motion.ul
                      className="mt-5 space-y-2.5"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-80px" }}
                      variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
                    >
                      {job.bullets.map((b) => (
                        <motion.li
                          key={b}
                          className="flex gap-3 text-[15px] leading-relaxed text-fg/85"
                          variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent transition-transform duration-500 group-hover:rotate-[225deg]" />
                          {b}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
