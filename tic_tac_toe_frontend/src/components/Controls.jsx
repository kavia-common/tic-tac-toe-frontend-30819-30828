import React from 'react';

/**
 * Controls renders game action buttons.
 * Props:
 * - onReset: () => void
 * - onNew: () => void
 * - gameOver: boolean
 */
export default function Controls({ onReset, onNew, gameOver }) {
  return (
    <div className="controls">
      <button type="button" className="btn" onClick={onReset} aria-label="Reset board">
        {gameOver ? 'Play Again' : 'Reset Board'}
      </button>
      <button type="button" className="btn secondary" onClick={onNew} aria-label="Start new match">
        New Match
      </button>
    </div>
  );
}
