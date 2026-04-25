"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface MinesweeperProps {
  onOpenContact: () => void;
}

const ROWS = 6;
const COLS = 6;
const MINES = 6;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adj: number;
};

type GameState = "idle" | "playing" | "won" | "lost";

function buildBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adj: 0,
    }))
  );
}

function placeMines(board: Cell[][], firstR: number, firstC: number): Cell[][] {
  const next = board.map((row) => row.map((c) => ({ ...c })));
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (next[r][c].isMine) continue;
    if (Math.abs(r - firstR) <= 1 && Math.abs(c - firstC) <= 1) continue;
    next[r][c].isMine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (next[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && next[nr][nc].isMine) count++;
        }
      }
      next[r][c].adj = count;
    }
  }
  return next;
}

function floodReveal(board: Cell[][], r: number, c: number): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const queue: [number, number][] = [[r, c]];
  while (queue.length > 0) {
    const [cr, cc] = queue.shift()!;
    if (cr < 0 || cr >= ROWS || cc < 0 || cc >= COLS) continue;
    if (next[cr][cc].isRevealed || next[cr][cc].isFlagged) continue;
    next[cr][cc].isRevealed = true;
    if (next[cr][cc].adj === 0 && !next[cr][cc].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          queue.push([cr + dr, cc + dc]);
        }
      }
    }
  }
  return next;
}

const ADJ_COLORS: Record<number, string> = {
  1: "#0000ff", 2: "#008000", 3: "#ff0000", 4: "#000080",
  5: "#800000", 6: "#008080", 7: "#800080", 8: "#808080",
};

export default function Minesweeper({ onOpenContact }: MinesweeperProps) {
  const [board, setBoard] = useState<Cell[][]>(buildBoard);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);
  const [gamesStarted, setGamesStarted] = useState(1);
  const [showNudge, setShowNudge] = useState(false);
  const nudgeShownRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  }, [stopTimer]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const reset = () => {
    stopTimer();
    setBoard(buildBoard());
    setGameState("idle");
    setFlagCount(0);
    setTime(0);
    setGamesStarted((n) => {
      const next = n + 1;
      if (next === 3 && !nudgeShownRef.current) {
        nudgeShownRef.current = true;
        setShowNudge(true);
      }
      return next;
    });
  };

  const checkWin = (b: Cell[][]) => {
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (!b[r][c].isMine && !b[r][c].isRevealed) return false;
    return true;
  };

  const handleLeftClick = (r: number, c: number) => {
    if (gameState === "won" || gameState === "lost") return;
    const cell = board[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    let current = board;
    if (gameState === "idle") {
      current = placeMines(board, r, c);
      setGameState("playing");
      startTimer();
    }

    if (current[r][c].isMine) {
      const revealed = current.map((row) =>
        row.map((cell) => (cell.isMine ? { ...cell, isRevealed: true } : { ...cell }))
      );
      setBoard(revealed);
      setGameState("lost");
      stopTimer();
      return;
    }

    const next = floodReveal(current, r, c);
    setBoard(next);
    if (checkWin(next)) { setGameState("won"); stopTimer(); }
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState === "won" || gameState === "lost") return;
    if (board[r][c].isRevealed) return;
    const next = board.map((row) => row.map((c) => ({ ...c })));
    next[r][c].isFlagged = !next[r][c].isFlagged;
    setBoard(next);
    setFlagCount((f) => f + (next[r][c].isFlagged ? 1 : -1));
  };

  const smiley = gameState === "won" ? "😎" : gameState === "lost" ? "😵" : "🙂";
  const minesLeft = MINES - flagCount;

  return (
    <div style={{ background: "#c0c0c0", padding: 8, height: "100%", display: "flex", flexDirection: "column", gap: 6, userSelect: "none", position: "relative" }}>
      {/* Info bar */}
      <div style={{ background: "#c0c0c0", border: "2px solid #808080", borderRight: "2px solid #fff", borderBottom: "2px solid #fff", padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SevenSeg value={Math.max(0, minesLeft)} />
        <button
          style={{ background: "#c0c0c0", border: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", cursor: "pointer", fontSize: 16, width: 28, height: 26, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
          onClick={reset}
        >
          {smiley}
        </button>
        <SevenSeg value={Math.min(999, time)} />
      </div>

      {/* Grid */}
      <div style={{ border: "2px solid #808080", borderRight: "2px solid #fff", borderBottom: "2px solid #fff", display: "inline-flex", flexDirection: "column", alignSelf: "center" }}>
        {board.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) => (
              <CellButton
                key={c}
                cell={cell}
                gameState={gameState}
                onClick={() => handleLeftClick(r, c)}
                onRightClick={(e) => handleRightClick(e, r, c)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Win/lose */}
      {/* 3-game nudge */}
      {showNudge && (
        <div style={{ position: "absolute", bottom: 8, right: 8, width: 210, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", boxShadow: "2px 2px 0 #0a0a0a", zIndex: 10 }}>
          <div style={{ background: "linear-gradient(to right, #000080, #1084d0)", color: "white", fontSize: 11, fontWeight: "bold", padding: "2px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>⏰ Still here?</span>
            <span style={{ cursor: "pointer", fontSize: 9, fontWeight: "bold" }} onClick={() => setShowNudge(false)}>✕</span>
          </div>
          <div style={{ padding: "8px 10px", fontSize: 10, lineHeight: 1.5 }}>
            You&apos;ve started 3 games of Minesweeper on a PM&apos;s portfolio.<br />
            Respect.<br /><br />
            Have you considered just hiring me instead?
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", padding: "4px 8px 8px" }}>
            <button className="win98-btn" style={{ fontSize: 10, padding: "1px 8px" }} onClick={() => setShowNudge(false)}>Close</button>
            <button className="win98-btn" style={{ fontSize: 10, padding: "1px 8px" }} onClick={() => { setShowNudge(false); onOpenContact(); }}>Open contact →</button>
          </div>
        </div>
      )}

      {(gameState === "won" || gameState === "lost") && (
        <div style={{ background: "#c0c0c0", border: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", padding: "10px 12px", textAlign: "center", fontSize: 11 }}>
          {gameState === "won" ? (
            <>
              <div style={{ fontSize: 18, marginBottom: 4 }}>🎉 WINNER</div>
              <p style={{ margin: "0 0 8px", lineHeight: 1.5 }}>
                You just completed a task with unclear requirements,<br />
                hidden information, and significant consequences for wrong clicks.<br /><br />
                Sounds like product management.<br />
                I&apos;ve been doing it for 6 years.<br />
                Let&apos;s talk.
              </p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button className="win98-btn" onClick={reset}>Close</button>
                <button className="win98-btn" onClick={onOpenContact}>Open contact →</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 18, marginBottom: 4 }}>💥 GAME OVER</div>
              <p style={{ margin: "0 0 8px", lineHeight: 1.5 }}>
                You clicked a mine.<br /><br />
                This happens in product too.<br />
                The difference is what you do next.
              </p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button className="win98-btn" onClick={reset}>Try again</button>
                <button className="win98-btn" onClick={reset}>Close</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SevenSeg({ value }: { value: number }) {
  return (
    <div style={{ background: "#200000", color: "#ff0000", fontFamily: "Courier New, monospace", fontWeight: "bold", fontSize: 18, padding: "2px 6px", letterSpacing: 2, minWidth: 40, textAlign: "center", border: "2px solid #808080", borderRight: "2px solid #fff", borderBottom: "2px solid #fff" }}>
      {String(value).padStart(3, "0")}
    </div>
  );
}

function CellButton({ cell, gameState, onClick, onRightClick }: { cell: Cell; gameState: GameState; onClick: () => void; onRightClick: (e: React.MouseEvent) => void; }) {
  const size = 24;
  if (cell.isRevealed) {
    return (
      <div style={{ width: size, height: size, border: "1px solid #808080", background: cell.isMine ? "#ff0000" : "#c0c0c0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", color: cell.isMine ? "#000" : ADJ_COLORS[cell.adj] ?? "transparent", cursor: "default" }}>
        {cell.isMine ? "💣" : cell.adj > 0 ? cell.adj : ""}
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, background: "#c0c0c0", borderTop: "2px solid #fff", borderLeft: "2px solid #fff", borderRight: "2px solid #808080", borderBottom: "2px solid #808080", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: gameState === "won" || gameState === "lost" ? "default" : "pointer" }}
      onClick={onClick} onContextMenu={onRightClick}>
      {cell.isFlagged ? "🚩" : ""}
    </div>
  );
}
