// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Role {
//   title: string;
//   location: string;
//   type: string;
//   description: string;
// }

// const roles: Role[] = [
//   {
//     title: "Full Stack Web Developer",
//     location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
//     type: "Full-Time",
//     description: `
// Role Overview:
// We are looking for a skilled Full Stack Web Developer to build and maintain scalable web applications for Cocpit.

// Key Responsibilities:
// • Develop and maintain scalable web applications using React.js
// • Build backend services and APIs using Express.js and Node.js
// • Integrate databases, authentication systems, and third-party APIs
// • Work closely with UI/UX designers
// • Optimize applications for performance, scalability, and security
// • Collaborate with the AI team

// Required Skills:
// • Strong experience with React.js
// • Experience with Node.js and Express.js
// • Knowledge of REST APIs
// • Git and version control
// • MongoDB / SQL knowledge

// Preferred Skills:
// • Startup experience
// • Cloud knowledge (AWS / GCP / Azure)
// `
//   },
//   {
//     title: "Android Developer (Flutter)",
//     location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
//     type: "Full-Time",
//     description: `
// Role Overview:
// Design and develop high-performance mobile applications using Flutter.

// Key Responsibilities:
// • Develop Android applications using Flutter
// • Integrate Express.js APIs
// • Ensure performance and responsiveness
// • Collaborate with UI/UX designers

// Required Skills:
// • Strong Flutter experience
// • REST API integration
// • Mobile UI/UX knowledge
// • Git experience

// Preferred Skills:
// • Google Play publishing
// • Scalable architecture knowledge
// `
//   },
//   {
//     title: "iOS Developer (Swift)",
//     location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
//     type: "Full-Time",
//     description: `
// Role Overview:
// Build scalable and high-quality iOS applications.

// Key Responsibilities:
// • Develop iOS applications using Swift
// • Integrate backend services
// • Implement smooth UI
// • Maintain performance optimization

// Required Skills:
// • Strong Swift experience
// • iOS SDK knowledge
// • REST API integration
// • Git knowledge

// Preferred Skills:
// • App Store deployment
// • Mobile security practices
// `
//   },
//   {
//     title: "AI / ML Developer",
//     location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
//     type: "Full-Time",
//     description: `
// Role Overview:
// Design and implement intelligent systems.

// Key Responsibilities:
// • Design and deploy ML models
// • Integrate models into APIs
// • Optimize model performance
// • Develop data pipelines

// Required Skills:
// • Strong Python knowledge
// • TensorFlow / PyTorch
// • ML & Deep Learning concepts
// • Production deployment experience

// Preferred Skills:
// • LLM experience
// • Data engineering knowledge
// `
//   },
//   {
//     title: "HR Manager",
//     location: "Kolhapur, Maharashtra (On-site) · Min 3 Years",
//     type: "Full-Time",
//     description: `
// Role Overview:
// Manage recruitment and HR operations.

// Key Responsibilities:
// • Manage end-to-end recruitment
// • Conduct HR interviews
// • Manage onboarding and HR policies
// • Handle performance management

// Required Skills:
// • Strong HR process knowledge
// • Experience hiring technical roles
// • Strong communication skills
// • HR tools knowledge

// Preferred Skills:
// • Tech startup experience
// • Engineer talent acquisition knowledge
// `
//   }
// ];

// const Careers: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [openIndex, setOpenIndex] = useState<number | null>(null);
//   const [submittingRole, setSubmittingRole] = useState<string | null>(null);

//   // NEW STATES FOR APPLICATION MODAL
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [resume, setResume] = useState<File | null>(null);

//   // APPLY FUNCTION
//   const submitApplication = async () => {

//     const formData = new FormData();

//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("message", message);
//     formData.append("role", selectedRole);

//     if (resume) {
//       formData.append("resume", resume);
//     }

//     try {

//       const response = await fetch("http://localhost:5000/api/apply", {
//         method: "POST",
//         body: formData
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Application submitted successfully");
//         setShowModal(false);
//       } else {
//         alert(data.message);
//       }

//     } catch (error) {
//       alert("Server error");
//     }

//   };

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     const ctx = canvas.getContext("2d")!;
//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);

//     const nodes = Array.from({ length: 50 }).map(() => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       vx: (Math.random() - 0.5) * 0.5,
//       vy: (Math.random() - 0.5) * 0.5,
//       pulse: Math.random() * 100
//     }));

//     function animate() {
//       ctx.clearRect(0, 0, width, height);

//       nodes.forEach((node, i) => {
//         node.x += node.vx;
//         node.y += node.vy;

//         if (node.x < 0 || node.x > width) node.vx *= -1;
//         if (node.y < 0 || node.y > height) node.vy *= -1;

//         node.pulse += 0.05;
//         const glow = (Math.sin(node.pulse) + 1) / 2;

//         ctx.beginPath();
//         ctx.arc(node.x, node.y, 2 + glow * 2, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(120,150,255,${0.6 + glow * 0.4})`;
//         ctx.fill();
//       });

//       requestAnimationFrame(animate);
//     }

//     animate();
//   }, []);

//   return (
//     <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", position: "relative", overflow: "hidden", paddingTop: "100px" }}>

//       <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />

//       <div style={{ position: "relative", zIndex: 2 }}>

//         {/* HERO */}
//         <section style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
//           <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: "4rem", fontWeight: 600 }}>
//             Join The Execution Layer
//           </motion.h1>

//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.4 }}>
//             Help build the intelligent infrastructure powering Cocpit.
//           </motion.p>
//         </section>

//         {/* ROLES */}
//         <section style={{ padding: "4rem 2rem" }}>
//           <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

//             {roles.map((role, index) => (

//               <div key={index}>

//                 <motion.div
//                   whileHover={{ scale: 1.03 }}
//                   onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                   style={{
//                     padding: "2rem",
//                     borderRadius: "20px",
//                     cursor: "pointer",
//                     background: "rgba(255,255,255,0.05)",
//                     border: "1px solid rgba(255,255,255,0.1)"
//                   }}
//                 >

//                   <h3>{role.title}</h3>

//                   <p style={{ opacity: 0.6 }}>
//                     {role.location} · {role.type}
//                   </p>

//                 </motion.div>

//                 <AnimatePresence>

//                   {openIndex === index && (

//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       style={{ overflow: "hidden", marginTop: "1.2rem" }}
//                     >

//                       <div style={{ padding: "3rem", lineHeight: "1.9" }}>

//                         <div dangerouslySetInnerHTML={{ __html: role.description.replace(/\n/g, "<br/>") }} />

//                         <div style={{ marginTop: "2rem" }}>
//                           <motion.button
//                             whileHover={{ scale: submittingRole ? 1 : 1.05 }}
//                             whileTap={{ scale: submittingRole ? 1 : 0.97 }}
//                             disabled={submittingRole !== null}
//                             style={{
//                               padding: "1rem 2.4rem",
//                               borderRadius: "14px",
//                               border: "1px solid rgba(120,150,255,0.6)",
//                               background: submittingRole
//                                 ? "rgba(120,150,255,0.05)"
//                                 : "rgba(120,150,255,0.15)",
//                               color: "#fff",
//                               fontWeight: 600,
//                               letterSpacing: "0.05em",
//                               cursor: submittingRole ? "not-allowed" : "pointer",
//                               opacity: submittingRole ? 0.7 : 1
//                             }}
//                             onClick={() => handleApply(role.title)}
//                           >
//                             {submittingRole === role.title ? "Submitting..." : "Apply Now"}
//                           </motion.button>

//                         </div>

//                       </div>

//                     </motion.div>

//                   )}

//                 </AnimatePresence>

//               </div>

//             ))}

//           </div>
//         </section>
//       </div>

//       {/* APPLICATION MODAL */}

//       <AnimatePresence>

//         {showModal && (

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             style={{
//               position: "fixed",
//               inset: 0,
//               background: "rgba(0,0,0,0.9)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               zIndex: 999
//             }}
//           >

//             <motion.div
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               style={{
//                 background: "#111",
//                 padding: "40px",
//                 borderRadius: "12px",
//                 width: "420px"
//               }}
//             >

//               <h2>Apply for {selectedRole}</h2>

//               <input placeholder="Name" onChange={(e) => setName(e.target.value)} style={{ width: "100%", marginTop: "15px", padding: "10px" }} />

//               <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", marginTop: "15px", padding: "10px" }} />

//               <textarea placeholder="Message (optional)" onChange={(e) => setMessage(e.target.value)} style={{ width: "100%", marginTop: "15px", padding: "10px" }} />

//               <input type="file" onChange={(e) => setResume(e.target.files?.[0] || null)} style={{ marginTop: "15px" }} />

//               <button onClick={submitApplication} style={{ marginTop: "20px", padding: "12px", width: "100%" }}>
//                 Submit Application
//               </button>

//             </motion.div>

//           </motion.div>

//         )}

//       </AnimatePresence>

//     </div>
//   );
// };

// export default Careers



import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
`
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
`
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
`
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
`
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
`
  }
];

const Careers: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [submittingRole, setSubmittingRole] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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
      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        setShowModal(false);
        // Reset form
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

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      pulse: Math.random() * 100
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
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
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", position: "relative", overflow: "hidden", paddingTop: "100px" }}>

  
      <canvas 
  ref={canvasRef} 
  style={{ 
    position: "fixed", 
    inset: 0, 
    zIndex: 0,
    pointerEvents: "none"   // prevents blocking clicks
  }} 
/>

      <div style={{ position: "relative", zIndex: 2 }}>

        <section style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: "4rem", fontWeight: 600 }}>
            Join The Execution Layer
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.4 }}>
            Help build the intelligent infrastructure powering Cocpit.
          </motion.p>
        </section>

        <section style={{ padding: "4rem 2rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

            {roles.map((role, index) => (

              <div key={index}>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    padding: "2rem",
                    borderRadius: "20px",
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >

                  <h3>{role.title}</h3>

                  <p style={{ opacity: 0.6 }}>
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

                      <div style={{ padding: "3rem", lineHeight: "1.9" }}>

                        <div dangerouslySetInnerHTML={{ __html: role.description.replace(/\n/g, "<br/>") }} />

                        <div style={{ marginTop: "2rem" }}>
                          <motion.button
                            whileHover={{ scale: submittingRole ? 1 : 1.05 }}
                            whileTap={{ scale: submittingRole ? 1 : 0.97 }}
                            disabled={submittingRole !== null}
                            style={{
                              padding: "1rem 2.4rem",
                              borderRadius: "14px",
                              border: "1px solid rgba(120,150,255,0.6)",
                              background: submittingRole
                                ? "rgba(120,150,255,0.05)"
                                : "rgba(120,150,255,0.15)",
                              color: "#fff",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              cursor: submittingRole ? "not-allowed" : "pointer",
                              opacity: submittingRole ? 0.7 : 1
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
              padding: "20px"
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
                padding: "30px",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "450px",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative"
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "24px",
                  cursor: "pointer",
                  opacity: 0.5
                }}
              >
                &times;
              </button>

              <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Apply for {selectedRole}</h2>

              <form onSubmit={submitApplication} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>Full Name *</label>
                  <input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: errors.name ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff" }}
                  />
                  {errors.name && <p style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "4px" }}>{errors.name}</p>}
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>Email Address *</label>
                  <input
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: errors.email ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff" }}
                  />
                  {errors.email && <p style={{ color: "#ff4444", fontSize: "0.75rem", marginTop: "4px" }}>{errors.email}</p>}
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>Message (Optional)</label>
                  <textarea
                    placeholder="Why do you want to join?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", minHeight: "80px", resize: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", opacity: 0.6, display: "block", marginBottom: "5px" }}>Resume Upload *</label>
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
                        zIndex: 2
                      }}
                    />
                    <div style={{
                      padding: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: errors.resume ? "1px dashed #ff4444" : "1px dashed rgba(255,255,255,0.3)",
                      borderRadius: "10px",
                      textAlign: "center",
                      color: resume ? "#7896ff" : "rgba(255,255,255,0.5)"
                    }}>
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
                    transition: "all 0.3s"
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid rgba(0,0,0,0.2)",
                        borderTop: "2px solid #000",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite"
                      }} />
                      Submitting...
                    </>
                  ) : "Submit Application"}
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