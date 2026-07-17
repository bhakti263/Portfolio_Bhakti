import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    console.log("CustomCursor mounted");
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        left: "100px",
        width: "20px",
        height: "20px",
        background: "red",
        borderRadius: "50%",
        zIndex: 999999,
        pointerEvents: "none",
      }}
    />
  );
}