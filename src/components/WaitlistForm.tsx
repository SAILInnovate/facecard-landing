import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [count, setCount] = useState(2847);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setCount(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-16 pr-6 py-5 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-lg pulse-border"
              required
            />
          </div>
          
          <button
            type="submit"
            className="premium-button w-full py-5 rounded-2xl text-black font-bold text-lg flex items-center justify-center space-x-3 transition-all group"
          >
            <span>Request Early Access</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      ) : (
        <div className="text-center space-y-6 fade-in-up">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto success-checkmark">
            <Check className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">You're on the List</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Thank you for your interest. FaceCard is an upcoming initiative powered by Praedexa.
            </p>
          </div>
          <a
            href="https://praedexa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold px-8 py-4 rounded-2xl hover:from-cyan-400 hover:to-cyan-500 transition-all group"
          >
            <span>Follow Our Progress on Praedexa</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )}
      
      <div className="text-center space-y-4">
        <div className="text-center">
          <div className="text-cyan-400 text-sm font-medium tracking-wider mb-2">LAUNCHING</div>
          <div className="text-2xl font-bold text-white launch-pulse">Q4 2024</div>
        </div>
        
        <div className="space-y-2">
          <div className="counter-animation text-4xl font-bold text-cyan-400">
            {count.toLocaleString()}
          </div>
          <p className="text-gray-400 text-lg">Early Access Requests</p>
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm;