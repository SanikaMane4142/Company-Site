import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import FAQPage from "./pages/FAQPage";
import Careers from "./pages/Careers";
import Team from "./pages/Team";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import GlobalParticles from "./components/layout/GlobalParticles";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import "./styles/global.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <GlobalParticles />}

      {/* Navbar visible on non-admin pages */}
      {!isAdminRoute && <Navbar />}

      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/faq" element={<FAQPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/team" element={<Team />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/applications/:roleName" element={<AdminApplications />} />
            </Route>
          </Route>
        </Routes>
      </div>

      {/* Footer visible on non-admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;