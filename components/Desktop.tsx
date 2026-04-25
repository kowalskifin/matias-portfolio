"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WindowId, WindowState, INITIAL_POSITIONS, WINDOW_TITLES } from "@/types/window";
import Window from "@/components/Window";
import Taskbar from "@/components/Taskbar";
import StartMenu from "@/components/StartMenu";
import DesktopIcon from "@/components/DesktopIcon";
import AlertPopup from "@/components/AlertPopup";
import ContextMenu from "@/components/ContextMenu";
import CVWindow from "@/components/windows/CVWindow";
import CaseStudiesWindow from "@/components/windows/CaseStudiesWindow";
import CaseStudy01Window from "@/components/windows/CaseStudy01Window";
import ThoughtsWindow from "@/components/windows/ThoughtsWindow";
import UsesWindow from "@/components/windows/UsesWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import RecycleBin from "@/components/windows/RecycleBin";
import Minesweeper from "@/components/windows/Minesweeper";
import CVPDFDialog from "@/components/windows/CVPDFDialog";
import ShutDownDialog from "@/components/windows/ShutDownDialog";
import AboutDialog from "@/components/windows/AboutDialog";

interface DesktopProps {
  onReboot: () => void;
}

function buildInitialState(): Record<WindowId, WindowState> {
  const ids: WindowId[] = [
    "cv", "cases", "case-alicent", "thoughts", "uses", "contact",
    "recycle", "cvpdf", "minesweeper", "shutdown", "about", "display-props", "clock",
  ];
  return Object.fromEntries(
    ids.map((id) => [
      id,
      {
        id,
        isOpen: false,
        isMinimized: false,
        position: INITIAL_POSITIONS[id],
        zIndex: 10,
      },
    ])
  ) as Record<WindowId, WindowState>;
}

// Overthinking easter egg state
type OverthinkerPhase = "idle" | "error1" | "done";

// Clock dialog
function ClockDialog({ onClose }: { onClose: () => void }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-GB");

  return (
    <div style={{ background: "#c0c0c0", padding: 16, height: "100%", textAlign: "center" }}>
      <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 8 }}>{dateStr}</div>
      <div style={{ fontSize: 18, fontFamily: "Courier New, monospace", marginBottom: 16 }}>{timeStr}</div>
      <p style={{ fontSize: 10, color: "#666", marginBottom: 16 }}>
        (non-interactive — just display)
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button className="win98-btn" onClick={onClose}>OK</button>
        <button className="win98-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// Display properties — fake dialog
function DisplayPropsDialog({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ background: "#c0c0c0", padding: 16, height: "100%" }}>
      <div style={{ fontSize: 11, marginBottom: 12 }}>
        <strong>Background</strong>
        <div style={{ marginTop: 8, padding: 8, background: "#008080", height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "white", fontSize: 10 }}>[Desktop Preview]</span>
        </div>
      </div>
      <div style={{ fontSize: 11, marginBottom: 12 }}>
        <div>Color scheme: Windows Standard</div>
        <div>Resolution: 1024×768</div>
        <div>Colors: 16-bit High Color</div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
        <button className="win98-btn" onClick={onClose}>OK</button>
        <button className="win98-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const DESKTOP_ICONS = [
  { id: "cv" as WindowId,          icon: "📄", label: "cv.doc",         x: 16,  y: 16  },
  { id: "cases" as WindowId,       icon: "📁", label: "case_studies",   x: 16,  y: 100 },
  { id: "thoughts" as WindowId,    icon: "📝", label: "thoughts.txt",   x: 16,  y: 184 },
  { id: "uses" as WindowId,        icon: "💻", label: "uses.exe",       x: 100, y: 16  },
  { id: "contact" as WindowId,     icon: "✉️", label: "contact",        x: 100, y: 100 },
  { id: "cvpdf" as WindowId,       icon: "📄", label: "cv_modern.pdf",  x: 100, y: 184 },
  { id: "minesweeper" as WindowId, icon: "💣", label: "minesweeper.exe",x: 184, y: 16  },
  { id: "recycle" as WindowId,     icon: "🗑️", label: "Recycle Bin",    x: 16,  y: 460 },
];

const WINDOW_SIZES: Record<string, { w: number; h: number }> = {
  cv:           { w: 390, h: 380 },
  cases:        { w: 360, h: 300 },
  "case-alicent": { w: 380, h: 360 },
  thoughts:     { w: 320, h: 270 },
  uses:         { w: 290, h: 230 },
  contact:      { w: 300, h: 220 },
  recycle:      { w: 300, h: 240 },
  cvpdf:        { w: 280, h: 200 },
  minesweeper:  { w: 220, h: 340 },
  shutdown:     { w: 280, h: 180 },
  about:        { w: 280, h: 260 },
  "display-props": { w: 300, h: 240 },
  clock:        { w: 260, h: 180 },
};

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const TEAL_CYCLE = ["#008080","#00a0a0","#006060","#009090","#007070","#008080"];

export default function Desktop({ onReboot }: DesktopProps) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(buildInitialState);
  const [maxZ, setMaxZ] = useState(10);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [desktopColor, setDesktopColor] = useState("#008080");
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [overthinkerDialogs, setOverthinkerDialogs] = useState<number[]>([]);
  const overthinkerCount = useRef(0);
  const [overthinkerDone, setOverthinkerDone] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Show alert 1.2s after mount
  useEffect(() => {
    const t = setTimeout(() => setAlertVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Konami code
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === KONAMI[konamiIdx]) {
        const next = konamiIdx + 1;
        if (next === KONAMI.length) {
          setKonamiIdx(0);
          triggerKonami();
        } else {
          setKonamiIdx(next);
        }
      } else {
        setKonamiIdx(0);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [konamiIdx]);

  const triggerKonami = async () => {
    for (const color of TEAL_CYCLE) {
      setDesktopColor(color);
      await new Promise((r) => setTimeout(r, 200));
    }
  };

  const focus = useCallback(
    (id: WindowId) => {
      setMaxZ((z) => z + 1);
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], zIndex: maxZ + 1 },
      }));
    },
    [maxZ]
  );

  const openWindow = useCallback(
    (id: WindowId) => {
      setMaxZ((z) => z + 1);
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: maxZ + 1,
        },
      }));
    },
    [maxZ]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const moveWindow = useCallback((id: WindowId, pos: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position: pos },
    }));
  }, []);

  const handleTaskbarWindowClick = useCallback(
    (id: WindowId) => {
      const w = windows[id];
      if (w.isMinimized) {
        openWindow(id);
      } else {
        // Get current active (highest z)
        const openList = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
        const topZ = Math.max(...openList.map((w) => w.zIndex));
        if (w.zIndex === topZ) {
          minimizeWindow(id);
        } else {
          focus(id);
        }
      }
    },
    [windows, openWindow, minimizeWindow, focus]
  );

  const handleDesktopClick = () => {
    setStartMenuOpen(false);
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Overthinking easter egg
  const triggerOverthinker = () => {
    overthinkerCount.current = 0;
    setOverthinkerDone(false);
    setOverthinkerDialogs([Date.now()]);
    overthinkerCount.current = 1;
  };

  const handleOverthinkerOK = (id: number) => {
    setOverthinkerDialogs((prev) => {
      const next = prev.filter((d) => d !== id);
      if (overthinkerCount.current < 8) {
        const spawned = [Date.now(), Date.now() + 1];
        overthinkerCount.current += 2;
        return [...next, ...spawned];
      } else {
        // All close, show done message
        setOverthinkerDone(true);
        return [];
      }
    });
  };

  const openWindows = Object.values(windows).filter((w) => w.isOpen);
  const activeWindow = openWindows
    .filter((w) => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const getSize = (id: WindowId) => {
    const s = WINDOW_SIZES[id] ?? { w: 300, h: 250 };
    return { width: s.w, height: s.h };
  };

  const makeWindowProps = (id: WindowId) => ({
    id,
    title: WINDOW_TITLES[id],
    position: windows[id].position,
    zIndex: windows[id].zIndex,
    onClose: () => closeWindow(id),
    onMinimize: () => minimizeWindow(id),
    onFocus: () => focus(id),
    onMove: (pos: { x: number; y: number }) => moveWindow(id, pos),
    ...getSize(id),
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: desktopColor,
        transition: "background 200ms",
      }}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      ref={desktopRef}
    >
      {/* Desktop area (above taskbar) */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Desktop icons */}
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            x={icon.x}
            y={icon.y}
            onOpen={() => openWindow(icon.id)}
          />
        ))}

        {/* Windows */}
        {windows.cv.isOpen && !windows.cv.isMinimized && (
          <Window
            {...makeWindowProps("cv")}
            menuItems={[
              {
                label: "File",
                items: [
                  { label: "Export as modern PDF...", onClick: () => openWindow("cvpdf") },
                  { label: "Exit", onClick: () => closeWindow("cv") },
                ],
              },
              { label: "Edit", items: [] },
              { label: "View", items: [] },
              { label: "Help", items: [] },
            ]}
            statusLeft="Page 1"
            statusRight="Ready"
          >
            <CVWindow onOpenPDF={() => openWindow("cvpdf")} onClose={() => closeWindow("cv")} />
          </Window>
        )}

        {windows.cases.isOpen && !windows.cases.isMinimized && (
          <Window {...makeWindowProps("cases")} statusLeft="3 objects">
            <CaseStudiesWindow onOpenCase={(id) => {
              if (id === "case-alicent") openWindow("case-alicent");
            }} />
          </Window>
        )}

        {windows["case-alicent"].isOpen && !windows["case-alicent"].isMinimized && (
          <Window
            {...makeWindowProps("case-alicent")}
            menuItems={[
              { label: "File", items: [{ label: "Exit", onClick: () => closeWindow("case-alicent") }] },
              { label: "Edit", items: [] },
            ]}
            statusLeft="Ready"
          >
            <CaseStudy01Window />
          </Window>
        )}

        {windows.thoughts.isOpen && !windows.thoughts.isMinimized && (
          <Window
            {...makeWindowProps("thoughts")}
            menuItems={[
              { label: "File", items: [{ label: "Exit", onClick: () => closeWindow("thoughts") }] },
              { label: "Edit", items: [] },
            ]}
            statusLeft="Ready"
          >
            <ThoughtsWindow />
          </Window>
        )}

        {windows.uses.isOpen && !windows.uses.isMinimized && (
          <Window {...makeWindowProps("uses")} statusLeft="8 objects">
            <UsesWindow />
          </Window>
        )}

        {windows.contact.isOpen && !windows.contact.isMinimized && (
          <Window {...makeWindowProps("contact")}>
            <ContactWindow />
          </Window>
        )}

        {windows.recycle.isOpen && !windows.recycle.isMinimized && (
          <Window {...makeWindowProps("recycle")} statusLeft="5 objects">
            <RecycleBin onOpenOverthinker={triggerOverthinker} />
          </Window>
        )}

        {windows.minesweeper.isOpen && !windows.minesweeper.isMinimized && (
          <Window
            {...makeWindowProps("minesweeper")}
            menuItems={[
              {
                label: "Game",
                items: [
                  { label: "New", onClick: () => { closeWindow("minesweeper"); setTimeout(() => openWindow("minesweeper"), 50); } },
                  { label: "Difficulty", onClick: () => {} },
                ],
              },
              { label: "Help", items: [] },
            ]}
            noScroll
          >
            <Minesweeper onOpenContact={() => openWindow("contact")} />
          </Window>
        )}

        {windows.cvpdf.isOpen && !windows.cvpdf.isMinimized && (
          <Window {...makeWindowProps("cvpdf")}>
            <CVPDFDialog onClose={() => closeWindow("cvpdf")} />
          </Window>
        )}

        {windows.shutdown.isOpen && !windows.shutdown.isMinimized && (
          <Window {...makeWindowProps("shutdown")}>
            <ShutDownDialog
              onClose={() => closeWindow("shutdown")}
              onReboot={onReboot}
            />
          </Window>
        )}

        {windows.about.isOpen && !windows.about.isMinimized && (
          <Window {...makeWindowProps("about")}>
            <AboutDialog onClose={() => closeWindow("about")} />
          </Window>
        )}

        {"display-props" in windows && windows["display-props"].isOpen && !windows["display-props"].isMinimized && (
          <Window {...makeWindowProps("display-props")}>
            <DisplayPropsDialog onClose={() => closeWindow("display-props")} />
          </Window>
        )}

        {windows.clock.isOpen && !windows.clock.isMinimized && (
          <Window {...makeWindowProps("clock")}>
            <ClockDialog onClose={() => closeWindow("clock")} />
          </Window>
        )}

        {/* Overthinking error cascade */}
        {overthinkerDialogs.map((dialogId, i) => (
          <OverthinkerDialog
            key={dialogId}
            index={i}
            onOK={() => handleOverthinkerOK(dialogId)}
            zIndex={maxZ + 100 + i}
          />
        ))}

        {/* Overthinking contained */}
        {overthinkerDone && (
          <SimpleDialog
            title="System message"
            icon="ℹ️"
            zIndex={maxZ + 200}
            onClose={() => setOverthinkerDone(false)}
          >
            <p style={{ margin: "0 0 12px", fontSize: 11, lineHeight: 1.6 }}>
              Overthinking successfully contained.
              <br />
              You may proceed.
            </p>
          </SimpleDialog>
        )}
      </div>

      {/* Alert popup — above taskbar */}
      {alertVisible && !alertDismissed && (
        <AlertPopup
          onOpenCV={() => {
            setAlertVisible(false);
            openWindow("cv");
          }}
          onDismiss={() => {
            setAlertVisible(false);
            setAlertDismissed(true);
          }}
        />
      )}

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onArrangeIcons={() => {}}
          onRefresh={() => {}}
          onProperties={() => openWindow("display-props")}
          onAbout={() => openWindow("about")}
        />
      )}

      {/* Taskbar + Start menu in a propagation-stop wrapper */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
        {startMenuOpen && (
          <StartMenu
            onOpen={openWindow}
            onShutDown={() => openWindow("shutdown")}
            onClose={() => setStartMenuOpen(false)}
          />
        )}
        <Taskbar
          openWindows={openWindows}
          activeWindowId={activeWindow?.id ?? null}
          onWindowClick={handleTaskbarWindowClick}
          onStartClick={() => setStartMenuOpen((v) => !v)}
          startMenuOpen={startMenuOpen}
          onClockClick={() => openWindow("clock")}
        />
      </div>
    </div>
  );
}

function OverthinkerDialog({
  index,
  onOK,
  zIndex,
}: {
  index: number;
  onOK: () => void;
  zIndex: number;
}) {
  return (
    <div
      className="win98-window alert-popup"
      style={{
        position: "absolute",
        left: 300 + index * 18,
        top: 200 + index * 18,
        width: 260,
        zIndex,
      }}
    >
      <div
        style={{
          background: "linear-gradient(to right, #000080, #1084d0)",
          color: "white",
          fontWeight: "bold",
          fontSize: 11,
          padding: "3px 6px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>⚠️ Error</span>
      </div>
      <div style={{ padding: "12px 16px", fontSize: 11 }}>
        <p style={{ margin: "0 0 8px" }}>Cannot run overthinking.dll.</p>
        <p style={{ margin: "0 0 12px" }}>This file has been permanently deleted.</p>
        <p style={{ margin: "0 0 12px", fontWeight: "bold" }}>Good.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="win98-btn" onClick={onOK}>OK</button>
        </div>
      </div>
    </div>
  );
}

function SimpleDialog({
  title,
  icon,
  zIndex,
  onClose,
  children,
}: {
  title: string;
  icon: string;
  zIndex: number;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="win98-window alert-popup"
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%,-50%)",
        width: 280,
        zIndex,
      }}
    >
      <div
        style={{
          background: "linear-gradient(to right, #000080, #1084d0)",
          color: "white",
          fontWeight: "bold",
          fontSize: 11,
          padding: "3px 6px",
        }}
      >
        {icon} {title}
      </div>
      <div style={{ padding: "12px 16px", fontSize: 11 }}>
        {children}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="win98-btn" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
