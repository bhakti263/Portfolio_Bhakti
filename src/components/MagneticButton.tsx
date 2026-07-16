import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  strength?: number;
  className?: string;
  onClick?: () => void;
};

/**
 * A magnetic button: the content translates toward the cursor while
 * the pointer is inside a slightly enlarged hit area.
 */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  strength = 0.35,
  className = "",
  onClick,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const r = wrap.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    inner.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const handleLeave = () => {
    const inner = innerRef.current;
    if (inner) inner.style.transform = "translate3d(0,0,0)";
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "text-primary-foreground bg-[linear-gradient(110deg,var(--electric),var(--indigo)_55%,var(--purple))] shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--indigo)_60%,transparent)] hover:shadow-[0_18px_60px_-14px_color-mix(in_oklab,var(--purple)_70%,transparent)]"
      : "border border-foreground/15 text-foreground bg-white/5 backdrop-blur hover:border-[color:var(--electric)] hover:text-[color:var(--electric)]";

  const content = (
    <span
      ref={innerRef}
      className={`${base} ${styles} ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s, color 0.3s, border-color 0.3s" }}
    >
      {children}
    </span>
  );

  const wrapperClass = "inline-block p-2 -m-2";

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        data-cursor="hover"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={wrapperClass}
      >
        <span ref={wrapRef}>{content}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={wrapperClass}
    >
      <span ref={wrapRef}>{content}</span>
    </button>
  );
}
