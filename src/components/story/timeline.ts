import { smoothstep } from "@/components/story/math";

/**
 * Scroll progress → story time in [0, 8].
 * Flat stretches are holds (the readable beat). Slopes are the transitions.
 * Time 0 and time 8 are the same finished board.
 */
const STORY_KEYS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.07, 0],
  [0.12, 1],
  [0.17, 1],
  [0.22, 2],
  [0.265, 2],
  [0.32, 3],
  [0.375, 3],
  [0.425, 4],
  [0.475, 4],
  [0.525, 5],
  [0.63, 5],
  [0.68, 6],
  [0.735, 6],
  [0.785, 7],
  [0.82, 7],
  [0.9, 8],
  [1, 8],
];

const COPY_CUTS = [0.095, 0.195, 0.295, 0.4, 0.5, 0.655, 0.76, 0.86];

export function storyTime(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < STORY_KEYS.length - 1; i++) {
    const [p0, t0] = STORY_KEYS[i];
    const [p1, t1] = STORY_KEYS[i + 1];
    if (p <= p1 || i === STORY_KEYS.length - 2) {
      const span = p1 - p0;
      const u = span <= 0 ? 1 : Math.min(1, Math.max(0, (p - p0) / span));
      const s = u * u * (3 - 2 * u);
      return t0 + (t1 - t0) * s;
    }
  }
  return 8;
}

export function copyIndex(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  let index = 0;
  for (let i = 0; i < COPY_CUTS.length; i++) {
    if (p >= COPY_CUTS[i]) index = i + 1;
  }
  return index;
}

/** Which proof callout is on screen. -1 outside the proof hold. */
export function proofIndex(progress: number): number {
  const start = 0.535;
  const end = 0.625;
  if (progress < start || progress >= end) return -1;
  const u = (progress - start) / (end - start);
  return Math.min(4, Math.floor(u * 5));
}

export function etchAmount(t: number, delay = 0): number {
  if (t < 0.45) return 1;
  if (t < 3.15) return 0;
  if (t < 6.5) return smoothstep(3.25 + delay, 3.75 + delay, t);
  if (t < 7.45) return 1 - smoothstep(6.55, 7.2, t);
  return smoothstep(7.55 + delay * 0.2, 7.95, t);
}

export function seatedAmount(t: number, delay = 0): number {
  if (t < 0.5) return 1;
  if (t < 3.2) return 0;
  if (t < 6.5) return smoothstep(3.3 + delay, 3.85 + delay, t);
  if (t < 7.45) return 1 - smoothstep(6.55, 7.2, t);
  return smoothstep(7.6 + delay * 0.15, 7.98, t);
}

export function ledAmount(t: number): number {
  const open = 1 - smoothstep(0.2, 0.85, t);
  const built = smoothstep(3.55, 3.95, t) * (1 - smoothstep(6.6, 7.3, t));
  const close = smoothstep(7.6, 7.98, t);
  return Math.min(1, Math.max(open, built, close));
}

export function boardOpacity(t: number): number {
  if (t <= 0.3) return 1;
  if (t < 1.15) return 1 - smoothstep(0.3, 1.1, t);
  if (t < 3.2) return 0;
  if (t < 3.85) return smoothstep(3.2, 3.85, t);
  if (t < 6.55) return 1;
  if (t < 7.35) return 1 - smoothstep(6.55, 7.3, t);
  return smoothstep(7.45, 7.95, t);
}
