"use client";

import { useState } from "react";
import { casesData, CaseEntry } from "@/data/cases";

const workCases = casesData.filter((c) => !c.isPersonal);
const personalCases = casesData.filter((c) => c.isPersonal);

interface Props {
  onTitleChange: (title: string) => void;
}

// ─── Content parsing ──────────────────────────────────────────────────────────

type Segment =
  | { type: "comment"; text: string }
  | { type: "header"; text: string }
  | { type: "para"; lines: string[] }
  | { type: "attachment"; filename: string; label: string }
  | { type: "blank" };

function parseContent(content: string): Segment[] {
  const segs: Segment[] = [];
  let paraLines: string[] = [];

  const flush = () => {
    if (paraLines.length > 0) {
      segs.push({ type: "para", lines: [...paraLines] });
      paraLines = [];
    }
  };

  for (const rawLine of content.split("\n")) {
    const t = rawLine.trim();

    if (!t) {
      flush();
      segs.push({ type: "blank" });
      continue;
    }

    if (t.startsWith("//")) {
      flush();
      segs.push({ type: "comment", text: t });
      continue;
    }

    const attachMatch = t.match(/^\[📎 (.+) — (.+)\]$/);
    if (attachMatch) {
      flush();
      segs.push({ type: "attachment", filename: attachMatch[1].trim(), label: attachMatch[2].trim() });
      continue;
    }

    // All-caps section headers (letters and spaces only, min 3 chars)
    if (/^[A-Z][A-Z\s]+$/.test(t) && t.length >= 3) {
      flush();
      segs.push({ type: "header", text: t });
      continue;
    }

    paraLines.push(t);
  }
  flush();
  return segs;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAddress(page: string): string {
  if (page === "index") return "C:\\Portfolio\\case_studies\\index.htm";
  const c = casesData.find((e) => e.id === page);
  return c ? `C:\\Portfolio\\case_studies\\${c.filename}` : "";
}

function getBrowserTitle(page: string): string {
  if (page === "index") return "🌐 case_studies — Internet Explorer";
  const c = casesData.find((e) => e.id === page);
  return c ? `🌐 ${c.filename} — Internet Explorer` : "🌐 Internet Explorer";
}

function getStatus(page: string): string {
  if (page === "index") return "5 objects";
  const c = casesData.find((e) => e.id === page);
  return c ? c.meta : "";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: "bold",
        letterSpacing: "0.08em",
        color: "#666",
        fontFamily: "Arial, sans-serif",
        padding: "12px 0 2px",
        textTransform: "uppercase",
        borderBottom: "1px solid #e0e0e0",
        marginBottom: 4,
      }}
    >
      {label}
    </div>
  );
}

function CaseRow({
  c,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  c: CaseEntry;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const available = c.available;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "10px 8px",
        opacity: available ? 1 : 0.55,
        cursor: available ? "pointer" : "default",
        background: hovered ? "#e8f0fe" : "transparent",
        borderBottom: "1px solid #f0f0f0",
        alignItems: "flex-start",
      }}
      onMouseEnter={available ? onMouseEnter : undefined}
      onMouseLeave={onMouseLeave}
      onClick={available ? onClick : undefined}
    >
      {/* Icon */}
      <div
        style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          background: available ? "#e8f0fe" : "#f0f0f0",
          border: `1px solid ${available ? "#c0c8e8" : "#d0d0d0"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}
      >
        📄
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: available ? "#000080" : "#666",
            textDecoration: available ? "underline" : "none",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {c.filename}
        </div>
        <div style={{ fontSize: 11, color: "#333", fontFamily: "Arial, sans-serif" }}>
          {c.meta}
        </div>
        <div style={{ fontSize: 11, color: "#666", fontFamily: "Arial, sans-serif" }}>
          {c.description}
        </div>
      </div>

      {/* Badge */}
      <div
        style={{
          fontSize: 10,
          fontWeight: "bold",
          color: available ? "#008000" : "#888",
          flexShrink: 0,
          paddingTop: 2,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {available ? "LIVE" : "SOON"}
      </div>
    </div>
  );
}

function IndexPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20, paddingBottom: 10, borderBottom: "2px solid #000080" }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#000080",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Matias Korpisalo
        </div>
        <div style={{ fontSize: 11, color: "#666", fontFamily: "Arial, sans-serif" }}>
          Senior Product Manager — Case Studies
        </div>
      </div>

      <SectionLabel label="Work" />
      {workCases.map((c) => (
        <CaseRow
          key={c.id}
          c={c}
          hovered={hoveredId === c.id}
          onMouseEnter={() => setHoveredId(c.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onNavigate(c.id)}
        />
      ))}

      <SectionLabel label="Personal Projects" />
      {personalCases.map((c) => (
        <CaseRow
          key={c.id}
          c={c}
          hovered={hoveredId === c.id}
          onMouseEnter={() => setHoveredId(c.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onNavigate(c.id)}
        />
      ))}
    </div>
  );
}

function AttachmentBar({
  filename,
  label,
  caseEntry,
  expanded,
  onToggle,
}: {
  filename: string;
  label: string;
  caseEntry: CaseEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const screenshot = caseEntry.screenshots?.find((s) => s.filename === filename);

  return (
    <div style={{ margin: "6px 0" }}>
      <div
        style={{
          background: "#f0f0f0",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          borderRight: "2px solid #fff",
          borderBottom: "2px solid #fff",
          padding: "3px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 11,
          cursor: "pointer",
          userSelect: "none",
          fontFamily: "Arial, sans-serif",
        }}
        onClick={onToggle}
      >
        <span>📎 {filename} — {label}</span>
        <button
          style={{
            background: "#c0c0c0",
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #808080",
            borderBottom: "1px solid #808080",
            padding: "0 5px",
            cursor: "pointer",
            fontSize: 10,
            fontFamily: "Arial, sans-serif",
            lineHeight: "16px",
          }}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
        >
          {expanded ? "−" : "+"}
        </button>
      </div>
      {expanded && screenshot && (
        <div
          style={{
            border: "2px solid #808080",
            borderTop: "none",
            transition: "height 0.15s",
          }}
        >
          <img
            src={screenshot.path}
            alt={screenshot.label}
            style={{ maxHeight: 280, width: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      )}
    </div>
  );
}

function CasePage({
  caseEntry,
  expanded,
  onToggle,
}: {
  caseEntry: CaseEntry;
  expanded: Set<string>;
  onToggle: (filename: string) => void;
}) {
  if (!caseEntry.content) return null;
  const segments = parseContent(caseEntry.content);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20, paddingBottom: 10, borderBottom: "2px solid #000080" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#000080",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {caseEntry.filename}
        </div>
        <div style={{ fontSize: 11, color: "#666", fontFamily: "Arial, sans-serif" }}>
          {caseEntry.meta}
        </div>
      </div>

      {/* Body */}
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1.8, color: "#222" }}>
        {segments.map((seg, i) => {
          switch (seg.type) {
            case "comment":
              return (
                <div key={i} style={{ color: "#666" }}>
                  {seg.text}
                </div>
              );
            case "blank":
              return null;
            case "header":
              return (
                <div key={i} style={{ fontWeight: "bold", marginTop: 16, marginBottom: 6 }}>
                  {seg.text}
                </div>
              );
            case "para":
              return (
                <div key={i} style={{ marginBottom: 16 }}>
                  {seg.lines.join(" ")}
                </div>
              );
            case "attachment":
              return (
                <AttachmentBar
                  key={i}
                  filename={seg.filename}
                  label={seg.label}
                  caseEntry={caseEntry}
                  expanded={expanded.has(seg.filename)}
                  onToggle={() => onToggle(seg.filename)}
                />
              );
          }
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CaseStudiesBrowserWindow({ onTitleChange }: Props) {
  const [currentPage, setCurrentPage] = useState<string>("index");
  const [history, setHistory] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const currentCase = casesData.find((c) => c.id === currentPage) ?? null;
  const canGoBack = history.length > 0;

  const navigate = (page: string) => {
    setHistory((h) => [...h, currentPage]);
    setCurrentPage(page);
    onTitleChange(getBrowserTitle(page));
  };

  const goBack = () => {
    if (!canGoBack) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentPage(prev);
    onTitleChange(getBrowserTitle(prev));
  };

  const toggleExpanded = (filename: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(filename)) next.delete(filename);
      else next.add(filename);
      return next;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#c0c0c0" }}>
      {/* Toolbar */}
      <div
        style={{
          background: "#c0c0c0",
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #808080",
          borderBottom: "2px solid #808080",
          margin: 2,
          padding: "4px 6px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <button
          className="win98-btn"
          style={{ minWidth: 0, padding: "1px 8px", opacity: canGoBack ? 1 : 0.45 }}
          disabled={!canGoBack}
          onClick={goBack}
        >
          ← Back
        </button>
        <button
          className="win98-btn"
          style={{ minWidth: 0, padding: "1px 8px", opacity: 0.45 }}
          disabled
        >
          Forward →
        </button>

        {/* Address area */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          <span style={{ fontSize: 11, fontFamily: "Arial, sans-serif", flexShrink: 0 }}>Address</span>
          <div
            style={{
              flex: 1,
              background: "white",
              borderTop: "2px solid #808080",
              borderLeft: "2px solid #808080",
              borderRight: "2px solid #fff",
              borderBottom: "2px solid #fff",
              padding: "1px 4px",
              fontSize: 11,
              fontFamily: "Arial, sans-serif",
              color: "#000080",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              height: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            {getAddress(currentPage)}
          </div>
          <button
            className="win98-btn"
            style={{ minWidth: 0, padding: "1px 10px" }}
            onClick={() => currentPage !== "index" && navigate("index")}
          >
            Go
          </button>
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          background: "white",
          overflowY: "auto",
          padding: "24px 28px",
          minHeight: 0,
        }}
      >
        {currentPage === "index" ? (
          <IndexPage onNavigate={navigate} />
        ) : currentCase ? (
          <CasePage caseEntry={currentCase} expanded={expanded} onToggle={toggleExpanded} />
        ) : null}
      </div>

      {/* Status bar */}
      <div className="win98-statusbar">
        <span className="win98-statusbar-panel" style={{ flex: 1 }}>
          {getStatus(currentPage)}
        </span>
        <span className="win98-statusbar-panel" style={{ width: 80 }} />
        <span className="win98-statusbar-panel" style={{ width: 80 }} />
      </div>
    </div>
  );
}
