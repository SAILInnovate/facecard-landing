import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

const Starfield = () => (
  // z-0 puts it at the very back
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();

  const mouse = {
    x: useSpring(useMotionValue(0), { stiffness: 100, damping: 30, restDelta: 0.001 }),
    y: useSpring(useMotionValue(0), { stiffness: 100, damping: 30, restDelta: 0.001 }),
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;
    mouse.x.set(x);
    mouse.y.set(y);
  };

  // --- Animation Logic for all components ---
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  const principlesOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const principlesY = useTransform(scrollYProgress, [0.25, 0.35], [100, 0]);

  const waitlistOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const waitlistY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3, 0.9],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #105955 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );

  return (
    <main 
      onMouseMove={handleMouseMove} 
      className="relative bg-brand-dark"
    >
      <Starfield />
      
      {/* --- LAYER 1: Background (z-0) --- */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ background: backgroundGradient }}
      />
      
      {/* --- LAYER 2: 3D Card (z-10) --- */}
      {/* This layer is separate now, sitting on top of the background. */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <Card3D scrollYProgress={scrollYProgress} mouse={mouse} />
      </div>

      {/* --- LAYER 3: Hero Text (z-20) --- */}
      {/* Sits on top of the card. */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-20"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
            <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
            <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </div>
      </motion.div>

      {/* --- LAYER 4: Scrolling Content (z-30) --- */}
      {/* Sits on top of everything else. */}
      <div className="relative z-30">
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
