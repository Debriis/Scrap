import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Photo, Reveal, ContactCTA } from "../components/ui/Shared";
import MaterialGrid from "../components/materials/MaterialGrid";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Photo
          name="hero"
          alt="Industrial scrap metal ready for its next use"
          eager
          className="hero-photo"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <Reveal>
            <span className="eyebrow hero-eyebrow">
              <i /> MATERIALS MOVE. POSSIBILITIES FOLLOW.
            </span>
            <h1>
              Turning scrap
              <br />
              into opportunity<span className="red">.</span>
            </h1>
            <div className="hero-bottom">
              <p>
                Your trusted connection for iron scrap, plastics, paper,
                cardboard, glass bottles, and recyclable materials in Himachal
                Pradesh.
              </p>
              <div className="actions">
                <Button to="/materials" light>
                  Explore Materials
                </Button>
                <Link className="text-link" to="/contact">
                  Get in Touch <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="hero-caption">
            <span>BILASPUR, HIMACHAL PRADESH · INDIA</span>
            <a href="#introduction" aria-label="Scroll to introduction">
              SCROLL TO EXPLORE <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>
      <div className="material-strip">
        <div className="container">
          <span>IRON</span>
          <b>✳</b>
          <span>PLASTIC</span>
          <b>✳</b>
          <span>PAPER</span>
          <b>✳</b>
          <span>CARDBOARD</span>
          <b>✳</b>
          <span>GLASS</span>
        </div>
      </div>
      <section id="introduction" className="container intro-section section">
        <div className="section-label">
          <span className="eyebrow">01 / WHO WE ARE</span>
          <span className="tiny-label">VALUE BEYOND THE SURFACE</span>
        </div>
        <Reveal className="intro-layout">
          <h2>
            Materials have value.
            <br />
            We help keep
            <br />
            them <span className="muted">moving.</span>
          </h2>
          <div className="intro-side">
            <span className="asterisk">✳</span>
            <p>
              What’s no longer useful to one business can be the beginning of
              something else.
            </p>
            <p className="muted">
              At Ankit Trading Company, we connect scrap and recyclable
              materials with their next opportunity. Based in Bilaspur, Himachal
              Pradesh, we keep the conversation straightforward and the
              possibilities open.
            </p>
            <Button to="/about">More About Us</Button>
          </div>
        </Reveal>
      </section>
      <section className="materials-section section container">
        <div className="section-label">
          <span className="eyebrow">02 / WHAT WE HANDLE</span>
          <span className="tiny-label">FIVE MATERIALS. ENDLESS POTENTIAL.</span>
        </div>
        <div className="section-heading">
          <Reveal>
            <h2>
              Old materials.
              <br />
              New beginnings<span className="red">.</span>
            </h2>
          </Reveal>
          <p>
            From metal to paper, every material
            <br />
            has another chapter to write.
          </p>
        </div>
        <MaterialGrid />
        <div className="other-material">
          <p>
            Have something else in mind?
            <br />
            <span className="muted">
              Other recyclable materials are subject to confirmation.
            </span>
          </p>
          <Button to="/contact">Let’s Discuss It</Button>
        </div>
      </section>
      <section className="process section">
        <div className="container">
          <div className="section-label">
            <span className="eyebrow">03 / THE WAY FORWARD</span>
            <span className="tiny-label">
              A CONVERSATION. A CLEAR NEXT STEP.
            </span>
          </div>
          <div className="section-heading">
            <h2>
              Simple steps.
              <br />
              Real possibilities<span className="red">.</span>
            </h2>
            <p>
              No complicated process.
              <br />
              Just start with what you have.
            </p>
          </div>
          <div className="steps">
            {[
              [
                "Tell us about your material",
                "Call, message or send an inquiry. Let us know the type and condition of your scrap.",
              ],
              [
                "Discuss quantity and requirements",
                "Share an approximate quantity and location. We’ll discuss suitability and requirements.",
              ],
              [
                "Arrange the next steps",
                "Confirm the details together before making any arrangements.",
              ],
            ].map(([title, copy], i) => (
              <Reveal key={title}>
                <span className="step-number">
                  0{i + 1}
                  <ArrowUpRight />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
