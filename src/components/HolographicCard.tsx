import React from 'react';

const HolographicCard: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="premium-card-container perspective-1000">
        <div className="premium-card w-72 h-96 rounded-3xl shadow-2xl">
          {/* Card Front */}
          <div className="card-front p-8 h-full flex flex-col justify-between">
            {/* Top Section - Logo */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
                  <span className="font-orbitron text-white font-bold text-lg">FC</span>
                </div>
                <div className="holographic-strip w-16 h-1 rounded-full"></div>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-xs font-medium tracking-wider">PREMIUM</div>
              </div>
            </div>
            
            {/* Middle Section - Chip */}
            <div className="flex justify-start">
              <div className="chip w-14 h-11 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg"></div>
            </div>
            
            {/* Bottom Section - Branding */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-orbitron text-white text-2xl font-bold tracking-wide">
                  FaceCard
                </h3>
                <p className="text-cyan-400 text-sm font-medium">Credit Builder</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="holographic-element w-8 h-8 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Holographic Overlay */}
          <div className="holographic-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default HolographicCard;