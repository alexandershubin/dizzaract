import { useEffect, useState } from 'react';
import type { Mode } from '../types';

const ROWS = 5;
const COLS = 10;
const CELL_PX = 3;
const GAP_PX = 1;
const BAND_WIDTH = 4;
const GROWTH_END = 0.25;
const DARK_PIXEL = '#1F2630';
const TOTAL_CELLS = ROWS * COLS;
const TICK_MS = 50;

function cellHash(row: number, col: number): number {
  return ((row * 73856093) ^ (col * 19349663)) >>> 0;
}

function cellColor(row: number, col: number, progress: number, palette: string[]): string {
  if (progress < GROWTH_END) {
    const fillProgress = progress / GROWTH_END;
    const cellOrder = col * ROWS + row;
    return cellOrder < fillProgress * TOTAL_CELLS ? DARK_PIXEL : 'transparent';
  }

  const wavePhase = (progress - GROWTH_END) / (1 - GROWTH_END);
  const sweepRange = COLS + BAND_WIDTH;
  const front = wavePhase * sweepRange;
  const distance = front - col;

  if (distance < 0 || distance > BAND_WIDTH) return DARK_PIXEL;

  const seed = cellHash(row, col);
  const shadeIndex = (seed + Math.floor(wavePhase * 40)) % palette.length;
  return palette[shadeIndex];
}

export function ThinkingAnimation({
  mode,
  startedAt,
  durationMs,
}: {
  mode: Mode;
  startedAt: number;
  durationMs: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const next = Math.min(1, elapsed / durationMs);
      setProgress(next);
      if (next >= 1) clearInterval(interval);
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [startedAt, durationMs]);

  return (
    <span
      className="inline-grid"
      style={{
        gap: GAP_PX,
        gridTemplateColumns: `repeat(${COLS}, ${CELL_PX}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${CELL_PX}px)`,
      }}
      aria-hidden
    >
      {Array.from({ length: TOTAL_CELLS }).map((_, index) => {
        const row = Math.floor(index / COLS);
        const col = index % COLS;
        const color = cellColor(row, col, progress, mode.palette);
        return (
          <span
            key={index}
            style={{
              width: CELL_PX,
              height: CELL_PX,
              backgroundColor: color,
              transition: 'background-color 60ms linear',
            }}
          />
        );
      })}
    </span>
  );
}
