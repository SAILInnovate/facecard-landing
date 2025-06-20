import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [count, setCount] = useState(4281);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setCount(prev => prev + 1);
      // In a real app, you'd post the email to your API here.
      // setTimeout(() => window.open('https://praedexa.com', '_blank'), 1000);
    }
  };

  return (
    <div className="relative z-10 py-32 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white subtle-glow mb-4">
            Be the First to Hold It.
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Join the exclusive waitlist. An invitation from Praedexa is coming.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-16 pr-6 py-4 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  required
                />
              </div>
              {/* CORRECTED LINE: Added 'group' class to the button */}
              <button type="submit" className="premium-button group">
                <span>Request Early Access</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <motion.div 
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
              </div>
              <h3 className="text-3xl font-bold text-white">You're on the List.</h3>
              <p className="text-lg text-gray-300">Welcome to the future of credit. We'll be in touch.</p>
              {/* CORRECTED LINE: Added 'group' class to the link for consistency */}
              <a href="https://praedexa.com" target="_blank" rel="noopener noreferrer" className="premium-button group inline-block w-auto px-8">
                Follow Progress on Praedexa
              </a>
            </div>
          )}

          <div className="mt-12">
            <p className="font-bold text-white text-3xl">{count.toLocaleString()}</p>
            <p className="text-gray-400">Early Access Requests</p>
            <p className="mt-6 text-xl font-orbitron text-brand-cyan tracking-widest">LAUNCHING Q4 2024</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaitlistSection;
