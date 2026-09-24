"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lotus from "@/components/icons/Lotus";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const id = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(id);
        setTimeout(onFinish, 260);
      }
    }, 40);
    return () => clearInterval(id);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ivory"
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="text-champagne-dark"
      >
        <Lotus className="h-16 w-16" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.35em" }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mt-6 font-detail text-[11px] uppercase text-champagne-dark"
      >
        Sejal &amp; Himanshu
      </motion.p>

      <div className="mt-8 h-px w-40 overflow-hidden bg-beige">
        <motion.div
          className="h-full bg-champagne"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <p className="mt-3 font-detail text-[10px] tracking-[0.3em] text-ink/40">{progress}%</p>
    </motion.div>
  );
}
