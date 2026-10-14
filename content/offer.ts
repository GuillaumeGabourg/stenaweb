// PROVISOIRE : les prix ne sont pas encore fixés (affichés en étoiles « Sur devis » sur le site).

export const site = {
  name: "Stenaweb",
  url: "https://stenaweb.fr",
  email: "contact@stenaweb.fr",
  area: "Mayenne · Sarthe",
};

export const pricing = [
  {
    name: "Essentiel",
    price: "690",
    prefix: "",
    pitch: "Une page qui présente votre activité et fait sonner le téléphone.",
    features: [
      "Site une page, jusqu'à 6 sections",
      "Design sur-mesure, adapté au mobile",
      "Formulaire de contact et appel en un clic",
      "Référencement de base",
      "En ligne en 10 jours environ",
    ],
    featured: false,
  },
  {
    name: "Vitrine Pro",
    price: "1 290",
    prefix: "",
    pitch: "Le site complet pour être trouvé sur Google et convaincre.",
    features: [
      "Jusqu'à 5 pages",
      "Animations sur-mesure",
      "SEO local et fiche Google Business",
      "Galerie de réalisations ou avant / après",
      "3 mois de retouches inclus",
    ],
    featured: true,
  },
  {
    name: "Sur-mesure",
    price: "2 490",
    prefix: "dès",
    pitch: "Pour les projets ambitieux : plus de pages, plus d'effets, plus de fonctions.",
    features: [
      "Pages illimitées",
      "Effets avancés (3D, WebGL)",
      "Rendez-vous en ligne, catalogue, multilingue",
      "Accompagnement textes et photos",
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
    text: "Un site codé à la main, léger et rapide, qui s'affiche instantanément sur un téléphone en 4G.",
    items: ["Code sur-mesure", "Animations soignées", "Performance et accessibilité"],
  },
  {
    title: "Référencement local",
    text: "Être trouvé quand quelqu'un cherche votre métier près de chez lui, en Mayenne, en Sarthe et autour.",
    items: ["SEO local", "Fiche Google Business", "Textes optimisés"],
  },
  {
    title: "Mise en ligne & suivi",
    text: "On s'occupe du nom de domaine, de l'hébergement et des mises à jour. Vous gardez la main, sans la technique.",
    items: ["Hébergement rapide", "Nom de domaine", "Modifications à la demande"],
  },
];

export const faq = [
  { q: "Combien de temps pour avoir mon site ?", a: "Comptez deux à trois semaines entre notre premier échange et la mise en ligne d'un site vitrine. Le plus long, c'est souvent de réunir vos photos et vos textes : on vous aide pour ça." },
  { q: "Je n'y connais rien en informatique, c'est un problème ?", a: "Pas du tout, c'est même pour ça qu'on existe. On s'occupe de tout : domaine, hébergement, textes, référencement. Vous validez, on exécute." },
  { q: "Est-ce que je pourrai modifier mon site ensuite ?", a: "Oui. Les petites modifications sont incluses dans le suivi mensuel, ou faites à la demande. Vous envoyez un message, c'est en ligne." },
  { q: "Pourquoi pas Wix ou un modèle gratuit ?", a: "Un modèle ressemble à des milliers d'autres sites, il est souvent lent sur mobile et mal référencé. Un site sur-mesure vous démarque, se charge vite et parle à vos clients." },
  { q: "Vous travaillez uniquement en Mayenne et en Sarthe ?", a: "C'est notre terrain, et on aime se rencontrer en vrai. Mais on travaille aussi à distance, partout en France." },
  { q: "Comment se passe le paiement ?", a: "Un acompte au lancement, le solde à la mise en ligne. Le devis est gratuit et détaillé, sans surprise." },
];
