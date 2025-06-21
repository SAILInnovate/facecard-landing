import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils, CylinderGeometry, Mesh, PointLight } from 'three';

// --- The "Data Spire" Visualization ---
interface SpireProps {
  scroll: number; // A simple number from 0 to 1
}

const DataSpire = ({ scroll }: SpireProps) => {
  const meshRef = useRef<Mesh<CylinderGeometry>>(null!);

  // The spire's height will grow based on the scroll position
  const height = Math.max(0.01, Math.min(scroll / 0.2, 1) * 20);

  // We need to re-create the geometry when the height changes
  const geometry = useMemo(() => new CylinderGeometry(1, 1.5, height, 32, 5, true), [height]);

  // Animate the texture to create the feeling of data flowing upwards
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material.map) {
      const time = state.clock.getElapsedTime();
      meshRef.current.material.map.offset.y = -time * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position-y={height / 2}>
      <meshStandardMaterial
        color="#40E0D0"
        emissive="#00FFFF" // Makes it glow from within
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
        roughness={0.2}
        metalness={0.5}
        wireframe // Gives it that "data" look
      />
    </mesh>
  );
};

// A component for the orbiting mouse light
const OrbitingLight = ({ mouse }: { mouse: { x: number, y: number }}) => {
    const lightRef = useRef<PointLight>(null!);
    
    useFrame(() => {
        if (lightRef.current) {
            lightRef.current.position.x = mouse.x * 20;
            lightRef.current.position.y = 10 + mouse.y * 10;
        }
    });

    return <pointLight ref={lightRef} position={[0, 10, 10]} intensity={50} color="#FFFFFF" distance={50} />;
};

interface Card3DProps {
  scroll: number;
  mouse: { x: number, y: number };
}

const Card3D = ({ scroll, mouse }: Card3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [25, 10, 25], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 0]} intensity={1.5} />
        
        {/* The Base Disc */}
        <mesh rotation-x={-Math.PI / 2}>
            <cylinderGeometry args={[2, 2, 0.5, 64]} />
            <meshStandardMaterial color="#40E0D0" emissive="#00FFFF" emissiveIntensity={0.5} toneMapped={false} />
        </mesh>

        <DataSpire scroll={scroll} />
        <OrbitingLight mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default Card3D;
