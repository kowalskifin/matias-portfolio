export type WindowId =
  | "cv"
  | "cases"
  | "case-alicent"
  | "thoughts"
  | "uses"
  | "contact"
  | "recycle"
  | "cvpdf"
  | "minesweeper"
  | "shutdown"
  | "about"
  | "display-props"
  | "clock";

export type WindowState = {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  zIndex: number;
};

export const INITIAL_POSITIONS: Record<WindowId, { x: number; y: number }> = {
  cv: { x: 88, y: 24 },
  cases: { x: 160, y: 55 },
  "case-alicent": { x: 120, y: 35 },
  thoughts: { x: 220, y: 115 },
  uses: { x: 95, y: 185 },
  contact: { x: 175, y: 145 },
  recycle: { x: 155, y: 165 },
  cvpdf: { x: 140, y: 125 },
  minesweeper: { x: 200, y: 80 },
  shutdown: { x: 300, y: 200 },
  about: { x: 350, y: 180 },
  "display-props": { x: 320, y: 150 },
  clock: { x: 400, y: 200 },
};

export const WINDOW_TITLES: Record<WindowId, string> = {
  cv: "📄 cv.doc — WordPad",
  cases: "📁 case_studies — File Manager",
  "case-alicent": "📄 case_01_zero_to_one.txt — Notepad",
  thoughts: "📝 thoughts.txt — Notepad",
  uses: "💻 uses.exe",
  contact: "✉️ contact — Outlook Express",
  recycle: "🗑️ Recycle Bin",
  cvpdf: "📄 cv_modern.pdf",
  minesweeper: "💣 Minesweeper",
  shutdown: "Shut Down Windows",
  about: "About Portfolio OS",
  "display-props": "Display Properties",
  clock: "Date/Time Properties",
};
