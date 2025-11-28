import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

const principles = [
  {
    icon: ShieldCheck,
    title: "Stewardship",
    desc: "Financial salvation rooted in faith and responsible management.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: TrendingUp,
    title: "Intelligence",
    desc: "Rewards for learning. Risk-free simulations. Real growth.",
    color: "from-emerald-400 to-teal-500"
  },
  {
    icon: Users,
    title: "Community",
    desc: "A network that celebrates your journey, not just your score.",
    color: "from-purple-400 to-pink-500"
  }
];

const PrinciplesSection = () => {
  return (
    <section className="py-20">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">Core Principles</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {principles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="h-full bg-[#0a0a0a] rounded-xl p-8 border border-white/5 relative overflow-hidden group-hover:border-white/20 transition-colors">
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${p.color} p-0.5 mb-6`}>
                 <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                    <p.icon className="w-7 h-7 text-white" />
                 </div>
              </div>
              
              <h3 className="text-2xl font-orbitron font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                {p.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PrinciplesSection;