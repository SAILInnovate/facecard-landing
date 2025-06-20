import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

// A component for the starfield background
const Starfield = () => (
  <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
    <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
  </div>
);

function App() {
  // We no longer need a ref on the container, as the body will be the scroll source.
  const { scrollYProgress } = useScroll();

  // Opacity for Hero Text
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Opacity for sections
  const principlesOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const principlesY = useTransform(scrollYProgress, [0.2, 0.35], [100, 0]);

  const waitlistOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const waitlistY = useTransform(scrollYProgress, [0.7, 0.85], [100, 0]);

  // Background Gradient
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #105955 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );

  return (
    // The main container is now a simple div. The body will handle scrolling.
    <main className="relative bg-brand-dark">
      <Starfield />
      
      {/* The FIXED elements that stay on screen */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
        <motion.div 
          className="absolute inset-0"
          style={{ background: backgroundGradient }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
          <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </motion.div>
        <Card3D scrollYProgress={scrollYProgress} />
      </div>

      {/* The SCROLLING content sections */}
      <div className="relative z-10">
        <div className="h-[120vh]" /> {/* Spacer to scroll past the hero */}
        
        <motion.div style={{ opacity: principlesOpacity, y: principlesY }}>
          <PrinciplesSection />
        </motion.div>
        
        <div className="h-[120vh]" /> {/* Spacer to scroll past principles */}
        
        <motion.div style={{ opacity: waitlistOpacity, y: waitlistY }}>
          <WaitlistSection />
        </motion.div>

        <div className="h-[60vh]" /> {/* Spacer at the very bottom */}
      </div>
    </main>
  );
}

export default App;
