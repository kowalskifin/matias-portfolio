"use client";

import { cvData } from "@/data/cv";

interface CVViewerWindowProps {
  onClose: () => void;
}

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/cv_matias_korpisalo.pdf";
  a.download = "cv_matias_korpisalo.pdf";
  a.click();
}

export default function CVViewerWindow({ onClose }: CVViewerWindowProps) {
  const { name, title, contact, about, experience, projects, education, skills } = cvData;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, background: "#c0c0c0" }}>
      {/* Toolbar */}
      <div
        style={{
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
          padding: "3px 6px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <button
          className="win98-btn"
          style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 10px" }}
          onClick={downloadCV}
        >
          💾 Save to computer ↓
        </button>
        <button className="win98-btn" style={{ padding: "2px 10px" }} onClick={() => window.print()}>
          🖨️ Print
        </button>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#444" }}>Page 1 of 1</span>
      </div>

      {/* Page area */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          background: "#808080",
          padding: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* A4-proportioned white page */}
        <div
          style={{
            background: "white",
            width: "100%",
            maxWidth: 500,
            minHeight: 680,
            padding: "32px 36px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.4), 0 0 0 1px #555",
            fontFamily: "Georgia, serif",
            fontSize: 11,
            lineHeight: 1.6,
            color: "#111",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 18, borderBottom: "2px solid #111", paddingBottom: 10 }}>
            <div style={{ fontSize: 22, fontWeight: "bold", fontFamily: "Arial, sans-serif", letterSpacing: 0.5 }}>
              {name}
            </div>
            <div style={{ fontSize: 13, fontFamily: "Arial, sans-serif", color: "#333", marginTop: 3 }}>
              {title}
            </div>
            <div style={{ fontSize: 10, fontFamily: "Arial, sans-serif", color: "#666", marginTop: 4, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span>📍 {contact.location}</span>
              <span>✉️ {contact.email}</span>
              <span>📞 {contact.phone}</span>
              <span>🌍 {contact.availability}</span>
            </div>
          </div>

          {/* About */}
          <div
            style={{
              borderLeft: "3px solid #000080",
              paddingLeft: 12,
              marginBottom: 18,
              fontStyle: "italic",
              color: "#333",
              fontSize: 11,
              background: "#f8f8ff",
              padding: "8px 8px 8px 14px",
            }}
          >
            {about}
          </div>

          <PdfSection title="EXPERIENCE" />
          {experience.map((job, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: 11 }}>
                  {job.role} — {job.company}
                </span>
                <span style={{ fontSize: 10, color: "#666", fontFamily: "Arial, sans-serif" }}>
                  {job.period}
                </span>
              </div>
              <div style={{ fontSize: 10, color: "#555", fontFamily: "Arial, sans-serif", marginBottom: 3 }}>
                {job.location} · {job.context}
              </div>
              {job.intro && (
                <div style={{ fontStyle: "italic", fontSize: 10, color: "#555", marginBottom: 4 }}>
                  {job.intro}
                </div>
              )}
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10.5 }}>
                {job.bullets.map((b, j) => (
                  <li key={j} style={{ marginBottom: 2 }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}

          <PdfSection title="PERSONAL PROJECTS" />
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: 11 }}>
                {p.name} · <span style={{ color: "#000080" }}>{p.status}</span>
              </div>
              <div style={{ fontSize: 10.5, paddingLeft: 8 }}>{p.description}</div>
            </div>
          ))}

          <PdfSection title="EDUCATION" />
          <div style={{ fontSize: 11, marginBottom: 14 }}>
            {education.degree} · {education.school} · {education.years}
          </div>

          <PdfSection title="SKILLS" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 12px", fontSize: 10.5 }}>
            {skills.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PdfSection({ title }: { title: string }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        fontSize: 10,
        letterSpacing: 1,
        borderBottom: "1px solid #111",
        marginBottom: 8,
        marginTop: 16,
        paddingBottom: 2,
        color: "#000080",
      }}
    >
      {title}
    </div>
  );
}
