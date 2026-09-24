"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import IntroExperience from "@/components/intro/IntroExperience";
import MusicPlayer from "@/components/MusicPlayer";
import Petals from "@/components/effects/Petals";
import AmbientLayer from "@/components/effects/AmbientLayer";
import SparkleCursor from "@/components/effects/SparkleCursor";
import ScrollLotus from "@/components/effects/ScrollLotus";
import HeroPhoto from "@/components/sections/HeroPhoto";
import SaveTheDate from "@/components/sections/SaveTheDate";
import Families from "@/components/sections/Families";
import LoveStory from "@/components/sections/LoveStory";
import EventHaldi from "@/components/sections/EventHaldi";
import EventSangeet from "@/components/sections/EventSangeet";
import EventBaraat from "@/components/sections/EventBaraat";
import EventWedding from "@/components/sections/EventWedding";
import Venue from "@/components/sections/Venue";
import Blessings from "@/components/sections/Blessings";
import FinalMessage from "@/components/sections/FinalMessage";
import Footer from "@/components/Footer";
import { OpenedContext } from "@/lib/experience";
import { musicEngine } from "@/lib/musicEngine";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [showPetalBurst, setShowPetalBurst] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  function handleIntroComplete() {
    setOpened(true);
    setShowPetalBurst(true);
    window.setTimeout(() => setShowPetalBurst(false), 5500);
  }

  return (
    <OpenedContext.Provider value={opened}>
      {/* Music never autoplays: it starts inside the "Open Invitation" tap. */}
      <IntroExperience onOpen={() => musicEngine.play()} onComplete={handleIntroComplete} />
      <MusicPlayer visible={opened} />
      <ScrollLotus visible={opened} />
      {opened && <AmbientLayer />}
      <SparkleCursor />

      {showPetalBurst && (
        <div className="pointer-events-none fixed inset-0 z-[55]">
          <Petals count={40} variant="marigold" />
        </div>
      )}

      <SmoothScroll enabled={opened}>
        <main className="relative overflow-x-clip">
          <HeroPhoto />
          <SaveTheDate />
          <Families />
          <LoveStory />
          <EventHaldi />
          <EventSangeet />
          <EventBaraat />
          <EventWedding />
          <Venue />
          <Blessings />
          <FinalMessage />
          <Footer />
        </main>
      </SmoothScroll>
    </OpenedContext.Provider>
  );
}
