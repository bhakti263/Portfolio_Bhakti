import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { answerQuery, SUGGESTED_PROMPTS } from "@/lib/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm Bhakti's portfolio assistant. Ask me anything about her **projects**, **skills**, **experience**, **certifications**, or how to **get in touch**.",
};

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const ask = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    // small delay for the "thinking" feel
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: answerQuery(q) }]);
    }, 260);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
    setInput("");
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        type="button"
        data-cursor="hover"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--electric),var(--indigo)_55%,var(--purple))] text-white shadow-[0_18px_60px_-14px_color-mix(in_oklab,var(--indigo)_75%,transparent)] outline-none ring-1 ring-white/15 transition-shadow hover:shadow-[0_22px_70px_-12px_color-mix(in_oklab,var(--purple)_80%,transparent)] md:bottom-8 md:right-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Bot className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open ? (
          <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[color:var(--electric)]/40" />
        ) : null}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(72vh,560px)] w-[min(94vw,380px)] flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-[oklch(0.15_0.02_265)]/95 shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--indigo)_70%,transparent)] backdrop-blur-xl md:bottom-28 md:right-8"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--electric)] to-[color:var(--purple)] text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  Bhakti's Portfolio Assistant
                </p>
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--emerald)] animate-pulse" />
                  online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[13.5px] leading-relaxed"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[linear-gradient(135deg,var(--electric),var(--indigo))] px-3.5 py-2 text-white shadow-md"
                      : "mr-auto max-w-[92%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-white/85 ring-1 ring-white/5"
                  }
                >
                  {m.role === "assistant" ? (
                    <div className="prose-chat">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target={href?.startsWith("http") ? "_blank" : undefined}
                              rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
                              className="text-[color:var(--electric)] underline decoration-[color:var(--electric)]/40 underline-offset-2 hover:decoration-[color:var(--electric)]"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span>{m.content}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Suggested prompts */}
            <div className="border-t border-white/10 px-3 pb-2 pt-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    data-cursor="hover"
                    onClick={() => ask(p)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70 transition-all hover:border-[color:var(--electric)]/50 hover:text-white"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Bhakti…"
                  className="h-10 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[13px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-[color:var(--electric)]"
                />
                <button
                  type="submit"
                  data-cursor="hover"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--electric),var(--purple))] text-white transition-transform hover:scale-105"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* markdown styles scoped to the chat */}
      <style>{`
        .prose-chat p { margin: 0.15rem 0; }
        .prose-chat h3 { font-size: 0.85rem; font-weight: 600; color: white; margin: 0.15rem 0 0.35rem; letter-spacing: 0.02em; }
        .prose-chat strong { color: white; font-weight: 600; }
        .prose-chat em { color: rgba(255,255,255,0.7); }
        .prose-chat ul { list-style: none; padding-left: 0; margin: 0.25rem 0; }
        .prose-chat li { padding-left: 0.9rem; position: relative; margin: 0.1rem 0; }
        .prose-chat li::before { content: "›"; position: absolute; left: 0; color: var(--electric); }
        .prose-chat code { background: rgba(255,255,255,0.08); padding: 0 0.3rem; border-radius: 4px; font-size: 0.85em; }
        .prose-chat hr { border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 0.6rem 0; }
      `}</style>
    </>
  );
}
