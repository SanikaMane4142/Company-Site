import React from "react";
import useIsMobile from "../hooks/useIsMobile";

const About: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <main>

      {/* HERO / INTRO */}
      <section style={{ padding: isMobile ? "var(--space-md) 0" : "var(--space-lg) 0", paddingTop: isMobile ? "80px" : undefined }}>
        <div className="container">

          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            About <span className="gradient-text">Cocpit</span>
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              textAlign: "center",
              maxWidth: "750px",
              margin: "0 auto",
              fontSize: isMobile ? "0.95rem" : "1.05rem",
              padding: isMobile ? "0 0.5rem" : undefined,
            }}
          >
            Cocpit is the next-generation professional networking platform where
            students, professionals, businesses, and innovators connect,
            collaborate, and grow in the digital age.
          </p>

        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ padding: isMobile ? "var(--space-md) 0" : "var(--space-lg) 0" }}>
        <div className="container">

          <h2 style={{ marginBottom: "1rem", fontSize: isMobile ? "1.5rem" : undefined }}>
            What We <span className="gradient-text">Do</span>
          </h2>

          <p style={{ color: "var(--text-secondary)", maxWidth: "850px", fontSize: isMobile ? "0.95rem" : undefined }}>
            Cocpit brings together schools, colleges, students, employees,
            employers, businesses, investors, and startups in one intelligent
            ecosystem. Whether you're a student exploring career opportunities,
            a professional expanding your network, a business searching for top
            talent, or an investor discovering the next big idea – Cocpit is
            built for you.
          </p>

        </div>
      </section>

      {/* AI DIFFERENCE */}
      <section style={{ padding: isMobile ? "var(--space-md) 0" : "var(--space-lg) 0" }}>
        <div className="container">

          <h2 style={{ marginBottom: "1rem", fontSize: isMobile ? "1.5rem" : undefined }}>
            The AI <span className="gradient-text">Difference</span>
          </h2>

          <p style={{ color: "var(--text-secondary)", maxWidth: "850px", fontSize: isMobile ? "0.95rem" : undefined }}>
            Everything you do on Cocpit is powered by artificial intelligence.
            From crafting the perfect profile and discovering relevant
            connections to matching opportunities and facilitating meaningful
            conversations – our AI works behind the scenes to make your
            professional journey smoother, smarter, and more successful.
          </p>

          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "1rem",
              maxWidth: "850px",
              fontSize: isMobile ? "0.95rem" : undefined,
            }}
          >
            Think of Cocpit as your personal AI assistant for professional
            growth. We don't just connect people; we understand your goals,
            anticipate your needs, and help you make decisions that matter.
          </p>

        </div>
      </section>

      {/* VISION */}
      <section style={{ padding: isMobile ? "var(--space-md) 0" : "var(--space-lg) 0" }}>
        <div className="container">

          <h2 style={{ marginBottom: "1rem", fontSize: isMobile ? "1.5rem" : undefined }}>
            Our <span className="gradient-text">Vision</span>
          </h2>

          <p style={{ color: "var(--text-secondary)", maxWidth: "850px", fontSize: isMobile ? "0.95rem" : undefined }}>
            We believe professional networking should be intelligent,
            intuitive, and accessible to everyone. Whether you're taking
            your first career steps or scaling your business to new heights,
            Cocpit adapts to your journey, learns from your goals, and helps
            you achieve them faster.
          </p>

        </div>
      </section>

      {/* CONTACT CARDS */}
      <section style={{ padding: isMobile ? "var(--space-md) 0" : "var(--space-lg) 0" }}>
        <div className="container">

          <h2 style={{ marginBottom: "2rem", fontSize: isMobile ? "1.5rem" : undefined }}>
            Get In Touch <span className="gradient-text">With Us</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(250px,1fr))",
              gap: isMobile ? "1rem" : "var(--space-md)",
            }}
          >

            <div className="glass-card">
              <h3>Email</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                yashoswal@cocpitin.org
              </p>
            </div>

            <div className="glass-card">
              <h3>Location</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Office 504, Emerald Corner <br />
                2nd Lane, Rajarampuri <br />
                Kolhapur
              </p>
            </div>

            <div className="glass-card">
              <h3>Working Hours</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Tuesday – Sunday <br />
                09:30 AM – 05:30 PM IST
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
};

export default About;