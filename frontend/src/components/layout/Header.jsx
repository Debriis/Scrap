import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/materials", "Materials"],
  ["/contact", "Contact"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  const panel = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [toggle.current, ...panel.current.querySelectorAll("a")];
        const first = nodes[0],
          last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", handle);
    };
  }, [open]);
  return (
    <header
      className={`header ${location.pathname === "/" && !scrolled && !open ? "on-hero" : ""}`}
    >
      <div className="nav-inner">
        <Link
          to="/"
          className="wordmark"
          aria-label="Ankit Trading Company home"
        >
          <span className="brand-symbol">
            a<span>↗</span>
          </span>
          <span>
            ANKIT<span className="brand-sub">TRADING COMPANY</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([url, label]) => (
            <NavLink key={url} to={url} end={url === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="nav-quote">
          Get a Quote <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={panel}
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map(([url, label], i) => (
              <NavLink
                key={url}
                to={url}
                onClick={() => setOpen(false)}
                end={url === "/"}
              >
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight />
              </NavLink>
            ))}
            <p>Materials move. Possibilities follow.</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
