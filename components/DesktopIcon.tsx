"use client";

interface DesktopIconProps {
  icon: string;
  label: string;
  /** Pixels from left edge. Ignored if rightOffset is set. */
  x?: number;
  /** Pixels from top edge */
  y: number;
  /** Pixels from right edge — use instead of x for right-anchored icons */
  rightOffset?: number;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export default function DesktopIcon({
  icon,
  label,
  x,
  y,
  rightOffset,
  isSelected,
  onSelect,
  onOpen,
}: DesktopIconProps) {
  let lastClickTime = 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClickTime < 400) {
      lastClickTime = 0;
      onOpen();
    } else {
      lastClickTime = now;
      onSelect();
    }
  };

  const posStyle: React.CSSProperties =
    rightOffset !== undefined
      ? { right: rightOffset, top: y }
      : { left: x ?? 0, top: y };

  return (
    <div
      className={`desktop-icon${isSelected ? " selected" : ""}`}
      style={posStyle}
      onClick={handleClick}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
      <span className="icon-label">{label}</span>
    </div>
  );
}
