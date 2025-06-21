import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import cardTextureUrl from '../assets/facecard-texture.jpg';

// This is our "Hello, World" for the 3D card.
const CardModel = () => {
  const texture = useTexture(cardTextureUrl);
  return (
    <mesh>
      <planeGeometry args={[7.5, 12]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Card3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <CardModel />
      </Canvas>
    </div>
  );
};

export default Card3D;
