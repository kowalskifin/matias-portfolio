"use client";

import { useEffect, useRef, useState } from "react";

interface MenuItem {
  label: string;
  items?: { label: string; onClick: () => void; divider?: boolean }[];
}

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  width: number;
  height: number;
  position: { x: number; y: number };
  zIndex: number;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  menuItems?: MenuItem[];
  statusLeft?: string;
  statusRight?: string;
  noScroll?: boolean;
}

const TASKBAR_HEIGHT = 28;

export default function Window({
  title,
  children,
  width,
  height,
  position,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  menuItems,
  statusLeft,
  statusRight,
  noScroll,
}: WindowProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".win98-titlebar-btn")) return;
    e.preventDefault();
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onFocus();

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const desktopW = window.innerWidth;
      const desktopH = window.innerHeight - TASKBAR_HEIGHT;
      const newX = Math.max(
        -width + 60,
        Math.min(desktopW - 60, e.clientX - dragOffset.current.x)
      );
      const newY = Math.max(
        0,
        Math.min(desktopH - 30, e.clientY - dragOffset.current.y)
      );
      onMove({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Close open menu on outside click
  useEffect(() => {
    if (!openMenu) return;
    const handler = () => setOpenMenu(null);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  return (
    <div
      ref={windowRef}
      className="win98-window window-opening"
      style={{
        width,
        height,
        left: position.x,
        top: position.y,
        zIndex,
        display: "flex",
        flexDirection: "column",
      }}
      onMouseDown={onFocus}
    >
      {/* Titlebar */}
      <div className="win98-titlebar" onMouseDown={handleTitleMouseDown}>
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </span>
        <div style={{ display: "flex", gap: 2, marginLeft: 4 }}>
          {onMinimize && (
            <div
              className="win98-titlebar-btn"
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              title="Minimize"
            >
              <span style={{ fontSize: 8, lineHeight: 1, paddingBottom: 2 }}>_</span>
            </div>
          )}
          <div
            className="win98-titlebar-btn"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          >
            <span style={{ fontSize: 9, lineHeight: 1, fontWeight: "bold" }}>✕</span>
          </div>
        </div>
      </div>

      {/* Menubar */}
      {menuItems && menuItems.length > 0 && (
        <div className="win98-menubar" style={{ position: "relative" }}>
          {menuItems.map((menu) => (
            <div key={menu.label} style={{ position: "relative" }}>
              <div
                className="win98-menu-item"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === menu.label ? null : menu.label);
                }}
              >
                {menu.label}
              </div>
              {openMenu === menu.label && menu.items && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#c0c0c0",
                    borderTop: "2px solid #fff",
                    borderLeft: "2px solid #fff",
                    borderRight: "2px solid #808080",
                    borderBottom: "2px solid #808080",
                    boxShadow: "2px 2px 0 #0a0a0a",
                    zIndex: 100,
                    minWidth: 160,
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {menu.items.map((item, i) =>
                    item.divider ? (
                      <div key={i} className="context-menu-divider" />
                    ) : (
                      <div
                        key={i}
                        className="context-menu-item"
                        onClick={() => {
                          setOpenMenu(null);
                          item.onClick();
                        }}
                      >
                        {item.label}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: noScroll ? "hidden" : "auto",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      {/* Status bar */}
      {(statusLeft !== undefined || statusRight !== undefined) && (
        <div className="win98-statusbar">
          <span className="win98-statusbar-panel">{statusLeft ?? ""}</span>
          {statusRight !== undefined && (
            <span className="win98-statusbar-panel">{statusRight}</span>
          )}
        </div>
      )}
    </div>
  );
}
