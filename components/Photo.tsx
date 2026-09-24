"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, type MotionProps } from "framer-motion";
import { photoPlaceholder } from "@/lib/placeholder";
import type { ImageSource } from "@/lib/assets";

type PhotoProps = {
  src: ImageSource;
  alt: string;
  tone?: "ivory" | "blush" | "dark" | "bw";
  className?: string;
  style?: CSSProperties;
  /** Above-the-fold images: load eagerly with high fetch priority. */
  priority?: boolean;
} & MotionProps;

/**
 * Lazy-loaded image with a fallback chain (see lib/assets.ts). If every
 * source fails, an elegant gradient placeholder is shown instead, so nothing
 * ever looks broken.
 */
export default function Photo({
  src,
  alt,
  tone = "ivory",
  className = "",
  style,
  priority = false,
  ...motionProps
}: PhotoProps) {
  const sources = Array.isArray(src) ? src : [src];
  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // The <img> starts loading from the server-rendered HTML before React
  // hydrates and attaches onError, so a fast local 404 can slip past the
  // synthetic handler entirely — check on mount too, not just on error.
  // Only on mount: after a src swap the element can briefly still report the
  // previous broken state, which would wrongly skip a good fallback.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setIndex(1);
    }
  }, []);

  const current = sources[index];
  const resolved = current ?? photoPlaceholder(alt, tone);
  // Optimised files already carry the warm-ivory grade; raw uploads get it in CSS.
  const needsGrade = current !== undefined && !current.includes("/opt/");

  return (
    <motion.img
      ref={imgRef}
      src={resolved}
      alt={alt}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setIndex((i) => (i < sources.length ? i + 1 : i))}
      className={`${className} ${needsGrade ? "warm-grade" : ""}`}
      style={style}
      {...motionProps}
    />
  );
}
