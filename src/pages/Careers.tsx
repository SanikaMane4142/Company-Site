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
    title: "Full Stack Web Developer",
    location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
    type: "Full-Time",
    description: `
Role Overview:
We are looking for a skilled Full Stack Web Developer to build and maintain scalable web applications for Cocpit.

Key Responsibilities:
• Develop and maintain scalable web applications using React.js
• Build backend services and APIs using Express.js and Node.js
• Integrate databases, authentication systems, and third-party APIs
• Work closely with UI/UX designers
• Optimize applications for performance, scalability, and security
• Collaborate with the AI team

Required Skills:
• Strong experience with React.js
• Experience with Node.js and Express.js
• Knowledge of REST APIs
• Git and version control
• MongoDB / SQL knowledge

Preferred Skills:
• Startup experience
• Cloud knowledge (AWS / GCP / Azure)
`,
  },
  {
    title: "Android Developer (Flutter)",
    location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
    type: "Full-Time",
    description: `
Role Overview:
Design and develop high-performance mobile applications using Flutter.

Key Responsibilities:
• Develop Android applications using Flutter
• Integrate Express.js APIs
• Ensure performance and responsiveness
• Collaborate with UI/UX designers

Required Skills:
• Strong Flutter experience
• REST API integration
• Mobile UI/UX knowledge
• Git experience

Preferred Skills:
• Google Play publishing
• Scalable architecture knowledge
`,
  },
  {
    title: "iOS Developer (Swift)",
    location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
    type: "Full-Time",
    description: `
Role Overview:
Build scalable and high-quality iOS applications.

Key Responsibilities:
• Develop iOS applications using Swift
• Integrate backend services
• Implement smooth UI
• Maintain performance optimization

Required Skills:
• Strong Swift experience
• iOS SDK knowledge
• REST API integration
• Git knowledge

Preferred Skills:
• App Store deployment
• Mobile security practices
`,
  },
  {
    title: "AI / ML Developer",
    location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
    type: "Full-Time",
    description: `
Role Overview:
Design and implement intelligent systems.

Key Responsibilities:
• Design and deploy ML models
• Integrate models into APIs
• Optimize model performance
• Develop data pipelines

Required Skills:
• Strong Python knowledge
• TensorFlow / PyTorch
• ML & Deep Learning concepts
• Production deployment experience

Preferred Skills:
• LLM experience
• Data engineering knowledge
`,
  },
  {
    title: "HR Manager",
    location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
    type: "Full-Time",
    description: `
Role Overview:
Manage recruitment and HR operations.

Key Responsibilities:
• Manage end-to-end recruitment
• Conduct HR interviews
• Manage onboarding and HR policies
• Handle performance management

Required Skills:
• Strong HR process knowledge
• Experience hiring technical roles
• Strong communication skills
• HR tools knowledge

Preferred Skills:
• Tech startup experience
• Engineer talent acquisition knowledge
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
            height: isMobile ? "auto" : "80vh",
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
                          padding: isMobile ? "1.5rem" : "3rem",
                          lineHeight: "1.9",
                          fontSize: isMobile ? "0.9rem" : undefined,
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: role.description.replace(/\n/g, "<br/>") }} />
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