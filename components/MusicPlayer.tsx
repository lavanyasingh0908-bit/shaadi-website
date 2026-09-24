"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Vinyl from "@/components/icons/Vinyl";
import { music } from "@/lib/weddingData";
import { musicEngine } from "@/lib/musicEngine";

function usePlaying() {
  return useSyncExternalStore(
    (fn) => musicEngine.subscribe(fn),
    () => musicEngine.playing,
    () => false
  );
}

/**
 * The <audio> element is always mounted (metadata preload only) so the
 * "Open Invitation" tap can start it inside the gesture. The floating
 * button appears once the invitation is open.
 */
export default function MusicPlayer({ visible }: { visible: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playing = usePlaying();

  useEffect(() => {
    if (audioRef.current) musicEngine.attach(audioRef.current);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="metadata" />
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={() => musicEngine.toggle()}
            initial={{ opacity: 0, scale: 0.6, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`music-fab fixed z-50 flex items-center gap-2 rounded-full glass-panel px-2.5 py-2 shadow-lg shadow-black/5 ${
              playing ? "animate-pulse-glow" : ""
            }`}
            aria-label={playing ? "Mute music" : "Play music"}
            title={`${music.title} — ${music.artist}`}
          >
            <Vinyl className="h-7 w-7" spinning={playing} />
            <span className="sr-only">{playing ? "Playing" : "Paused"}</span>
            <span className="hidden pr-1 font-detail text-[11px] uppercase tracking-[0.15em] text-ink/70 sm:inline">
              {playing ? "Pause" : "Play"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
