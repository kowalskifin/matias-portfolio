"use client";

import { useEffect, useRef } from "react";
import { WindowId } from "@/types/window";

interface StartMenuProps {
  onOpen: (id: WindowId) => void;
  onShutDown: () => void;
  onClose: () => void;
}

const MENU_ITEMS: { icon: string; label: string; id: WindowId }[] = [
  { icon: "📄", label: "cv.doc", id: "cv" },
  { icon: "📁", label: "case_studies", id: "cases" },
  { icon: "📝", label: "thoughts.txt", id: "thoughts" },
  { icon: "💻", label: "uses.exe", id: "uses" },
  { icon: "✉️", label: "contact", id: "contact" },
  { icon: "💣", label: "Minesweeper", id: "minesweeper" },
];

export default function StartMenu({ onOpen, onShutDown, onClose }: StartMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Slight delay so the start button click doesn't immediately close it
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  return (
    <div ref={ref} className="start-menu">
      <div className="start-menu-stripe">
        <span>MK Portfolio</span>
      </div>
      <div className="start-menu-items">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.id}
            className="start-menu-item"
            onClick={() => {
              onClose();
              onOpen(item.id);
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <div className="start-menu-divider" />
        <div
          className="start-menu-item"
          onClick={() => {
            onClose();
            onShutDown();
          }}
        >
          <span style={{ fontSize: 16 }}>🔌</span>
          <span>Shut Down...</span>
        </div>
      </div>
    </div>
  );
}
