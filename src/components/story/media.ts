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
  { id: "stalks", from: 0.055, to: 0.2, fade: 0.04, enter: "zoom", ...film("stalks", 3.208) },
  { id: "drygrass", from: 0.15, to: 0.275, fade: 0.04, enter: "blur", ...film("drygrass", 3.417) },
  { id: "flare", from: 0.175, to: 0.29, fade: 0.035, enter: "flare", leak: true, ...film("flare", 1.833) },
  { id: "fire", from: 0.22, to: 0.34, fade: 0.04, enter: "flare", ...film("fire", 3.208) },
  { id: "rice", from: 0.3, to: 0.425, fade: 0.04, enter: "dissolve", ...film("rice", 3.625) },
  { id: "sheet", from: 0.385, to: 0.515, fade: 0.04, enter: "mask", ...film("sheet", 3.208) },
  { id: "circuit", from: 0.475, to: 0.615, fade: 0.045, enter: "zoom", ...film("circuit", 3.417) },
  { id: "waste", from: 0.71, to: 0.845, fade: 0.045, enter: "dissolve", ...film("waste", 3.417) },
  { id: "soil", from: 0.8, to: 0.945, fade: 0.045, enter: "blur", ...film("soil", 3.625) },
];

export function windowOpacity(progress: number, from: number, to: number, fade: number) {
  const inn = smoothstep(from, Math.min(to, from + fade), progress);
  const out = 1 - smoothstep(Math.max(from, to - fade), to, progress);
  return Math.max(0, Math.min(1, inn * out));
}

/** How much of the 3D board should show through the film. */
export function boardLayerOpacity(progress: number) {
  const open = 1 - smoothstep(0.07, 0.17, progress);
  const proof = smoothstep(0.55, 0.63, progress) * (1 - smoothstep(0.72, 0.8, progress));
  const close = smoothstep(0.9, 0.965, progress);
  return Math.max(open, proof, close);
}

export function boardShouldRender(progress: number) {
  return progress < 0.2 || (progress > 0.52 && progress < 0.83) || progress > 0.87;
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
