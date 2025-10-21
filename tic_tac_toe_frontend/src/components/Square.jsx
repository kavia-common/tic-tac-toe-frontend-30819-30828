import React from 'react';

/**
 * Square represents a single cell.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - isWinning: boolean
 * - disabled: boolean
 */
export default function Square({ value, onClick, isWinning, disabled }) {
  const classes = [
    'square',
    value === 'X' ? 'square-x' : '',
    value === 'O' ? 'square-o' : '',
    isWinning ? 'win' : '',
    disabled ? 'disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-disabled={disabled}
      aria-label={`Cell ${value ? value : 'empty'}`}
    >
      {value}
    </button>
  );
}
