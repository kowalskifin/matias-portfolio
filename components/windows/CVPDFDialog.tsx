"use client";

interface CVPDFDialogProps {
  onClose: () => void;
  onOpenViewer: () => void;
}

export default function CVPDFDialog({ onClose, onOpenViewer }: CVPDFDialogProps) {
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
      <p style={{ fontSize: 11, textAlign: "center", margin: 0 }}>
        This document was created on a newer system.
      </p>
      <p style={{ fontSize: 11, textAlign: "center", margin: 0 }}>
        A modern formatted version is available for download.
        <br />
        Would you like to open it?
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          className="win98-btn"
          onClick={() => {
            onClose();
            onOpenViewer();
          }}
        >
          Yes
        </button>
        <button className="win98-btn" onClick={onClose}>
          No
        </button>
      </div>
    </div>
  );
}
