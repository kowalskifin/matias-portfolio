"use client";

import { useState } from "react";

interface RecycleBinProps {
  onOpenOverthinker: () => void;
}

const ITEMS = [
  { icon: "🗑️", name: "imposter_syndrome.exe", special: "overthinker" },
  { icon: "📄", name: "old_roadmaps_v12_FINAL.doc", special: null },
  { icon: "📊", name: "deck_that_shipped_nothing.ppt", special: null },
  { icon: "⚙️", name: "overthinking.dll", special: "overthinking" },
  { icon: "📧", name: "meeting_that_could_have_been_email.msg", special: null },
];

export default function RecycleBin({ onOpenOverthinker }: RecycleBinProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleDoubleClick = (item: (typeof ITEMS)[0]) => {
    if (item.special === "overthinker" || item.special === "overthinking") {
      onOpenOverthinker();
    }
  };

  return (
    <div style={{ background: "white", height: "100%", overflow: "auto" }}>
      {ITEMS.map((item) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 8px",
            background: selected === item.name ? "#000080" : "transparent",
            color: selected === item.name ? "white" : "inherit",
            cursor: "default",
            userSelect: "none",
            fontSize: 11,
          }}
          onClick={() => setSelected(item.name)}
          onDoubleClick={() => handleDoubleClick(item)}
        >
          <span style={{ fontSize: 14 }}>{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}

      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          padding: "8px",
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <button className="win98-btn">Empty</button>
        <button className="win98-btn" onClick={() => setSelected(null)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
