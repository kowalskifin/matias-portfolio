"use client";

import { useEffect, useState } from "react";
import { WindowId, WINDOW_TITLES } from "@/types/window";

interface TaskbarWindow {
  id: WindowId;
  isMinimized: boolean;
  zIndex: number;
}

interface TaskbarProps {
  openWindows: TaskbarWindow[];
  activeWindowId: WindowId | null;
  onWindowClick: (id: WindowId) => void;
  onStartClick: () => void;
  startMenuOpen: boolean;
  onClockClick: () => void;
}

export default function Taskbar({
  openWindows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  startMenuOpen,
  onClockClick,
}: TaskbarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const skipIds: WindowId[] = ["shutdown", "clock"];

  return (
    <div className="taskbar">
      <button
        className={`start-btn${startMenuOpen ? " active" : ""}`}
        onClick={onStartClick}
      >
        🪟 <strong>Start</strong>
      </button>

      {/* Separator */}
      <div
        style={{
          width: 1,
          height: 22,
          borderLeft: "1px solid #808080",
          borderRight: "1px solid #fff",
          flexShrink: 0,
        }}
      />

      {/* Window buttons */}
      <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden" }}>
        {openWindows
          .filter((w) => !skipIds.includes(w.id))
          .map((w) => {
            const isActive = w.id === activeWindowId && !w.isMinimized;
            const title = WINDOW_TITLES[w.id] ?? w.id;
            return (
              <button
                key={w.id}
                className={`taskbar-window-btn${isActive ? " active" : ""}`}
                onClick={() => onWindowClick(w.id)}
                title={title}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {title}
                </span>
              </button>
            );
          })}
      </div>

      {/* Clock */}
      <div
        className="taskbar-clock"
        onClick={onClockClick}
        style={{ cursor: "pointer" }}
        title="Click to open clock"
      >
        🔊 {time}
      </div>
    </div>
  );
}
