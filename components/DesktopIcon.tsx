"use client";

import { useState } from "react";

interface DesktopIconProps {
  icon: string;
  label: string;
  x: number;
  y: number;
  onOpen: () => void;
}

export default function DesktopIcon({ icon, label, x, y, onOpen }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  const lastClick = { time: 0 };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClick.time < 400) {
      onOpen();
      lastClick.time = 0;
    } else {
      lastClick.time = now;
      setSelected(true);
    }
  };

  return (
    <div
      className={`desktop-icon${selected ? " selected" : ""}`}
      style={{ left: x, top: y }}
      onClick={handleClick}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
      <span className="icon-label">{label}</span>
    </div>
  );
}
