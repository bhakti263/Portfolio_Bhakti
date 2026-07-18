import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";

/**
 * Interactive glowing constellation.
 * Hovering a node highlights its direct connections.
 * Hovering a category chip highlights the whole cluster.
 */

type Group = "blue" | "purple" | "cyan";

type Node = {
  id: string;
  label: string;
  group: Group;
  x: number;
  y: number;
};

const COLOR: Record<Group, string> = {
  blue: "var(--electric)",
  purple: "var(--purple)",
  cyan: "var(--cyan)",
};

const GROUP_LABELS: Record<Group, string> = {
  blue: "Languages",
  purple: "AI / ML",
  cyan: "Frameworks & Tools",
};

const NODES: Node[] = [
  // Languages
  { id: "python", label: "Python", group: "blue", x: 10, y: 26 },
  { id: "cpp", label: "C++", group: "blue", x: 6, y: 50 },
  { id: "js", label: "JavaScript", group: "blue", x: 16, y: 72 },
  { id: "sql", label: "MySQL", group: "blue", x: 22, y: 40 },
  { id: "html", label: "HTML/CSS", group: "blue", x: 24, y: 18 },
  { id: "node", label: "Node.js", group: "blue", x: 28, y: 60 },

  // AI / ML
  { id: "llm", label: "LLMs", group: "purple", x: 42, y: 22 },
  { id: "rag", label: "RAG", group: "purple", x: 54, y: 12 },
  { id: "agent", label: "Agents", group: "purple", x: 66, y: 22 },
  { id: "ml", label: "Machine Learning", group: "purple", x: 44, y: 46 },
  { id: "dl", label: "Deep Learning", group: "purple", x: 60, y: 50 },
  { id: "nlp", label: "NLP", group: "purple", x: 52, y: 34 },
  { id: "prompt", label: "Prompt Eng.", group: "purple", x: 38, y: 66 },
  { id: "pt", label: "PyTorch", group: "purple", x: 56, y: 74 },
  { id: "tf", label: "TensorFlow", group: "purple", x: 68, y: 64 },

  // Frameworks & Tools
  { id: "sk", label: "Scikit-learn", group: "cyan", x: 82, y: 28 },
  { id: "pd", label: "Pandas", group: "cyan", x: 92, y: 44 },
  { id: "np", label: "NumPy", group: "cyan", x: 80, y: 52 },
  { id: "st", label: "Streamlit", group: "cyan", x: 90, y: 68 },
  { id: "ng", label: "Angular", group: "cyan", x: 78, y: 78 },
  { id: "azure", label: "Azure", group: "cyan", x: 72, y: 40 },
  { id: "docker", label: "Docker", group: "cyan", x: 86, y: 86 },
  { id: "git", label: "Git", group: "cyan", x: 70, y: 88 },
];

const EDGES: [string, string][] = [
  ["python", "cpp"],
  ["python", "js"],
  ["python", "sql"],
  ["html", "js"],
  ["js", "node"],
  ["sql", "node"],
  ["cpp", "sql"],

  ["python", "ml"],
  ["python", "nlp"],
  ["python", "pt"],
  ["node", "agent"],
  ["sql", "ml"],

  ["llm", "rag"],
  ["llm", "agent"],
  ["rag", "agent"],
  ["llm", "nlp"],
  ["ml", "dl"],
  ["ml", "nlp"],
  ["dl", "pt"],
  ["dl", "tf"],
  ["prompt", "llm"],
  ["prompt", "agent"],
  ["nlp", "dl"],

  ["ml", "sk"],
  ["ml", "pd"],
  ["dl", "tf"],
  ["pt", "np"],
  ["tf", "np"],
  ["agent", "azure"],

  ["sk", "pd"],
  ["pd", "np"],
  ["np", "st"],
  ["st", "ng"],
  ["azure", "docker"],
  ["docker", "git"],
  ["ng", "git"],
  ["azure", "git"],
];

export function SkillsConstellation() {
  const [hover, setHover] = useState<string | null>(null);
  const [hoverGroup, setHoverGroup] = useState<Group | null>(null);

  const nodeMap = useMemo(() => {
    const m: Record<string, Node> = {};
    for (const n of NODES) m[n.id] = n;
    return m;
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
            A{" "}
            <span className="text-gradient-electric italic">
              constellation
            </span>{" "}
            of what I work with.
          </>
        }
        kicker="Every technology is a node in a wider network. Hover a skill or a category to explore how everything connects."
      />

      {/* Category Chips */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {(Object.keys(GROUP_LABELS) as Group[]).map((group) => (
          <button
            key={group}
            type="button"
            data-cursor="hover"
            onMouseEnter={() => setHoverGroup(group)}
            onMouseLeave={() => setHoverGroup(null)}
            className="flex items-center gap-2 rounded-full border border-foreground/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-foreground/70 backdrop-blur transition-all duration-300 hover:border-white/20 hover:text-white"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: COLOR[group],
              }}
            />
            {GROUP_LABELS[group]}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#07091a] p-6">
        {/* Grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse at center, black 55%, transparent 100%)",
          }}
        />

        <div className="relative aspect-[16/10] w-full">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {EDGES.map(([aId, bId], i) => {
              const a = nodeMap[aId];
              const b = nodeMap[bId];

              if (!a || !b) return null;

              const active =
                hover === aId ||
                hover === bId ||
                hoverGroup === a.group ||
                hoverGroup === b.group;

              const stroke = COLOR[a.group];

              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={stroke}
                  strokeWidth={active ? 0.28 : 0.12}
                  strokeOpacity={active ? 0.85 : 0.22}
                  vectorEffect="non-scaling-stroke"
                  style={{
                    transition: "all 0.35s ease",
                  }}
                />
              );
            })}
          </svg>
          {NODES.map((n, i) => {
            const active =
              hover === n.id ||
              hoverGroup === n.group;

            const color = COLOR[n.group];

            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 10) * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4 + (i % 5) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.2,
                  }}
                  className="flex flex-col items-center"
                >
                  <button
                    type="button"
                    data-cursor="hover"
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                    className="relative flex h-3 w-3 items-center justify-center rounded-full"
                    aria-label={n.label}
                  >
                    {/* Glow */}
                    <span
                      className="absolute inset-0 rounded-full transition-opacity duration-300"
                      style={{
                        background: color,
                        filter: "blur(8px)",
                        opacity: active ? 0.9 : 0.45,
                      }}
                    />

                    {/* Core */}
                    <span
                      className="relative h-2.5 w-2.5 rounded-full ring-1 ring-white/30 transition-transform duration-300"
                      style={{
                        background: color,
                        transform: active
                          ? "scale(1.35)"
                          : "scale(1)",
                        boxShadow: active
                          ? `0 0 12px ${color}, 0 0 24px ${color}`
                          : `0 0 6px ${color}`,
                      }}
                    />
                  </button>

                  <span
                    className="pointer-events-none mt-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-300"
                    style={{
                      color: active
                        ? "white"
                        : "color-mix(in oklab, white 55%, transparent)",
                    }}
                  >
                    {n.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}        </div>
      </div>
    </section>
  );
}          