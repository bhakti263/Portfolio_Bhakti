import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ClientOnly } from "@/components/ClientOnly";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NeuralParticles } from "@/components/NeuralParticles";
import { HeroObject } from "@/components/HeroObject";
import { MagneticButton } from "@/components/MagneticButton";
import { MorphingRoles } from "@/components/MorphingRoles";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AboutSection } from "@/components/AboutSection";
import { SkillsConstellation } from "@/components/SkillsConstellation";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import {
  ExperienceSection,
  CertificationsSection,
} from "@/components/ExperienceCerts";
import { ContactSection } from "@/components/ContactTerminal";
import { AIAssistant } from "@/components/AIAssistant";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Bhakti Bhosle — AI & ML Engineer, aspiring SDE" },
      {
        name: "description",
        content:
          "Portfolio of Bhakti Bhosle — CSE (AI & ML) student at Manipal University Jaipur. Building intelligent, scalable systems and cinematic interfaces.",
      },
      {
        property: "og:title",
        content: "Bhakti Bhosle — AI & ML Engineer, aspiring SDE",
      },
      {
        property: "og:description",
        content:
          "An engineer who builds intelligent systems, not just websites.",
      },
    ],
  }),
});

const ease = [0.22, 1, 0.36, 1] as const;

function Home() {
  return (
    <main className="relative">
      <ClientOnly>
        {/* <SmoothScroll /> */}
        {/* <CustomCursor /> */}
        <ScrollProgress />
      </ClientOnly>

      <TopBar />
      <Hero />
      <Marquee />
      <AboutSection />
      <SkillsConstellation />
      <ProjectsShowcase />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <ClientOnly>
        <AIAssistant />
      </ClientOnly>
    </main>
  );
}

/* ---------------------------------------------------------------- */

function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
      <a
        href="#"
        data-cursor="hover"
        className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/80"
      >
        Bhakti<span className="text-[color:var(--electric)]">.</span>
      </a>
      <nav className="hidden gap-8 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55 md:flex">
        {[
          ["About", "#about"],
          ["Skills", "#skills"],
          ["Work", "#work"],
          ["Contact", "#contact"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            data-cursor="hover"
            className="transition-colors hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </nav>
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45 md:inline">
        <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-[color:var(--emerald)] animate-pulse" />
        Open to SDE roles
      </span>
    </header>
  );
}

/* ---------------------------------------------------------------- */

function Hero() {
  return (
    <section
      id="top"
      className="noise relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh" aria-hidden />
      <div className="absolute inset-0 starfield opacity-70" aria-hidden />
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute inset-0 light-ray" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <ClientOnly>
          <NeuralParticles />
        </ClientOnly>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-95">
        <div className="relative h-[68vmin] w-[68vmin]">
          
           {/* <ClientOnly>
            <HeroObject />
            </ClientOnly> */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, transparent 55%, var(--background) 80%)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/50"
        >
          <span className="inline-block h-px w-8 bg-foreground/30" />
          Bhakti Bhosle · Portfolio / vol. 01
        </motion.p>

        <h1 className="font-display text-balance text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.95] tracking-tight">
          <HeadlineLine text="I build systems" delay={0.25} />
          <HeadlineLine
            text={
              <>
                that <em className="italic text-gradient-electric">think.</em>
              </>
            }
            delay={0.55}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
          className="mt-10 font-mono text-sm uppercase tracking-[0.28em] text-foreground/70 sm:text-base"
        >
          <span className="text-foreground/40">— </span>
          <MorphingRoles />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#work" variant="primary">
            Explore projects
            <Arrow />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Contact me
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/40"
      >
        <span className="mr-3 inline-block h-4 w-px translate-y-[3px] bg-foreground/30 animate-pulse align-middle" />
        Scroll
      </motion.div>
    </section>
  );
}

function HeadlineLine({
  text,
  delay = 0,
}: {
  text: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease, delay }}
        className="block will-change-transform"
      >
        {text}
      </motion.span>
    </span>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="translate-y-px"
      aria-hidden
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */

const MARQUEE = [
  "Intelligent systems",
  "Applied AI",
  "Full-stack engineering",
  "Design engineering",
  "Realtime interfaces",
  "Neural retrieval",
];

function Marquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-foreground/10 bg-background/40 py-6 backdrop-blur"
    >
      <div className="flex whitespace-nowrap will-change-transform [animation:marquee_38s_linear_infinite]">
        {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
          <span
            key={i}
            className="mx-10 font-display text-3xl text-foreground/45 md:text-5xl"
          >
            {t}
            <span className="mx-10 text-[color:var(--electric)]">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45">
            End of transmission
          </p>
          <p className="mt-3 font-display text-3xl md:text-5xl">
            Bhakti Bhosle ·{" "}
            <span className="text-gradient-electric italic">2026</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <MagneticButton href="mailto:bhaktibhosle123@gmail.com" variant="primary">
            Say hello
          </MagneticButton>
          <MagneticButton href="#top" variant="ghost">
            Back to top
          </MagneticButton>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-6xl items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        <span>© 2026 Bhakti Bhosle</span>
        <span>Crafted with intent</span>
      </div>
    </footer>
  );
}
