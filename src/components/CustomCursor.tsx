import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      setHover(
        !!target?.closest(
          '[data-cursor="hover"], a, button, [role="button"]'
        )
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none rounded-full border transition-all duration-300"
        style={{
          left: mouse.x,
          top: mouse.y,
          width: hover ? 56 : 36,
          height: hover ? 56 : 36,
          transform: "translate(-50%, -50%)",
          border: "1px solid var(--electric)",
          background: hover ? "rgb(90 170 255 / 0.12)" : "transparent",
          zIndex: 9999,
        }}
      />

      <div
        className="fixed pointer-events-none rounded-full"
        style={{
          left: mouse.x,
          top: mouse.y,
          width: 8,
          height: 8,
          transform: "translate(-50%, -50%)",
          background: "var(--electric)",
          zIndex: 10000,
        }}
      />
    </>
  );
}