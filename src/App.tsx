import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

const Starfield = () => (
  <div className="fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
);

function App() {
  const { scrollYProgress } = useScroll();

  // Animation logic for the scrolling sections remains the same
  const principlesOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const principlesY = useTransform(scrollYProgress, [0.3, 0.4], [100, 0]);
  const waitlistOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const waitlistY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

  // Animate the background gradient
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );
  
  // Hero text fades out as the card reveals
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <main className="relative bg-brand-dark">
      
      {/* --- LAYER 1: The Fixed Hero (z-10) --- */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
        
        <motion.div 
          className="absolute inset-0"
          style={{ background: backgroundGradient }}
        />
        <Starfield />

        {/* The 3D Card handles its own reveal */}
        <Card3D />

        {/* The Hero Text, now on top */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
          <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </motion.div>
      </div>

      {/* --- LAYER 2: The Scrolling Content (z-20) --- */}
      <div className="relative z-20">
        <div className="h-[150vh]" /> {/* More space for the reveal animation */}
        
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
