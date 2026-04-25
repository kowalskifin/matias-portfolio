"use client";

import { useEffect, useRef, useState } from "react";
import { bootLines } from "@/data/boot";

interface BootProps {
  onComplete: () => void;
  isReboot?: boolean;
}

const TEXT_LINES = bootLines.filter((l) => !l.progress);
const PROGRESS_DELAY = bootLines.find((l) => l.progress)?.delay ?? 4800;

export default function Boot({ onComplete }: BootProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const skipRef = useRef(false);
  const doneRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    timers.current.forEach(clearTimeout);
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
      onComplete();
    }, 80);
  };

  const skip = () => {
    skipRef.current = true;
    setSkipped(true);
    finish();
  };

  useEffect(() => {
    // Schedule each text line at its absolute timestamp
    TEXT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        if (skipRef.current) return;
        setVisibleCount(i + 1);
      }, line.delay);
      timers.current.push(t);
    });

    // Schedule progress bar
    const progressTimer = setTimeout(() => {
      if (skipRef.current) return;
      setShowProgress(true);
      runProgress();
    }, PROGRESS_DELAY);
    timers.current.push(progressTimer);

    async function runProgress() {
      let current = 0;
      while (current < 100) {
        if (skipRef.current) return;
        await new Promise<void>((r) => {
          const t = setTimeout(r, Math.floor(Math.random() * 80) + 30);
          timers.current.push(t);
        });
        if (skipRef.current) return;
        const inc = Math.floor(Math.random() * 8) + 2;
        current = Math.min(100, current + inc);
        setProgress(current);
      }
      await new Promise<void>((r) => {
        const t = setTimeout(r, 200);
        timers.current.push(t);
      });
      finish();
    }

    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (flashing) {
    return <div style={{ position: "fixed", inset: 0, background: "white" }} />;
  }

  const progressFill = Math.round((progress / 100) * 32);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 10000 }}>
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      <div className="boot-screen">
        {TEXT_LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            style={{
              color: line.color ?? "#33ff33",
              minHeight: "1.4em",
              whiteSpace: "pre",
            }}
          >
            {line.text || "\u00a0"}
          </div>
        ))}

        {showProgress && (
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                color: "#33ff33",
                fontFamily: "Courier New, monospace",
                fontSize: 13,
              }}
            >
              [{" "}
              {"█".repeat(progressFill)}
              {"░".repeat(32 - progressFill)}
              {" "}]{"  "}
              {progress}%
            </div>
          </div>
        )}
      </div>

      {!skipped && (
        <button
          onClick={skip}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "transparent",
            border: "none",
            color: "#555",
            fontFamily: "Courier New, monospace",
            fontSize: 12,
            cursor: "pointer",
            padding: "4px 8px",
            zIndex: 10001,
          }}
        >
          skip intro ↓
        </button>
      )}
    </div>
  );
}
