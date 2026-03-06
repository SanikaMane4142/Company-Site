import React from "react";
import { motion } from "framer-motion";

const DualBlobOrbit: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Orbit Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Blob 1 */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 260,
            height: 260,
            position: "absolute",
            top: "-80px",
            background:
              "linear-gradient(135deg, #7C5CFF, #4F46E5)",
            opacity: 0.35,
            filter: "blur(70px)",
          }}
        />

        {/* Blob 2 */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            borderRadius: [
              "40% 60% 60% 40% / 60% 40% 60% 40%",
              "70% 30% 40% 60% / 40% 60% 40% 60%",
              "40% 60% 60% 40% / 60% 40% 60% 40%",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 220,
            height: 220,
            position: "absolute",
            bottom: "-60px",
            background:
              "linear-gradient(135deg, #6366F1, #3B82F6)",
            opacity: 0.3,
            filter: "blur(70px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default DualBlobOrbit;