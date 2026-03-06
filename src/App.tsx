import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FAQPage from "./pages/FAQPage";
import Careers from "./pages/Careers";
import Team from "./pages/Team";
import About from "./pages/About";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import GlobalParticles from "./components/layout/GlobalParticles";
import "./styles/global.css";

function App() {
  return (
    <>
      <GlobalParticles />

      {/* Navbar visible on all pages */}
      <Navbar />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/faq" element={<FAQPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>

      {/* Footer visible on all pages */}
      <Footer />
    </>
  );
}

export default App;