"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Line = { cmd?: string; out?: string; tone?: "ok" | "muted" | "accent" };

const script: Line[] = [
  { cmd: "docker compose up -d" },
  { out: "✔ Container postgres        Started", tone: "ok" },
  { out: "✔ Container pgadmin         Started", tone: "ok" },
  { out: "✔ Container seaweedfs-s3    Started", tone: "ok" },
  { cmd: "systemctl is-active zabbix-agent2" },
  { out: "active", tone: "accent" },
  { cmd: "npx prisma migrate deploy" },
  { out: "All migrations have been successfully applied.", tone: "muted" },
  { cmd: "npm run build" },
  { out: "✓ Compiled successfully · Next.js 16", tone: "ok" },
];

const toneClass = { ok: "text-emerald-300", muted: "text-muted", accent: "text-accent" };

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (!cancelled) {
        setLines([]);
        for (const line of script) {
          if (cancelled) return;
          if (line.cmd) {
            for (let i = 1; i <= line.cmd.length; i++) {
              if (cancelled) return;
              setTyping(line.cmd.slice(0, i));
              await wait(35 + Math.random() * 45);
            }
            await wait(280);
            setTyping("");
            setLines((l) => [...l, line]);
            await wait(350);
          } else {
            setLines((l) => [...l, line]);
            await wait(160);
          }
        }
        await wait(3200);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-line bg-ink-2/80 shadow-2xl shadow-black/40 backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">sony@macapa: ~/projetos</span>
      </div>
      <div className="h-[300px] overflow-hidden p-5 font-mono text-[13px] leading-relaxed">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="whitespace-pre-wrap break-words"
          >
            {l.cmd ? (
              <>
                <span className="text-accent">❯</span> <span className="text-fg">{l.cmd}</span>
              </>
            ) : (
              <span className={toneClass[l.tone ?? "muted"]}>{l.out}</span>
            )}
          </motion.div>
        ))}
        <div className="whitespace-pre-wrap break-words">
          <span className="text-accent">❯</span> <span className="text-fg">{typing}</span>
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
        </div>
      </div>
    </div>
  );
}
