import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import GlobalParticles from "../components/layout/GlobalParticles";

interface Role {
  title: string;
  location: string;
  type: string;
  description: string;
}

const roles: Role[] = [
  {
    title: "Marketing Intern",
    location: "Kolhapur, Maharashtra (On-site)",
    type: "Internship",
    description: `
Role Overview:
We’re growing fast and looking for creative, driven, and passionate interns to join our Marketing Team.

Open Roles:
• Content Strategist Intern
• Content Writer / Creator Intern
• Social Media Marketing Intern

What You’ll Do:
• Create engaging content for social media, campaigns, and branding
• Develop creative ideas and storytelling strategies
• Understand audience behavior and build meaningful engagement
• Collaborate with the team to grow Cocpit’s digital presence
• Take ownership of projects and contribute fresh ideas

What We’re Looking For:
• Creative thinkers with strong communication skills
• Passion for content, branding, and digital marketing
• Self-driven individuals who enjoy building from scratch
• Basic understanding of social media trends and audience engagement
`,
  },
  {
    title: "UI/UX Design Intern",
    location: "Kolhapur, Maharashtra (On-site)",
    type: "Internship",
    description: `
Role Overview:
We’re looking for a creative and user-focused UI/UX Design Intern to join our growing team and help craft engaging digital experiences.

What You’ll Do:
• Design clean, modern, and user-friendly interfaces for web and mobile platforms
• Create wireframes, prototypes, and design concepts
• Work closely with developers and product teams to improve user experience
• Research user behavior and contribute ideas for better usability
• Maintain consistency in branding and design systems

What We’re Looking For:
• Passion for UI/UX design and digital products
• Creativity with strong attention to detail
• Basic knowledge of tools like Figma, Adobe XD, or similar
• Understanding of user-centered design principles
• Someone eager to learn, innovate, and build impactful products
`,
  },
  {
    title: "Manual Testing Intern",
    location: "Kolhapur, Maharashtra (On-site)",
    type: "Internship",
    description: `
Role Overview:
We’re looking for detail-oriented and curious Manual Testing Interns to join our team and help ensure a seamless user experience across our platforms.

What You’ll Do:
• Test web and mobile applications for bugs, usability, and performance issues
• Create and execute test cases and report defects clearly
• Work closely with developers and product teams to improve product quality
• Perform functional, regression, and UI testing
• Help maintain testing documentation and reports

What We’re Looking For:
• Strong attention to detail and problem-solving skills
• Basic understanding of software testing concepts
• Interest in quality assurance and product improvement
• Good communication and analytical skills
• Someone eager to learn and grow in a fast-paced startup environment
`,
  },
];
const Careers: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [submittingRole, setSubmittingRole] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    const curErrors: { [key: string]: string } = {};
    if (!name.trim()) curErrors.name = "Name is required";
    if (!email.trim()) {
      curErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      curErrors.email = "Invalid email format";
    }
    if (!resume) curErrors.resume = "Resume is required";

    if (Object.keys(curErrors).length > 0) {
      setErrors(curErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("role", selectedRole);
    if (resume) formData.append("resume", resume);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        setShowModal(false);
        setName("");
        setEmail("");
        setMessage("");
        setResume(null);
        setSubmittingRole(null);
      } else {
        alert(data.message || "Error submitting application");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setErrors({});
    setShowModal(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        paddingTop: isMobile ? "70px" : "100px",
      }}
    >
      {/* Global Particles Background */}
      <GlobalParticles />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Hero Section */}
        <section
          style={{
            height: isMobile ? "auto" : "40vh",
            minHeight: isMobile ? "50vh" : undefined,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: isMobile ? "3rem 1.5rem" : undefined,
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 600 }}
          >
            Join The Execution Layer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: isMobile ? "0.95rem" : undefined, padding: isMobile ? "0 1rem" : undefined }}
          >
            Help build the intelligent infrastructure powering Cocpit.
          </motion.p>
        </section>

        {/* Roles Section */}
        <section style={{ padding: isMobile ? "2rem 1rem" : "4rem 2rem" }}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "1.2rem" : "2rem",
            }}
          >
            {roles.map((role, index) => (
              <div key={index}>
                <motion.div
                  whileHover={isMobile ? {} : { scale: 1.03 }}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    padding: isMobile ? "1.2rem" : "2rem",
                    borderRadius: isMobile ? "14px" : "20px",
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <h3 style={{ fontSize: isMobile ? "1.1rem" : undefined }}>{role.title}</h3>
                  <p style={{ opacity: 0.6, fontSize: isMobile ? "0.85rem" : undefined }}>
                    {role.location} · {role.type}
                  </p>
                </motion.div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflowX: "hidden", marginTop: "1.2rem" }}
                    >
                      <div
                        style={{
                          padding: isMobile ? "1rem 1.2rem" : "1.5rem 2rem",
                          lineHeight: "1.9",
                          fontSize: isMobile ? "0.9rem" : undefined,
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: role.description.trim().replace(/\n/g, "<br/>") }} />
                        <div style={{ marginTop: "2rem" }}>
                          <motion.button
                            whileHover={{ scale: submittingRole ? 1 : 1.05 }}
                            whileTap={{ scale: submittingRole ? 1 : 0.97 }}
                            disabled={submittingRole !== null}
                            style={{
                              padding: isMobile ? "0.8rem 1.8rem" : "1rem 2.4rem",
                              borderRadius: "14px",
                              border: "1px solid rgba(120,150,255,0.6)",
                              background: submittingRole ? "rgba(120,150,255,0.05)" : "rgba(120,150,255,0.15)",
                              color: "#fff",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              cursor: submittingRole ? "not-allowed" : "pointer",
                              opacity: submittingRole ? 0.7 : 1,
                              width: isMobile ? "100%" : undefined,
                            }}
                            onClick={() => handleApply(role.title)}
                          >
                            {submittingRole === role.title ? "Submitting..." : "Apply Now"}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              padding: isMobile ? "1rem" : "20px",
            }}
            onClick={() => !isSubmitting && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#111",
                padding: isMobile ? "20px" : "30px",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "450px",
                maxHeight: isMobile ? "90vh" : undefined,
                overflowY: isMobile ? "auto" : undefined,
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "24px",
                  cursor: "pointer",
                  opacity: 0.5,
                }}
              >
                &times;
              </button>

              <h2 style={{ marginBottom: "20px", fontSize: isMobile ? "1.2rem" : "1.5rem" }}>
                Apply for {selectedRole}
              </h2>

              <form onSubmit={submitApplication} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>
                    Full Name *
                  </label>
                  <input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: errors.name ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: isMobile ? "16px" : undefined,
                    }}
                  />
                  {errors.name && <p style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "4px" }}>{errors.name}</p>}
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>
                    Email Address *
                  </label>
                  <input
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: errors.email ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: isMobile ? "16px" : undefined,
                    }}
                  />
                  {errors.email && <p style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "4px" }}>{errors.email}</p>}
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>
                    Message (Optional)
                  </label>
                  <textarea
                    placeholder="Why do you want to join?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#fff",
                      minHeight: "80px",
                      resize: "none",
                      fontSize: isMobile ? "16px" : undefined,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>
                    Resume Upload *
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="file"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      disabled={isSubmitting}
                      style={{
                        opacity: 0,
                        position: "absolute",
                        inset: 0,
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                    />
                    <div
                      style={{
                        padding: "12px",
                        background: "rgba(255,255,255,0.05)",
                        border: errors.resume ? "1px dashed #ff4444" : "1px dashed rgba(255,255,255,0.3)",
                        borderRadius: "10px",
                        textAlign: "center",
                        color: resume ? "#7896ff" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {resume ? resume.name : "Select PDF/DOC"}
                    </div>
                  </div>
                  {errors.resume && <p style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "4px" }}>{errors.resume}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginTop: "10px",
                    padding: "14px",
                    width: "100%",
                    borderRadius: "12px",
                    background: isSubmitting ? "rgba(120,150,255,0.1)" : "#7896ff",
                    color: "#000",
                    fontWeight: "bold",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    transition: "all 0.3s",
                    fontSize: isMobile ? "16px" : undefined,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className="spinner"
                        style={{
                          width: "18px",
                          height: "18px",
                          border: "2px solid rgba(0,0,0,0.2)",
                          borderTop: "2px solid #000",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>

              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;