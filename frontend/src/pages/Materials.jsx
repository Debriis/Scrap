import { PageIntro, ContactCTA } from "../components/ui/Shared";
import MaterialGrid from "../components/materials/MaterialGrid";
export default function Materials() {
  return (
    <>
      <PageIntro
        eyebrow="OUR MATERIALS / A SECOND CHAPTER"
        title={
          <>
            There’s more
            <br />
            in every material
          </>
        }
      >
        Explore the scrap and recyclable materials we handle. Material types,
        condition and quantities are confirmed through a conversation.
      </PageIntro>
      <section className="container gallery-section">
        <MaterialGrid />
        <p className="material-note">
          Other recyclable materials may be considered, subject to confirmation.
          Contact us before arranging transport or a visit.
        </p>
      </section>
      <ContactCTA />
    </>
  );
}
