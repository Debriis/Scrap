import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../../config/business";
import { imageUrl } from "../../data/materials";
export function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
}
export function Button({ to, href, children, light = false }) {
  const props = { className: `button ${light ? "button-light" : ""}` };
  return to ? (
    <Link {...props} to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  ) : (
    <a {...props} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function Photo({ name, alt, className = "", eager = false }) {
  return (
    <img
      className={className}
      src={imageUrl(name)}
      srcSet={`${imageUrl(name)} 900w, ${imageUrl(name, 1800)} 1800w`}
      sizes={
        name === "hero" || className === "wide-photo"
          ? "100vw"
          : "(max-width: 650px) 100vw, (max-width: 1000px) 75vw, 65vw"
      }
      width="1800"
      height="1200"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container">
        <Reveal>
          <span className="eyebrow">GOOD MATERIAL. NEW POSSIBILITIES.</span>
          <h2>
            Have scrap to sell?
            <br />
            Let’s talk<span className="red">.</span>
          </h2>
          <div className="cta-bottom">
            <p>
              A simple conversation is where
              <br />
              the next chapter begins.
            </p>
            <div className="actions">
              <a className="button button-light" href={business.tel}>
                <Phone size={18} />
                Call Now
                <ArrowUpRight size={18} />
              </a>
              <a className="button outline" href={business.whatsapp}>
                <MessageCircle size={18} />
                WhatsApp
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function PageIntro({ eyebrow, title, children }) {
  return (
    <section className="page-intro container">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h1>
          {title}
          <span className="red">.</span>
        </h1>
        {children && <p className="intro-copy">{children}</p>}
      </Reveal>
    </section>
  );
}
