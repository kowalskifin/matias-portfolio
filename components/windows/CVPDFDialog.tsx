"use client";

import { useState } from "react";

interface CVPDFDialogProps {
  onClose: () => void;
}

export default function CVPDFDialog({ onClose }: CVPDFDialogProps) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setDownloading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        const a = document.createElement("a");
        a.href = "/cv_matias_korpisalo.pdf";
        a.download = "cv_matias_korpisalo.pdf";
        a.click();
        setTimeout(() => {
          setDownloading(false);
          setProgress(0);
          onClose();
        }, 600);
      }
      setProgress(p);
    }, 80);
  };

  const fill = Math.round((progress / 100) * 20);

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        background: "#c0c0c0",
        height: "100%",
      }}
    >
      <div style={{ fontSize: 32 }}>📄</div>

      {!downloading ? (
        <>
          <p style={{ fontSize: 11, textAlign: "center", margin: 0 }}>
            This document was created on a newer system.
          </p>
          <p style={{ fontSize: 11, textAlign: "center", margin: 0 }}>
            A modern formatted version is available for download.
            <br />
            Would you like to open it?
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button className="win98-btn" onClick={handleDownload}>
              Yes
            </button>
            <button className="win98-btn" onClick={onClose}>
              No
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontSize: 11, margin: 0 }}>Downloading...</p>
          <div
            style={{
              width: "100%",
              background: "#808080",
              border: "2px solid #808080",
              borderRight: "2px solid #fff",
              borderBottom: "2px solid #fff",
              height: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#000080",
                width: `${progress}%`,
                transition: "width 80ms",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "white",
                fontFamily: "Courier New, monospace",
              }}
            >
              {"█".repeat(fill)}{"░".repeat(20 - fill)} {progress}%
            </div>
          </div>
        </>
      )}
    </div>
  );
}
