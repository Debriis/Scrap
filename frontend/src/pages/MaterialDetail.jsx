import { useParams, Link } from "react-router-dom";
import { materials } from "../data/materials";
import { PageIntro, Photo, Button, ContactCTA } from "../components/ui/Shared";
import MaterialGrid from "../components/materials/MaterialGrid";
import NotFound from "./NotFound";
export default function MaterialDetail() {
  const { slug } = useParams();
  const material = materials.find((m) => m.slug === slug);
  if (!material) return <NotFound />;
  return (
    <>
      <PageIntro eyebrow={`MATERIALS / ${material.tag}`} title={material.name}>
        {material.description}
      </PageIntro>
      <div className="container">
        <Photo
          className="wide-photo"
          name={material.image}
          alt={material.name}
          eager
        />
        <section className="section detail-layout">
          <div>
            <span className="eyebrow">WHAT TO SHARE</span>
            <h2>
              Let’s see what
              <br />
              you have<span className="red">.</span>
            </h2>
            <p>
              Tell us about the condition, approximate quantity and location of
              your material. Acceptance and arrangements are confirmed
              individually.
            </p>
            <Button to={`/contact?material=${material.slug}`}>
              Inquire About This Material
            </Button>
          </div>
          <div>
            <span className="eyebrow">
              COMMON EXAMPLES · SUBJECT TO CONFIRMATION
            </span>
            <ul className="example-list">
              {material.examples.map((e, i) => (
                <li key={e}>
                  <span>0{i + 1}</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="related section">
          <div className="section-heading">
            <h2>More possibilities.</h2>
            <Link to="/materials" className="text-link">
              All materials ↗
            </Link>
          </div>
          <MaterialGrid
            items={materials.filter((m) => m.slug !== slug).slice(0, 2)}
          />
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
