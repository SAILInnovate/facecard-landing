import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

const Starfield = () => (
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
      
      {/* --- FIXED HERO SECTION (z-10) --- */}
      {/* This layer holds the background, the card, AND the hero text. It will be covered by the scrolling content. */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{ background: backgroundGradient }}
        />
        
        {/* The 3D Card */}
        <Card3D scrollYProgress={scrollYProgress} mouse={mouse} />

        {/* The Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
            <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </div>
      </motion.div>

      {/* --- SCROLLING CONTENT SECTION (z-20) --- */}
      {/* This layer sits ON TOP of the hero section and scrolls over it. */}
      <div className="relative z-20">
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
