import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// We import the simplified Card3D component
import Card3D from './components/Card3D'; 
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

const Starfield = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
  </div>
);

function App() {
  // We keep the scroll logic for the other sections, but it won't affect the card for now.
  const { scrollYProgress } = useScroll();

  const principlesOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const principlesY = useTransform(scrollYProgress, [0.2, 0.35], [100, 0]);

  const waitlistOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const waitlistY = useTransform(scrollYProgress, [0.7, 0.85], [100, 0]);

  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #105955 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );

  return (
    <main className="relative bg-brand-dark">
      <Starfield />
      
      {/* The FIXED elements that stay on screen */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
        <motion.div 
          className="absolute inset-0"
          style={{ background: backgroundGradient }}
        />
        {/* The hero text is temporarily disabled to reduce complexity */}
        {/* <motion.div ...> ... </motion.div> */}
        
        {/* We render the card with NO PROPS */}
        <Card3D />
      </div>

      {/* The SCROLLING content sections remain */}
      <div className="relative z-10">
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
