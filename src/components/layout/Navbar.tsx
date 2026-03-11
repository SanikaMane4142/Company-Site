import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import useIsMobile from "../../hooks/useIsMobile";

const Navbar: React.FC = () => {
  const [showBadge, setShowBadge] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowBadge(!(currentScroll > lastScrollY && currentScroll > 80));
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinkStyle: React.CSSProperties = {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    textDecoration: "none",
  };

  const mobileLinkStyle: React.CSSProperties = {
    fontSize: "1.4rem",
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    letterSpacing: "-0.01em",
  };

  const handleLinkClick = () => setMenuOpen(false);

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="glass"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isMobile ? "0.8rem 1rem" : "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(20px)",
        }}
      >
        <Link
          to="/"
          onClick={handleLinkClick}
          style={{
            fontSize: isMobile ? "1.3rem" : "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            textDecoration: "none",
            color: "white",
          }}
        >
          COC<span className="gradient-text">PIT</span>
        </Link>

        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <a href="/#features" style={navLinkStyle}>
              Features
            </a>
            <Link to="/about" style={navLinkStyle}>
              About
            </Link>
            <Link to="/faq" style={navLinkStyle}>
              FAQs
            </Link>
            <Link to="/careers" style={navLinkStyle}>
              Careers
            </Link>
            <Button variant="primary" size="sm" onClick={scrollToWaitlist}>
              Get Access
            </Button>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              flexDirection: "column",
              gap: menuOpen ? "0px" : "5px",
              justifyContent: "center",
              alignItems: "center",
              width: "36px",
              height: "36px",
              position: "relative",
              zIndex: 1100,
            }}
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "white",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "white",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "white",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        )}
      </nav>

      {isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(5, 5, 5, 0.97)",
            backdropFilter: "blur(30px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            transition: "all 0.35s ease",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <a href="/#features" style={mobileLinkStyle} onClick={handleLinkClick}>
            Features
          </a>
          <Link to="/about" style={mobileLinkStyle} onClick={handleLinkClick}>
            About
          </Link>
          <Link to="/faq" style={mobileLinkStyle} onClick={handleLinkClick}>
            FAQs
          </Link>
          <Link to="/careers" style={mobileLinkStyle} onClick={handleLinkClick}>
            Careers
          </Link>
          <div style={{ marginTop: "1rem" }}>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                handleLinkClick();
                scrollToWaitlist();
              }}
            >
              Get Access
            </Button>
          </div>
        </div>
      )}

      {!isMobile && (
        <div
          style={{
            position: "fixed",
            top: "110px",
            right: "2rem",
            zIndex: 999,
            transform: showBadge ? "translateY(0)" : "translateY(-25px)",
            opacity: showBadge ? 1 : 0,
            transition: "all 0.4s ease",
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
              boxShadow: "0 0 25px rgba(120,150,255,0.15)",
            }}
          >
            <img
              src="/cyphex-logo.png"
              alt="Cyphex AI"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "white",
                letterSpacing: "0.02em",
              }}
            >
              Powered by Cyphex AI
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;