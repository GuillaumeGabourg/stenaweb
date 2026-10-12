// PROVISOIRE : prix, délais et témoignages fictifs pour la maquette.
// À remplacer par les vrais chiffres et par des témoignages validés par les clients avant la mise en ligne.

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

export const care = "Hébergement, nom de domaine et petites modifications : 29 € / mois, sans engagement.";

// FICTIF : note et avis de démonstration, façon fiche Google. À remplacer par les vrais avis
// de la fiche Google Business de Stenaweb avant la mise en ligne.
export const rating = { score: "5,0", count: 10, source: "Google" };

export const testimonials = [
  {
    quote: "Je n'avais pas de site, aujourd'hui j'envoie le lien à tous mes clients. Les photos avant / après font tout le travail.",
    who: "Jordan P.",
    role: "Maître d'œuvre",
    when: "il y a 2 semaines",
  },
  {
    quote: "Un site qui fait aussi sérieux que les industriels avec qui je travaille. Rapide, clair, et mon numéro est partout.",
    who: "Malo M.",
    role: "Technicien de maintenance",
    when: "il y a 1 mois",
  },
  {
    quote: "Afficher mon tarif dès le départ, c'était leur idée. Les gens appellent en sachant déjà combien ça coûte.",
    who: "Julien K.",
    role: "Dépannage informatique",
    when: "il y a 1 mois",
  },
  {
    quote: "Super accompagnement du début à la fin. On s'est vus deux fois, le site était en ligne trois semaines après.",
    who: "Camille R.",
    role: "Fleuriste",
    when: "il y a 2 mois",
  },
  {
    quote: "Je recevais zéro appel par internet. Depuis le nouveau site et la fiche Google, j'ai des demandes chaque semaine.",
    who: "Thomas L.",
    role: "Plombier chauffagiste",
    when: "il y a 3 mois",
  },
  {
    quote: "Très à l'écoute, de bons conseils et un résultat bien au-dessus de ce que j'imaginais pour ce prix.",
    who: "Sophie D.",
    role: "Esthéticienne",
    when: "il y a 4 mois",
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

export const steps = [
  { title: "On se parle", when: "Jour 1", text: "Un appel ou un café pour comprendre votre métier, vos clients et ce que le site doit vous apporter. Gratuit et sans engagement." },
  { title: "La maquette", when: "Semaine 1", text: "Vous voyez votre futur site avant qu'il soit codé. On ajuste ensemble jusqu'à ce qu'il vous ressemble." },
  { title: "Le développement", when: "Semaine 2", text: "Le site est construit, animé, testé sur téléphone, tablette et ordinateur, et optimisé pour Google." },
  { title: "La mise en ligne", when: "Semaine 3", text: "Votre site est en ligne sur votre nom de domaine. On vous montre comment le faire vivre." },
];

export const faq = [
  { q: "Combien de temps pour avoir mon site ?", a: "Comptez deux à trois semaines entre notre premier échange et la mise en ligne d'un site vitrine. Le plus long, c'est souvent de réunir vos photos et vos textes : on vous aide pour ça." },
  { q: "Je n'y connais rien en informatique, c'est un problème ?", a: "Pas du tout, c'est même pour ça qu'on existe. On s'occupe de tout : domaine, hébergement, textes, référencement. Vous validez, on exécute." },
  { q: "Est-ce que je pourrai modifier mon site ensuite ?", a: "Oui. Les petites modifications sont incluses dans le suivi mensuel, ou faites à la demande. Vous envoyez un message, c'est en ligne." },
  { q: "Pourquoi pas Wix ou un modèle gratuit ?", a: "Un modèle ressemble à des milliers d'autres sites, il est souvent lent sur mobile et mal référencé. Un site sur-mesure vous démarque, se charge vite et parle à vos clients." },
  { q: "Vous travaillez uniquement en Mayenne et en Sarthe ?", a: "C'est notre terrain, et on aime se rencontrer en vrai. Mais on travaille aussi à distance, partout en France." },
  { q: "Comment se passe le paiement ?", a: "Un acompte au lancement, le solde à la mise en ligne. Le devis est gratuit et détaillé, sans surprise." },
];
