"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/intro/LoadingScreen";
import HeroGate from "@/components/intro/HeroGate";
import EnvelopeReveal from "@/components/intro/EnvelopeReveal";

type Phase = "loading" | "gate" | "envelope" | "done";

export default function IntroExperience({
  onOpen,
  onComplete,
}: {
  /** Fired synchronously inside the "Open Invitation" tap (user gesture). */
  onOpen: () => void;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("loading");

  if (phase === "done") return null;

  return (
    <AnimatePresence mode="wait">
      {phase === "loading" && (
        <LoadingScreen key="loading" onFinish={() => setPhase("gate")} />
      )}
      {phase === "gate" && (
        <div key="gate">
          <HeroGate
            onOpen={() => {
              onOpen();
              setPhase("envelope");
            }}
          />
        </div>
      )}
      {phase === "envelope" && (
        <EnvelopeReveal
          key="envelope"
          onComplete={() => {
            setPhase("done");
            onComplete();
          }}
        />
      )}
    </AnimatePresence>
  );
}
