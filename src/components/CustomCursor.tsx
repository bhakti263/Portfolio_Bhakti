import { useEffect, useRef } from "react";

/**
 * Premium custom cursor
 * - Smooth trailing ring
 * - Instant center dot
 * - Hover expansion
 * - Production-safe
 * - Vercel compatible
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let hovered = false;
    let raf = 0;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      const isHover = !!target?.closest(
        '[data-cursor="hover"],a,button,[role="button"]'
      );

      if (hovered !== isHover) {
        hovered = isHover;
        ring.dataset.hover = hovered ? "true" : "false";
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.38;
      ringY += (mouseY - ringY) * 0.38;

      ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, {
      passive: true,
    });

    window.addEventListener("mouseover", onOver, {
      passive: true,
    });

    window.addEventListener("mouseleave", onLeave);

    window.addEventListener("mouseenter", onEnter);

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);

      cancelAnimationFrame(raf);

      document.documentElement.classList.remove(
        "has-custom-cursor"
      );
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-[color:var(--electric)]/60 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out data-[hover=true]:h-14 data-[hover=true]:w-14 data-[hover=true]:border-[color:var(--purple)] data-[hover=true]:bg-[color:var(--electric)]/10"
        style={{
          willChange: "transform",
          opacity: 0,
        }}
      />

      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1 w-1 rounded-full bg-[color:var(--electric)] shadow-[0_0_8px_var(--electric)]"
        style={{
          willChange: "transform",
          opacity: 0,
        }}
      />
    </>
  );
}