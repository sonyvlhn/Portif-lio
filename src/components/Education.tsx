"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="formacao" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" eyebrow="Formação" title="Base técnica e idiomas." ghost="FORMAÇÃO" />

        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            {profile.education.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.12}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-line bg-ink-2/60 p-7 backdrop-blur"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-bold md:text-2xl">{e.title}</h3>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{e.date}</span>
                  </div>
                  <p className="mt-2 font-semibold text-accent">{e.org}</p>
                  {e.note && <p className="mt-2 text-muted">{e.note}</p>}
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="h-full rounded-2xl border border-line bg-ink-2/60 p-7 backdrop-blur">
              <h3 className="mb-6 font-display text-xl font-bold">Idiomas</h3>
              <div className="space-y-6">
                {profile.languages.map((l, i) => (
                  <div key={l.name}>
                    <div className="mb-2 flex justify-between">
                      <span className="font-semibold">{l.name}</span>
                      <span className="text-sm text-muted">{l.level}</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="relative h-full overflow-hidden rounded-full bg-linear-to-r from-accent-2 to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
