import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Instagram from "../ui/InstagramIcon";
import { business } from "../../config/business";
import BrandLogo from "../ui/BrandLogo";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand" aria-label="ATC home">
              <BrandLogo />
            </Link>
            <p>
              Giving materials a way forward.
              <br />
              Rooted in Himachal Pradesh.
            </p>
          </div>
          <div>
            <span className="eyebrow">EXPLORE</span>
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/materials">Our materials</Link>
            <Link to="/contact">Get in touch</Link>
          </div>
          <div>
            <span className="eyebrow">FIND US</span>
            <p className="contact-icon-row"><MapPin size={18} aria-hidden="true" /><span>{business.address}</span></p>
            <a href={business.maps} target="_blank" rel="noreferrer">
              Get directions <ArrowUpRight size={15} />
            </a>
          </div>
          <div>
            <span className="eyebrow">LET’S CONNECT</span>
            <a href={business.tel}><Phone size={18} aria-hidden="true" />{business.phone}</a>
            <a className="contact-email" href={`mailto:${business.email}`}>
              <Mail size={18} aria-hidden="true" /><span>{business.email}</span>
            </a>
            <a href={business.whatsapp}>
              <MessageCircle size={18} aria-hidden="true" />WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a className="contact-social" href={business.instagram} target="_blank" rel="noreferrer">
              <Instagram size={18} aria-hidden="true" /><span>{business.instagramHandle}</span>
            </a>
            <p className="gst">
              GSTIN
              <br />
              {business.gstin}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ankit Trading Company</span>
          <span>SCRAP TODAY. RESOURCE TOMORROW.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
