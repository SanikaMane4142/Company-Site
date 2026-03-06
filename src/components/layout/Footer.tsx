// import React from "react";
// import { Link } from "react-router-dom";

// const Footer: React.FC = () => {
//   return (
//     <footer
//       style={{
//         padding: "var(--space-lg) 0",
//         borderTop: "1px solid var(--glass-border)",

//         /* Grey glass blur background */
//         background: "rgba(120,120,120,0.08)",
//         backdropFilter: "blur(14px)",
//         WebkitBackdropFilter: "blur(14px)"
//       }}
//     >
//       <div className="container">
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             gap: "var(--space-md)"
//           }}
//         >
//           {/* LOGO */}
//           <div>
//             <div
//               style={{
//                 fontSize: "1.25rem",
//                 fontWeight: 700,
//                 marginBottom: "1rem"
//               }}
//             >
//               <Link to="/" style={{ textDecoration: "none", color: "white" }}>
//                 COC<span className="gradient-text">PIT</span>
//               </Link>
//             </div>

//             <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
//               Navigating the future of digital experiences with velocity and precision.
//             </p>
//           </div>

//           {/* COMPANY */}
//           <div>
//             <h4 style={{ marginBottom: "1rem" }}>Company</h4>

//             <ul
//               style={{
//                 color: "var(--text-secondary)",
//                 fontSize: "0.9rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "0.5rem"
//               }}
//             >
//               <li>
//                 <Link to="/about">About</Link>
//               </li>

//               <li>
//                 <Link to="/careers">Careers</Link>
//               </li>

//               <li>
//                 <Link to="/contact">Contact</Link>
//               </li>

//               <li>
//                 <Link to="/team">Team</Link>
//               </li>
//             </ul>
//           </div>

//           {/* LEGAL */}
//           <div>
//             <h4 style={{ marginBottom: "1rem" }}>Legal</h4>

//             <ul
//               style={{
//                 color: "var(--text-secondary)",
//                 fontSize: "0.9rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "0.5rem"
//               }}
//             >
//               <li>
//                 <Link to="/privacy">Privacy Policy</Link>
//               </li>

//               <li>
//                 <Link to="/terms">Terms of Service</Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* COPYRIGHT */}
//         <div
//           style={{
//             marginTop: "var(--space-lg)",
//             paddingTop: "var(--space-md)",
//             borderTop: "1px solid var(--glass-border)",
//             textAlign: "center",
//             color: "var(--text-tertiary)",
//             fontSize: "0.8rem"
//           }}
//         >
//           &copy; {new Date().getFullYear()} Cocpit. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: "var(--space-lg) 0",
        borderTop: "1px solid var(--glass-border)",

        /* Grey glass blur background */
        background: "rgba(120,120,120,0.08)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-md)"
          }}
        >
          {/* LOGO */}
          <div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "1rem"
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                COC<span className="gradient-text">PIT</span>
              </Link>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Navigating the future of digital experiences with velocity and precision.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h4 style={{ marginBottom: "1rem" }}>Company</h4>

            <ul
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/careers">Careers</Link>
              </li>

              {/* Contact will open About page */}
              <li>
                <Link to="/about">Contact</Link>
              </li>

              <li>
                <Link to="/team">Team</Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 style={{ marginBottom: "1rem" }}>Legal</h4>

            <ul
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              {/* No redirect */}
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </li>

              {/* No redirect */}
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          style={{
            marginTop: "var(--space-lg)",
            paddingTop: "var(--space-md)",
            borderTop: "1px solid var(--glass-border)",
            textAlign: "center",
            color: "var(--text-tertiary)",
            fontSize: "0.8rem"
          }}
        >
          &copy; {new Date().getFullYear()} Cocpit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;