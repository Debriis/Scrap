import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { business } from "../../config/business";
import BrandLogo from "../ui/BrandLogo";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand" aria-label="Ankit Kabad Shop home">
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
            <p>{business.address}</p>
            <a href={business.maps} target="_blank" rel="noreferrer">
              Get directions <ArrowUpRight size={15} />
            </a>
          </div>
          <div>
            <span className="eyebrow">LET’S CONNECT</span>
            <a href={business.tel}>{business.phone}</a>
            <a className="contact-email" href={`mailto:${business.email}`}>
              {business.email}
            </a>
            <a href={business.whatsapp}>
              WhatsApp <ArrowUpRight size={15} />
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
