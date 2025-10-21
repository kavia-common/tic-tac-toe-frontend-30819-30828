import React, { useMemo, useState } from 'react';
import './App.css';
import './styles.css';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';

/**
 * Calculate the winner of a 3x3 tic-tac-toe board.
 * Returns:
 * - { winner: 'X'|'O', line: [a,b,c] } when a player wins
 * - null when no winner yet
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8], // diags
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export default function App() {
  /** Ocean Professional theme is applied in styles.css via CSS variables. */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  const outcome = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = useMemo(() => squares.every(Boolean), [squares]);
  const isDraw = !outcome && isBoardFull;
  const status = outcome
    ? `${outcome.winner} wins`
    : isDraw
      ? 'Draw'
      : `Turn: ${xIsNext ? 'X' : 'O'}`;

  // PUBLIC_INTERFACE
  function handleSquareClick(index) {
    // Ignore clicks if square filled or game finished
    if (squares[index] || outcome) return;

    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);

    // Update score if this move wins or draws
    const win = calculateWinner(next);
    const full = next.every(Boolean);

    if (win) {
      setScores((prev) => ({
        ...prev,
        [win.winner]: prev[win.winner] + 1
      }));
    } else if (!win && full) {
      setScores((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
    }
  }

  // PUBLIC_INTERFACE
  function handleResetBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function handleNewMatch() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScores({ X: 0, O: 0, Draws: 0 });
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-accent">Tic</span> Tac Toe
        </h1>
        <p className="app-subtitle">Ocean Professional Edition</p>
      </header>

      <main className="app-main">
        <section className="panel surface">
          <Scoreboard scores={scores} status={status} xIsNext={xIsNext} />

          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={outcome?.line || []}
            disabled={Boolean(outcome) || isDraw}
          />

          <Controls
            onReset={handleResetBoard}
            onNew={handleNewMatch}
            gameOver={Boolean(outcome) || isDraw}
          />
        </section>
      </main>

      <footer className="app-footer">
        <span className="hint">Tip: Click a cell to play. X starts first.</span>
      </footer>
    </div>
  );
}
