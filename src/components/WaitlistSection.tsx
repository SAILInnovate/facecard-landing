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

// Animation variant for the button
const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: 0.5,
            ease: "backOut",
            boxShadow: "0 0 0px rgba(64, 224, 208, 0)", // Animate boxShadow
        }
    },
    hover: {
        scale: 1.05,
        boxShadow: "0 0 40px rgba(64, 224, 208, 0.4)", // Glow effect on hover
    }
}


const WaitlistSection = () => {
  return (
    <div className="relative z-10 py-32 px-4 flex items-center justify-center min-h-screen">
      <div 
        className="absolute inset-0 circuit-background" 
        style={{ animation: 'fadeIn 2s ease-in-out forwards' }} // Will be controlled by whileInView
      />
      
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
            <motion.a 
                href="https://praedexa.com/auth?signup=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="convergence-button group"
                variants={buttonVariants}
                whileHover="hover"
            >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Sign Up on Praedexa</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                </span>
                <span className="shine"></span>
            </motion.a>
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

// Add this keyframes animation to your CSS or use a style tag for simplicity here
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 0.1; }
}
`;

// Inject the keyframes into the document head
if (typeof window !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
