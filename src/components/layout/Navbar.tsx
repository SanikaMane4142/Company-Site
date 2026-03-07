import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const Navbar: React.FC = () => {
  const [showBadge, setShowBadge] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 80) {
        setShowBadge(false);
      } else {
        setShowBadge(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="glass"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(20px)"
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            textDecoration: "none",
            color: "white"
          }}
        >
          COC<span className="gradient-text">PIT</span>
        </Link>

        {/* NAV LINKS */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center"
          }}
        >
          <a
            href="/#features"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              textDecoration: "none"
            }}
          >
            Features
          </a>

          <Link
            to="/about"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              textDecoration: "none"
            }}
          >
            About
          </Link>

          <Link
            to="/faq"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              textDecoration: "none"
            }}
          >
            FAQs
          </Link>

          <Link
            to="/careers"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              textDecoration: "none"
            }}
          >
            Careers
          </Link>

          <Link
            to="/team"
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              textDecoration: "none"
            }}
          >
            Team
          </Link>

          <Button variant="primary" size="sm">
            Get Access
          </Button>
        </div>
      </nav>

      {/* FLOATING POWERED BY BADGE */}
      <div
        style={{
          position: "fixed",
          top: "110px",   // ✅ increased spacing from navbar
          right: "2rem",
          zIndex: 999,
          transform: showBadge ? "translateY(0)" : "translateY(-25px)",
          opacity: showBadge ? 1 : 0,
          transition: "all 0.4s ease"
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
            padding: "0.6rem 1.2rem",
            borderRadius: "40px",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 25px rgba(120,150,255,0.15)"
          }}
        >
          <img
            src="/cyphex-logo.png"
            alt="Cyphex AI"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain"
            }}
          />

          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "white",
              letterSpacing: "0.02em"
            }}
          >
            Powered by Cyphex AI
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;