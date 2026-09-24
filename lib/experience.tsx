"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

/** True once the envelope has opened and the site is revealed. */
export const OpenedContext = createContext(false);

export function useOpened() {
  return useContext(OpenedContext);
}

/**
 * Shared, mutable, frame-rate state for the ambient effects. Kept outside
 * React on purpose: canvases read it every frame without re-rendering.
 */
export const scrollState = {
  lenis: null as Lenis | null,
  /** px per frame, signed (positive = scrolling down) */
  velocity: 0,
  /** 0–1 */
  progress: 0,
  /** 1 = petals visible, 0 = fade them away (final section) */
  petals: 1,
};
