export const materials = [
  {
    slug: "iron-scrap",
    name: "Iron Scrap",
    tag: "FERROUS METALS",
    image: "iron",
    description:
      "A new purpose for old metal. Discuss your iron and steel scrap with us, from everyday offcuts to larger quantities.",
    examples: [
      "Iron and steel offcuts",
      "Old iron components",
      "Sheet metal and structural scrap",
    ],
  },
  {
    slug: "plastic-scrap",
    name: "Plastic Scrap",
    tag: "PLASTICS",
    image: "plastic",
    description:
      "Keep useful plastic in circulation. Share the type, condition and quantity of your plastic scrap so we can discuss suitability.",
    examples: [
      "Plastic bottles",
      "Rigid plastic containers",
      "Sorted plastic offcuts, subject to confirmation",
    ],
  },
  {
    slug: "waste-paper",
    name: "Raddi / Waste Paper",
    tag: "PAPER",
    image: "paper",
    description:
      "Yesterday’s pages, tomorrow’s possibilities. We handle waste paper and raddi, with material condition and quantity discussed individually.",
    examples: ["Old newspapers", "Office paper", "Books and paper bundles"],
  },
  {
    slug: "cardboard",
    name: "Gatta / Cardboard",
    tag: "PACKAGING",
    image: "cardboard",
    description:
      "Give packaging another chapter. Tell us about your used cardboard and gatta, including whether it is dry, sorted and flattened.",
    examples: [
      "Corrugated boxes",
      "Flattened cartons",
      "Cardboard packaging sheets",
    ],
  },
  {
    slug: "glass-bottles",
    name: "Empty Glass Bottles",
    tag: "GLASS",
    image: "glass",
    description:
      "Empty bottles still hold potential. Contact us to confirm accepted bottle types, condition and quantities before making arrangements.",
    examples: [
      "Empty beverage bottles",
      "Sorted glass bottles",
      "Other bottle types, subject to confirmation",
    ],
  },
];
export const imageUrl = (name, width = 900) =>
  `/images/${name}-${width > 1000 ? "large" : "small"}.jpg`;
