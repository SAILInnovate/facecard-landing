import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Text, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const CardMesh = ({ scroll }: { scroll: number }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Idle Animation
    const idleRotX = Math.cos(t * 0.3) * 0.05;
    const idleRotY = Math.sin(t * 0.2) * 0.05;

    // Scroll Rotation
    const targetRotY = idleRotY + (scroll * Math.PI * 0.5); 
    
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, idleRotX, 0.1);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotY, 0.1);

    // MOBILE OPTIMIZATION:
    // On mobile, start LOWER (y = -1.5) so it doesn't block the text.
    // On desktop, start CENTER (y = 0).
    const startY = isMobile ? -1.5 : 0;
    const startZ = isMobile ? -1 : 0;

    // Scroll Movement:
    const targetX = isMobile ? 0 : scroll * 4; 
    const targetZ = startZ - (scroll * 8); 
    const targetY = startY - (scroll * 2);

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.1);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.1);
  });

  return (
    <group ref={group}>
      <RoundedBox ref={mesh} args={[3.4, 5.4, 0.08]} radius={0.15} smoothness={4}>
        {/* PREMIUM MATTE BLACK FINISH */}
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.4}
          metalness={0.8}
          clearcoat={0.2}
          envMapIntensity={2}
        />
        
        {/* GOLD CHIP (Refined Material) */}
        <mesh position={[-0.9, 0.6, 0.041]}>
          <planeGeometry args={[0.5, 0.4]} />
          <meshStandardMaterial 
            color="#FFD700" 
            roughness={0.2} 
            metalness={1} 
            envMapIntensity={2}
          />
        </mesh>

        {/* MINIMALIST DETAILS ONLY */}
        <group position={[0, 0, 0.05]}>
           {/* Founder Name Only - Subtle & Professional */}
           <Text
            position={[0, -2, 0]} 
            fontSize={0.14} 
            fontWeight={600}
            letterSpacing={0.2} 
            color="#333" // Dark grey, etched look (Subtle)
            anchorX="center"
            anchorY="middle"
          >
            ALONZO AVERA
          </Text>

          {/* Magnetic Strip / Deco Line */}
          <mesh position={[0, -0.8, 0]}>
             <planeGeometry args={[3.4, 0.02]} />
             <meshBasicMaterial color="#222" />
          </mesh>
        </group>
      </RoundedBox>
    </group>
  );
};

const Scene = ({ scroll }: { scroll: number }) => {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.5} />
      {/* Key Light */}
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={10} color="white" />
      {/* Fill Light (Cyan) */}
      <spotLight position={[-10, 0, 5]} angle={0.5} penumbra={1} intensity={5} color="#40E0D0" />
      {/* Back Light (Separation) */}
      <pointLight position={[0, 2, -2]} intensity={2} color="#fff" />

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <CardMesh scroll={scroll} />
      </Float>

      <Environment preset="city" background={false} />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
      </EffectComposer>
    </>
  );
};

export const TheArtifact = ({ scroll }: { scroll: number }) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }} 
        camera={{ position: [0, 0, 8], fov: 30 }}
      >
        <Suspense fallback={null}>
          <Scene scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  );
};