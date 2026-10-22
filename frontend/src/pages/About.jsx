import {
  PageIntro,
  Photo,
  Reveal,
  ContactCTA,
  Button,
} from "../components/ui/Shared";
import { business } from "../config/business";
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT / ANKIT TRADING COMPANY"
        title={
          <>
            A practical purpose.
            <br />A fresh perspective
          </>
        }
      >
        We see potential in what gets left behind. Connecting materials with
        their next use, right here in Himachal Pradesh.
      </PageIntro>
      <div className="container">
        <Photo
          className="wide-photo"
          name="hero"
          alt="Recyclable metal in an industrial materials environment"
          eager
        />
        <section className="section about-layout">
          <span className="eyebrow">
            ROOTED HERE.
            <br />
            LOOKING FORWARD.
          </span>
          <Reveal>
            <h2>
              Good materials deserve
              <br />
              another chapter<span className="red">.</span>
            </h2>
            <p>
              Ankit Trading Company is a scrap trading and recyclable materials
              business based in Village Malari, District Bilaspur. We handle
              iron scrap, plastic scrap, raddi, cardboard and empty glass
              bottles.
            </p>
            <p>
              Every inquiry starts with the material itself: what it is, how
              much there is, its condition and where it is located. These
              details help us discuss requirements and agree on the next steps
              together.
            </p>
            <Button to="/materials">Explore Our Materials</Button>
          </Reveal>
        </section>
        <section className="location-block">
          <span className="eyebrow">OUR PLACE IN THE PICTURE</span>
          <h2>
            From Himachal.
            <br />
            For the next possibility.
          </h2>
          <p>{business.address}</p>
          <Button href={business.maps}>Get Directions</Button>
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
