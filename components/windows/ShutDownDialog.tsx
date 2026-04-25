"use client";

import { useState } from "react";

interface ShutDownDialogProps {
  onClose: () => void;
  onReboot: () => void;
}

export default function ShutDownDialog({ onClose, onReboot }: ShutDownDialogProps) {
  const [selected, setSelected] = useState<"shutdown" | "restart">("shutdown");
  const [phase, setPhase] = useState<"dialog" | "off">("dialog");

  const handleOK = async () => {
    setPhase("off");
    await new Promise((r) => setTimeout(r, 3000));
    onReboot();
  };

  if (phase === "off") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          It is now safe to turn off your computer.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#c0c0c0",
        padding: 16,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <p style={{ fontSize: 11, margin: 0 }}>What do you want the computer to do?</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 8 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 11 }}>
          <input
            type="radio"
            name="shutdown"
            checked={selected === "shutdown"}
            onChange={() => setSelected("shutdown")}
          />
          Shut down
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 11 }}>
          <input
            type="radio"
            name="shutdown"
            checked={selected === "restart"}
            onChange={() => setSelected("restart")}
          />
          Restart
        </label>
      </div>

      <div
        style={{
          borderTop: "1px solid #808080",
          paddingTop: 12,
          display: "flex",
          gap: 8,
          justifyContent: "center",
        }}
      >
        <button className="win98-btn" onClick={handleOK}>
          OK
        </button>
        <button className="win98-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
