"use client";

import { cvData } from "@/data/cv";

interface CVWindowProps {
  onOpenPDF: () => void;
  onClose: () => void;
}

export default function CVWindow({ onOpenPDF }: CVWindowProps) {
  const { name, title, contact, about, experience, projects, education, skills } = cvData;

  return (
    <div
      style={{
        background: "white",
        padding: "24px 28px",
        fontFamily: "Georgia, serif",
        fontSize: 12,
        color: "#000",
        height: "100%",
        overflowY: "auto",
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16, borderBottom: "2px solid #000", paddingBottom: 8 }}>
        <h1 style={{ fontSize: 18, fontFamily: "Arial, sans-serif", fontWeight: "bold", margin: 0 }}>
          {name}
        </h1>
        <div style={{ fontSize: 12, fontFamily: "Arial, sans-serif", color: "#444", marginTop: 2 }}>
          {title}
        </div>
        <div style={{ fontSize: 11, fontFamily: "Arial, sans-serif", color: "#666", marginTop: 2 }}>
          {contact.location} · {contact.email} · {contact.phone}
        </div>
      </div>

      {/* About callout */}
      <div
        style={{
          borderLeft: "4px solid #000080",
          paddingLeft: 12,
          marginBottom: 16,
          fontStyle: "italic",
          color: "#333",
          fontSize: 11,
        }}
      >
        {about}
      </div>

      <Section title="EXPERIENCE" />

      {experience.map((job, i) => (
        <JobBlock key={i} job={job} />
      ))}

      <Section title="PERSONAL PROJECTS" />

      {projects.map((p, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: 11 }}>
            {p.name}
            {p.url && (
              <>
                {" — "}
                <a
                  href={`https://${p.url}`}
                  style={{ color: "#000080" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.url}
                </a>
              </>
            )}{" "}
            · {p.status}
          </div>
          <div style={{ paddingLeft: 12, fontSize: 11 }}>{p.description}</div>
        </div>
      ))}

      <Section title="EDUCATION" />
      <p style={{ fontSize: 11, marginBottom: 12 }}>
        {education.degree} · {education.school} · {education.years}
      </p>

      <Section title="SKILLS" />
      <div style={{ fontSize: 11, fontFamily: "Arial, sans-serif" }}>
        {skills.map((s, i) => (
          <div key={i}>{s}</div>
        ))}
      </div>

      <div style={{ marginTop: 20, paddingTop: 12, borderTop: "1px solid #ccc", textAlign: "center" }}>
        <button className="win98-btn" onClick={onOpenPDF}>
          Export as modern PDF...
        </button>
      </div>
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        fontSize: 11,
        borderBottom: "1px solid #000",
        marginBottom: 8,
        marginTop: 14,
        paddingBottom: 2,
        letterSpacing: 0.5,
      }}
    >
      {title}
    </div>
  );
}

function JobBlock({ job }: { job: (typeof cvData.experience)[0] }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: 11 }}>
        {job.role} — {job.company}
      </div>
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 10, color: "#555", marginBottom: 2 }}>
        {job.period} · {job.location} · {job.context}
      </div>
      {job.intro && (
        <div style={{ fontStyle: "italic", fontSize: 10, color: "#555", marginBottom: 4 }}>
          {job.intro}
        </div>
      )}
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11 }}>
        {job.bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 2 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
