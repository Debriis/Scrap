import { PageIntro } from "../components/ui/Shared";
import InquiryForm from "../components/contact/InquiryForm";
import { business } from "../config/business";
import { ArrowUpRight } from "lucide-react";
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
            {business.phone}
            <ArrowUpRight />
          </a>
          <a className="text-link" href={business.whatsapp}>
            Start a WhatsApp conversation <ArrowUpRight size={18} />
          </a>
          <a className="text-link contact-email" href={`mailto:${business.email}`}>
            {business.email} <ArrowUpRight size={18} />
          </a>
          <div>
            <span className="eyebrow">COME FIND US</span>
            <p>{business.address}</p>
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
