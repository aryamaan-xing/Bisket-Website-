import { smoothstep } from "@/components/story/math";

/**
 * Stock footage for the scroll-scrubbed film.
 *
 * Every clip is licensed for commercial use with no attribution requirement.
 * Mixkit clips use the Mixkit Stock Video Free License (not the Restricted /
 * personal-use license). Coverr clips are marked Free Commercial Rights.
 *
 * - stalks — Mixkit “Green leaves closeup” (id 94). Extreme close-up of green
 *   plant stalks. https://mixkit.co/free-stock-video/green-leaves-closeup-94/
 *   File: https://assets.mixkit.co/videos/94/94-720.mp4
 * - drygrass — Mixkit “Weeds waving in the breeze” (id 1178). Tall dry grass
 *   under a bright sky. https://mixkit.co/free-stock-video/weeds-waving-in-the-breeze-1178/
 *   File: https://assets.mixkit.co/videos/1178/1178-720.mp4
 * - fire — Mixkit “Wood burning in an outdoor fire” (id 1243).
 *   https://mixkit.co/free-stock-video/wood-burning-in-an-outdoor-fire-1243/
 *   File: https://assets.mixkit.co/videos/1243/1243-720.mp4
 * - flare — Mixkit “Waving fire closeup” (id 3448). Used as a screen-blended
 *   light leak between the grass and the fire.
 *   https://mixkit.co/free-stock-video/waving-fire-closeup-3448/
 *   File: https://assets.mixkit.co/videos/3448/3448-720.mp4
 * - rice — Coverr “Harvesting rice”, aerial of farmers harvesting a rice field.
 *   https://coverr.co/videos/harvesting-rice-anertcl2vf
 *   File: https://cdn.coverr.co/videos/coverr-harvesting-rice-1225/720p.mp4
 * - sheet — Mixkit “Industrial cutting machine cutting fiber” (id 2470).
 *   Fiber board on an industrial cutter.
 *   https://mixkit.co/free-stock-video/industrial-cutting-machine-cutting-fiber-2470/
 *   File: https://assets.mixkit.co/videos/2470/2470-720.mp4
 * - circuit — Mixkit “Circuit board” (id 2381).
 *   https://mixkit.co/free-stock-video/circuit-board-2381/
 *   File: https://assets.mixkit.co/videos/2381/2381-720.mp4
 * - waste — Coverr “Birds flying around a waste plant”.
 *   https://coverr.co/videos/birds-flying-around-a-waste-plant-rf3yyyf6d5
 *   File: https://cdn.coverr.co/videos/coverr-birds-flying-around-a-waste-plant-4659/720p.mp4
 * - soil — Mixkit “A person sowing a seed” (id 2851).
 *   https://mixkit.co/free-stock-video/a-person-sowing-a-seed-2851/
 *   File: https://assets.mixkit.co/videos/2851/2851-720.mp4
 *
 * Punjab/Haryana stubble-burning clips that are free for commercial use were
 * not available from these libraries (Mixkit’s field-burn clips are personal-use
 * only). The field beat is dry grass dissolving through a fire leak into an
 * outdoor fire, then an aerial rice harvest.
 */

export type FilmEnter = "zoom" | "dissolve" | "flare" | "blur" | "mask";

export type FilmClip = {
  id: string;
  from: number;
  to: number;
  fade: number;
  enter: FilmEnter;
  /** Screen-blended fire leak, not a full-screen plate. */
  leak?: boolean;
  duration: number;
  poster: string;
  mp4: string;
  webm: string;
  mp4Mobile: string;
  webmMobile: string;
};

const film = (id: string, duration: number) => ({
  duration,
  poster: `/story/film/${id}.webp`,
  mp4: `/story/film/${id}.mp4`,
  webm: `/story/film/${id}.webm`,
  mp4Mobile: `/story/film/${id}-m.mp4`,
  webmMobile: `/story/film/${id}-m.webm`,
});

export const FILM_CLIPS: readonly FilmClip[] = [
  { id: "stalks", from: 0.1, to: 0.21, fade: 0.04, enter: "zoom", ...film("stalks", 3.208) },
  { id: "drygrass", from: 0.16, to: 0.275, fade: 0.04, enter: "blur", ...film("drygrass", 3.417) },
  { id: "flare", from: 0.175, to: 0.29, fade: 0.035, enter: "flare", leak: true, ...film("flare", 1.833) },
  { id: "fire", from: 0.22, to: 0.34, fade: 0.04, enter: "flare", ...film("fire", 3.208) },
  { id: "rice", from: 0.3, to: 0.425, fade: 0.04, enter: "dissolve", ...film("rice", 3.625) },
  { id: "sheet", from: 0.385, to: 0.515, fade: 0.04, enter: "mask", ...film("sheet", 3.208) },
  { id: "circuit", from: 0.475, to: 0.615, fade: 0.045, enter: "zoom", ...film("circuit", 3.417) },
  { id: "waste", from: 0.71, to: 0.845, fade: 0.045, enter: "dissolve", ...film("waste", 3.417) },
  { id: "soil", from: 0.8, to: 0.92, fade: 0.045, enter: "blur", ...film("soil", 3.625) },
];

export function windowOpacity(progress: number, from: number, to: number, fade: number) {
  const inn = smoothstep(from, Math.min(to, from + fade), progress);
  const out = 1 - smoothstep(Math.max(from, to - fade), to, progress);
  return Math.max(0, Math.min(1, inn * out));
}

/** Lit biomass board. Opening and closing hero of the scroll story. */
export const BOARD_ON = "/images/prototype-led.png";
/** Same board with the LED off. Used while the LED switches on. */
export const BOARD_OFF = "/images/product-pcb-board.png";
/** Tall frames derived from the square photos so a phone shows the whole board. */
export const BOARD_ON_PORTRAIT = "/images/prototype-led-portrait.webp";
export const BOARD_OFF_PORTRAIT = "/images/product-pcb-portrait.webp";

export const BOARD_SQUARE = { width: 1024, height: 1024 };
export const BOARD_PORTRAIT = { width: 1080, height: 1920 };
/** White-hot LED on the lit photo, as a fraction of that image. */
export const BOARD_LED = { x: 0.583, y: 0.426 };
export const BOARD_LED_PORTRAIT = { x: 0.575, y: 0.462 };

export function boardAsset(portrait: boolean) {
  if (portrait) {
    return { ...BOARD_PORTRAIT, on: BOARD_ON_PORTRAIT, off: BOARD_OFF_PORTRAIT, led: BOARD_LED_PORTRAIT };
  }
  return { ...BOARD_SQUARE, on: BOARD_ON, off: BOARD_OFF, led: BOARD_LED };
}

/** Lit-board amount. The close fades the LED on as the still returns. */
export function ledOnAmount(progress: number) {
  if (progress > 0.84) return smoothstep(0.9, 0.975, progress);
  return 1;
}

export type PlateFrame = { x: number; y: number; zoom: number };

function mixFrame(a: PlateFrame, b: PlateFrame, t: number): PlateFrame {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    zoom: a.zoom + (b.zoom - a.zoom) * t,
  };
}

/**
 * Ken Burns frame. Wide screens crop the square photo through the middle of
 * the board. Portrait screens use the tall extension and open on the whole
 * board, then both push into the laminate texture and pull back to that
 * same opening frame.
 */
export function plateFrame(progress: number, aspect = 1): PlateFrame {
  const wide = aspect >= 1;
  const open = wide ? { x: 0.5, y: 0.48, zoom: 1.12 } : { x: 0.5, y: 0.5, zoom: 1.04 };
  const fibre = wide ? { x: 0.36, y: 0.68, zoom: 2.45 } : { x: 0.373, y: 0.592, zoom: 2.7 };
  const proof = wide ? { x: 0.54, y: 0.46, zoom: 1.32 } : { x: 0.56, y: 0.47, zoom: 1.24 };
  if (progress < 0.18) return mixFrame(open, fibre, smoothstep(0.04, 0.145, progress));
  if (progress < 0.86) {
    const drift = smoothstep(0.56, 0.74, progress);
    return mixFrame(proof, { x: proof.x + 0.02, y: proof.y, zoom: proof.zoom + 0.06 }, drift * 0.45);
  }
  return mixFrame(fibre, open, smoothstep(0.86, 0.97, progress));
}

/** How much of the still shows through the footage. */
export function plateOpacity(progress: number) {
  const open = 1 - smoothstep(0.135, 0.2, progress);
  const proof = smoothstep(0.55, 0.63, progress) * (1 - smoothstep(0.72, 0.8, progress));
  const close = smoothstep(0.88, 0.96, progress);
  return Math.max(open, proof, close);
}

export function plateBlur(progress: number) {
  const intoFibre = smoothstep(0.145, 0.19, progress) * (1 - smoothstep(0.19, 0.26, progress));
  const outOfSoil = smoothstep(0.86, 0.91, progress) * (1 - smoothstep(0.93, 0.98, progress));
  return (intoFibre + outOfSoil) * 14;
}

export function clipLocalTime(progress: number, clip: FilmClip, duration: number) {
  const span = Math.max(0.0001, clip.to - clip.from);
  const u = Math.min(1, Math.max(0, (progress - clip.from) / span));
  const end = Math.max(0.05, duration - 0.04);
  return u * end;
}

export function clipSource(clip: FilmClip, mobile: boolean, webm: boolean) {
  if (mobile && webm) return clip.webmMobile;
  if (mobile) return clip.mp4Mobile;
  if (webm) return clip.webm;
  return clip.mp4;
}
