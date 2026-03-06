// import React, { useMemo, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Points, PointMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// const ParticleField = () => {
//     const ref = useRef<THREE.Points>(null!);

//     const particles = useMemo(() => {
//         const positions = new Float32Array(4000 * 3);

//         for (let i = 0; i < 4000; i++) {
//             positions[i * 3] = (Math.random() - 0.5) * 30;
//             positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
//             positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
//         }

//         return positions;
//     }, []);

//     useFrame(() => {
//         if (ref.current) {
//             ref.current.rotation.y += 0.0006;
//             ref.current.rotation.x += 0.0002;
//         }
//     });

//     return (
//         <Points ref={ref} positions={particles} stride={3}>
//             <PointMaterial
//                 transparent
//                 color="#ffffff"
//                 size={0.07}
//                 sizeAttenuation
//                 depthWrite={false}
//                 opacity={0.75}
//             />
//         </Points>
//     );
// };

// const Hero: React.FC = () => {

//     const scrollToNext = () => {
//         const nextSection = document.getElementById('about');
//         if (nextSection) {
//             nextSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     return (
//         <section
//             style={{
//                 minHeight: '100vh',
//                 paddingTop: '100px',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 position: 'relative',
//                 overflow: 'hidden'
//             }}
//         >
//             {/* PARTICLE BACKGROUND */}
//             <div
//                 style={{
//                     position: 'absolute',
//                     inset: 0,
//                     zIndex: 0,
//                     pointerEvents: 'none'
//                 }}
//             >
//                 <Canvas
//                     camera={{ position: [0, 0, 10], fov: 75 }}
//                     style={{
//                         position: 'absolute',
//                         width: '100%',
//                         height: '100%'
//                     }}
//                     gl={{ alpha: true }}
//                 >
//                     <ParticleField />
//                 </Canvas>
//             </div>

//             {/* Glow */}
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.6 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 2, ease: "easeOut" }}
//                 style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: '800px',
//                     height: '800px',
//                     background:
//                         'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
//                     borderRadius: '50%',
//                     filter: 'blur(80px)',
//                     zIndex: 1
//                 }}
//             />

//             {/* CONTENT */}
//             <motion.div
//                 className="container"
//                 style={{
//                     position: "relative",
//                     zIndex: 5
//                 }}
//                 initial={{ opacity: 0, scale: 1.15 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                     duration: 1.8,
//                     ease: [0.16, 1, 0.3, 1] // cinematic easing
//                 }}
//             >

//                 {/* Main Heading */}
//                 <motion.h1
//                     initial={{ opacity: 0, y: 60 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4, duration: 1 }}
//                     style={{
//                         fontSize: 'clamp(2.8rem, 8vw, 5rem)',
//                         fontWeight: 800,
//                         lineHeight: 1.05,
//                         marginBottom: '1rem',
//                         letterSpacing: '-0.02em'
//                     }}
//                 >
//                     Welcome to <span className="gradient-text">COCPIT</span>
//                 </motion.h1>

//                 {/* Subtitle (Styled Smaller Font) */}
//                 <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.9, duration: 1 }}
//                     style={{
//                         fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
//                         fontWeight: 400,
//                         letterSpacing: '0.15em',
//                         textTransform: 'uppercase',
//                         color: 'rgba(255,255,255,0.65)',
//                         marginBottom: '1.5rem',
//                         fontFamily: 'Inter, sans-serif'
//                     }}
//                 >
//                     The next-generation professional networking platform.
//                 </motion.p>

//                 {/* Tagline */}
//                 <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.4, duration: 1 }}
//                     style={{
//                         fontSize: '1.1rem',
//                         color: 'var(--text-secondary)',
//                         marginBottom: '3rem'
//                     }}
//                 >
//                     Pre-launch. Already in motion.
//                 </motion.p>

//                 {/* Scroll Indicator */}
//                 <motion.div
//                     onClick={scrollToNext}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.8 }}
//                     style={{
//                         cursor: 'pointer',
//                         display: 'inline-flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         gap: '0.5rem'
//                     }}
//                 >
//                     <span
//                         style={{
//                             fontSize: '0.7rem',
//                             letterSpacing: '0.4em',
//                             opacity: 0.6
//                         }}
//                     >
//                         SCROLL
//                     </span>

//                     <motion.div
//                         animate={{ y: [0, 10, 0] }}
//                         transition={{
//                             duration: 1.8,
//                             repeat: Infinity,
//                             ease: "easeInOut"
//                         }}
//                         style={{
//                             width: '1px',
//                             height: '40px',
//                             background: 'linear-gradient(to bottom, #6366f1, transparent)'
//                         }}
//                     />
//                 </motion.div>

//             </motion.div>
//         </section>
//     );
// };

// export default Hero;
import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
    const ref = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const positions = new Float32Array(4000 * 3);

        for (let i = 0; i < 4000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }

        return positions;
    }, []);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.0006;
            ref.current.rotation.x += 0.0002;
        }
    });

    return (
        <Points ref={ref} positions={particles} stride={3}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.07}
                sizeAttenuation
                depthWrite={false}
                opacity={0.75}
            />
        </Points>
    );
};

const Hero: React.FC = () => {

    const scrollToNext = () => {
        const nextSection = document.getElementById('about');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            style={{
                minHeight: '100vh',
                paddingTop: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',

                /* ONLY CHANGE: bottom gradient color */
                background: 'linear-gradient(to bottom, #000000 70%, #050505 85%, #0a0a0a 100%)'
            }}
        >
            {/* PARTICLE BACKGROUND */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            >
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 75 }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                    gl={{ alpha: true }}
                >
                    <ParticleField />
                </Canvas>
            </div>

            {/* Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '800px',
                    background:
                        'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    zIndex: 1
                }}
            />

            {/* CONTENT */}
            <motion.div
                className="container"
                style={{
                    position: "relative",
                    zIndex: 5
                }}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.8,
                    ease: [0.16, 1, 0.3, 1]
                }}
            >

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    style={{
                        fontSize: 'clamp(2.8rem, 8vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Welcome to <span className="gradient-text">COCPIT</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 1 }}
                    style={{
                        fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                        fontWeight: 400,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.65)',
                        marginBottom: '1.5rem',
                        fontFamily: 'Inter, sans-serif'
                    }}
                >
                    The next-generation professional networking platform.
                </motion.p>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem'
                    }}
                >
                    Pre-launch. Already in motion.
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    onClick={scrollToNext}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    style={{
                        cursor: 'pointer',
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <span
                        style={{
                            fontSize: '0.7rem',
                            letterSpacing: '0.4em',
                            opacity: 0.6
                        }}
                    >
                        SCROLL
                    </span>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: '1px',
                            height: '40px',
                            background: 'linear-gradient(to bottom, #6366f1, transparent)'
                        }}
                    />
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;