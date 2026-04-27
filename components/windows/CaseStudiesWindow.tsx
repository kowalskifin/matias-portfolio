"use client";

import { useState } from "react";
import { casesData } from "@/data/cases";

interface CaseStudiesWindowProps {
  onOpenCase: (id: string) => void;
}

const workCases = casesData.filter((c) => !c.isPersonal);
const personalCases = casesData.filter((c) => c.isPersonal);

function SectionHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "8px 4px 2px",
        fontSize: 10,
        color: "#888",
        letterSpacing: "0.08em",
        fontWeight: "bold",
        userSelect: "none",
      }}
    >
      {label}
      <div style={{ borderBottom: "1px solid #d0d0d0", marginTop: 2 }} />
    </div>
  );
}

export default function CaseStudiesWindow({ onOpenCase }: CaseStudiesWindowProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const renderRow = (c: (typeof casesData)[number]) => {
    const isHovered = hoveredId === c.id && c.available;
    return (
      <div
        key={c.id}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px",
          padding: "5px 4px",
          borderBottom: "1px solid #e0e0e0",
          opacity: c.available ? 1 : 0.45,
          cursor: c.available ? "pointer" : "default",
          alignItems: "start",
          background: isHovered ? "#000080" : "transparent",
          color: isHovered ? "white" : "inherit",
          userSelect: "none",
        }}
        onMouseEnter={() => c.available && setHoveredId(c.id)}
        onMouseLeave={() => setHoveredId(null)}
        onDoubleClick={() => c.available && onOpenCase(c.id)}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 14 }}>📄</span>
            <span style={{ fontWeight: "bold", fontSize: 11 }}>{c.filename}</span>
          </div>
          <div style={{ paddingLeft: 22, fontSize: 10, color: isHovered ? "#ddd" : "#444" }}>
            {c.description}
          </div>
          {c.available && (
            <div
              style={{
                paddingLeft: 22,
                fontSize: 9,
                color: isHovered ? "#bbb" : "#888",
                fontStyle: "italic",
                marginTop: 2,
              }}
            >
              Double-click to open
            </div>
          )}
        </div>
        <div style={{ fontSize: 11, color: isHovered ? "#ddd" : "#444", paddingTop: 2 }}>
          {c.meta}
        </div>
      </div>
    );
  };

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
        {["Name", "Details"].map((h) => (
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
      <div style={{ overflowY: "auto", height: "calc(100% - 58px)", padding: "0 4px 8px" }}>
        <SectionHeader label="WORK" />
        {workCases.map(renderRow)}

        <SectionHeader label="PERSONAL PROJECTS" />
        {personalCases.map(renderRow)}
      </div>
    </div>
  );
}
