import React from 'react';
import { motion } from 'framer-motion';

interface GatewayNodeProps { className?: string; }

export const GatewayNode: React.FC<GatewayNodeProps> = ({ className }) => (
  <motion.svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path d="M8 12V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <motion.path d="M14 12V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <motion.path d="M11 24C19 18, 30 18, 37 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    <motion.circle cx="37" cy="24" r="4" fill="currentColor"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    />
  </motion.svg>
);