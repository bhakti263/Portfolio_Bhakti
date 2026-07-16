import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHeader({
  eyebrow,
  index,
  title,
  kicker,
}: {
  eyebrow: string;
  index: string;
  title: ReactNode;
  kicker?: string;
}) {
  return (
    <div className="mb-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease }}
        className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/50"
      >
        <span className="inline-block h-px w-8 bg-foreground/30" />
        {index} — {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease }}
        className="font-display text-balance text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-foreground"
      >
        {title}
      </motion.h2>
      {kicker ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/60"
        >
          {kicker}
        </motion.p>
      ) : null}
    </div>
  );
}
