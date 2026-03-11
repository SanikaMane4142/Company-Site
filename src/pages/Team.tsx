import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";

interface Member {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const members: Member[] = [
  {
    name: "Founder Name",
    role: "Founder & CEO",
    bio: "Vision behind Cocpit. Focused on building intelligent infrastructure for execution-first professionals.",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Tech Lead Name",
    role: "Chief Technology Officer",
    bio: "Architecting scalable backend and AI-powered systems.",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "AI Lead Name",
    role: "Head of AI",
    bio: "Designing ML models powering Cocpit's intelligent core.",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Product Lead Name",
    role: "Head of Product",
    bio: "Ensuring execution-first product architecture.",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Design Lead Name",
    role: "Head of Design",
    bio: "Crafting premium, minimal, signal-driven interfaces.",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Operations Lead Name",
    role: "Operations Manager",
    bio: "Scaling internal execution systems and workflows.",
    image: "https://via.placeholder.com/300"
  }
];

const Team: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<Member | null>(null);
  const isMobile = useIsMobile();

  // Neural Background
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodeCount = isMobile ? 30 : 70;
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      pulse: Math.random() * 100
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulse += 0.05;
        const glow = (Math.sin(node.pulse) + 1) / 2;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2 + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,150,255,${0.6 + glow * 0.4})`;
        ctx.fill();

        nodes.forEach((other, j) => {
          if (i === j) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(120,150,255,${1 - dist / 140})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "80px 1rem" : "120px 2rem",
      }}
    >
      {/* Neural Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            textAlign: "center",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 700,
            marginBottom: isMobile ? "2.5rem" : "5rem",
            fontFamily: "'Space Grotesk', sans-serif",
            background: "linear-gradient(90deg, #7c9cff, #b993ff, #7c9cff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientShift 6s linear infinite",
            letterSpacing: "-0.04em",
          }}
        >
          Meet The Core Team
        </motion.h1>

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(auto-fit, minmax(250px, 1fr))",
            gap: isMobile ? "1rem" : "2.5rem",
          }}
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              whileHover={isMobile ? {} : {
                scale: 1.05,
                boxShadow: "0 0 40px rgba(120,150,255,0.4)"
              }}
              onClick={() => setSelected(member)}
              style={{
                cursor: "pointer",
                padding: isMobile ? "1.2rem" : "2rem",
                borderRadius: isMobile ? "16px" : "24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(15px)",
                textAlign: "center",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: isMobile ? "80px" : "120px",
                  height: isMobile ? "80px" : "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: isMobile ? "0.8rem" : "1.5rem",
                  border: "2px solid rgba(120,150,255,0.5)",
                }}
              />
              <h3 style={{ fontSize: isMobile ? "0.95rem" : undefined }}>{member.name}</h3>
              <p style={{ opacity: 0.6, fontSize: isMobile ? "0.8rem" : undefined }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "#000",
                zIndex: 50,
              }}
            />

            {/* Center Wrapper */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 60,
                padding: isMobile ? "1rem" : undefined,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35 }}
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: isMobile ? "20px" : "28px",
                  padding: isMobile ? "2rem" : "3rem",
                  width: "90%",
                  maxWidth: "500px",
                  backdropFilter: "blur(30px)",
                  textAlign: "center",
                }}
              >
                <img
                  src={selected.image}
                  alt={selected.name}
                  style={{
                    width: isMobile ? "100px" : "140px",
                    height: isMobile ? "100px" : "140px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "1.5rem",
                    border: "2px solid rgba(120,150,255,0.6)",
                  }}
                />

                <h2 style={{ fontSize: isMobile ? "1.3rem" : undefined }}>{selected.name}</h2>
                <p style={{ opacity: 0.6, marginBottom: "1.5rem", fontSize: isMobile ? "0.9rem" : undefined }}>
                  {selected.role}
                </p>

                <p style={{ lineHeight: "1.7", opacity: 0.85, fontSize: isMobile ? "0.9rem" : undefined }}>
                  {selected.bio}
                </p>

                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginTop: "2rem",
                    padding: "0.8rem 2rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(120,150,255,0.5)",
                    background: "rgba(120,150,255,0.15)",
                    color: "#fff",
                    cursor: "pointer",
                    width: isMobile ? "100%" : undefined,
                  }}
                >
                  Close
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;