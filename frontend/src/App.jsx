import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Materials from "./pages/Materials";
import MaterialDetail from "./pages/MaterialDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { materials } from "./data/materials";
function Site() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const material = materials.find(
      (m) => location.pathname === `/materials/${m.slug}`,
    );
    const title =
      material?.name ||
      {
        "/": "Scrap Trading in Himachal Pradesh",
        "/about": "About Us",
        "/materials": "Our Materials",
        "/contact": "Contact & Inquiries",
      }[location.pathname] ||
      "Page Not Found";
    document.title = `${title} | Ankit Trading Company`;
    const description =
      material?.description ||
      "Iron scrap, plastic, raddi, cardboard and glass bottle trading in Bilaspur, Himachal Pradesh. Contact Ankit Trading Company to discuss your material.";
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content =
      document.title;
    document.querySelector('meta[property="og:description"]').content =
      description;
  }, [location.pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <motion.main
        id="main"
        tabIndex={-1}
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/:slug" element={<MaterialDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Site />
      </BrowserRouter>
    </MotionConfig>
  );
}
