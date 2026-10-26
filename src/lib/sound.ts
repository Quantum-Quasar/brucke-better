"use client";

// ponytail: lightweight, zero-dependency Web Audio controller for mechanical keyboard clicks & error sounds
// Pre-warms only a single primary sample per switch pack (1.wav) and uses Web Audio
// playbackRate micro-pitching for instant acoustic variation while lazily loading
// secondary variations in the background.

export interface SoundClickOption {
  id: string;
  name: string;
  count: number;
}

export interface SoundErrorOption {
  id: string;
  name: string;
  count: number;
}

export const SOUND_CLICK_OPTIONS: SoundClickOption[] = [
  { id: "off", name: "off", count: 0 },
  { id: "1", name: "click", count: 3 },
  { id: "2", name: "beep", count: 3 },
  { id: "3", name: "pop", count: 3 },
  { id: "4", name: "nk creams", count: 6 },
  { id: "5", name: "typewriter", count: 6 },
  { id: "6", name: "osu", count: 3 },
  { id: "7", name: "hitmarker", count: 3 },
  { id: "14", name: "fist fight", count: 8 },
  { id: "15", name: "rubber keys", count: 5 },
  { id: "17", name: "akko lavenders", count: 10 },
  { id: "18", name: "cherrymx black abs", count: 10 },
  { id: "19", name: "cherrymx black pbt", count: 10 },
  { id: "20", name: "cherrymx blue abs", count: 10 },
  { id: "21", name: "cherrymx blue pbt", count: 10 },
  { id: "22", name: "cherrymx brown pbt", count: 10 },
  { id: "23", name: "kalih box white", count: 10 },
  { id: "24", name: "razer green", count: 10 },
  { id: "25", name: "tealios v2", count: 10 },
  { id: "26", name: "trust gxt", count: 10 },
];

export const SOUND_ERROR_OPTIONS: SoundErrorOption[] = [
  { id: "off", name: "off", count: 0 },
  { id: "1", name: "damage", count: 1 },
  { id: "2", name: "triangle", count: 1 },
  { id: "3", name: "pop", count: 1 },
  { id: "4", name: "hit", count: 2 },
];

export class SoundEngine {
  private static readonly MAX_CACHE = 24;
  private audioCtx: AudioContext | null = null;
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private loadingPromises: Map<string, Promise<AudioBuffer | null>> = new Map();
  private failedUrls: Set<string> = new Set();

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  // ponytail: inspectable cache bounds for verification
  public getCacheSize(): number {
    return this.bufferCache.size;
  }

  public hasBuffer(url: string): boolean {
    return this.bufferCache.has(url);
  }

  /**
   * Preloads only the primary sample (1.wav) for the chosen switch pack instead of
   * downloading all 10 WAV variations upfront — cutting initial audio network payload by ~90%.
   */
  public async preloadClickSound(clickId: string): Promise<void> {
    const opt = SOUND_CLICK_OPTIONS.find((s) => s.id === clickId);
    if (!opt || opt.count === 0) return;
    const primaryUrl = `/sounds/click${clickId}/1.wav`;
    fetch(primaryUrl).catch(() => {});
  }

  public async loadBuffer(url: string): Promise<AudioBuffer | null> {
    if (this.bufferCache.has(url)) {
      return this.bufferCache.get(url)!;
    }
    if (this.failedUrls.has(url)) {
      return null;
    }
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const promise = (async () => {
      const ctx = this.getAudioContext();
      if (!ctx) return null;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          this.failedUrls.add(url);
          return null;
        }
        const arrayBuf = await res.arrayBuffer();
        const audioBuf = await ctx.decodeAudioData(arrayBuf);

        // ponytail: FIFO eviction to strictly cap in-memory decoded PCM buffers <= 24
        if (this.bufferCache.size >= SoundEngine.MAX_CACHE) {
          const oldestKey = this.bufferCache.keys().next().value;
          if (oldestKey) this.bufferCache.delete(oldestKey);
        }
        this.bufferCache.set(url, audioBuf);
        return audioBuf;
      } catch {
        this.failedUrls.add(url);
        return null;
      } finally {
        this.loadingPromises.delete(url);
      }
    })();

    this.loadingPromises.set(url, promise);
    return promise;
  }

  private playBuffer(buf: AudioBuffer, volume: number, playbackRate = 1.0) {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      gainNode.gain.value = Math.max(0, Math.min(1, volume));
      source.buffer = buf;
      if (playbackRate !== 1.0 && source.playbackRate) {
        source.playbackRate.value = playbackRate;
      }
      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      // ponytail: release nodes immediately upon playback end to prevent audio thread leak
      source.onended = () => {
        try {
          source.disconnect();
          gainNode.disconnect();
        } catch {}
      };

      source.start(0);
    } catch {}
  }

  private playOscillatorFallback(freq: number, type: OscillatorType, volume: number, durationMs = 60) {
    if (volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.5)), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);

      // ponytail: release synthetic oscillator nodes on completion
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch {}
  }

  public async playClick(clickId: string, volume: number): Promise<void> {
    if (clickId === "off" || volume <= 0) return;
    const opt = SOUND_CLICK_OPTIONS.find((s) => s.id === clickId);
    if (!opt || opt.count === 0) return;

    const randomIndex = Math.floor(Math.random() * opt.count) + 1;
    const url = `/sounds/click${clickId}/${randomIndex}.wav`;
    const primaryUrl = `/sounds/click${clickId}/1.wav`;

    const buf = this.bufferCache.get(url);
    if (buf) {
      this.playBuffer(buf, volume);
      return;
    }

    // If primary sample 1.wav is already cached, play it immediately with subtle pitch variation
    // while lazily warming the secondary variation in the background
    const primaryBuf = this.bufferCache.get(primaryUrl);
    if (primaryBuf) {
      const rateJitter = 0.96 + Math.random() * 0.08;
      this.playBuffer(primaryBuf, volume, rateJitter);
      void this.loadBuffer(url);
      return;
    }

    // Attempt to load primary sample first
    const loadedBuf = await this.loadBuffer(primaryUrl);
    if (loadedBuf) {
      this.playBuffer(loadedBuf, volume);
    } else {
      this.playOscillatorFallback(700, "triangle", volume, 35);
    }
  }

  public async playError(errorId: string, volume: number): Promise<void> {
    if (errorId === "off" || volume <= 0) return;
    const opt = SOUND_ERROR_OPTIONS.find((s) => s.id === errorId);
    if (!opt || opt.count === 0) return;

    const randomIndex = Math.floor(Math.random() * opt.count) + 1;
    const url = `/sounds/error${errorId}/${randomIndex}.wav`;

    const buf = this.bufferCache.get(url);
    if (buf) {
      this.playBuffer(buf, volume);
      return;
    }

    const loadedBuf = await this.loadBuffer(url);
    if (loadedBuf) {
      this.playBuffer(loadedBuf, volume);
    } else {
      this.playOscillatorFallback(220, "sawtooth", volume, 150);
    }
  }
}

export const soundEngine = new SoundEngine();
