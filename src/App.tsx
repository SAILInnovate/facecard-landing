// src/App.tsx

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';
import CeoSection from './components/CeoSection'; // Import the new .tsx component

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

  // --- UPDATED ANIMATION LOGIC FOR TSX ---
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  
  // Principles section fades in and out
  const principlesOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const principlesY = useTransform(scrollYProgress, [0.25, 0.35], [100, 0]);
  
  // CEO Section fades in and out
  const ceoOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const ceoY = useTransform(scrollYProgress, [0.5, 0.6], [100, 0]);

  // Waitlist section fades in at the end
  const waitlistOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const waitlistY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );

  return (
    <main className="relative bg-brand-dark">
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

      <div className="relative z-20">
        {/* Increased spacer height to accommodate the new section and ensure smooth transitions */}
        <section className="h-[200vh]" /> 

        <section className="relative min-h-screen py-20 flex items-center">
          <motion.div className="w-full" style={{ opacity: principlesOpacity, y: principlesY }}>
            <PrinciplesSection />
          </motion.div>
        </section>

        {/* --- NEW CEO SECTION ADDED HERE --- */}
        <section className="relative min-h-screen py-20 flex items-center">
          <motion.div className="w-full" style={{ opacity: ceoOpacity, y: ceoY }}>
            <CeoSection />
          </motion.div>
        </section>

        <section className="relative h-screen flex items-center justify-center">
          <motion.div style={{ opacity: waitlistOpacity, y: waitlistY }}>
            <WaitlistSection />
          </motion.div>
        </section>
      </div>
    </main>
  );
}

export default App;
