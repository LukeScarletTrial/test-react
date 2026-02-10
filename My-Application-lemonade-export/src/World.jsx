import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#4ade80" />
    </mesh>
  );
}

function Player() {
  const mesh = useRef();
  const [position, setPosition] = useState([0, 0.5, 0]);
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({ ...k, [key]: true }));
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({ ...k, [key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const speed = 0.1;
    let [x, y, z] = mesh.current.position.toArray();

    if (keys.w) z -= speed;
    if (keys.s) z += speed;
    if (keys.a) x -= speed;
    if (keys.d) x += speed;

    mesh.current.position.set(x, y, z);
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#eab308" />
    </mesh>
  );
}

export default function World() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <Sky sunPosition={[100, 20, 100]} />
      <Stars />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Player />
      <Ground />
      <OrbitControls />
      <gridHelper args={[100, 100]} />
    </Canvas>
  );
}