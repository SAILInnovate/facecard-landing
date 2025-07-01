// src/components/CeoSection.tsx

import React from 'react';
import { motion } from 'framer-motion';

const ceoImageUrl = '/images/alonzo-avera.jpg';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const CeoSection: React.FC = () => {
  return (
    <motion.div 
      className="container mx-auto px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.h2 
        className="text-5xl md:text-7xl font-orbitron font-bold text-white subtle-glow text-center mb-12 md:mb-16"
        variants={itemVariants}
      >
        Meet the Visionary
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        {/* Left side: Image and Bio */}
        <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
          <img 
            src={ceoImageUrl} 
            alt="Alonzo Avera, CEO of FaceCard" 
            className="w-full h-auto object-cover rounded-2xl shadow-lg border-2 border-cyan-500/20"
          />
          <div className="space-y-4">
            <h3 className="text-3xl font-orbitron font-bold text-white">Alonzo Avera</h3>
            <p className="text-lg text-brand-cyan font-semibold">Founder & CEO, Community Builder, Visionary</p>
            <p className="text-gray-300 leading-relaxed">
              Based in Los Angeles, Alonzo Avera founded Facecard in 2025 with a clear mission: to dismantle the financial barriers that stifle creativity. As a public speaker and entrepreneur with a history of success, he knows firsthand the immense challenges of accessing capital.
            </p>
            <p className="text-gray-300 leading-relaxed">
              His journey began when he tried to secure a business loan for his record label, <strong>4mBrothers</strong>. The process was nearly impossible. As a creative, he found himself lost in the complex world of business structures and finance—a world where essential information on credit was gatekept and hard to come by.
            </p>
            {/* --- THIS PARAGRAPH HAS BEEN CORRECTED --- */}
            <p className="text-gray-300 leading-relaxed">
              Through sheer persistence, Alonzo successfully obtained his initial investment using credit banking. This hard-won victory inspired him to create Facecard: a US-based fast track to funding, designed to save creators time and empower them to focus on **his or her** art, craft, and business models.
            </p>
            <p className="text-gray-400 text-sm italic">
                Note: Facecard is a US-based entity and operates separately from international partners like Praedexa.
            </p>
          </div>
        </motion.div>

        {/* Right side: Calendar */}
        <motion.div className="lg:col-span-3 space-y-6" variants={itemVariants}>
            <h3 className="text-3xl font-orbitron font-bold text-white">Book a Discovery Call</h3>
            <p className="text-gray-300 leading-relaxed">
                Have a question or a proposal? Connect directly with Alonzo to discuss how we can build the future of creative finance together.
            </p>
            
            <div className="w-full h-[80vh] max-h-[900px] bg-gray-800/50 rounded-2xl overflow-hidden border border-cyan-500/20 backdrop-blur-sm shadow-2xl">
                <iframe
                    src="https://link.coachfoundation.com/widget/booking/9fOQoS1l8jr6pzOJE0OG"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Booking Widget for Alonzo Avera"
                    scrolling="yes" 
                ></iframe>
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CeoSection;
