import React from 'react';
import Card3D from './components/Card3D';
import PrinciplesSection from './components/PrinciplesSection';
import WaitlistSection from './components/WaitlistSection';

const Starfield = () => (
  <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] animate-starfield"></div>
);

function App() {
  return (
    <main className="relative bg-brand-dark">
      
      {/* --- LAYER 1: The Fixed Hero Section (z-10) --- */}
      {/* This container is fixed to the viewport. It will be covered by the scrolling content. */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
        
        {/* The background gradient */}
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #20B2AA 0%, #0A0A0A 100%)' }}
        />
        <Starfield />

        {/* The 3D Card (with no props) */}
        <Card3D />

        {/* The Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white subtle-glow">FaceCard</h1>
            <h2 className="text-xl md:text-3xl font-bold text-white mt-4">The New Standard in Credit.</h2>
        </div>
      </div>

      {/* --- LAYER 2: The Scrolling Content (z-20) --- */}
      {/* This container has a higher z-index and will scroll on top of the fixed hero. */}
      <div className="relative z-20">
        {/* Spacers create the scrollable area */}
        <div className="h-[120vh]" />
        
        <PrinciplesSection />
        
        <div className="h-[120vh]" />
        
        <WaitlistSection />

        <div className="h-[60vh]" />
      </div>
    </main>
  );
}

export default App;
