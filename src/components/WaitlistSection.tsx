import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const portalVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: 0.5,
            duration: 0.8,
            ease: "backOut",
        }
    }
}

const WaitlistSection = () => {
  return (
    <>
      <div className="relative z-10 py-32 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-orbitron font-bold text-white subtle-glow"
            variants={itemVariants}
          >
            The Journey Begins
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            FaceCard will launch exclusively within the Praedexa ecosystem. Create your Praedexa account today to be first in line when it's released. Your future awaits.
          </motion.p>

          <motion.div variants={itemVariants}>
              <p className="text-2xl font-orbitron text-brand-cyan tracking-widest opacity-80">
                {/* THIS IS THE UPDATED YEAR */}
                LAUNCHING 2026
              </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        // THIS IS THE UPDATED LINK
        href="https://praedexa.com/auth?signup=true&from=facecard"
        target="_blank"
        rel="noopener noreferrer"
        className="portal-button group"
        variants={portalVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <span>Begin on Praedexa</span>
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
      </motion.a>
    </>
  );
};

export default WaitlistSection;
