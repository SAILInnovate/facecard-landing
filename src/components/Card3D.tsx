import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// --- This component is now fully self-contained ---
const Card3D = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture('/assets/facecard-texture.jpg');
  
  // Hooks are now used directly inside the component that needs them
  const { scrollYProgress } = useScroll();
  const mouse = {
    x: useSpring(useMotionValue(0), { stiffness: 100, damping: 30, restDelta: 0.001 }),
    y: useSpring(useMotionValue(0), { stiffness: 100, damping: 30, restDelta: 0.001 }),
  };

  // The mouse event handler is also self-contained within the canvas wrapper
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;
    mouse.x.set(x);
    mouse.y.set(y);
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = mouse.x.get() * 0.4;
      meshRef.current.rotation.x = -mouse.y.get() * 0.2;
    }
  });

  // Animation logic remains the same, but is now local to this component
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.8], [1, 1.2, 1, 1]);
  const rotationX = useTransform(scrollYProgress, [0, 0.1], [0, -Math.PI / 12]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]); // Fade out faster

  return (
    <div 
      onMouseMove={handleMouseMove} 
      className="w-full h-full"
    >
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, 5]} intensity={0.5} color="#40E0D0" />
        
        <motion.mesh
          ref={meshRef}
          scale={scale}
          rotation-x={rotationX}
          opacity={opacity}
        >
          <planeGeometry args={[7.5, 12]} />
          <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} transparent />
        </motion.mesh>
      </Canvas>
    </div>
  );
};

export default Card3D;
