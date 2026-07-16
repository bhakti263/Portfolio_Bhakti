import { motion } from "motion/react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { PROJECTS } from "@/lib/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

const TINTS = [
  "from-[color:var(--electric)] via-[color:var(--indigo)] to-[color:var(--purple)]",
  "from-[color:var(--emerald)] via-[color:var(--cyan)] to-[color:var(--electric)]",
  "from-[color:var(--purple)] via-[color:var(--indigo)] to-[color:var(--cyan)]",
];

const ACCENTS = ["var(--electric)", "var(--emerald)", "var(--purple)"];

export function ProjectsShowcase() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-40 md:px-10">
      <SectionHeader
        eyebrow="Selected Work"
        index="03"
        title={
          <>
            Projects that behave like{" "}
            <span className="text-gradient-electric italic">real products</span>.
          </>
        }
        kicker="A snapshot of what I've been building — full-stack AI systems, thoughtful UI, and problems worth solving."
      />

      <div className="space-y-8">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/[0.06] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--electric)]/30 hover:shadow-[0_40px_80px_-40px_color-mix(in_oklab,var(--indigo)_50%,transparent)]"
          >
            <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
              {/* Visual side */}
              <div
                className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${TINTS[i % TINTS.length]} md:aspect-auto`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                    maskImage:
                      "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-4 text-center text-white">
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
                    {p.idx} · {p.year}
                  </span>
                  <span className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight">
                    {p.title
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 3)}
                  </span>
                </div>

                <div className="absolute inset-8 rounded-full border border-white/15" />
                <div className="absolute inset-16 rounded-full border border-white/10" />
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: ACCENTS[i % ACCENTS.length] }}
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                      {p.subtitle}
                    </p>
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-foreground/65">
                    {p.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-foreground/10 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="hover"
                        className="group/btn inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/10 px-4 py-2 text-xs font-medium text-foreground/80 transition-all hover:border-[color:var(--electric)] hover:text-[color:var(--electric)]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </a>
                    ) : null}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="group/btn inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/10 px-4 py-2 text-xs font-medium text-foreground/80 transition-all hover:border-foreground/60 hover:text-foreground"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-foreground/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--electric)]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
