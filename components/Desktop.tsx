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
import CVViewerWindow from "@/components/windows/CVViewerWindow";
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
import ReadmeWindow from "@/components/windows/ReadmeWindow";

interface DesktopProps {
  onReboot: () => void;
}

function buildInitialState(): Record<WindowId, WindowState> {
  const ids: WindowId[] = [
    "cv", "cases", "case-alicent", "thoughts", "uses", "contact",
    "recycle", "cvpdf", "cvviewer", "minesweeper", "shutdown", "about",
    "display-props", "clock", "readme",
  ];
  return Object.fromEntries(
    ids.map((id) => [id, { id, isOpen: false, isMinimized: false, position: INITIAL_POSITIONS[id], zIndex: 10 }])
  ) as Record<WindowId, WindowState>;
}

function ClockDialog({ onClose }: { onClose: () => void }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB");
  return (
    <div style={{ background: "#c0c0c0", padding: 16, height: "100%", textAlign: "center" }}>
      <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 8 }}>{dateStr}</div>
      <div style={{ fontSize: 18, fontFamily: "Courier New, monospace", marginBottom: 16 }}>{timeStr}</div>
      <p style={{ fontSize: 10, color: "#666", marginBottom: 16 }}>(non-interactive — just display)</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button className="win98-btn" onClick={onClose}>OK</button>
        <button className="win98-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

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

// Media player fake dialog
function MediaPlayerDialog({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => { onDone(); onClose(); }, 1800);
    return () => clearTimeout(t);
  }, [onClose, onDone]);
  return (
    <div style={{ background: "#c0c0c0", padding: 16, height: "100%", fontSize: 11 }}>
      <div style={{ marginBottom: 10, fontWeight: "bold" }}>🎵 Windows Media Player</div>
      <div style={{ borderTop: "1px solid #808080", paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        <div>Loading audio file...</div>
        <div style={{ color: "#444" }}>Codec: MP3</div>
        <div style={{ color: "#444" }}>Duration: 3:33</div>
        <div style={{ marginTop: 8 }}>
          <div style={{ height: 4, background: "#808080", borderRadius: 0 }}>
            <div style={{ height: 4, background: "#000080", width: "60%", animation: "none" }} />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button className="win98-btn" onClick={() => { onDone(); onClose(); }}>OK</button>
      </div>
    </div>
  );
}

// Pixel art laptop SVG — inline, bottom-right decorative element
function PixelLaptop() {
  const P = 5; // pixel size
  type Row = [number, number, number, string][];
  // Each entry: [col, row, width_in_pixels, color]
  const rects: Row = [
    // Screen bezel (dark grey)
    [3,0,20,"#2a2a2a"],[3,1,20,"#2a2a2a"],[3,9,20,"#2a2a2a"],[3,10,2,"#2a2a2a"],[21,10,2,"#2a2a2a"],
    // Screen background (dark)
    [4,1,18,"#111118"],[4,2,18,"#111118"],[4,3,18,"#111118"],[4,4,18,"#111118"],[4,5,18,"#111118"],[4,6,18,"#111118"],[4,7,18,"#111118"],[4,8,18,"#111118"],
    // Green terminal lines on screen
    [5,2,10,"#33ff33"],[5,3,6,"#33ff33"],[5,4,13,"#33ff33"],[5,5,8,"#33ff33"],[5,6,4,"#33ff33"],[15,6,5,"#33ff33"],[5,7,11,"#33ff33"],
    // Dim green lines
    [16,2,5,"#1a6614"],[13,3,7,"#1a6614"],[19,4,3,"#1a6614"],[14,5,7,"#1a6614"],
    // Hinge
    [3,10,20,"#555555"],[3,11,20,"#444444"],
    // Laptop base (keyboard)
    [1,11,24,"#3a3a3a"],[1,12,24,"#3a3a3a"],[1,13,24,"#3a3a3a"],[1,14,24,"#3a3a3a"],[1,15,24,"#3a3a3a"],[1,16,24,"#2a2a2a"],
    // Keys
    [2,12,3,"#555"],[6,12,3,"#555"],[10,12,3,"#555"],[14,12,3,"#555"],[18,12,3,"#555"],
    [2,13,3,"#555"],[6,13,3,"#555"],[10,13,3,"#555"],[14,13,3,"#555"],[18,13,3,"#555"],
    [4,14,14,"#555"],[3,15,18,"#444"],
    // Trackpad
    [8,15,10,"#484848"],
    // Desk surface
    [0,17,32,"#b8b8b8"],[0,18,32,"#c8c8c8"],
    // Coffee cup body
    [26,12,5,"#8B4513"],[26,13,5,"#8B4513"],[26,14,5,"#8B4513"],[26,15,5,"#8B4513"],
    // Coffee cup interior
    [27,13,3,"#3d1f00"],[27,14,3,"#3d1f00"],
    // Cup handle
    [31,13,1,"#8B4513"],[31,14,1,"#8B4513"],
    // Cup base
    [25,15,7,"#6B3410"],
    // Steam
    [28,10,1,"#c8c8c8"],[27,9,1,"#c8c8c8"],[28,8,1,"#c8c8c8"],
    [30,11,1,"#c8c8c8"],[29,10,1,"#c8c8c8"],
  ];

  return (
    <svg
      width={32 * P}
      height={20 * P}
      style={{ position: "absolute", bottom: 36, right: 160, opacity: 0.85, pointerEvents: "none" }}
    >
      {rects.map(([col, row, w, color], i) => (
        <rect key={i} x={col * P} y={row * P} width={w * P} height={P} fill={color} />
      ))}
    </svg>
  );
}

const LEFT_ICONS = [
  { id: "cv" as WindowId,          icon: "📄", label: "cv.doc",          x: 16,  y: 16  },
  { id: "cases" as WindowId,       icon: "📁", label: "case_studies",    x: 16,  y: 100 },
  { id: "thoughts" as WindowId,    icon: "📝", label: "thoughts.txt",    x: 16,  y: 184 },
  { id: "uses" as WindowId,        icon: "💻", label: "uses.exe",        x: 100, y: 16  },
  { id: "contact" as WindowId,     icon: "✉️",  label: "contact",         x: 100, y: 100 },
  { id: "cvpdf" as WindowId,       icon: "📄", label: "cv_modern.pdf",   x: 100, y: 184 },
  { id: "minesweeper" as WindowId, icon: "💣", label: "minesweeper.exe", x: 184, y: 16  },
  { id: "recycle" as WindowId,     icon: "🗑️",  label: "Recycle Bin",     x: 16,  y: 460 },
];

const RIGHT_ICONS = [
  { key: "linkedin", icon: "🔗", label: "linkedin.url", rightOffset: 72, y: 16,  action: "url", url: "https://linkedin.com/in/matias-korpisalo" },
  { key: "noted",    icon: "📗", label: "noted.exe",    rightOffset: 72, y: 100, action: "url", url: "https://noted-smoky.vercel.app" },
  { key: "music",    icon: "🎵", label: "music.mp3",    rightOffset: 72, y: 184, action: "music" },
  { key: "readme",   icon: "📃", label: "readme.txt",   rightOffset: 72, y: 268, action: "window", windowId: "readme" as WindowId },
];

const WINDOW_SIZES: Record<string, { w: number; h: number }> = {
  cv:             { w: 550, h: 480 },
  cases:          { w: 520, h: 380 },
  "case-alicent": { w: 520, h: 420 },
  thoughts:       { w: 420, h: 320 },
  uses:           { w: 380, h: 300 },
  contact:        { w: 380, h: 280 },
  recycle:        { w: 320, h: 240 },
  cvpdf:          { w: 280, h: 180 },
  cvviewer:       { w: 580, h: 520 },
  minesweeper:    { w: 220, h: 310 },
  shutdown:       { w: 280, h: 180 },
  about:          { w: 280, h: 260 },
  "display-props":{ w: 300, h: 240 },
  clock:          { w: 260, h: 180 },
  readme:         { w: 380, h: 300 },
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
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAlertVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIdx]) {
        const next = konamiIdx + 1;
        if (next === KONAMI.length) { setKonamiIdx(0); triggerKonami(); }
        else setKonamiIdx(next);
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

  const focus = useCallback((id: WindowId) => {
    setMaxZ((z) => z + 1);
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], zIndex: maxZ + 1 } }));
  }, [maxZ]);

  const openWindow = useCallback((id: WindowId) => {
    setMaxZ((z) => z + 1);
    setSelectedIconId(null);
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: maxZ + 1 } }));
  }, [maxZ]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: false, isMinimized: false } }));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }));
  }, []);

  const moveWindow = useCallback((id: WindowId, pos: { x: number; y: number }) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], position: pos } }));
  }, []);

  const handleTaskbarWindowClick = useCallback((id: WindowId) => {
    const w = windows[id];
    if (w.isMinimized) {
      openWindow(id);
    } else {
      const openList = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
      const topZ = Math.max(...openList.map((w) => w.zIndex));
      if (w.zIndex === topZ) minimizeWindow(id);
      else focus(id);
    }
  }, [windows, openWindow, minimizeWindow, focus]);

  const handleDesktopClick = () => {
    setStartMenuOpen(false);
    setContextMenu(null);
    setSelectedIconId(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

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
        overthinkerCount.current += 2;
        return [...next, Date.now(), Date.now() + 1];
      }
      setOverthinkerDone(true);
      return [];
    });
  };

  const openWindows = Object.values(windows).filter((w) => w.isOpen);
  const activeWindow = openWindows.filter((w) => !w.isMinimized).sort((a, b) => b.zIndex - a.zIndex)[0];

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
      style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: desktopColor, transition: "background 200ms" }}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Left-side desktop icons */}
        {LEFT_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            x={icon.x}
            y={icon.y}
            isSelected={selectedIconId === icon.id}
            onSelect={() => setSelectedIconId(icon.id)}
            onOpen={() => openWindow(icon.id)}
          />
        ))}

        {/* Right-side desktop icons */}
        {RIGHT_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.key}
            icon={icon.icon}
            label={icon.label}
            rightOffset={icon.rightOffset}
            y={icon.y}
            isSelected={selectedIconId === icon.key}
            onSelect={() => setSelectedIconId(icon.key)}
            onOpen={() => {
              if (icon.action === "url" && icon.url) {
                window.open(icon.url, "_blank");
              } else if (icon.action === "music") {
                setShowMediaPlayer(true);
              } else if (icon.action === "window" && icon.windowId) {
                openWindow(icon.windowId);
              }
            }}
          />
        ))}

        {/* Pixel art laptop */}
        <PixelLaptop />

        {/* === Windows === */}
        {windows.cv.isOpen && !windows.cv.isMinimized && (
          <Window
            {...makeWindowProps("cv")}
            menuItems={[
              { label: "File", items: [
                { label: "Export as modern PDF...", onClick: () => openWindow("cvpdf") },
                { label: "Exit", onClick: () => closeWindow("cv") },
              ]},
              { label: "Edit", items: [] },
              { label: "View", items: [] },
              { label: "Help", items: [] },
            ]}
            statusLeft="Page 1" statusRight="Ready"
          >
            <CVWindow onOpenPDF={() => openWindow("cvpdf")} onClose={() => closeWindow("cv")} />
          </Window>
        )}

        {windows.cvviewer.isOpen && !windows.cvviewer.isMinimized && (
          <Window
            {...makeWindowProps("cvviewer")}
            menuItems={[
              { label: "File", items: [
                { label: "Save to computer...", onClick: () => { const a = document.createElement("a"); a.href="/cv_matias_korpisalo.pdf"; a.download="cv_matias_korpisalo.pdf"; a.click(); } },
                { label: "Print...", onClick: () => window.print() },
                { label: "Close", onClick: () => closeWindow("cvviewer") },
              ]},
              { label: "View", items: [] },
              { label: "Help", items: [] },
            ]}
            statusLeft="📄 cv_matias_korpisalo.pdf" statusRight="Page 1 of 1"
            noScroll
          >
            <CVViewerWindow onClose={() => closeWindow("cvviewer")} />
          </Window>
        )}

        {windows.cases.isOpen && !windows.cases.isMinimized && (
          <Window {...makeWindowProps("cases")} statusLeft="3 objects">
            <CaseStudiesWindow onOpenCase={(id) => { if (id === "case-alicent") openWindow("case-alicent"); }} />
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
              { label: "Game", items: [
                { label: "New", onClick: () => { closeWindow("minesweeper"); setTimeout(() => openWindow("minesweeper"), 50); } },
                { label: "Difficulty", onClick: () => {} },
              ]},
              { label: "Help", items: [] },
            ]}
            noScroll
          >
            <Minesweeper onOpenContact={() => openWindow("contact")} />
          </Window>
        )}

        {windows.cvpdf.isOpen && !windows.cvpdf.isMinimized && (
          <Window {...makeWindowProps("cvpdf")}>
            <CVPDFDialog onClose={() => closeWindow("cvpdf")} onOpenViewer={() => openWindow("cvviewer")} />
          </Window>
        )}

        {windows.shutdown.isOpen && !windows.shutdown.isMinimized && (
          <Window {...makeWindowProps("shutdown")}>
            <ShutDownDialog onClose={() => closeWindow("shutdown")} onReboot={onReboot} />
          </Window>
        )}

        {windows.about.isOpen && !windows.about.isMinimized && (
          <Window {...makeWindowProps("about")}>
            <AboutDialog onClose={() => closeWindow("about")} />
          </Window>
        )}

        {windows["display-props"].isOpen && !windows["display-props"].isMinimized && (
          <Window {...makeWindowProps("display-props")}>
            <DisplayPropsDialog onClose={() => closeWindow("display-props")} />
          </Window>
        )}

        {windows.clock.isOpen && !windows.clock.isMinimized && (
          <Window {...makeWindowProps("clock")}>
            <ClockDialog onClose={() => closeWindow("clock")} />
          </Window>
        )}

        {windows.readme.isOpen && !windows.readme.isMinimized && (
          <Window
            {...makeWindowProps("readme")}
            menuItems={[
              { label: "File", items: [{ label: "Exit", onClick: () => closeWindow("readme") }] },
              { label: "Edit", items: [] },
            ]}
            statusLeft="Ready"
          >
            <ReadmeWindow />
          </Window>
        )}

        {/* Media player fake dialog */}
        {showMediaPlayer && (
          <Window
            id="mediaplayer"
            title="🎵 Windows Media Player"
            width={260}
            height={180}
            position={{ x: 350, y: 200 }}
            zIndex={maxZ + 50}
            onClose={() => setShowMediaPlayer(false)}
            onFocus={() => {}}
            onMove={() => {}}
          >
            <MediaPlayerDialog
              onClose={() => setShowMediaPlayer(false)}
              onDone={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
            />
          </Window>
        )}

        {/* Overthinking cascade */}
        {overthinkerDialogs.map((dialogId, i) => (
          <OverthinkerDialog key={dialogId} index={i} onOK={() => handleOverthinkerOK(dialogId)} zIndex={maxZ + 100 + i} />
        ))}

        {overthinkerDone && (
          <SimpleDialog title="System message" icon="ℹ️" zIndex={maxZ + 200} onClose={() => setOverthinkerDone(false)}>
            <p style={{ margin: "0 0 12px", fontSize: 11, lineHeight: 1.6 }}>
              Overthinking successfully contained.<br />You may proceed.
            </p>
          </SimpleDialog>
        )}
      </div>

      {/* Alert popup */}
      {alertVisible && !alertDismissed && (
        <AlertPopup
          onOpenCV={() => { setAlertVisible(false); openWindow("cv"); }}
          onDismiss={() => { setAlertVisible(false); setAlertDismissed(true); }}
        />
      )}

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x} y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onArrangeIcons={() => {}}
          onRefresh={() => {}}
          onProperties={() => openWindow("display-props")}
          onAbout={() => openWindow("about")}
        />
      )}

      {/* Taskbar + Start menu */}
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

function OverthinkerDialog({ index, onOK, zIndex }: { index: number; onOK: () => void; zIndex: number }) {
  return (
    <div className="win98-window alert-popup" style={{ position: "absolute", left: 300 + index * 18, top: 200 + index * 18, width: 260, zIndex }}>
      <div style={{ background: "linear-gradient(to right, #000080, #1084d0)", color: "white", fontWeight: "bold", fontSize: 11, padding: "3px 6px" }}>
        ⚠️ Error
      </div>
      <div style={{ padding: "12px 16px", fontSize: 11 }}>
        <p style={{ margin: "0 0 8px" }}>Cannot run overthinking.dll.</p>
        <p style={{ margin: "0 0 8px" }}>This file has been permanently deleted.</p>
        <p style={{ margin: "0 0 12px", fontWeight: "bold" }}>Good.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="win98-btn" onClick={onOK}>OK</button>
        </div>
      </div>
    </div>
  );
}

function SimpleDialog({ title, icon, zIndex, onClose, children }: { title: string; icon: string; zIndex: number; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="win98-window alert-popup" style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", width: 280, zIndex }}>
      <div style={{ background: "linear-gradient(to right, #000080, #1084d0)", color: "white", fontWeight: "bold", fontSize: 11, padding: "3px 6px" }}>
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
