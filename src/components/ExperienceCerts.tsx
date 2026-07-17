import { motion } from "motion/react";
import {
  Briefcase,
  ChevronRight,
  Award,
  CheckCircle,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { EXPERIENCE, CERTIFICATIONS } from "@/lib/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection() {
  const exp = EXPERIENCE[0];

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-6 py-40 md:px-10"
    >
      <SectionHeader
        eyebrow="Experience"
        index="04"
        title={
          <>
            Leading the{" "}
            <span className="text-gradient-electric italic">
              placement drive
            </span>
            .
          </>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/[0.06] p-8 backdrop-blur md:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--electric)]/15 blur-3xl"
        />

        <div className="relative flex items-start gap-5">
          <span className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--electric)] to-[color:var(--indigo)] text-white shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--indigo)_65%,transparent)]">
            <Briefcase className="h-5 w-5" />
          </span>

          <div className="flex-1">
            <h3 className="font-display text-2xl leading-tight text-foreground md:text-3xl">
              {exp.role}
            </h3>

            <p className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
              {exp.org} · {exp.period}
            </p>

            <ul className="mt-6 space-y-3">
              {exp.bullets.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-[15px] text-foreground/70"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--electric)]" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative mx-auto max-w-6xl px-6 py-40 md:px-10"
    >
      <SectionHeader
        eyebrow="Certifications"
        index="05"
        title={
          <>
            Verified{" "}
            <span className="text-gradient-electric italic">
              knowledge
            </span>
            .
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.7,
              ease,
              delay: (i % 3) * 0.06,
            }}
            className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-foreground/10 bg-white/[0.06] p-5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--electric)]/40 hover:shadow-[0_25px_50px_-25px_color-mix(in_oklab,var(--indigo)_50%,transparent)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--electric)]/10 to-[color:var(--purple)]/10 text-[color:var(--indigo)] transition-all duration-300 group-hover:from-[color:var(--electric)] group-hover:to-[color:var(--purple)] group-hover:text-white">
              <Award className="h-5 w-5" />
            </span>

            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {c.name}
              </p>

              <p className="mt-1.5 flex items-center gap-1 text-xs text-foreground/50">
                <CheckCircle className="h-3 w-3 text-[color:var(--emerald)]" />
                {c.issuer}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--electric)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View Certificate
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}