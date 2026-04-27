export type WindowId =
  | "cv"
  | "cases"
  | "case-alicent"
  | "case-noted"
  | "thoughts"
  | "uses"
  | "contact"
  | "recycle"
  | "cvpdf"
  | "cvviewer"
  | "minesweeper"
  | "shutdown"
  | "about"
  | "display-props"
  | "clock"
  | "readme";

export type WindowState = {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  zIndex: number;
};

export const INITIAL_POSITIONS: Record<WindowId, { x: number; y: number }> = {
  cv:             { x: 88,  y: 24  },
  cases:          { x: 160, y: 55  },
  "case-alicent": { x: 120, y: 35  },
  "case-noted":   { x: 130, y: 45  },
  thoughts:       { x: 220, y: 115 },
  uses:           { x: 95,  y: 185 },
  contact:        { x: 175, y: 145 },
  recycle:        { x: 155, y: 165 },
  cvpdf:          { x: 140, y: 125 },
  cvviewer:       { x: 120, y: 40  },
  minesweeper:    { x: 200, y: 80  },
  shutdown:       { x: 300, y: 200 },
  about:          { x: 350, y: 180 },
  "display-props":{ x: 320, y: 150 },
  clock:          { x: 400, y: 200 },
  readme:         { x: 250, y: 120 },
};

export const WINDOW_TITLES: Record<WindowId, string> = {
  cv:             "📄 cv.doc — WordPad",
  cases:          "📁 case_studies — File Manager",
  "case-alicent": "📄 case_01_zero_to_one.txt — Notepad",
  "case-noted":   "📄 noted_case_study.txt — Notepad",
  thoughts:       "📝 thoughts.txt — Notepad",
  uses:           "💻 uses.exe",
  contact:        "✉️ contact — Outlook Express",
  recycle:        "🗑️ Recycle Bin",
  cvpdf:          "📄 cv_modern.pdf",
  cvviewer:       "📄 cv_modern.pdf — Document Viewer",
  minesweeper:    "💣 Minesweeper",
  shutdown:       "Shut Down Windows",
  about:          "About Portfolio OS",
  "display-props":"Display Properties",
  clock:          "Date/Time Properties",
  readme:         "📄 readme.txt — Notepad",
};
