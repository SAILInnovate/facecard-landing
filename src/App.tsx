import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { TheArtifact } from './components/TheArtifact';
import { ArrowRight, Lock, X } from 'lucide-react';

const App = () => {
  const { scrollYProgress } = useScroll();
  const [scrollVal, setScrollVal] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange(v => setScrollVal(v));
  }, [scrollYProgress]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isBookingOpen]);

  const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main className="relative bg-[#050505] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <TheArtifact scroll={scrollVal} />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center z-10 pointer-events-none px-6">
        <motion.div style={{ y: yTitle, opacity: opacityTitle }} className="text-center space-y-6">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white">
            FACE<span className="text-gray-600">CARD</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto leading-relaxed font-light">
            The first credit instrument designed for <br/> <span className="text-white font-medium">immortal reputation.</span>
          </p>
        </motion.div>
      </section>

      {/* --- PRINCIPLES SECTION --- */}
      <section className="relative z-10 py-32 md:py-48 px-6 bg-gradient-to-b from-transparent via-[#050505] to-[#050505]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-16">
              <h2 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
                CREDIT IS <br/><span className="text-cyan-500">POWER.</span>
              </h2>
              
              <div className="space-y-12">
                <div className="pl-6 border-l border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-3">01. Stewardship</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Traditional finance gates your potential. We provide tools for salvation, not just spending. Build a foundation rooted in intelligence.
                  </p>
                </div>
                
                <div className="pl-6 border-l border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-3">02. Intelligence</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Financial literacy is your greatest asset. Learn, simulate, and execute without risk. Intelligence is rewarded with leverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOUNDER SECTION --- */}
      <section className="relative z-10 py-24 bg-[#080808]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-gray-900 grayscale hover:grayscale-0 transition-all duration-700">
               <img 
                 src="/images/alonzo-avera.jpg" 
                 alt="Alonzo Avera" 
                 className="w-full h-full object-cover"
               />
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-cyan-500 font-bold tracking-widest uppercase text-sm">The Visionary</p>
                <h2 className="text-4xl md:text-5xl font-bold">Alonzo Avera</h2>
              </div>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                <p>
                  "I founded FaceCard to dismantle the barriers that stifle creativity. The financial system wasn't broken; <span className="text-white font-medium">it was built to keep us out.</span>"
                </p>
                <p>
                  Based in Los Angeles, Alonzo Avera has navigated the complex world of business structures and finance firsthand. His mission is to create a US-based fast track to funding, empowering creators to focus on their art, not their survival.
                </p>
              </div>
              
              {/* BUTTON TRIGGERS MODAL NOW */}
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="group flex items-center space-x-3 text-white border-b border-white/30 pb-1 hover:border-cyan-400 hover:text-cyan-400 transition-all pt-4"
              >
                <span className="font-bold tracking-wide">BOOK DISCOVERY CALL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <section className="relative z-10 py-24 bg-black text-center border-t border-white/5">
        <div className="container mx-auto px-6 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Join the Vanguard</h2>
            <p className="text-gray-500">FaceCard launches 2026.</p>
          </div>
          
          <div>
            <a 
              href="https://praedexa.com/auth?signup=true&from=facecard" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Register on Praedexa</span>
            </a>
          </div>

          {/* PRAEDEXA LOGO */}
          <div className="pt-16 flex justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            <img 
                src="/images/praedexa-logo-light.png" 
                alt="Praedexa Ecosystem" 
                className="h-6 w-auto object-contain" // Small, neat height (24px)
            />
          </div>
        </div>
      </section>

      {/* --- BOOKING MODAL (Full Screen Overlay) --- */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md" 
                onClick={() => setIsBookingOpen(false)}
            />

            {/* Modal Content */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl h-[85vh] bg-[#111] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            >
                {/* Header */}
                <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
                    <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase pointer-events-auto">
                        Discovery Call
                    </span>
                    <button 
                        onClick={() => setIsBookingOpen(false)}
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors pointer-events-auto"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Iframe */}
                <div className="w-full h-full pt-16 bg-white">
                    <iframe
                        src="https://link.coachfoundation.com/widget/booking/9fOQoS1l8jr6pzOJE0OG"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Booking Widget"
                        scrolling="yes" 
                    ></iframe>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default App;