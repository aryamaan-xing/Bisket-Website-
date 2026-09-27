"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  FILM_CLIPS,
  boardAsset,
  clipLocalTime,
  clipSource,
  ledOnAmount,
  plateBlur,
  plateFrame,
  plateOpacity,
  windowOpacity,
  type FilmClip,
} from "@/components/story/media";
import { smoothstep } from "@/components/story/math";

function prefersWebm() {
  const probe = document.createElement("video");
  const webm = probe.canPlayType('video/webm; codecs="vp9"');
  const safari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  return webm === "probably" && !safari;
}

function isIos() {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function arm(video: HTMLVideoElement, src: string, poster: string) {
  if (video.dataset.src === src) return;
  video.dataset.src = src;
  video.poster = poster;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = src;
  video.load();
}

function disarm(video: HTMLVideoElement) {
  if (!video.dataset.src) return;
  video.pause();
  video.removeAttribute("src");
  delete video.dataset.src;
  video.load();
}

function layerStyle(progress: number, clip: FilmClip) {
  const opacity = windowOpacity(progress, clip.from, clip.to, clip.fade);
  const span = Math.max(0.0001, clip.to - clip.from);
  const u = Math.min(1, Math.max(0, (progress - clip.from) / span));
  const enter = smoothstep(clip.from, clip.from + clip.fade, progress);
  const leave = smoothstep(clip.to - clip.fade, clip.to, progress);
  let scale = 1;
  let blur = 0;
  let clipPath = "";

  if (clip.enter === "zoom") {
    scale = clip.id === "stalks" ? 1 + u * 0.62 : 1.28 - enter * 0.28;
  }
  if (clip.enter === "blur") {
    scale = 1.16 - enter * 0.16;
    blur = (1 - enter) * 18 + leave * 10;
  }
  if (clip.enter === "flare") blur = leave * 8;
  if (clip.enter === "dissolve" || clip.enter === "mask") blur = leave * 12;
  if (clip.enter === "mask" && enter < 0.98) {
    const inset = (1 - enter) * 46;
    clipPath = `inset(${inset}% ${inset * 0.35}% ${inset}% ${inset * 0.35}%)`;
  }
  if (clip.id === "stalks") blur = leave * 16;

  return { opacity, scale, blur, clipPath };
}

export function StoryFilm({
  progressRef,
  stageRef,
  active,
  onReady,
}: {
  progressRef: RefObject<number>;
  stageRef: RefObject<HTMLDivElement | null>;
  active: boolean;
  onReady: () => void;
}) {
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const layers = useRef<Array<HTMLDivElement | null>>([]);
  const leakRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const offRef = useRef<HTMLImageElement>(null);
  const onRef = useRef<HTMLImageElement>(null);
  const ledRef = useRef<HTMLDivElement>(null);
  const prefs = useRef({ mobile: false, webm: false, loop: false });
  const seekMiss = useRef(0);
  const igniteAt = useRef(0);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const photo = onRef.current;
    if (photo?.complete && photo.naturalWidth > 0) onReady();
  }, [onReady]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    prefs.current.mobile = mobileQuery.matches;
    prefs.current.webm = prefersWebm();
    prefs.current.loop = isIos();
    const onMobile = () => {
      prefs.current.mobile = mobileQuery.matches;
    };
    mobileQuery.addEventListener("change", onMobile);

    let frame = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      frame = window.requestAnimationFrame(tick);
      if (!activeRef.current) return;
      const progress = progressRef.current;
      const { mobile, webm, loop } = prefs.current;
      let dominant = "";
      let dominantOpacity = 0;
      const keep = new Set<number>();

      let nextIndex = -1;
      let nextGap = Infinity;
      let prevIndex = -1;
      let prevGap = Infinity;
      FILM_CLIPS.forEach((clip, index) => {
        if (clip.from > progress && clip.from - progress < nextGap) {
          nextGap = clip.from - progress;
          nextIndex = index;
        }
        if (clip.to <= progress && progress - clip.to < prevGap) {
          prevGap = progress - clip.to;
          prevIndex = index;
        }
      });
      if (nextIndex >= 0 && nextGap < 0.1) keep.add(nextIndex);
      if (prevIndex >= 0 && prevGap < 0.05) keep.add(prevIndex);

      FILM_CLIPS.forEach((clip, index) => {
        const video = videos.current[index];
        const layer = layers.current[index];
        if (!video || !layer) return;
        const style = layerStyle(progress, clip);
        if (style.opacity > 0.02) keep.add(index);
        if (!clip.leak && style.opacity > dominantOpacity) {
          dominantOpacity = style.opacity;
          dominant = clip.id;
        }

        layer.style.opacity = style.opacity.toFixed(3);
        layer.style.visibility = style.opacity < 0.01 ? "hidden" : "visible";
        layer.style.transform = `scale(${style.scale.toFixed(3)})`;
        layer.style.filter = style.blur > 0.4 ? `blur(${style.blur.toFixed(1)}px)` : "none";
        layer.style.clipPath = style.clipPath;

        if (keep.has(index)) arm(video, clipSource(clip, mobile, webm), clip.poster);
        else disarm(video);

        if (style.opacity < 0.02) {
          if (!video.paused) video.pause();
          return;
        }

        const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : clip.duration;
        const target = clipLocalTime(progress, clip, duration);

        if (loop) {
          if (video.paused) void video.play().catch(() => undefined);
          return;
        }

        if (!video.paused) video.pause();
        if (video.readyState < 1) return;
        const delta = Math.abs(video.currentTime - target);
        if (delta < 0.03) {
          seekMiss.current = 0;
          return;
        }
        const previous = video.currentTime;
        video.currentTime = delta > 0.5 ? target : previous + (target - previous) * 0.45;
        if (video.readyState >= 3 && Math.abs(video.currentTime - previous) < 0.01 && delta > 0.2) {
          seekMiss.current += 1;
          if (seekMiss.current > 8) prefs.current.loop = true;
        } else if (delta < 0.12) {
          seekMiss.current = 0;
        }
      });

      const leak = leakRef.current;
      if (leak) {
        const fibreField = Math.exp(-((progress - 0.175) ** 2) / 0.0009);
        const fieldFire = Math.exp(-((progress - 0.25) ** 2) / 0.0011);
        leak.style.opacity = Math.min(0.9, fibreField * 0.75 + fieldFire * 0.85).toFixed(3);
      }

      const plate = plateRef.current;
      const off = offRef.current;
      const on = onRef.current;
      const led = ledRef.current;
      if (plate && off && on) {
        const opacity = plateOpacity(progress);
        const viewW = plate.clientWidth;
        const viewH = plate.clientHeight;
        if (viewW < 2 || viewH < 2) return;
        const portrait = viewW / viewH < 1;
        const asset = boardAsset(portrait);
        if (off.dataset.board !== asset.off) {
          off.dataset.board = asset.off;
          off.src = asset.off;
        }
        if (on.dataset.board !== asset.on) {
          on.dataset.board = asset.on;
          on.src = asset.on;
        }
        const frame = plateFrame(progress, viewW / viewH);
        const cover = Math.max(viewW / asset.width, viewH / asset.height) * frame.zoom;
        const width = asset.width * cover;
        const height = asset.height * cover;
        const left = Math.min(0, Math.max(viewW - width, viewW / 2 - frame.x * width));
        const top = Math.min(0, Math.max(viewH - height, viewH / 2 - frame.y * height));
        for (const photo of [off, on]) {
          photo.style.width = `${width}px`;
          photo.style.height = `${height}px`;
          photo.style.left = `${left}px`;
          photo.style.top = `${top}px`;
          photo.style.transform = "none";
        }
        let lit = ledOnAmount(progress);
        if (progress < 0.08) {
          const now = performance.now();
          if (igniteAt.current === 0) igniteAt.current = now;
          lit = Math.min(1, (now - igniteAt.current) / 900);
        } else if (progress > 0.45) {
          igniteAt.current = 0;
        }
        on.style.opacity = lit.toFixed(3);
        const blur = plateBlur(progress);
        plate.style.opacity = opacity.toFixed(3);
        plate.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        plate.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : "none";
        if (led) {
          const ledX = left + asset.led.x * width;
          const ledY = top + asset.led.y * height;
          const onScreen = ledX > -30 && ledY > -30 && ledX < viewW + 30 && ledY < viewH + 30 && opacity > 0.35 && lit > 0.45;
          led.style.left = `${ledX}px`;
          led.style.top = `${ledY}px`;
          led.style.opacity = onScreen ? "" : "0";
        }
      }
      const stage = stageRef.current;
      if (stage) stage.dataset.film = dominant;
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      mobileQuery.removeEventListener("change", onMobile);
    };
  }, [progressRef, stageRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <div ref={plateRef} className="story-board">
        {/* eslint-disable-next-line @next/next/no-img-element -- sized every frame for the Ken Burns pan */}
        <img ref={offRef} src={boardAsset(false).off} alt="" draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element -- sized every frame for the Ken Burns pan */}
        <img ref={onRef} src={boardAsset(false).on} alt="" draggable={false} onLoad={onReady} />
        <div className="story-board-sweep" />
        <div ref={ledRef} className="story-led-glow" />
      </div>
      {FILM_CLIPS.map((clip, index) => (
        <div
          key={clip.id}
          ref={(node) => {
            layers.current[index] = node;
          }}
          className={clip.leak ? "story-film-layer story-film-leak" : "story-film-layer"}
          data-film-id={clip.id}
        >
          <video
            ref={(node) => {
              videos.current[index] = node;
            }}
            muted
            playsInline
            preload="none"
            poster={clip.poster}
          />
        </div>
      ))}
      <div ref={leakRef} className="story-light-leak" />
    </div>
  );
}

export function canPlayFilm() {
  try {
    const probe = document.createElement("video");
    return Boolean(probe.canPlayType("video/mp4") || probe.canPlayType("video/webm"));
  } catch {
    return false;
  }
}
