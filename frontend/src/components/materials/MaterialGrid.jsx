import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { materials } from "../../data/materials";
import { Photo, Reveal } from "../ui/Shared";
export default function MaterialGrid({ items = materials }) {
  return (
    <div className="material-grid">
      {items.map((m, i) => (
        <Reveal key={m.slug} className={`material-card material-${i}`}>
          <Link to={`/materials/${m.slug}`} className="material-image">
            <Photo
              name={m.image}
              alt={`${m.name} — representative recyclable material`}
            />
            <span className="image-explore">
              Explore material <ArrowUpRight size={20} />
            </span>
          </Link>
          <div className="material-meta">
            <span className="eyebrow">
              0{i + 1} / {m.tag}
            </span>
            <Link to={`/materials/${m.slug}`} aria-label={`Explore ${m.name}`}>
              <ArrowUpRight />
            </Link>
          </div>
          <h3>
            <Link to={`/materials/${m.slug}`}>{m.name}</Link>
          </h3>
          <p>{m.description.split(". ")[0]}.</p>
        </Reveal>
      ))}
    </div>
  );
}
