import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    console.log("CustomCursor mounted");
    document.documentElement.classList.add("has-custom-cursor");
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        width: 20,
        height: 20,
        background: "red",
        borderRadius: "50%",
        top: 100,
        left: 100,
        zIndex: 999999,
      }}
    />
  );
}