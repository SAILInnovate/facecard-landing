// src/App.tsx

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';
import CeoSection from './components/CeoSection';

const Starfield = () => (
  <div className="fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollValue(latest);
    });
  }, [scrollYProgress]);

  // --- SIMPLIFIED ANIMATION LOGIC ---
  // We only need animations for the fixed hero elements now.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );

  return (
    <main className="relative bg-brand-dark">
      {/* This container for the 3D card and hero text remains fixed */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
        <motion.div 
          className="absolute inset-0"
          style={{ background: backgroundGradient }}
        />
        <Starfield />
        <Card3D scroll={scrollValue} />
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
          <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </motion.div>
      </div>

      {/* --- REVISED PAGE CONTENT STRUCTURE --- */}
      <div className="relative z-20">
        {/* 
          This spacer pushes the content down below the initial hero view.
          120vh gives a little extra room before the first section appears.
        */}
        <section className="h-[120vh]" />

        {/* 
          Each section is now a simple container. The component inside
          (e.g., <PrinciplesSection />) will handle its own "whileInView" animation.
          This makes the layout much more robust and mobile-friendly.
        */}
        <section className="relative py-20 min-h-screen flex items-center">
          <PrinciplesSection />
        </section>

        <section className="relative py-20 min-h-screen flex items-center">
          <CeoSection />
        </section>

        <section className="relative py-20 min-h-screen flex items-center justify-center">
          <WaitlistSection />
        </section>
      </div>
    </main>
  );
}

export default App;
