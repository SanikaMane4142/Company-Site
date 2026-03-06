 import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Cocpit?",
    answer:
      "Cocpit is an AI-based professional execution platform built for signal, not noise."
  },
  {
    question: "How is Cocpit different from LinkedIn?",
    answer:
      "LinkedIn rewards noise. Cocpit rewards clarity, execution, and decisions."
  },
  {
    question: "Who is Cocpit for?",
    answer:
      "Builders, founders, operators, and professionals who care about outcomes — not vanity metrics."
  }
];

const FAQs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      style={{
        padding: "120px 2rem",
        color: "white",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >
      <h2
        style={{
          fontSize: "2.8rem",
          fontWeight: 700,
          marginBottom: "3rem"
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
              marginBottom: "1.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
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
                padding: "1.5rem",
                cursor: "pointer"
              }}
            >
              <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                {faq.question}
              </span>

              <span
                style={{
                  fontSize: "1.5rem",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                }}
              >
                +
              </span>
            </div>

            {/* ANSWER */}
            <div
              style={{
                maxHeight: isOpen ? "200px" : "0px",
                overflow: "hidden",
                transition: "all 0.4s ease",
                padding: isOpen ? "0 1.5rem 1.5rem" : "0 1.5rem"
              }}
            >
              <p
                style={{
                  margin: 0,
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity 0.3s ease"
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