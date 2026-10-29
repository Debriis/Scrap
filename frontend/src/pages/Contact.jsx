import { PageIntro } from "../components/ui/Shared";
import InquiryForm from "../components/contact/InquiryForm";
import { business } from "../config/business";
import { ArrowUpRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Instagram from "../components/ui/InstagramIcon";
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT / LET’S START SOMETHING"
        title={
          <>
            Your material.
            <br />
            Our next conversation
          </>
        }
      >
        Have scrap to sell or a material to discuss? Tell us what you have.
        We’ll take it from there.
      </PageIntro>
      <section className="container contact-layout">
        <aside className="contact-info">
          <span className="eyebrow">A DIRECT CONNECTION</span>
          <a className="contact-phone" href={business.tel}>
            <Phone size={22} aria-hidden="true" />
            {business.phone}
          </a>
          <a className="text-link" href={business.whatsapp}>
            <MessageCircle size={18} aria-hidden="true" /><span>Start a WhatsApp conversation</span>
          </a>
          <a className="text-link contact-email" href={`mailto:${business.email}`}>
            <Mail size={18} aria-hidden="true" /><span>{business.email}</span>
          </a>
          <a className="text-link contact-social" href={business.instagram} target="_blank" rel="noreferrer">
            <Instagram size={18} aria-hidden="true" /><span>{business.instagramHandle}</span>
          </a>
          <div>
            <span className="eyebrow">COME FIND US</span>
            <p className="contact-icon-row"><MapPin size={18} aria-hidden="true" /><span>{business.address}</span></p>
            <a
              className="text-link"
              href={business.maps}
              target="_blank"
              rel="noreferrer"
            >
              Get directions on Google Maps <ArrowUpRight size={17} />
            </a>
            <iframe
              className="contact-map"
              src={business.mapEmbed}
              title="Map of the Ankit Trading Company address in Bilaspur, Himachal Pradesh"
              width="600"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div>
            <span className="eyebrow">BUSINESS DETAILS</span>
            <p>GSTIN: {business.gstin}</p>
          </div>
          <p className="small muted">
            Please contact us to confirm material acceptance and arrangements
            before visiting.
          </p>
        </aside>
        <InquiryForm />
      </section>
    </>
  );
}
