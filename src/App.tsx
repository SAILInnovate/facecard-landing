import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

const Starfield = () => (
  <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
);

function App() {
  const { scrollYProgress } = useScroll();

  // Animation logic for scrolling sections
  const principlesOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const principlesY = useTransform(scrollYProgress, [0.25, 0.35], [100, 0]);
  const waitlistOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const waitlistY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

  // Animation logic for the fixed background and hero text
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #105955 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);

  return (
    <main className="relative bg-brand-dark">
      
      {/* --- The ONE and ONLY Fixed Container (z-10) --- */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
        {/* Background Layer */}
        <motion.div 
          className="absolute inset-0"
          style={{ background: backgroundGradient }}
        />
        <Starfield />

        {/* 3D Card Layer (self-contained) */}
        <Card3D />

        {/* Hero Text Layer */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
          <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </motion.div>
      </div>

      {/* --- SCROLLING Content Section (z-20) --- */}
      {/* This layer has a higher z-index so it scrolls OVER the fixed container */}
      <div className="relative z-20">
        {/* Spacers create the scrollable area */}
        <div className="h-[120vh]" />
        
        <motion.div style={{ opacity: principlesOpacity, y: principlesY }}>
          <PrinciplesSection />
        </motion.div>
        
        <div className="h-[120vh]" />
        
        <motion.div style={{ opacity: waitlistOpacity, y: waitlistY }}>
          <WaitlistSection />
        </motion.div>

        <div className="h-[60vh]" />
      </div>
    </main>
  );
}

export default App;
