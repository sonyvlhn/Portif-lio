"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function VelocityRow({ items, baseVelocity }: { items: string[]; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = [...items, ...items];
  return (
    <div className="mask-fade-x flex overflow-hidden whitespace-nowrap py-2">
      <motion.div className="flex shrink-0 gap-4" style={{ x }}>
        {[...row, ...row].map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            <span className={i % 3 === 0 ? "text-fg" : "outline-text"}>{s}</span>
            <span className="text-2xl text-accent md:text-3xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const icons = ["</>", "{ }", "$_", "#"];

export default function Skills() {
  const all = profile.skills.flatMap((g) => [...g.key, ...g.rest]);
  const half = Math.ceil(all.length / 2);

  return (
    <section id="competencias" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index="02" eyebrow="Competências" title="Ferramentas que uso no dia a dia." ghost="STACK" />
      </div>

      <div className="relative left-1/2 w-[110vw] -translate-x-1/2 -rotate-2 space-y-2 border-y border-line bg-ink-2/50 py-6 backdrop-blur-sm">
        <VelocityRow items={all.slice(0, half)} baseVelocity={-2} />
        <VelocityRow items={all.slice(half)} baseVelocity={2} />
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-5 px-6 md:grid-cols-2 md:px-10">
        {profile.skills.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.1}>
            <motion.div
              className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-2/60 p-7 backdrop-blur"
              whileHover="hover"
            >
              <motion.div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl"
                variants={{ hover: { scale: 1.8, opacity: 1 } }}
                initial={{ opacity: 0.5 }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative mb-5 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{g.group}</h3>
                <motion.span
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line font-mono text-sm text-accent"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: gi * 0.7, ease: "easeInOut" }}
                >
                  {icons[gi]}
                </motion.span>
              </div>
              <motion.ul
                className="relative flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              >
                {[...g.key.map((k) => ({ k, key: true })), ...g.rest.map((k) => ({ k, key: false }))].map(
                  ({ k, key }) => (
                    <motion.li
                      key={k}
                      variants={{
                        hidden: { opacity: 0, y: 12, scale: 0.9 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      whileHover={{ y: -4, scale: 1.06 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className={`cursor-default rounded-lg border px-3 py-1.5 text-sm ${
                        key
                          ? "border-accent/40 bg-accent/10 font-semibold text-accent"
                          : "border-line bg-ink/60 text-fg/90 hover:border-accent/40"
                      }`}
                    >
                      {k}
                    </motion.li>
                  ),
                )}
              </motion.ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
