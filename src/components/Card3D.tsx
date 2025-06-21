import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// We need RoundedBox for our new object
import { RoundedBox } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

// This component now creates a 3D object from scratch
const CardModel = () => {
  // We use a <group> to hold all the pieces of our object
  // so we can animate them together as one unit.
  const groupRef = useRef<THREE.Group>(null!);
  const { scrollYProgress } = useScroll();
  
  // --- Animation Logic ---
  const rotationY = useTransform(scrollYProgress, [0, 0.15], [Math.PI / 2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [2.5, 1]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
      groupRef.current.position.y = Math.cos(time * 0.7) * 0.1;
    }
  });

  return (
    <motion.group
      ref={groupRef}
      rotation-y={rotationY}
      scale={scale}
    >
      {/* 1. The Main Body: A dark, metallic slab */}
      <RoundedBox args={[7.5, 12, 0.5]} radius={0.25}>
        <meshStandardMaterial 
          color="#222831" // Dark gunmetal color
          metalness={0.8} 
          roughness={0.2} 
        />
      </RoundedBox>

      {/* 2. The Inset Panel: A matte black front face */}
      <RoundedBox 
        args={[7, 11.5, 0.2]} // Slightly smaller
        radius={0.2} 
        position-z={0.2} // Pushed slightly forward
      >
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.5} 
          roughness={0.4} 
        />
      </RoundedBox>

      {/* 3. The Glowing Core: A soft cyan light */}
      <mesh position={[0, 4, 0.4]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color="#40E0D0" 
          toneMapped={false} // Makes the glow ignore scene lighting
        />
      </mesh>
    </motion.group>
  );
};

// The Eclipse Light remains the same
const EclipseLight = () => {
    const { scrollYProgress } = useScroll();
    const intensity = useTransform(scrollYProgress, [0.01, 0.1], [0, 50]); // Increased intensity for metallic reflections
    const scale = useTransform(scrollYProgress, [0, 0.1], [0.5, 5]);

    return (
        <motion.pointLight 
            position={[0, 0, 5]} // Moved light forward to catch the front face
            color="#40E0D0" 
            distance={20}
            intensity={intensity}
            scale={scale}
        />
    );
};

// The main component remains structurally the same
const Card3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        <CardModel />
        <EclipseLight />

      </Canvas>
    </div>
  );
};

export default Card3D;
