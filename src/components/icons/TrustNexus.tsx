import React from 'react';
import { motion } from 'framer-motion';

interface TrustNexusProps { className?: string; }

export const TrustNexus: React.FC<TrustNexusProps> = ({ className }) => (
  <motion.svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8 }}
    />
    {[0, 90, 180, 270].map((angle, i) => (
      <motion.g key={angle} transform={`rotate(${angle} 24 24)`}>
        <motion.path d="M24 18V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
        />
        <motion.circle cx="24" cy="8" r="3" fill="currentColor"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
        />
      </motion.g>
    ))}
  </motion.svg>
);