import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after mount. Used to defer client-heavy
 * modules (Three.js, Lenis, canvas) past SSR.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
