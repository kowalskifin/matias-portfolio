"use client";

const CONTENT = `// readme.txt

Name:         Matias Korpisalo
Title:        Senior Product Manager
Location:     Helsinki, Finland
Available:    Q2 2026
Looking for:  B2B SaaS · Europe

I build products and occasionally
the tools I use to build them.

6 years. Four companies. One funding
round that didn't close.

The product shipped anyway.

// end of file`;

export default function ReadmeWindow() {
  return (
    <div style={{ height: "100%" }}>
      <textarea
        className="win98-textarea"
        readOnly
        value={CONTENT}
        style={{
          border: "none",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          resize: "none",
          margin: 2,
          width: "calc(100% - 4px)",
          height: "calc(100% - 4px)",
        }}
      />
    </div>
  );
}
