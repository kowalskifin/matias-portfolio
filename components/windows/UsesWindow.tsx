"use client";

import { usesData } from "@/data/uses";

export default function UsesWindow() {
  return (
    <div style={{ background: "white", height: "100%", overflow: "auto" }}>
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 1fr",
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
          padding: "2px 0",
        }}
      >
        {["Tool", "What for"].map((h) => (
          <div
            key={h}
            style={{
              padding: "2px 8px",
              fontSize: 11,
              fontWeight: "bold",
              borderTop: "2px solid #fff",
              borderLeft: "2px solid #fff",
              borderRight: "2px solid #808080",
              borderBottom: "2px solid #808080",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #fff", margin: "0 4px" }} />

      {usesData.map((row, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            borderBottom: "1px solid #e8e8e8",
            background: i % 2 === 0 ? "white" : "#f8f8f8",
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              fontSize: 11,
              fontWeight: "bold",
              borderRight: "1px solid #e0e0e0",
            }}
          >
            {row.tool}
          </div>
          <div style={{ padding: "4px 8px", fontSize: 11 }}>{row.what}</div>
        </div>
      ))}
    </div>
  );
}
