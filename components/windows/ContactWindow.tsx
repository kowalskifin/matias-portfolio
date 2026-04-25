"use client";

import { cvData } from "@/data/cv";

export default function ContactWindow() {
  const { contact } = cvData;

  return (
    <div
      style={{
        background: "#c0c0c0",
        height: "100%",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* Email header area */}
      <div
        style={{
          background: "white",
          border: "2px solid #808080",
          borderRight: "2px solid #fff",
          borderBottom: "2px solid #fff",
          padding: "6px 8px",
          fontSize: 11,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontWeight: "bold", minWidth: 30 }}>To:</span>
          <span
            style={{ color: "#000080", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => window.open(`mailto:${contact.email}`)}
          >
            {contact.email}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontWeight: "bold", minWidth: 30 }}>Re:</span>
          <span>You seem like a good hire</span>
        </div>
      </div>

      <div style={{ borderTop: "2px solid #808080", borderBottom: "2px solid #fff" }} />

      {/* Contact details */}
      <div
        style={{
          background: "white",
          flex: 1,
          padding: "10px 12px",
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          border: "2px solid #808080",
          borderRight: "2px solid #fff",
          borderBottom: "2px solid #fff",
        }}
      >
        <ContactRow icon="📍" text={contact.location} />
        <ContactRow icon="🌍" text={contact.availability} />
        <ContactRow icon="🔗" text="LinkedIn — Matias Korpisalo" href={contact.linkedin} />
        <ContactRow icon="📞" text={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
        <ContactRow icon="📧" text={contact.email} href={`mailto:${contact.email}`} />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button className="win98-btn" onClick={() => window.open(`mailto:${contact.email}`)}>
          Send Email
        </button>
        <button className="win98-btn" onClick={() => window.open(contact.linkedin, "_blank")}>
          LinkedIn
        </button>
      </div>
    </div>
  );
}

function ContactRow({ icon, text, href }: { icon: string; text: string; href?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 14, minWidth: 20 }}>{icon}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          style={{ color: "#000080", textDecoration: "underline", cursor: "pointer" }}
        >
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
