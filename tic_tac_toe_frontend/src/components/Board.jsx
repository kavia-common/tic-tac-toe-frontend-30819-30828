import React from 'react';
import Square from './Square';

/**
 * Board renders a 3x3 grid of squares and highlights the winning line.
 * Props:
 * - squares: string[] length 9 with 'X' | 'O' | null
 * - onSquareClick: (index: number) => void
 * - winningLine: number[] the indices of winning cells
 * - disabled: boolean disable interactions
 */
export default function Board({ squares, onSquareClick, winningLine = [], disabled = false }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((value, idx) => {
        const isWinning = winningLine.includes(idx);
        return (
          <Square
            key={idx}
            value={value}
            onClick={() => onSquareClick(idx)}
            isWinning={isWinning}
            disabled={disabled || Boolean(value)}
          />
        );
      })}
    </div>
  );
}
