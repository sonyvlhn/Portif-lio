"use client";

import { motion } from "framer-motion";

type Props = { index: string; eyebrow: string; title: string; ghost?: string };

export default function SectionHeading({ index, eyebrow, title, ghost }: Props) {
  const words = title.split(" ");
  return (
    <div className="relative mb-14 md:mb-20">
      {ghost && (
        <motion.span
          aria-hidden
          className="outline-text pointer-events-none absolute -top-14 right-0 select-none whitespace-nowrap font-display text-[17vw] font-extrabold leading-none md:-top-20 md:text-[10rem]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {ghost}
        </motion.span>
      )}
      <motion.div
        className="relative mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>{index}</span>
        <motion.span
          className="h-px bg-accent/60"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <span>{eyebrow}</span>
      </motion.div>
      <h2 className="relative font-display text-4xl font-extrabold tracking-tight md:text-6xl">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}
