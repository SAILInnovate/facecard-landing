import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { MathUtils, PointLight } from 'three'; // Import MathUtils and PointLight from 'three'

// This component is now PURE React Three Fiber. No Framer Motion.
// It takes a simple 'scroll' number (0 to 1) as a prop.
interface Card3DProps {
  scroll: number;
}

const CardModel = ({ scroll }: { scroll: number }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // --- Manually calculate all animations ---
    const targetRotationY = (1 - Math.min(scroll / 0.15, 1)) * (Math.PI / 2);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 5);

    const targetScale = 1 + (1 - Math.min(scroll / 0.15, 1)) * 1.5;
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[7.5, 12, 0.5]} radius={0.25}>
        <meshStandardMaterial color="#222831" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[7, 11.5, 0.2]} radius={0.2} position-z={0.2}>
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 4, 0.4]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#40E0D0" toneMapped={false} />
      </mesh>
    </group>
  );
};

const EclipseLight = ({ scroll }: { scroll: number }) => {
    const lightRef = useRef<PointLight>(null!);

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

const Card3D = ({ scroll }: Card3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <CardModel scroll={scroll} />
        <EclipseLight scroll={scroll} />
      </Canvas>
    </div>
  );
};

export default Card3D;
