"use client";

import { useState } from "react";
import Boot from "@/components/Boot";
import Desktop from "@/components/Desktop";

type Phase = "boot" | "desktop" | "shutdown";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("boot");

  return (
    <>
      {/* Mobile error — shown only on small screens via CSS */}
      <div
        className="mobile-error"
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          background: "#c0c0c0",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
        }}
      >
        <div
          style={{
            background: "#c0c0c0",
            borderTop: "2px solid #fff",
            borderLeft: "2px solid #fff",
            borderRight: "2px solid #808080",
            borderBottom: "2px solid #808080",
            maxWidth: "340px",
            width: "90%",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to right, #aa0000, #cc2020)",
              color: "white",
              fontWeight: "bold",
              fontSize: 11,
              padding: "3px 6px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                background: "#fff",
                color: "#aa0000",
                borderRadius: "50%",
                width: 14,
                height: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 10,
                flexShrink: 0,
              }}
            >
              !
            </span>
            FATAL ERROR
          </div>
          <div style={{ padding: "16px 16px 12px", fontSize: 12 }}>
            <p style={{ fontWeight: "bold", marginBottom: 8 }}>
              This application requires a minimum screen width of 1024px to run.
            </p>
            <p style={{ marginBottom: 8 }}>
              Mobile devices were not supported in 1998. They are not supported
              here.
            </p>
            <p style={{ marginBottom: 12 }}>
              Please return on a real computer.
            </p>
            <p
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: 10,
                marginBottom: 16,
                color: "#444",
              }}
            >
              Error code: 0x00MOBILE
            </p>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <button className="win98-btn">OK</button>
            </div>
            <p style={{ textAlign: "center", fontSize: 10, color: "#666" }}>
              or just email me:{" "}
              <a
                href="mailto:matias.korpisalo@outlook.com"
                style={{ color: "#000080" }}
              >
                matias.korpisalo@outlook.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop-only content */}
      <div className="desktop-only" style={{ height: "100%" }}>
        {phase === "boot" || phase === "shutdown" ? (
          <Boot
            onComplete={() => setPhase("desktop")}
            isReboot={phase === "shutdown"}
          />
        ) : (
          <Desktop onReboot={() => setPhase("shutdown")} />
        )}
      </div>
    </>
  );
}
