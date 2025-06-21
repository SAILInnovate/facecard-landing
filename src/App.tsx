import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';
// Import the store's setter functions
import { useAppStore } from './store/appStore';

function App() {
  const { scrollYProgress } = useScroll();
  // Get the setter functions from our Zustand store
  const { setScroll, setMouse } = useAppStore();

  // This effect will run whenever scrollYProgress changes, updating the global state
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScroll(latest);
    });
  }, [scrollYProgress, setScroll]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    setMouse({
      x: (clientX / width) - 0.5,
      y: (clientY / height) - 0.5,
    });
  };

  // 2D animation logic remains the same
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const principlesOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const principlesY = useTransform(scrollYProgress, [0.3, 0.4], [100, 0]);
  const waitlistOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const waitlistY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)', 'linear-gradient(180deg, #0A0A0A 0%, #0A0A0A 100%)']
  );

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative bg-brand-dark"
    >
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
        <motion.div className="absolute inset-0" style={{ background: backgroundGradient }} />
        {/* Card3D now takes NO props */}
        <Card3D />
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ opacity: heroOpacity }}>
          <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
          <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </motion.div>
      </div>

      <div className="relative z-20">
        <section className="h-[150vh]" />
        <section className="relative min-h-screen py-20">
          <motion.div style={{ opacity: principlesOpacity, y: principlesY }}>
            <PrinciplesSection />
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