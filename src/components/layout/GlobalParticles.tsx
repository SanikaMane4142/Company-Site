// import React, { useMemo, useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";
// import * as THREE from "three";

// const ParticleField = () => {
//   const ref = useRef<THREE.Points>(null!);

//   const particles = useMemo(() => {
//     const positions = new Float32Array(5000 * 3);

//     for (let i = 0; i < 5000; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 60;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
//     }

//     return positions;
//   }, []);

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.0006;
//       ref.current.rotation.x += 0.0002;
//     }
//   });

//   return (
//     <Points ref={ref} positions={particles} stride={3}>
//       <PointMaterial
//         transparent
//         color="#ffffff"
//         size={0.06}
//         sizeAttenuation
//         depthWrite={false}
//         opacity={0.7}
//       />
//     </Points>
//   );
// };

// const GlobalParticles = () => {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 0,
//         pointerEvents: "none",
//       }}
//     >
//       <Canvas camera={{ position: [0, 0, 20] }}>
//         <ParticleField />
//       </Canvas>
//     </div>
//   );
// };

// export default GlobalParticles;
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particles once
  const positions = useMemo(() => {
    const count = 3000; // reduced for better performance
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      array[i * 3] = (Math.random() - 0.5) * 60;
      array[i * 3 + 1] = (Math.random() - 0.5) * 60;
      array[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }

    return array;
  }, []);

  // Rotate particles slowly
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
};

const GlobalParticles: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20] }}
        dpr={[1, 1.5]} // improves performance on high DPI screens
      >
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default GlobalParticles;