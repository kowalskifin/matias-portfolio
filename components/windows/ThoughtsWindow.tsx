"use client";

import { thoughtsContent } from "@/data/thoughts";

export default function ThoughtsWindow() {
  return (
    <div style={{ height: "100%" }}>
      <textarea
        className="win98-textarea"
        readOnly
        value={thoughtsContent}
        style={{
          border: "none",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          resize: "none",
          margin: 2,
          width: "calc(100% - 4px)",
          height: "calc(100% - 4px)",
        }}
      />
    </div>
  );
}
