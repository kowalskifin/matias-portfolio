"use client";

interface AboutDialogProps {
  onClose: () => void;
}

export default function AboutDialog({ onClose }: AboutDialogProps) {
  return (
    <div
      style={{
        background: "#c0c0c0",
        padding: 20,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        textAlign: "center",
      }}
    >
      {/* MK logo */}
      <div
        style={{
          width: 48,
          height: 48,
          background: "linear-gradient(to bottom right, #000080, #1084d0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: 18,
          border: "2px solid #fff",
        }}
      >
        MK
      </div>

      <div>
        <div style={{ fontWeight: "bold", fontSize: 13 }}>Portfolio OS</div>
        <div style={{ fontSize: 11, marginTop: 2 }}>Version 1.0 (Build 1998)</div>
      </div>

      <div
        style={{
          borderTop: "1px solid #808080",
          borderBottom: "1px solid #fff",
          width: "100%",
          height: 2,
        }}
      />

      <div style={{ fontSize: 11 }}>
        <div>This product is licensed to:</div>
        <div style={{ fontWeight: "bold", marginTop: 4 }}>Matias Korpisalo</div>
        <div>Senior Product Manager</div>
      </div>

      <div style={{ fontSize: 10, color: "#444", marginTop: 4 }}>
        © 2026 Matias Korpisalo
        <br />
        No rights reserved.
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="win98-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
