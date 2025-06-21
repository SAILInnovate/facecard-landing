import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Sphere, useTexture } from '@react-three/drei';
import { MathUtils, PointLight, MeshPhysicalMaterial } from 'three';

// This component is PURE React Three Fiber and takes a 'scroll' number (0 to 1) as a prop.
const CardModel = ({ scroll }) => {
  const groupRef = useRef();
  const neonBallRef = useRef();

  // Load a premium texture for the card (replace with an actual texture path)
  const cardTexture = useTexture('/path/to/premium-texture.png');

  // Premium material with realistic reflections
  const cardMaterial = new MeshPhysicalMaterial({
    color: '#222831',
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
    map: cardTexture,
  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth rotation and scaling based on scroll
    const targetRotationY = (1 - Math.min(scroll / 0.15, 1)) * (Math.PI / 2);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 5);

    const targetScale = 1 + (1 - Math.min(scroll / 0.15, 1)) * 1.5;
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;

    // Pulse animation for the neon ball
    if (neonBallRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      neonBallRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main card body with premium material */}
      <RoundedBox args={[7.5, 12, 0.5]} radius={0.25}>
        <primitive object={cardMaterial} attach="material" />
      </RoundedBox>
      {/* Card inset for depth */}
      <RoundedBox args={[7, 11.5, 0.2]} radius={0.2} position-z={0.2}>
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      {/* High-resolution neon ball */}
      <Sphere args={[0.3, 64, 64]} position={[0, 4, 0.4]} ref={neonBallRef}>
        <meshBasicMaterial color="#40E0D0" toneMapped={false} />
      </Sphere>
      {/* Glow effect for the neon ball */}
      <Sphere args={[0.35, 64, 64]} position={[0, 4, 0.4]}>
        <meshBasicMaterial color="#40E0D0" transparent opacity={0.5} />
      </Sphere>
      {/* Premium detail: gold logo or text */}
      <mesh position={[-2.5, -4.5, 0.3]}>
        <planeGeometry args={[2, 1]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
    </group>
  );
};

const EclipseLight = ({ scroll }) => {
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.intensity = MathUtils.lerp(lightRef.current.intensity, Math.min(scroll / 0.1, 1) * 50, 0.1);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 5]}
      color="#40E0D0"
      distance={20}
    />
  );
};

const Card3D = ({ scroll }) => {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <CardModel scroll={scroll} />
        <EclipseLight scroll={scroll} />
      </Canvas>
    </div>
  );
};

export default Card3D;
