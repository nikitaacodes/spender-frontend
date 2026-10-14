import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Model(props) {
  const group = useRef();

  const { scene } = useGLTF("/phone-transformed.glb");
  const screenTexture = useTexture("/chat.png");

  // Fix texture orientation (important for GLTF)
  screenTexture.flipY = false;

useEffect(() => {
  if (!scene) return;

  const box = new THREE.Box3().setFromObject(scene);
  const center = new THREE.Vector3();
  box.getCenter(center);

  scene.position.sub(center);
}, [scene]);

  return (
    <group ref={group} {...props}>
      {/* Phone Model */}
      <primitive object={scene} />

      {/* Screen Texture */}
      <mesh position={[0, 0.5, 0.25]}>
        <planeGeometry args={[0.8, 1.6]} />
        <meshBasicMaterial
          map={screenTexture}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/phone-transformed.glb");
