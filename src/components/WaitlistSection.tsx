import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Animation variants for the container to orchestrate the children's animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for individual text elements
const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] }
  },
};

const WaitlistSection = () => {
  return (
    <div className="relative z-10 py-32 px-4 flex items-center justify-center min-h-screen">
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
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
            {/* --- THIS IS THE CORRECTED BUTTON --- */}
            {/* The text and icon are now direct children of the <a> tag, making the whole area clickable. */}
            <a 
                href="https://praedexa.com/auth?signup=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="convergence-button group"
            >
              <span>Sign Up on Praedexa</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </a>
        </motion.div>

        <motion.div variants={itemVariants}>
            <p className="text-2xl font-orbitron text-brand-cyan tracking-widest opacity-80">
              LAUNCHING Q4 2024
            </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default WaitlistSection;
