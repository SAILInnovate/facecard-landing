import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

// A component for the starfield background
const Starfield = () => (
  <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
  </div>
);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Opacity for Hero Text
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Opacity for sections
  const principlesOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.75, 0.85], [0, 1, 1, 0]);
  const waitlistOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <div ref={containerRef} className="main-container h-screen w-screen overflow-y-scroll overflow-x-hidden relative">
      <div className="h-[400vh] relative">
        {/* The 3D Card and UI are fixed to the viewport */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          {/* Background Gradient */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: useTransform(
                scrollYProgress,
                [0, 0.3, 0.9],
                ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #105955 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
              )
            }}
          />
          <Starfield />
          
          {/* The Hero Text */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
            style={{ opacity: heroTextOpacity, y: heroTextY }}
          >
            <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
            <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
            <p className="text-lg md:text-xl text-gray-200 mt-2">Build your financial foundation. Secure your future.</p>
          </motion.div>

          {/* 3D Card Model */}
          <Card3D scrollYProgress={scrollYProgress} />
        </div>

        {/* The scrolling content sections that trigger animations */}
        <div className="relative z-10">
          <div className="h-screen"></div> {/* Spacer for hero */}
          
          <motion.div style={{ opacity: principlesOpacity }}>
            <PrinciplesSection />
          </motion.div>
          
          <div className="h-[120vh]"></div> {/* Spacer for principles */}
          
          <motion.div style={{ opacity: waitlistOpacity }}>
            <WaitlistSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;