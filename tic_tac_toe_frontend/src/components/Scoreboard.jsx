import React from 'react';

/**
 * Scoreboard displays players' scores and current status.
 * Props:
 * - scores: { X: number, O: number, Draws: number }
 * - status: string
 * - xIsNext: boolean
 */
export default function Scoreboard({ scores, status, xIsNext }) {
  const isTurn = status.startsWith('Turn');
  const isWin = status.endsWith('wins');
  const isDraw = status === 'Draw';

  const pillClass = isWin
    ? 'status-win'
    : isDraw
    ? 'status-draw'
    : xIsNext
    ? 'status-x'
    : 'status-o';

  return (
    <div>
      <div className="scoreboard" aria-label="Scoreboard">
        <div className="score-card score-x">
          <p className="score-title">X</p>
          <p className="score-value">{scores.X}</p>
        </div>
        <div className="score-card score-o">
          <p className="score-title">O</p>
          <p className="score-value">{scores.O}</p>
        </div>
        <div className="score-card score-draw">
          <p className="score-title">Draws</p>
          <p className="score-value">{scores.Draws}</p>
        </div>
      </div>

      <div className="status-bar" role="status" aria-live="polite">
        <span className={`status-pill ${pillClass}`}>
          {isWin ? 'Winner' : isDraw ? 'Draw' : 'Turn'}
        </span>
        <span>
          {status}
        </span>
      </div>
    </div>
  );
}
