import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float, Environment, Stars } from '@react-three/drei';
import { MathUtils, Group } from 'three';

const CardModel = ({ scroll }: { scroll: number }) => {
  const groupRef = useRef<Group>(null!);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // More elegant rotation logic
    const targetRotationY = (1 - Math.min(scroll / 0.15, 1)) * (Math.PI / 2.5); // Slight tilt
    const targetRotationX = Math.sin(state.clock.elapsedTime * 0.5) * 0.05; // Gentle breathe
    
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 4);
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, delta * 4);

    const targetScale = 1 + (1 - Math.min(scroll / 0.15, 1)) * 1.2;
    groupRef.current.scale.setScalar(targetScale);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main Card Body - Dark Iridescent Metal */}
        <RoundedBox args={[8.56, 5.398, 0.2]} radius={0.3} smoothness={8}>
          <meshPhysicalMaterial
            color="#050505"
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={1}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 400]}
            envMapIntensity={2}
          />
        </RoundedBox>

        {/* The Edge Glow (Simulated LED) */}
        <RoundedBox args={[8.6, 5.45, 0.18]} radius={0.3} position={[0,0,-0.01]}>
           <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
        </RoundedBox>

        {/* EMV Chip */}
        <RoundedBox args={[1.2, 0.9, 0.05]} radius={0.1} position={[-2.8, 0.5, 0.11]}>
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.3} />
        </RoundedBox>

        {/* Branding Text */}
        <Text
          position={[2.2, 1.8, 0.11]}
          fontSize={0.4}
          font="https://fonts.gstatic.com/s/orbitron/v25/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nygyU.woff"
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          FACECARD
        </Text>
        
        <Text
          position={[-2.5, -1.8, 0.11]}
          fontSize={0.25}
          font="https://fonts.gstatic.com/s/orbitron/v25/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nygyU.woff"
          color="#40E0D0"
          letterSpacing={0.1}
        >
          ALONZO AVERA
        </Text>

         {/* Decorative holographic strip */}
         <mesh position={[0, -0.8, 0.11]}>
            <planeGeometry args={[8.5, 0.05]} />
            <meshBasicMaterial color="#333" />
         </mesh>
      </group>
    </Float>
  );
};

const Lights = () => (
  <>
    <ambientLight intensity={0.2} />
    {/* Dramatic Rim Lighting */}
    <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={200} color="#00f0ff" distance={30} />
    <spotLight position={[-10, -10, 5]} angle={0.5} penumbra={1} intensity={200} color="#ff0080" distance={30} />
    <pointLight position={[0, 0, 5]} intensity={10} color="white" />
  </>
);

const Card3D = ({ scroll }: { scroll: number }) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Performance optimization
      >
        <Lights />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <CardModel scroll={scroll} />
      </Canvas>
    </div>
  );
};

export default Card3D;