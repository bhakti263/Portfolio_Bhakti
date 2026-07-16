import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";

/**
 * Interactive skill constellation. Each skill is a node; hovering
 * a node illuminates its category connections.
 */

type Node = {
  id: string;
  label: string;
  group: string;
  x: number; // 0..100
  y: number; // 0..100
};

const GROUPS: Record<string, string> = {
  lang: "var(--electric)",
  ai: "var(--purple)",
  tools: "var(--cyan)",
  core: "var(--emerald)",
  cloud: "var(--indigo)",
};

const GROUP_LABELS: Record<string, string> = {
  lang: "Languages",
  ai: "AI / ML",
  tools: "Frameworks",
  core: "Core CS",
  cloud: "Cloud & Tools",
};

const NODES: Node[] = [
  // Languages — left cluster
  { id: "python", label: "Python", group: "lang", x: 14, y: 30 },
  { id: "cpp", label: "C++", group: "lang", x: 8, y: 52 },
  { id: "sql", label: "MySQL", group: "lang", x: 22, y: 68 },
  { id: "js", label: "JavaScript", group: "lang", x: 20, y: 18 },
  { id: "html", label: "HTML/CSS", group: "lang", x: 6, y: 40 },
  { id: "node", label: "Node.js", group: "lang", x: 14, y: 82 },

  // AI/ML — top center
  { id: "llm", label: "LLMs", group: "ai", x: 42, y: 10 },
  { id: "rag", label: "RAG", group: "ai", x: 56, y: 6 },
  { id: "agent", label: "Agentic Pipelines", group: "ai", x: 70, y: 14 },
  { id: "prompt", label: "Prompt Eng.", group: "ai", x: 40, y: 24 },
  { id: "nlp", label: "NLP", group: "ai", x: 54, y: 22 },
  { id: "ml", label: "Machine Learning", group: "ai", x: 46, y: 40 },
  { id: "dl", label: "Deep Learning", group: "ai", x: 62, y: 38 },

  // Frameworks — right cluster
  { id: "pt", label: "PyTorch", group: "tools", x: 82, y: 26 },
  { id: "tf", label: "TensorFlow", group: "tools", x: 92, y: 40 },
  { id: "sk", label: "Scikit-learn", group: "tools", x: 80, y: 52 },
  { id: "pd", label: "Pandas", group: "tools", x: 92, y: 62 },
  { id: "np", label: "NumPy", group: "tools", x: 80, y: 72 },
  { id: "st", label: "Streamlit", group: "tools", x: 90, y: 82 },
  { id: "ng", label: "Angular", group: "tools", x: 78, y: 90 },
  { id: "ex", label: "Express.js", group: "tools", x: 66, y: 86 },

  // Core CS — bottom center
  { id: "dsa", label: "DSA", group: "core", x: 40, y: 78 },
  { id: "oop", label: "OOP", group: "core", x: 52, y: 90 },
  { id: "os", label: "OS", group: "core", x: 30, y: 88 },
  { id: "net", label: "Networks", group: "core", x: 44, y: 62 },
  { id: "dbms", label: "DBMS", group: "core", x: 56, y: 74 },

  // Cloud & Tools
  { id: "azure", label: "Azure", group: "cloud", x: 30, y: 46 },
  { id: "fb", label: "Firebase", group: "cloud", x: 34, y: 60 },
  { id: "docker", label: "Docker", group: "cloud", x: 24, y: 74 },
  { id: "git", label: "Git / Copilot", group: "cloud", x: 68, y: 54 },
];

export function SkillsConstellation() {
  const [hover, setHover] = useState<string | null>(null);
  const [hoverGroup, setHoverGroup] = useState<string | null>(null);

  // Build intra-group links
  const links = useMemo(() => {
    const out: [Node, Node][] = [];
    const byGroup: Record<string, Node[]> = {};
    for (const n of NODES) {
      (byGroup[n.group] ??= []).push(n);
    }
    for (const list of Object.values(byGroup)) {
      for (let i = 0; i < list.length; i++) {
        // link each node to the 2 nearest in-group
        const dists = list
          .filter((n) => n.id !== list[i].id)
          .map((n) => ({
            n,
            d: Math.hypot(n.x - list[i].x, n.y - list[i].y),
          }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        for (const { n } of dists) out.push([list[i], n]);
      }
    }
    return out;
  }, []);

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl px-6 py-40 md:px-10"
    >
      <SectionHeader
        eyebrow="Skills"
        index="02"
        title={
          <>
            A <span className="text-gradient-electric italic">constellation</span> of
            what I work with.
          </>
        }
        kicker="Every technology is a node. Hover a category to see the connections light up — a small map of how the pieces fit together."
      />

      {/* Legend */}
      <div className="mb-8 flex flex-wrap gap-2">
        {Object.entries(GROUP_LABELS).map(([key, label]) => (
          <button
            key={key}
            type="button"
            data-cursor="hover"
            onMouseEnter={() => setHoverGroup(key)}
            onMouseLeave={() => setHoverGroup(null)}
            className="group flex items-center gap-2 rounded-full border border-foreground/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-foreground/70 backdrop-blur transition-all hover:border-foreground/25 hover:text-foreground"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: `var(--${key === "lang" ? "electric" : key === "ai" ? "purple" : key === "tools" ? "cyan" : key === "core" ? "emerald" : "indigo"})`,
              }}
            />
            {label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/5 p-6 backdrop-blur">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 bg-mesh"
        />
        <div className="relative aspect-[16/10] w-full">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {links.map(([a, b], i) => {
              const active =
                hoverGroup === a.group ||
                hover === a.id ||
                hover === b.id;
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={`var(--${a.group === "lang" ? "electric" : a.group === "ai" ? "purple" : a.group === "tools" ? "cyan" : a.group === "core" ? "emerald" : "indigo"})`}
                  strokeWidth={active ? 0.35 : 0.15}
                  strokeOpacity={active ? 0.8 : 0.22}
                  style={{ transition: "all 0.4s ease" }}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {NODES.map((n, i) => {
            const active = hover === n.id || hoverGroup === n.group;
            return (
              <motion.button
                key={n.id}
                type="button"
                data-cursor="hover"
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 10) * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium backdrop-blur transition-all duration-300"
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300"
                  style={{
                    background: `var(--${n.group === "lang" ? "electric" : n.group === "ai" ? "purple" : n.group === "tools" ? "cyan" : n.group === "core" ? "emerald" : "indigo"})`,
                    opacity: active ? 0.55 : 0,
                  }}
                />
                <span
                  className="relative z-10"
                  style={{
                    color: active
                      ? "white"
                      : "color-mix(in oklab, var(--foreground) 75%, transparent)",
                  }}
                >
                  {n.label}
                </span>
                <span
                  className="absolute inset-0 rounded-full border transition-colors"
                  style={{
                    background: active
                      ? `var(--${n.group === "lang" ? "electric" : n.group === "ai" ? "purple" : n.group === "tools" ? "cyan" : n.group === "core" ? "emerald" : "indigo"})`
                      : "rgba(255,255,255,0.7)",
                    borderColor: active
                      ? "transparent"
                      : "color-mix(in oklab, var(--foreground) 12%, transparent)",
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
