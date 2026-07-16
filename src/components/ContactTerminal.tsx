import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Github, Code2, Send, Terminal as TerminalIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { PROFILE, PROJECTS } from "@/lib/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

const HELP = [
  "help        show available commands",
  "about       who I am, in one line",
  "skills      the tech I work with",
  "projects    featured projects",
  "email       open email client",
  "resume      request my resume",
  "github      open github",
  "linkedin    open linkedin",
  "leetcode    open leetcode",
  "contact     jump to contact form",
  "clear       clear the terminal",
];

type Line = { role: "in" | "out"; text: string };

const CMDS = ["help", "about", "skills", "projects", "email", "resume", "github", "linkedin", "leetcode", "contact", "clear"];

function run(cmd: string): { out: string[]; effect?: () => void } {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return { out: [] };
    case "help":
      return { out: HELP };
    case "about":
      return {
        out: [
          "Bhakti Bhosle — CSE (AI & ML) student at Manipal University Jaipur.",
          "Aspiring SDE. Building intelligent systems, one commit at a time.",
        ],
      };
    case "skills":
      return {
        out: [
          "languages   C++ · Python · MySQL · JavaScript · HTML/CSS · Node.js",
          "ai/ml       LLMs · RAG · Agentic Pipelines · Prompt Eng. · NLP · ML · DL",
          "frameworks  PyTorch · TensorFlow · Scikit-learn · Pandas · NumPy · Streamlit · Angular · Express",
          "cloud       Microsoft Azure (AI Fundamentals) · Firebase · Docker",
          "tools       Git · GitHub Copilot",
          "core        DSA · OOP · OS · DBMS · Networks",
        ],
      };
    case "projects":
      return {
        out: PROJECTS.map(
          (p, i) => `P/0${i + 1}  ${p.title.padEnd(28)} — ${p.subtitle} (${p.year})`,
        ),
      };
    case "email":
      return {
        out: [`→ opening mail client for ${PROFILE.email}…`],
        effect: () => window.open(`mailto:${PROFILE.email}`),
      };
    case "resume":
      return {
        out: [
          `→ resume available on request — email ${PROFILE.email}`,
          `  or connect on LinkedIn: ${PROFILE.linkedin}`,
        ],
      };
    case "github":
      return {
        out: [`→ opening ${PROFILE.github}…`],
        effect: () => window.open(PROFILE.github, "_blank", "noopener"),
      };
    case "linkedin":
      return {
        out: [`→ opening ${PROFILE.linkedin}…`],
        effect: () => window.open(PROFILE.linkedin, "_blank", "noopener"),
      };
    case "leetcode":
      return {
        out: [`→ opening ${PROFILE.leetcode}…`],
        effect: () => window.open(PROFILE.leetcode, "_blank", "noopener"),
      };
    case "contact":
      return {
        out: ["→ scrolling to contact form…"],
        effect: () => {
          document.getElementById("contact-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
      };
    case "clear":
      return { out: ["__clear__"] };
    default:
      return { out: [`command not found: ${c}. try \`help\`.`] };
  }
}

function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { role: "out", text: "bhakti-portfolio · v1.0.0" },
    { role: "out", text: "type `help` to list commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const suggestion = input
    ? CMDS.find((c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase())
    : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = input;
    const { out, effect } = run(value);
    setLines((prev) => {
      const next: Line[] = [...prev, { role: "in", text: value }];
      if (out.length === 1 && out[0] === "__clear__") return [];
      for (const l of out) next.push({ role: "out", text: l });
      return next;
    });
    if (value.trim()) {
      setHistory((h) => [...h, value]);
      setHIdx(-1);
    }
    effect?.();
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setInput(suggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const idx = hIdx + 1;
      if (idx >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-[oklch(0.15_0.02_265)] shadow-[0_40px_80px_-40px_color-mix(in_oklab,var(--indigo)_55%,transparent)]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          <TerminalIcon className="h-3 w-3" />
          bhakti@portfolio ~ %
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-[360px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed text-white/85"
      >
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {l.role === "in" ? (
              <>
                <span className="text-[color:var(--emerald)]">➜</span>{" "}
                <span className="text-[color:var(--cyan)]">~</span>{" "}
                <span className="text-white">{l.text}</span>
              </>
            ) : (
              <span className="text-white/70">{l.text}</span>
            )}
          </div>
        ))}

        <form onSubmit={submit} className="mt-1 flex items-center gap-2">
          <span className="text-[color:var(--emerald)]">➜</span>
          <span className="text-[color:var(--cyan)]">~</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-transparent font-mono text-[13px] text-white caret-[color:var(--electric)] outline-none"
            />
            {suggestion ? (
              <span className="pointer-events-none absolute left-0 top-0 text-white/25">
                <span className="invisible">{input}</span>
                {suggestion.slice(input.length)}
                <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
                  ⇥ tab
                </span>
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form
      onSubmit={submit}
      id="contact-form"
      className="space-y-4 rounded-3xl border border-foreground/10 bg-white/[0.06] p-6 backdrop-blur md:p-8"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        or drop a message
      </p>
      <input
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="h-12 w-full rounded-2xl border border-foreground/10 bg-white/5 px-4 text-sm outline-none transition-colors focus:border-[color:var(--electric)]"
      />
      <input
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="h-12 w-full rounded-2xl border border-foreground/10 bg-white/5 px-4 text-sm outline-none transition-colors focus:border-[color:var(--electric)]"
      />
      <textarea
        placeholder="Your message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        rows={5}
        className="w-full resize-none rounded-2xl border border-foreground/10 bg-white/5 p-4 text-sm outline-none transition-colors focus:border-[color:var(--electric)]"
      />
      <button
        type="submit"
        disabled={sent}
        data-cursor="hover"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(110deg,var(--electric),var(--indigo)_55%,var(--purple))] text-sm font-medium text-white shadow-[0_16px_50px_-14px_color-mix(in_oklab,var(--indigo)_65%,transparent)] transition-all hover:shadow-[0_20px_60px_-14px_color-mix(in_oklab,var(--purple)_75%,transparent)] disabled:opacity-70"
      >
        {sent ? (
          <>Opening your mail client ✓</>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
    </form>
  );
}

const CHANNELS = [
  { Icon: Mail, label: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { Icon: Linkedin, label: "linkedin.com/in/bhakti-bhosle", href: PROFILE.linkedin },
  { Icon: Github, label: "github.com/bhakti263", href: PROFILE.github },
  { Icon: Code2, label: "leetcode.com/u/bhakti263", href: PROFILE.leetcode },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-40 md:px-10">
      <SectionHeader
        eyebrow="Contact"
        index="06"
        title={
          <>
            Let's build something{" "}
            <span className="text-gradient-electric italic">that thinks</span>.
          </>
        }
        kicker="Try the terminal — type `help` and press Enter. Or use the form below."
      />

      <div className="grid gap-8 md:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease }}
        >
          <Terminal />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease, delay: 0.08 }}
          className="space-y-6"
        >
          <div className="grid gap-2 rounded-3xl border border-foreground/10 bg-white/[0.06] p-4 backdrop-blur">
            {CHANNELS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                data-cursor="hover"
                className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-foreground/75 transition-all hover:bg-[color:var(--electric)]/8 hover:text-foreground"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--electric)]/10 to-[color:var(--purple)]/10 text-[color:var(--indigo)] transition-all group-hover:from-[color:var(--electric)] group-hover:to-[color:var(--purple)] group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>

          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
