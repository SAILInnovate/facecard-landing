import React from 'react';
import { motion } from 'framer-motion';

interface GrowthMatrixProps { className?: string; }

const barVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1 + 0.2, duration: 0.5 },
  }),
};

export const GrowthMatrix: React.FC<GrowthMatrixProps> = ({ className }) => (
  <motion.svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}>
    <motion.rect x="8" y="28" width="8" height="12" rx="2" fill="currentColor" custom={1} variants={barVariants} />
    <motion.rect x="20" y="20" width="8" height="20" rx="2" fill="currentColor" custom={2} variants={barVariants} />
    <motion.rect x="32" y="10" width="8" height="30" rx="2" fill="currentColor" custom={3} variants={barVariants} />
    <motion.path d="M40 8 L42 10 L40 12 L38 10Z" fill="currentColor"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    />
  </motion.svg>
);