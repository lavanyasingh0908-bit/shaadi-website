"use client";

import { music } from "@/lib/weddingData";

type Listener = () => void;

/**
 * One shared audio pipeline for the whole page:
 *   <audio> -> GainNode (smooth volume fades, works on iOS too) -> Analyser -> speakers
 *
 * The AudioContext is only created inside the "Open Invitation" tap, so
 * nothing ever plays before the guest asks for it.
 */
class MusicEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private gain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private bins: Uint8Array<ArrayBuffer> | null = null;
  private listeners = new Set<Listener>();
  private fadeRaf = 0;

  playing = false;

  attach(audio: HTMLAudioElement) {
    if (this.audio === audio) return;
    this.audio = audio;
    audio.addEventListener("play", this.sync);
    audio.addEventListener("pause", this.sync);
  }

  private sync = () => {
    this.playing = !!this.audio && !this.audio.paused;
    this.listeners.forEach((fn) => fn());
  };

  private ensureGraph() {
    if (this.ctx || !this.audio) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(this.audio);
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(gain).connect(analyser).connect(ctx.destination);
      this.ctx = ctx;
      this.gain = gain;
      this.analyser = analyser;
      this.bins = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      // Web Audio unavailable — plain <audio> playback still works.
    }
  }

  /** Must be called from inside a user gesture (tap / click). */
  play() {
    const audio = this.audio;
    if (!audio) return;
    this.ensureGraph();
    this.ctx?.resume().catch(() => {});
    audio.play().catch(() => {
      // File missing or playback refused — the player button can retry.
    });
  }

  toggle() {
    if (!this.audio) return;
    if (this.audio.paused) this.play();
    else this.audio.pause();
  }

  /** Smoothly ramps volume to `level` (0–1) over `seconds`. */
  fadeTo(level: number, seconds: number) {
    if (this.gain && this.ctx) {
      const g = this.gain.gain;
      const now = this.ctx.currentTime;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(level, now + seconds);
      return;
    }
    const audio = this.audio;
    if (!audio) return;
    cancelAnimationFrame(this.fadeRaf);
    const from = audio.volume;
    const start = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / (seconds * 1000));
      audio.volume = from + (level - from) * k;
      if (k < 1) this.fadeRaf = requestAnimationFrame(step);
    };
    this.fadeRaf = requestAnimationFrame(step);
  }

  /** Frequency bands normalised to 0–1 (empty when silent). */
  bands(count: number): number[] {
    if (!this.analyser || !this.bins || !this.playing) return Array(count).fill(0);
    this.analyser.getByteFrequencyData(this.bins);
    const usable = Math.floor(this.bins.length * 0.7);
    const per = Math.max(1, Math.floor(usable / count));
    return Array.from({ length: count }, (_, i) => {
      let sum = 0;
      for (let j = 0; j < per; j++) sum += this.bins![i * per + j] ?? 0;
      return sum / per / 255;
    });
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  get src() {
    return music.src;
  }
}

export const musicEngine = new MusicEngine();
