import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

// Import the texture URL
import cardTextureUrl from '../assets/facecard-texture.jpg';

// This is the simplest possible version of our 3D scene.
const CardModel = () => {
  // We only use one hook, which is known to be working.
  const texture = useTexture(cardTextureUrl);

  return (
    // We use a standard <mesh> with no animation properties.
    <mesh>
      <planeGeometry args={[7.5, 12]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

// This is the simplest possible wrapper.
const Card3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 25 }}>
        {/* We add a strong, direct light to ensure the card is lit. */}
        <ambientLight intensity={1.0} />
        <directionalLight position={[0, 0, 5]} intensity={1.5} />
        
        <CardModel />
      </Canvas>
    </div>
  );
};

export default Card3D;
