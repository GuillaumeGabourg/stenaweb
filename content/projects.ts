export type Project = {
  slug: string;
  name: string;
  sector: string;
  place: string;
  url: string;
  /** The client's own colour: case studies switch their accent to it. */
  accent: string;
  accentInk: string;
  summary: string;
  services: string[];
  challenge: string;
  solution: string[];
  result: string;
  proof?: { value: string; label: string };
  /** Height in px of public/projects/<slug>/full.png (1440 wide), so the full capture can be resized and reserved. */
  fullHeight: number;
};

export const projects: Project[] = [
  {
    slug: "hk-conseil",
    fullHeight: 7067,
    name: "HK Conseil",
    sector: "Maîtrise d'œuvre & rénovation",
    place: "Villaines-la-Juhel · Mayenne",
    url: "https://guillaumegabourg.github.io/m/hk-conseil-d8a9d364/",
    accent: "#5f9a55",
    accentInk: "#0a0a0a",
    summary: "Un maître d'œuvre qui transforme des longères : le site montre les chantiers avant et après.",
    services: ["Design sur-mesure", "Développement", "Comparateur avant / après", "SEO local"],
    challenge:
      "Quinze ans de chantiers, mais aucune vitrine pour les montrer. Les particuliers qui rénovent une longère ou font construire veulent voir du concret avant de confier leur projet.",
    solution: [
      "Un comparateur avant / après directement dans l'en-tête : on glisse et la longère se transforme.",
      "Les zones d'intervention (53, 61, 72) affichées dès le premier écran pour rassurer les clients locaux.",
      "Appel et prise de contact en un geste, sur mobile comme sur ordinateur.",
    ],
    result:
      "Un site qui parle avec des photos de chantier plutôt qu'avec des promesses, et qui met en avant la note Google de l'entreprise.",
    proof: { value: "5,0", label: "note Google affichée sur le site" },
  },
  {
    slug: "opti-maintenance",
    fullHeight: 4431,
    name: "Opti Maintenance",
    sector: "Maintenance industrielle",
    place: "Mayenne (53)",
    url: "https://guillaumegabourg.github.io/opti-maintenance-site/index.html",
    accent: "#8fd14f",
    accentInk: "#0a0a0a",
    summary: "Un technicien indépendant face aux industriels : un site sombre, net, qui fait sérieux.",
    services: ["Identité web", "Design sur-mesure", "Développement", "Demande d'intervention"],
    challenge:
      "Mécanique, électricité, variateurs, automatismes : un seul technicien couvre tout, mais il doit convaincre des sites industriels, des stations d'eau et des unités de méthanisation.",
    solution: [
      "Une direction graphique industrielle : fond sombre, typographie condensée, photos de terrain.",
      "Le numéro d'urgence présent partout, pensé pour l'arrêt de ligne.",
      "Les domaines et secteurs rangés comme une fiche technique, avec une demande d'intervention en ligne.",
    ],
    result:
      "Une présence en ligne au niveau des industriels qu'il dépanne, avec un appel en un clic quand une ligne s'arrête.",
  },
  {
    slug: "pc-assist",
    fullHeight: 6785,
    name: "PC Assist",
    sector: "Dépannage informatique à domicile",
    place: "Le Mans · Sarthe",
    url: "https://pc-assist72.netlify.app/",
    accent: "#3a86ea",
    accentInk: "#0a0a0a",
    summary: "Un dépanneur informatique qui rassure en affichant son tarif unique et ses avis.",
    services: ["Design sur-mesure", "Développement", "Galerie d'interventions", "Mise en avant des avis"],
    challenge:
      "Les particuliers hésitent à faire venir un dépanneur : combien ça va coûter, et est-ce qu'on peut lui faire confiance ?",
    solution: [
      "Le tarif unique (49 €/h, déplacement inclus) affiché dès le premier écran.",
      "Des photos avant / après de vraies réparations et une galerie filtrable d'interventions.",
      "Les avis vérifiés AlloVoisins mis en avant, et l'appel ou WhatsApp en un geste.",
    ],
    result: "Le prix et la confiance sont réglés avant même le premier appel.",
    proof: { value: "86", label: "avis vérifiés AlloVoisins mis en avant" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
