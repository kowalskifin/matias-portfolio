"use client";

import { useState } from "react";

interface WelcomeWindowProps {
  onClose: () => void;
  onOpenCV: () => void;
  onOpenCases: () => void;
  onOpenThoughts: () => void;
  onOpenContact: () => void;
}

const NAV_ITEMS = [
  { id: "who",        icon: "👤", label: "Who is this?",  accent: "#ff6b35" },
  { id: "experience", icon: "💼", label: "Experience",     accent: "#4ecdc4" },
  { id: "projects",   icon: "🛠", label: "Projects",       accent: "#45b7d1" },
  { id: "thinking",   icon: "💭", label: "How I think",    accent: "#96ceb4" },
  { id: "contact",    icon: "📬", label: "Get in touch",   accent: "#dda0dd" },
];

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderLeft: "3px solid #000080",
      background: "rgba(0,0,128,0.06)",
      padding: "8px 10px",
      fontSize: 11,
      lineHeight: 1.6,
      marginTop: 10,
    }}>
      {children}
    </div>
  );
}

function ActionButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#c0c0c0",
        borderTop: "1px solid #fff",
        borderLeft: "1px solid #fff",
        borderRight: "1px solid #404040",
        borderBottom: "1px solid #404040",
        padding: "4px 14px",
        font: "11px Arial",
        cursor: "pointer",
        marginTop: 12,
      }}
    >
      {children}
    </button>
  );
}

function PanelWho({ onOpenCV }: { onOpenCV: () => void }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a2e", marginBottom: 6 }}>Welcome</div>
      <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #000080, transparent)", marginBottom: 14 }} />
      <div style={{ fontSize: 12, color: "#333", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 10px" }}>Senior PM. 6 years in fintech and B2B SaaS.</p>
        <p style={{ margin: "0 0 10px" }}>Customers first, then data, then ship.<br />I've done 0→1 and I've scaled what existed.</p>
        <p style={{ margin: "0 0 10px", fontWeight: "bold" }}>300% usage growth · €10M ARR · 0→1 in 12 months</p>
      </div>
      <InfoBox>Open to European relocation · Q2 2026</InfoBox>
      <ActionButton onClick={onOpenCV}>Open cv.doc →</ActionButton>
    </div>
  );
}

function PanelExperience({ onOpenCV }: { onOpenCV: () => void }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a2e", marginBottom: 6 }}>Work history</div>
      <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #000080, transparent)", marginBottom: 14 }} />
      <div style={{ fontSize: 12, color: "#333", lineHeight: 1.9 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0 16px" }}>
          <span style={{ fontWeight: "bold" }}>Aibidia</span><span style={{ color: "#666" }}>PM · 2025–present</span>
          <span style={{ fontWeight: "bold" }}>Alicent</span><span style={{ color: "#666" }}>Founding PM · 2024–2025</span>
          <span style={{ fontWeight: "bold" }}>Nordea</span><span style={{ color: "#666" }}>Senior PM · 2022–2024</span>
          <span style={{ fontWeight: "bold" }}>If Insurance</span><span style={{ color: "#666" }}>PM · 2019–2022</span>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#555", marginTop: 14, lineHeight: 1.6 }}>
        Double-click cv.doc on the desktop<br />to read the full story.
      </p>
      <ActionButton onClick={onOpenCV}>Open cv.doc →</ActionButton>
    </div>
  );
}

function PanelProjects({ onOpenCases }: { onOpenCases: () => void }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a2e", marginBottom: 6 }}>Things I've built</div>
      <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #000080, transparent)", marginBottom: 14 }} />
      <div style={{ fontSize: 12, color: "#333", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 6px", fontWeight: "bold", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>Work</p>
        <p style={{ margin: "0 0 12px" }}>Alicent · Aibidia · Nordea · If Insurance</p>
        <p style={{ margin: "0 0 6px", fontWeight: "bold", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>Personal</p>
        <p style={{ margin: "0 0 12px" }}>Noted · Release notes pipeline</p>
      </div>
      <p style={{ fontSize: 11, color: "#555", marginTop: 4, lineHeight: 1.6 }}>
        Double-click case_studies on the desktop<br />to read the case studies.
      </p>
      <ActionButton onClick={onOpenCases}>Open case_studies →</ActionButton>
    </div>
  );
}

function PanelThinking({ onOpenThoughts }: { onOpenThoughts: () => void }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a2e", marginBottom: 6 }}>thoughts.txt</div>
      <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #000080, transparent)", marginBottom: 14 }} />
      <div style={{ fontSize: 12, color: "#333", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 10px" }}>
          Things to say about roadmaps, hiring,<br />
          discovery, and building products in<br />
          companies that don't yet know what<br />
          they want.
        </p>
      </div>
      <ActionButton onClick={onOpenThoughts}>Open thoughts.txt →</ActionButton>
    </div>
  );
}

function PanelContact({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a2e", marginBottom: 6 }}>Contact</div>
      <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #000080, transparent)", marginBottom: 14 }} />
      <div style={{ fontSize: 12, color: "#333", lineHeight: 1.9 }}>
        <p style={{ margin: "0 0 4px" }}>matias.korpisalo@outlook.com</p>
        <p style={{ margin: "0 0 4px" }}>linkedin.com/in/matias-korpisalo</p>
        <p style={{ margin: "0 0 10px" }}>Helsinki, Finland</p>
      </div>
      <InfoBox>Open to European relocation · Q2 2026</InfoBox>
      <ActionButton onClick={onOpenContact}>Open contact →</ActionButton>
    </div>
  );
}

export default function WelcomeWindow({ onClose, onOpenCV, onOpenCases, onOpenThoughts, onOpenContact }: WelcomeWindowProps) {
  const [activeNav, setActiveNav] = useState("who");
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("portfolio_show_welcome") !== "false";
  });

  const handleCheckbox = (checked: boolean) => {
    setShowWelcome(checked);
    localStorage.setItem("portfolio_show_welcome", checked ? "true" : "false");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#c0c0c0" }}>
      {/* Main two-column area */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>

        {/* Left column — nav */}
        <div style={{
          width: 160,
          background: "#1a1a2e",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
          <div style={{ padding: "12px 10px 8px" }}>
            <div style={{
              fontSize: 9,
              letterSpacing: "0.12em",
              color: "#888",
              textTransform: "uppercase" as const,
              marginBottom: 6,
            }}>
              CONTENTS
            </div>
            <div style={{ height: 1, background: "#333" }} />
          </div>

          <div style={{ flex: 1 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 10px",
                    cursor: "pointer",
                    background: isActive ? "#000080" : "transparent",
                    color: isActive ? "#fff" : "#ccc",
                    fontSize: 11,
                    fontFamily: "Arial, sans-serif",
                    borderLeft: `3px solid ${isActive ? item.accent : "transparent"}`,
                    transition: "background 0.1s",
                    userSelect: "none" as const,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column — content */}
        <div style={{
          flex: 1,
          background: "linear-gradient(135deg, #e8f4f8 0%, #c8dde8 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            top: -60,
            right: -60,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            bottom: 20,
            left: -40,
            pointerEvents: "none",
          }} />

          {/* Panel content */}
          <div style={{ position: "relative", padding: 20, height: "100%", boxSizing: "border-box", overflow: "auto" }}>
            {activeNav === "who"        && <PanelWho onOpenCV={onOpenCV} />}
            {activeNav === "experience" && <PanelExperience onOpenCV={onOpenCV} />}
            {activeNav === "projects"   && <PanelProjects onOpenCases={onOpenCases} />}
            {activeNav === "thinking"   && <PanelThinking onOpenThoughts={onOpenThoughts} />}
            {activeNav === "contact"    && <PanelContact onOpenContact={onOpenContact} />}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: "#c0c0c0",
        borderTop: "1px solid #808080",
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, cursor: "pointer", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={showWelcome}
            onChange={(e) => handleCheckbox(e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          Show this screen each time Portfolio OS starts
        </label>
        <button
          onClick={onClose}
          style={{
            background: "#c0c0c0",
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #404040",
            borderBottom: "1px solid #404040",
            padding: "4px 14px",
            font: "11px Arial",
            cursor: "pointer",
            minWidth: 60,
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
