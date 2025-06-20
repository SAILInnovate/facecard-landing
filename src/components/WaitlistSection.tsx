import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WaitlistSection = () => {
  return (
    <div className="relative z-10 py-32 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white subtle-glow mb-6">
            The Journey Begins on Praedexa
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl mx-auto leading-relaxed">
            FaceCard will launch exclusively within the Praedexa ecosystem. Create your Praedexa account today to be first in line when it's released.
          </p>

          <div className="flex justify-center">
            <a 
              href="https://praedexa.com/auth?signup=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="premium-button group inline-block w-auto px-10 py-5 text-lg"
            >
              <span>Sign Up on Praedexa</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          <div className="mt-16">
            <p className="text-2xl font-orbitron text-brand-cyan tracking-widest">
              LAUNCHING Q4 2024
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaitlistSection;
