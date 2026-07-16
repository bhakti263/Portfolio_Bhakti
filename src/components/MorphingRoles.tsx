import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ROLES = [
  "Software Engineer",
  "AI Engineer",
  "Full Stack Developer",
  "Problem Solver",
  "Creative Technologist",
];

/**
 * Rotates through role labels with a soft mask + slide morph.
 * Not a typewriter: full words fluidly replace one another.
 */
export function MorphingRoles({ delay = 1600 }: { delay?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative inline-block h-[1.35em] overflow-hidden align-baseline"
      style={{ minWidth: "18ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(8px)" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: i === 0 ? delay / 1000 : 0,
          }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
