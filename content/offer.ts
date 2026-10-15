// Prix de lancement validés le 2026-10-15. Le montant de l'abonnement mensuel (formule Essentiel) reste à fixer.

export const site = {
  name: "Tersel Web",
  url: "https://tersel.fr",
  email: "contact@tersel.fr",
  area: "Sarthe",
};

export type Offer = {
  name: string;
  pitch: string;
  /** Regular price and launch price in euros; null = on quote. */
  price: { regular: number; launch: number } | null;
  /** Small line under the price. */
  priceNote: string;
  features: string[];
  featured: boolean;
};

export const pricing: Offer[] = [
  {
    name: "Essentiel",
    pitch: "Votre site clé en main : on s'occupe de tout, vous n'avez rien à gérer.",
    price: { regular: 500, launch: 350 },
    priceNote: "puis un petit abonnement mensuel",
    features: [
      "Site sur-mesure, adapté au téléphone",
      "Formulaire de contact et appel en un clic",
      "Référencement local de base",
      "Vos modifications faites par nous, sur simple message",
      "Hébergement et suivi compris dans l'abonnement",
    ],
    featured: false,
  },
  {
    name: "Autonome",
    pitch: "Votre site, que vous modifiez vous-même quand vous voulez.",
    price: { regular: 700, launch: 500 },
    priceNote: "hébergement 1 an et nom de domaine inclus",
    features: [
      "Espace simple pour modifier textes, photos et horaires",
      "Prise en main expliquée ensemble",
      "Hébergement inclus pendant 1 an",
      "Nom de domaine inclus (s'il est disponible)",
      "Site sur-mesure, adapté au téléphone",
    ],
    featured: true,
  },
  {
    name: "Sur-mesure",
    pitch: "Pour les projets plus ambitieux : fonctions et design taillés pour vous.",
    price: null,
    priceNote: "devis gratuit selon votre projet",
    features: [
      "Prise de rendez-vous, catalogue, multilingue…",
      "Design et animations avancés",
      "Accompagnement pour vos textes et photos",
      "Suivi prioritaire",
    ],
    featured: false,
  },
];

export const services = [
  {
    title: "Design sur-mesure",
    text: "Pas de modèle tout fait : une identité dessinée pour votre métier, vos couleurs, vos clients.",
    items: ["Direction artistique", "Maquette validée avec vous", "Pensé mobile d'abord"],
  },
  {
    title: "Développement",
    text: "Un site construit sur-mesure avec des outils modernes : léger, rapide, et qui s'affiche instantanément sur un téléphone en 4G.",
    items: ["Code sur-mesure", "Animations soignées", "Performance et accessibilité"],
  },
  {
    title: "Référencement local",
    text: "Être trouvé quand quelqu'un cherche votre métier près de chez lui, en Sarthe, en Mayenne et dans tous les départements voisins.",
    items: ["SEO local", "Fiche Google Business", "Textes optimisés"],
  },
  {
    title: "Mise en ligne & suivi",
    text: "On s'occupe du nom de domaine, de l'hébergement et des mises à jour. Vous gardez la main, sans la technique.",
    items: ["Hébergement rapide", "Nom de domaine", "Modifications à la demande"],
  },
];

export const faq = [
  { q: "Combien de temps pour avoir mon site ?", a: "Comptez deux à trois semaines entre notre premier échange et la mise en ligne de votre site. Le plus long, c'est souvent de réunir vos photos et vos textes : on vous aide pour ça." },
  { q: "Je n'y connais rien en informatique, c'est un problème ?", a: "Pas du tout, c'est même pour ça qu'on existe. On s'occupe de tout : domaine, hébergement, textes, référencement. Vous validez, on exécute." },
  { q: "Est-ce que je pourrai modifier mon site ensuite ?", a: "Oui. Avec la formule Autonome, vous modifiez vous-même vos textes, photos et horaires depuis un espace simple. Avec la formule Essentiel, vous nous envoyez un message et on s'en occupe, c'est compris dans l'abonnement." },
  { q: "Pourquoi pas Wix ou un modèle gratuit ?", a: "Un modèle ressemble à des milliers d'autres sites, il est souvent lent sur mobile et mal référencé. Un site sur-mesure vous démarque, se charge vite et parle à vos clients." },
  { q: "Vous travaillez uniquement en Sarthe ?", a: "Non. On est basés en Sarthe, on a déjà réalisé des sites en Mayenne, et on se déplace volontiers dans les départements voisins (Orne, Eure-et-Loir, Loir-et-Cher, Indre-et-Loire, Maine-et-Loire…). Et à distance, on travaille partout en France." },
  { q: "Comment se passe le paiement ?", a: "Un acompte au lancement, le solde à la mise en ligne. Le devis est gratuit et détaillé, sans surprise." },
];
