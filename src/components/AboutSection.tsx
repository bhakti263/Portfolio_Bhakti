import { motion } from "motion/react";
import { GraduationCap, Trophy, Sparkles, Calendar } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { EDUCATION } from "@/lib/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

const ICONS = [GraduationCap, Trophy, Trophy] as const;
const TINTS = [
  "from-[color:var(--electric)] to-[color:var(--indigo)]",
  "from-[color:var(--purple)] to-[color:var(--indigo)]",
  "from-[color:var(--emerald)] to-[color:var(--cyan)]",
];

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-40 md:px-10">
      <SectionHeader
        eyebrow="About"
        index="01"
        title={
          <>
            An engineer with a taste for{" "}
            <span className="text-gradient-electric italic">intelligent systems</span>.
          </>
        }
      />

      <div className="grid gap-14 md:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease }}
          className="space-y-6 text-lg leading-relaxed text-foreground/75"
        >
          <p>
            I'm <span className="text-foreground font-medium">Bhakti Bhosle</span> — a
            Computer Science Engineering student specialising in Artificial Intelligence
            and Machine Learning at Manipal University Jaipur, and an aspiring software
            engineer.
          </p>
          <p>
            I build intelligent, scalable systems — from full-stack AI platforms with
            multi-turn agentic LLM pipelines to responsive web applications solving
            real-world problems. I care about clean architecture, thoughtful UX, and
            shipping products that actually work.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "CSE · AI & ML",
              "CGPA 8.23",
              "Microsoft Azure AI certified",
              "Placement Coordinator",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-foreground/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-foreground/70 backdrop-blur"
              >
                <Sparkles className="mr-1.5 inline h-3 w-3 text-[color:var(--electric)]" />
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-[color:var(--electric)]/50 via-foreground/10 to-transparent"
          />
          <div className="space-y-5">
            {EDUCATION.map((ed, i) => {
              const Icon = ICONS[i] ?? Trophy;
              return (
                <motion.div
                  key={ed.degree}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                  className="group relative pl-16"
                >
                  <span
                    className={`absolute left-2 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${TINTS[i] ?? TINTS[0]} text-white shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--indigo)_65%,transparent)]`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="rounded-2xl border border-foreground/8 bg-white/[0.06] p-5 backdrop-blur transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-[color:var(--electric)]/40 group-hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,var(--indigo)_60%,transparent)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">{ed.degree}</p>
                        <p className="mt-1 text-sm text-foreground/60">{ed.school}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gradient-electric">
                          {ed.score}
                        </p>
                        <p className="mt-1 flex items-center justify-end gap-1 text-xs text-foreground/45">
                          <Calendar className="h-3 w-3" />
                          {ed.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
