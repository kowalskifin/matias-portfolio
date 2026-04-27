"use client";

import { useState } from "react";
import { casesData } from "@/data/cases";

const notedCase = casesData.find((c) => c.id === "case-noted")!;

const ATTACH_RE = /^\[📎\s+(\S+)\s+—\s+(.+)\]$/u;

type ParsedLine =
  | { type: "text"; text: string }
  | { type: "attachment"; filename: string; label: string };

function parseLines(content: string): ParsedLine[] {
  return content.split("\n").map((line) => {
    const m = ATTACH_RE.exec(line.trim());
    if (m) return { type: "attachment", filename: m[1], label: m[2] };
    return { type: "text", text: line };
  });
}

function AttachmentBlock({
  path,
  filename,
  label,
}: {
  path: string;
  filename: string;
  label: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggle = () => setExpanded((v) => !v);

  return (
    <div style={{ margin: "6px 14px" }}>
      <div
        style={{
          background: hovered ? "#e0e0e0" : expanded ? "#e8e8e8" : "#f0f0f0",
          borderTop: "1px solid #c0c0c0",
          borderLeft: "1px solid #c0c0c0",
          borderRight: "1px solid #808080",
          borderBottom: "1px solid #808080",
          padding: "4px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          fontFamily: "Courier New, monospace",
          fontSize: 11,
          userSelect: "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggle}
      >
        <span>📎&nbsp; {filename} — {label}</span>
        <button
          className="win98-btn"
          style={{ fontSize: 11, padding: "0 6px", minWidth: 22, fontWeight: "bold", lineHeight: 1.4 }}
          onClick={(e) => { e.stopPropagation(); toggle(); }}
        >
          {expanded ? "−" : "+"}
        </button>
      </div>

      {expanded && (
        <div
          style={{
            border: "2px solid #808080",
            background: "#fff",
            boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #c0c0c0",
            transition: "all 0.15s ease",
          }}
        >
          {imgError ? (
            <div
              style={{
                padding: 20,
                textAlign: "center",
                color: "#888",
                fontSize: 11,
                fontFamily: "Courier New, monospace",
              }}
            >
              🖼️&nbsp; Unable to load image
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={path}
              alt={label}
              style={{ width: "100%", maxHeight: 280, objectFit: "contain", display: "block" }}
              onError={() => setImgError(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function CaseStudyNotedWindow() {
  const lines = parseLines(notedCase.content ?? "");
  const screenshots = notedCase.screenshots ?? [];

  return (
    <div
      style={{
        background: "white",
        height: "100%",
        overflowY: "auto",
        fontFamily: "Courier New, monospace",
        fontSize: 12,
        lineHeight: 1.7,
        color: "#000",
      }}
    >
      {lines.map((item, i) => {
        if (item.type === "attachment") {
          const screenshot = screenshots.find((s) => s.filename === item.filename);
          if (!screenshot) return null;
          return (
            <AttachmentBlock
              key={i}
              path={screenshot.path}
              filename={item.filename}
              label={item.label}
            />
          );
        }
        return (
          <div key={i} style={{ padding: "0 14px", whiteSpace: "pre-wrap" }}>
            {item.text || "\u00a0"}
          </div>
        );
      })}
    </div>
  );
}
