"use client";

import { useState } from "react";

interface AlertPopupProps {
  onOpenCV: () => void;
  onDismiss: () => void;
}

type AlertState = "main" | "confirm" | "gone";

export default function AlertPopup({ onOpenCV, onDismiss }: AlertPopupProps) {
  const [state, setState] = useState<AlertState>("main");

  if (state === "gone") return null;

  const handleNo = () => {
    setState("confirm");
  };

  const handleConfirmNo = () => {
    setState("gone");
    onDismiss();
  };

  if (state === "confirm") {
    return (
      <AlertChrome
        titleBg="linear-gradient(to right, #808000, #a0a000)"
        icon="⚠️"
        title="Are you sure?"
      >
        <div style={{ padding: "12px 16px", fontSize: 11, lineHeight: 1.7 }}>
          <p style={{ margin: "0 0 8px" }}>Are you sure you don&apos;t want to view the resume?</p>
          <p style={{ margin: "0 0 8px" }}>
            This candidate has 6+ years experience and ships actual products.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
            <button
              className="win98-btn"
              onClick={() => {
                setState("gone");
                onOpenCV();
              }}
            >
              Fine, yes
            </button>
            <button className="win98-btn" onClick={handleConfirmNo}>
              No
            </button>
          </div>
        </div>
      </AlertChrome>
    );
  }

  return (
    <AlertChrome
      titleBg="linear-gradient(to right, #aa0000, #cc2020)"
      icon="!!"
      title="!!! CRITICAL ALERT"
    >
      <div style={{ padding: "12px 16px", fontSize: 11, lineHeight: 1.7 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#cc0000",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
              flexShrink: 0,
              border: "2px solid #fff",
            }}
          >
            !!
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>HIRING MANAGER DETECTED</div>
            <div>Threat level: OPPORTUNITY</div>
            <div style={{ marginTop: 4 }}>Open Resume?</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            className="win98-btn"
            onClick={() => {
              setState("gone");
              onOpenCV();
            }}
          >
            Yss
          </button>
          <button className="win98-btn" onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </AlertChrome>
  );
}

function AlertChrome({
  titleBg,
  icon,
  title,
  children,
}: {
  titleBg: string;
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="alert-popup win98-window"
      style={{
        position: "fixed",
        bottom: 40,
        right: 16,
        width: 280,
        zIndex: 5000,
        boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          background: titleBg,
          color: "white",
          fontWeight: "bold",
          fontSize: 11,
          padding: "3px 6px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          userSelect: "none",
        }}
      >
        <span
          style={{
            background: "rgba(255,255,255,0.9)",
            color: "#aa0000",
            borderRadius: "50%",
            width: 14,
            height: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 9,
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        {title}
      </div>
      {children}
    </div>
  );
}
