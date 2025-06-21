import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// We'll use a new, more fitting icon for "Stewarding"
import { ShieldCheck } from 'lucide-react'; 
import { GrowthMatrix } from './icons/GrowthMatrix';
import { TrustNexus } from './icons/TrustNexus';

const principles = [
  {
    id: 1,
    // Using a "Shield Check" icon to represent protection, stewardship, and trustworthiness.
    Icon: ShieldCheck, 
    // THIS IS THE NEW HEADLINE
    title: "Stewarding, Saving, Salvation", 
    // This description is rephrased to match the new headline's tone.
    description: "Build your financial foundation on a platform rooted in faith. We provide the tools for responsible stewardship and a pathway to financial peace.", 
    position: "top-0 left-1/2 -translate-x-1/2",
  },
  {
    id: 2,
    Icon: GrowthMatrix,
    title: "Intelligence, Rewarded",
    description: "Learn while you earn with interactive lessons, rewards, and risk-free credit simulations.",
    position: "bottom-0 left-0",
  },
  {
    id: 3,
    Icon: TrustNexus,
    title: "Community-Driven Finance",
    description: "Connect with a supportive network that celebrates your financial journey and success.",
    position: "bottom-0 right-0",
  }
];

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' }},
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' }},
};

const PrinciplesSection = () => {
  const [activePrinciple, setActivePrinciple] = useState(principles[0]);

  return (
    <div className="relative py-32 px-4 flex flex-col items-center justify-center min-h-[120vh]">
      <div className="w-full max-w-2xl text-center h-48 mb-24 md:mb-32">
        <AnimatePresence mode="wait">
            <motion.div
                key={activePrinciple.id}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white subtle-glow mb-6">
                    {activePrinciple.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    {activePrinciple.description}
                </p>
            </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="relative w-full max-w-lg h-80 md:h-96 constellation-wrapper">
        <div className="constellation-line" style={{ top: '22%', left: '26%', width: '48%', transform: 'rotate(120deg)' }} />
        <div className="constellation-line" style={{ top: '22%', right: '26%', width: '48%', transform: 'rotate(60deg)' }} />
        <div className="constellation-line" style={{ bottom: '15%', left: '0', width: '100%' }} />

        {principles.map((principle) => (
          <motion.div
            key={principle.id}
            className={`absolute ${principle.position}`}
            onMouseEnter={() => setActivePrinciple(principle)}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 * principle.id }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <div className="constellation-orb">
                {/* We need to handle the new icon component */}
                <principle.Icon className="icon" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrinciplesSection;
