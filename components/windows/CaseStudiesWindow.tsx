"use client";

import { casesData } from "@/data/cases";

interface CaseStudiesWindowProps {
  onOpenCase: (id: string) => void;
}

export default function CaseStudiesWindow({ onOpenCase }: CaseStudiesWindowProps) {
  return (
    <div style={{ background: "white", height: "100%", overflow: "hidden" }}>
      {/* Toolbar */}
      <div
        style={{
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
          padding: "2px 4px",
          display: "flex",
          gap: 4,
        }}
      >
        {["Back", "Forward", "Up"].map((btn) => (
          <button key={btn} className="win98-btn" style={{ minWidth: 40, padding: "1px 6px" }}>
            {btn}
          </button>
        ))}
      </div>

      {/* Column headers */}
      <div
        style={{
          background: "#c0c0c0",
          display: "grid",
          gridTemplateColumns: "1fr 200px",
          borderBottom: "1px solid #808080",
          padding: "2px 4px",
        }}
      >
        {["Name", "Company"].map((h) => (
          <div
            key={h}
            style={{
              borderTop: "2px solid #fff",
              borderLeft: "2px solid #fff",
              borderRight: "2px solid #808080",
              borderBottom: "2px solid #808080",
              padding: "1px 8px",
              fontSize: 11,
              fontWeight: "bold",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {/* File rows */}
      <div style={{ overflowY: "auto", height: "calc(100% - 58px)" }}>
        {casesData.map((c) => (
          <div
            key={c.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 200px",
              padding: "4px 4px",
              borderBottom: "1px solid #e0e0e0",
              opacity: c.available ? 1 : 0.45,
              cursor: c.available ? "pointer" : "default",
              alignItems: "start",
            }}
            onDoubleClick={() => c.available && onOpenCase(c.id)}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 14 }}>📄</span>
                <span style={{ fontWeight: "bold", fontSize: 11 }}>{c.filename}</span>
              </div>
              <div style={{ paddingLeft: 22, fontSize: 10, color: "#444" }}>{c.description}</div>
            </div>
            <div style={{ fontSize: 11, color: "#444", paddingTop: 2 }}>{c.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
