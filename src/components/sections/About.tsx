// import React from "react";
// import DualBlobOrbit from "../ui/DualBlobOrbit";

// const About: React.FC = () => {
//   return (
//     <section id="about" style={{ padding: "var(--space-lg) 0" }}>
//       <div className="container">
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "var(--space-lg)",
//             alignItems: "center",
//           }}
//         >
//           {/* LEFT TEXT */}
//           <div>
//             <h2
//               style={{
//                 fontSize: "2.5rem",
//                 marginBottom: "var(--space-sm)",
//               }}
//             >
//               Mission Control for your{" "}
//               <span className="gradient-text">
//                 Business
//               </span>
//             </h2>

//             <p
//               style={{
//                 color: "var(--text-secondary)",
//                 marginBottom: "1rem",
//               }}
//             >
//               At Cocpit, we believe that complexity
//               shouldn't be a barrier to growth.
//             </p>

//             <p style={{ color: "var(--text-secondary)" }}>
//               Whether you're a startup or an enterprise,
//               Cocpit provides the visibility you need.
//             </p>
//           </div>

//           {/* RIGHT SIDE - DUAL ORBIT BLOBS */}
//           <div
//             style={{
//               height: "420px",
//               position: "relative",
//             }}
//           >
//             <DualBlobOrbit />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
import React from "react";

const cardStyle: React.CSSProperties = {
  backdropFilter: "blur(14px)",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "18px",
  padding: "30px",
  transition: "all 0.35s ease",
  cursor: "pointer",
};

const About: React.FC = () => {
  return (
    <section id="about" style={{ padding: "var(--space-lg) 0", paddingTop: "120px" }}>
      <div className="container">

        {/* HERO SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "var(--space-lg)",
            alignItems: "center",
            marginBottom: "120px"
          }}
        >
          {/* LEFT TEXT */}
          <div>
            <h2 style={{ fontSize: "2.8rem", marginBottom: "20px" }}>
              Mission Control for your{" "}
              <span className="gradient-text">Business</span>
            </h2>

            <p style={{ color: "var(--text-secondary)", marginBottom: "14px" }}>
              Students, professionals, businesses, and innovators connect,
              collaborate, and grow in the digital age.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              Cocpit brings together schools, colleges, students, employees,
              employers, businesses, investors, and startups in one intelligent ecosystem.
            </p>
          </div>

          {/* RIGHT LOGO */}
          <div
            style={{
              height: "420px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src="/cocpit.png"
              alt="Cocpit"
              style={{
                width: "420px",
                animation: "float 4s ease-in-out infinite",
                filter: "drop-shadow(0 0 30px rgba(255,255,255,0.12))"
              }}
            />
          </div>
        </div>

        {/* WHAT WE DO */}
        <div style={{ marginBottom: "100px" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "20px" }}>
            What We Do
          </h2>

          <p style={{ color: "var(--text-secondary)", maxWidth: "800px" }}>
            Cocpit brings together schools, colleges, students, employees,
            employers, businesses, investors, and startups in one intelligent ecosystem.
            Whether you're a student exploring career opportunities,
            a professional expanding your network, or a business searching for
            top talent — Cocpit is built for you.
          </p>
        </div>

        {/* AI DIFFERENCE */}
        <div style={{ marginBottom: "100px" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "20px" }}>
            The AI Difference
          </h2>

          <p style={{ color: "var(--text-secondary)", maxWidth: "800px" }}>
            Everything you do on Cocpit is powered by artificial intelligence.
            From crafting the perfect profile to matching opportunities
            and enabling meaningful conversations — our AI works quietly
            behind the scenes to guide your professional growth.
          </p>
        </div>

        {/* VISION */}
        <div style={{ marginBottom: "100px" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "20px" }}>
            Our Vision
          </h2>

          <p style={{ color: "var(--text-secondary)", maxWidth: "800px" }}>
            Professional networking should be intelligent, intuitive,
            and accessible to everyone. Cocpit adapts to your journey,
            learns from your goals, and helps you achieve them faster.
          </p>
        </div>

        {/* CONTACT GLASS CARDS */}
        <div style={{ marginBottom: "120px" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "40px" }}>
            Get In Touch With Us
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "30px"
            }}
          >
            {/* EMAIL */}
            <div
              style={cardStyle}
              onMouseEnter={(e:any)=>{
                e.currentTarget.style.transform="translateY(-10px)";
                e.currentTarget.style.boxShadow="0 20px 60px rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e:any)=>{
                e.currentTarget.style.transform="translateY(0)";
                e.currentTarget.style.boxShadow="none";
              }}
            >
              <h3>Email</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                yashoswal@cocpitin.org
              </p>
            </div>

            {/* LOCATION */}
            <div
              style={cardStyle}
              onMouseEnter={(e:any)=>{
                e.currentTarget.style.transform="translateY(-10px)";
                e.currentTarget.style.boxShadow="0 20px 60px rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e:any)=>{
                e.currentTarget.style.transform="translateY(0)";
                e.currentTarget.style.boxShadow="none";
              }}
            >
              <h3>Location</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Office 504, Emerald Corner,<br/>
                2nd Lane, Rajarampuri,<br/>
                Kolhapur
              </p>
            </div>

            {/* WORKING HOURS */}
            <div
              style={cardStyle}
              onMouseEnter={(e:any)=>{
                e.currentTarget.style.transform="translateY(-10px)";
                e.currentTarget.style.boxShadow="0 20px 60px rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e:any)=>{
                e.currentTarget.style.transform="translateY(0)";
                e.currentTarget.style.boxShadow="none";
              }}
            >
              <h3>Working Hours</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                Tuesday – Sunday<br/>
                09:30 AM – 05:30 PM IST
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;