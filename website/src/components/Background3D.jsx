import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function FloatingRings() {
  const ringsRef = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ringsRef.current.forEach((ring, i) => {
      ring.rotation.x = time * (0.2 + i * 0.1);
      ring.rotation.y = time * (0.1 + i * 0.05);
      ring.position.y = Math.sin(time * 0.5 + i) * 0.5;
    });
  });

  return (
    <group>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <torusGeometry args={[3 + i * 1.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#6366f1"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    sphereRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    sphereRef.current.rotation.x = time * 0.1;
    sphereRef.current.rotation.y = time * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 5000 }) {
  const mesh = useRef();
  const light = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (xFactor + Math.cos(t / 10) * factor + (Math.sin(t * 1) * factor) / 10),
        (yFactor + Math.sin(t / 10) * factor + (Math.cos(t * 2) * factor) / 10),
        (zFactor + Math.cos(t / 10) * factor + (Math.sin(t * 3) * factor) / 10)
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.05, 0]} />
        <meshStandardMaterial color="#6366f1" />
      </instancedMesh>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="canvas-container">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#a855f7" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AnimatedSphere />
        <FloatingRings />
        <Particles count={100} />
      </Canvas>
    </div>
  );
}
