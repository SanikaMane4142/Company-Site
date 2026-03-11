import React, { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What exactly is Cocpit?",
    answer:
      "Cocpit is an AI-based professional social networking platform built for people who want execution, not engagement. It connects ideas, talent, and decisions into one intelligent system."
  },
  {
    question: "Why do we need another professional network?",
    answer:
      "You don't. You need one that actually helps you build something instead of collecting followers, likes, and dead connections."
  },
  {
    question: "How is Cocpit different from LinkedIn?",
    answer:
      "LinkedIn rewards noise. Cocpit rewards signal. No vanity metrics, no empty networking—just people, ideas, and AI-driven execution paths."
  },
  {
    question: "What does the AI actually do?",
    answer:
      "It doesn't write cringe posts. It helps you match with the right people, structure ideas, identify gaps, and move faster—quietly, intelligently, and purposefully."
  },
  {
    question: "Who is Cocpit not for?",
    answer:
      "If you're here for clout, motivation quotes, or hustle culture, this isn't for you. Cocpit is for builders, operators, and thinkers who want outcomes."
  },
  {
    question: "Is my data safe, or is this another data-mining platform?",
    answer:
      "Cocpit is built with privacy-first architecture. Your data is used to improve your execution, not to sell ads or train irrelevant models."
  },
  {
    question: "Why should I join before launch?",
    answer:
      "Because platforms don't reward late believers. Early users shape the system, influence features, and get access before the noise arrives."
  },
  {
    question: "Is Cocpit ready, or is this just hype?",
    answer:
      "The system is being built deliberately. Pre-launch exists to onboard serious users, stress-test ideas, and eliminate everything that doesn't create value."
  },
  {
    question: "What happens if I don't join now?",
    answer:
      "Nothing. Your idea might just end up where most do—forgotten, unfunded, and outpaced."
  }
];

const FAQs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      style={{
        padding: isMobile ? "80px 1rem" : "120px 2rem",
        color: "white",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
          fontWeight: 700,
          marginBottom: isMobile ? "2rem" : "3rem",
        }}
      >
        Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            style={{
              marginBottom: isMobile ? "1rem" : "1.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: isMobile ? "12px" : "16px",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)"
            }}
          >
            {/* QUESTION */}
            <div
              onClick={() => toggleFAQ(index)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isMobile ? "1rem" : "1.5rem",
                cursor: "pointer",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: isMobile ? "0.95rem" : "1.1rem", fontWeight: 500 }}>
                {faq.question}
              </span>

              <span
                style={{
                  fontSize: "1.5rem",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </div>

            {/* ANSWER */}
            <div
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                overflow: "hidden",
                transition: "all 0.4s ease",
                padding: isOpen
                  ? (isMobile ? "0 1rem 1rem" : "0 1.5rem 1.5rem")
                  : (isMobile ? "0 1rem" : "0 1.5rem"),
              }}
            >
              <p
                style={{
                  margin: 0,
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  fontSize: isMobile ? "0.9rem" : undefined,
                  lineHeight: "1.7",
                }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FAQs;