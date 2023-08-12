import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";

const Eatery = () => {
  const eatery = useGLTF("/eatery.glb");

  return (
    <primitive
      object={eatery.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EateryCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 8, 6],
        rotation: [10, 0, 0],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Eatery />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EateryCanvas;
