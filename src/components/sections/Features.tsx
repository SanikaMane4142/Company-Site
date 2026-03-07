import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

import analytics from "../../animations/Cybersecurity.json";
import network from "../../animations/CuteRobot.json";
import chatbot from "../../animations/graphicdesign.json";
import jobs from "../../animations/JobSearch.json";

const features = [
  {
    title: "AI-Based Intelligent Networking",
    description:
      "Cocpit uses advanced AI algorithms to connect professionals with the most relevant people in their industry. Instead of random networking, our system identifies meaningful connections based on skills, interests, career goals, and industry relevance.",
    animation: network,
    size: 520, // 🤖 BIG ROBOT
  },
  {
    title: "AI Business & Skill Analytics",
    description:
      "Gain deep insights into your professional growth and business performance. Cocpit analyzes your skills, engagement, and activity to provide personalized analytics that help you understand your strengths and identify areas for improvement.",
    animation: analytics,
    size: 360, // 🔐 SMALL CYBERSECURITY
  },
  {
    title: "AI Professional Chatbot for Career Growth",
    description:
      "Your personal AI assistant inside Cocpit helps you improve networking, build stronger professional relationships, and grow your business presence. The chatbot provides guidance on messaging, networking strategies, and professional communication.",
    animation: chatbot,
    size: 420,
  },
  {
    title: "AI Job Recommendations & Resume Summarizer",
    description:
      "Cocpit intelligently matches professionals with highly relevant job opportunities based on their skills, experience, and interests. Our AI resume summarizer also helps recruiters and professionals quickly understand key strengths and career highlights.",
    animation: jobs,
    size: 420,
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" style={{ padding: "120px 0" }}>
      <div className="container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "100px" }}
        >
          <h2 style={{ fontSize: "2.8rem", marginBottom: "15px" }}>
            Powerful Features Designed for{" "}
            <span className="gradient-text">Professional Growth</span>
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            AI-powered tools helping professionals connect smarter,
            analyze their performance, and grow their careers.
          </p>
        </motion.div>

        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "90px",
              alignItems: "center",
              marginBottom: "140px",
            }}
          >

            {/* Animation */}
            <div
              style={{
                order: index % 2 === 0 ? 0 : 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="animation-box"
                style={{ width: feature.size }}
              >
                <Lottie animationData={feature.animation} loop />
              </div>
            </div>

            {/* Text */}
            <div
              className="text-card"
              style={{
                order: index % 2 === 0 ? 1 : 0,
              }}
            >
              <h3 className="feature-title">{feature.title}</h3>

              <p className="feature-desc">
                {feature.description}
              </p>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Styles */}
      <style>
        {`

.animation-box{
max-width:100%;
animation:float 6s ease-in-out infinite;
}

@keyframes float{
0%{transform:translateY(0px)}
50%{transform:translateY(-18px)}
100%{transform:translateY(0px)}
}

/* TEXT CARD */

.text-card{
padding:38px;
border-radius:18px;
background:rgba(255,255,255,0.03);
border:1px solid rgba(255,255,255,0.08);
transition:all .35s ease;
max-width:580px;
}

/* TEXT */

.feature-title{
font-size:1.9rem;
margin-bottom:16px;
}

.feature-desc{
color:var(--text-secondary);
line-height:1.75;
}

/* HOVER */

.text-card:hover{
transform:translateY(-8px);
border:1px solid rgba(255,255,255,0.15);
background:rgba(255,255,255,0.05);
box-shadow:0 25px 50px rgba(0,0,0,0.45);
}

`}
      </style>
    </section>
  );
};

export default Features;