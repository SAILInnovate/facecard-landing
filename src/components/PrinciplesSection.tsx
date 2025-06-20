import React from 'react';
import { motion } from 'framer-motion';
import { GatewayNode } from './icons/GatewayNode';
import { GrowthMatrix } from './icons/GrowthMatrix';
import { TrustNexus } from './icons/TrustNexus';

const principles = [
  {
    Icon: GatewayNode,
    headline: "Access, Redefined",
    description: "We're replacing outdated credit checks with a system built on trust, providing a real pathway to a strong credit history.",
  },
  {
    Icon: GrowthMatrix,
    headline: "Intelligence, Rewarded",
    description: "Master your finances with interactive simulations. Every step you take to improve your financial literacy earns you real rewards.",
  },
  {
    Icon: TrustNexus,
    headline: "Community, at the Core",
    description: "Connect with a network that champions your success, all within a transparent, ethical framework with no hidden fees.",
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const PrinciplesSection = () => {
  return (
    <div className="relative z-10 py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white subtle-glow">
            Built for a Fairer Financial Future
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed">
            Three foundational principles that redefine how credit should work.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 text-center"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700">
                  <principle.Icon className="w-10 h-10 text-brand-cyan" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {principle.headline}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrinciplesSection;