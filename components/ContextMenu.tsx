"use client";

import { useEffect, useRef } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onArrangeIcons: () => void;
  onRefresh: () => void;
  onProperties: () => void;
  onAbout: () => void;
}

export default function ContextMenu({
  x,
  y,
  onClose,
  onArrangeIcons,
  onRefresh,
  onProperties,
  onAbout,
}: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const items = [
    { label: "Arrange Icons", onClick: onArrangeIcons },
    { label: "Refresh", onClick: onRefresh },
    { divider: true },
    { label: "Properties", onClick: onProperties },
    { label: "About This Portfolio", onClick: onAbout },
  ];

  return (
    <div
      ref={ref}
      className="context-menu"
      style={{ left: x, top: y }}
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={i} className="context-menu-divider" />
        ) : (
          <div
            key={i}
            className="context-menu-item"
            onClick={() => {
              onClose();
              item.onClick?.();
            }}
          >
            {item.label}
          </div>
        )
      )}
    </div>
  );
}
