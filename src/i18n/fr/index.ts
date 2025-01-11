export default {
  cta: {
    next: 'Suivant',
    back: 'Retour',
  },
  navBar: {
    index: 'Accueil',
    projects: 'Mes projets',
    services: 'Mes services',
    stack: 'Mon stack',
    aboutWork: 'Travailler avec moi',

    aboutMe: 'A propos de moi',
  },
  chatMessage: {
    home: {
      visitor: 'Why this portfolio',
      me: [
        'Pour montrer ce qui se cache derrière mon CV et mieux me connaitre',
        "Tu trouveras d'autres informations sur le lien ci-dessous",
      ],
    },
    projectMobile: {
      mobileTab: {
        chat1: ["Ce sont des PWA (Progressive Web App), c'est à dire une appli web et web mobile."],
        chat2: ['Oui, tu y restrouveras les technologies utilisées, les objectifs attendus...'],
      },
      desktopTab: {
        chat1: [
          "C'est un aperçu de mes réalisations, certains projets sont confidentiels",
          "D'autres sont des projets tutoriels que je n'ai pas mis. Oui il faut toujours se former ;)",
        ],
        chat2: [
          "Oui pour certains projets, j'ai fait tout le backend soit un serveur et une base de données :)",
        ],
      },
    },
    project: [
      'Voici un aperçu de mes réalisations',
      'Tu y restrouveras les technologies utilisées, les objectifs attendus...',
    ],
    projectDesktop: {
      mobile: [
        'Ces projets ont été réalisés en Mobile First, mais fonctionnent aussi sur desktop',
        'Voir aussi mes projets desktop public ?',
      ],
      desktop: [
        "Ceci n'est qu'un échantillon des projets développés, pour des raisons de confidentialités, les projets privés ne sont pas visibles ici ! ",
        'Retour vers les projets mobiles ?',
      ],
    },
    aboutDesktop: {
      perso: [
        "Après plus de 10 ans de travail en tant que manager pour une marque internationale de sport (Intersport), j'ai décidé d'explorer l'un de mes autres hobbies, à savoir l'informatique.",
        "J'ai participé à une formation de six mois pour devenir développeur web.",
        "Je travaille principalement à distance puisque je vis entre la France et l'Asie du Sud-Est",
        'professionnellement...',
      ],
      pro: [
        'Depuis plus de 3 ans, j’ai développé une expertise dans la création d’interfaces utilisateur dynamiques et intuitives. ',
        'Je donne ponctuellement des formations au Javascript fullstack. J’ai également animé un atelier de formation Vue JS ',
        "J'ai pu appréhender et creer des tests unitaires avec Jest et Vue Test Utils pour garantir une application fiable et performante.",
        'Je suis impatient de travailler sur tous les projets intéressants que je peux apporter à cette intersection de mes compétences et de mes connaissances (sport et développement web).',
        'Et personnellement ? ...',
      ],
    },
    meMobile: {
      1: {
        title: 'Tu pratiques également du sport ? Et pourquoi ceux-là en particulier ?',
        description: [
          `En effet, je suis passionné de sport. Du foot, au sport de glisse tel que 
          le surf et le ski`,
          `Le sport collectif comme le foot contribue à l'esprit et au travail d'équipe pour atteindre un objectif. On ne peut réussir que collectivement.
        `,
          `Le ski et le surf, permet de se remettre en question et d'etre autodidacte pour s'améliorer constamment`,
        ],
      },
      0: {
        title: 'Où vis-tu ?',
        description: [
          `Pour le moment je vis entre l'Asie du Sud Est et la France (5/6 mois dans chaque pays) pour 
          suivre ma compagne qui est chercheuse en anthropologie auprès des communautés autochtones. 
          `,
          `Le voyage permet une ouverture d'esprit, force l'autonomie et la responsabilité`,
          `Je travaille donc principalement à distance sauf quand je suis en France où je peux être mobile `,
        ],
      },
      2: {
        title: 'Pourquoi le yoga ?',
        description: [
          `J'apprècie particulièrement la pratique du yoga
          et de la méditation. Dans un monde de vitesse et d'exigence, cela me permet de ralentir, 
          de prendre soin de son esprit et de son corps.
          `,
          `La pratique du yoga stimule la concentration et la créativité. 
          Cela m'apporte un regain d'énergie et une motivation accrue en m'aidant à me focaliser sur l'essentiel`,
        ],
      },
    },
    workEnvMobile: {
      0: {
        title: 'Quels sont tes engagements et valeurs au travail ?',
        description: ['detail a remplir'],
      },
      1: {
        title: 'Mes engagements dans mon travail ?',
        description: ['liste des sport', 'bienfait du sport'],
      },
      2: {
        title: 'Tes valeurs ?',
        description: ['gout du voyage', 'impact du voyage'],
      },
      3: {
        title: 'Ma relation au travail ?',
        description: ['gout yoga et méditation', 'impact du yoga sur le travail'],
      },
    },
    aboutMobile: {
      visitor: {
        perso: 'Qui es-tu ?',
        pro: 'Comment travailles-tu ?',
      },
      me: {
        perso: {
          description: [
            'After more than 10 years working as a manager for an international sports brand (Intersport), I decided to explore one of my other hobbie which is IT.',
            'I took part in a six-month training course to become a web developer.',
            'More details...',
          ],
          description1: [
            "I'm eager to work on any interesting projects that I can bring to this intersection of my skills and knowledge (sports and web development).",
            'Previous...',
          ],
        },
        pro: {
          description: [
            "Over the last 3 years, I've developed solid expertise in creating dynamic and intuitive user interfaces, using the Vue Js framework in particular. ",
            'I give occasional training courses in Javascript fullstack for the Oclock online school. I also ran a Vue JS training workshop ',
            'More details...',
          ],
          description1: [
            'I was able to learn about and create unit tests using Jest and Vue Test Utils to guarantee a reliable, high-performance application.',
            'Previous...',
          ],
        },
      },
    },
  },
  routes: {
    index: '/Accueil',
    projects: '/projets',
    services: '/services',
    aboutMe: '/moi',
  },
  index: {
    me: {
      p1: 'Bonjour,',
      p2: 'Je suis Ghislain,',
      p3: 'Développeur web',
    },
    offer: {
      hService: 'Mes services pour un projet digital',
      textService: [
        'Envie de vous lancez dans un projet digital...',
        'Mais vous ne savez pas, par oú commencer ?',
        "Retrouver le détail de l'accompagnement que je peux vous proposer !",
      ],
      hWork: 'Me connaitre via mes réalisations',
      textWork: [
        'Vous êtes déja initié au technologie et au langage de programmation... ',
        'Et vous souhaitez en savoir plus sur mes compétences et mes réalisations ?',
        "Découvrez les technologies que je maitrise et les projets sur lesquels j'ai travaillé !",
      ],
    },
  },
  footer: {
    title: 'Retrouver moi sur :',
    contact: 'Mon email :',
    animation: "Désactiver l'animation",
    description: `Ce portofolio a été (et est toujours un peu) mon laboratoire de
      test. Je n'ai utilisé volontairement aucune autre librairie à
      l'exéption de Nuxt et Sass pour son développement (par choix
      d'apprentissage lors de mes 1er mois en tant que développeur).`,
  },

  about: {
    h1: 'En savoir plus sur moi',
    h2who: 'Qui suis-je...',
    h2Pro: 'Engagé...',

    h2commit: 'Mes souhaits...',
    personal: {
      h3: '...Côté Perso',
      description: [
        "Après plus de 10 ans de travail en tant que manager pour une marque internationale de sport (Intersport), j'ai décidé d'explorer l'un de mes autres hobbies, à savoir l'informatique.",
        "J'ai participé à une formation de six mois pour devenir développeur web.",
        'En savoir plus...',
      ],
      description1: [
        'Je suis impatient de travailler sur tous les projets intéressants que je peux apporter à cette intersection de mes compétences et de mes connaissances (sport et développement web).',
        'Retour...',
      ],
      text: "Après 10 d'expériences dans la distribution d'articles de sport, j'ai décidé de réaliser un vieux rêve et de me tourner vers une autre passion qu'est le langage informatique. Passionée de sports, investi dans le développement web, j'ai aujourd'hui le souhait de mettre à disposition mes compétences dans des projets enrichissant tant humainement que professionnellement.",
    },
    professionaly: {
      h3: '...Côté Pro',
      description: [
        'Depuis plus de 3 ans, j’ai développé une expertise dans la création d’interfaces utilisateur dynamiques et intuitives. ',
        'Je donne ponctuellement des formations au Javascript fullstack. J’ai également animé un atelier de formation Vue JS ',
        'En savoir plus...',
      ],
      description1: [
        "J'ai pu appréhender et creer des tests unitaires avec Jest et Vue Test Utils pour garantir une application fiable et performante.",
        'Retour...',
      ],
      id1: "Auto-entrepreneur et freelance en developpement web : Réalisation de ce e-portfolio via Vue et Nuxt Js, 2 framework js que j'apprécie particulièrement !",
      id2: "OPEN CLASSROOM : Formation 6 mois développeur Web. Partisans des méthodes AGILE, tous mes projets sont issus du monde professionnel et ont éte présenté à distance en visio conférence. J'ai organisé mon travail en tout autonomie dans le respect des délais impartis.",
    },
    willingness: {
      id1: "Parce que les nouvelles technologies ont aussi un impact sur l'environnement... J'ai le souhait de m'engager sur des projets ou des entreprises partageant l'idée de réduire notre consommation en énergie.",
      id2: 'Parce que la protection des données est un enjeu très important dans un monde oú tout va plus vite, oú tout devient dématérialisé... la confiance, le respect, la confidentialité sont des valeurs indispensables.',
      id3: "Parce que les nouvelles technologies nous facilitent la vie... Il ne faut pas oublier qu'il y a des individus derrières celles-ci : utilisateurs, clients, employés, développeurs, entrepreneur... Faire que la relation entre les différents acteurs soient la plus saine, équitable, juste et constructive, est une notion indispensable pour moi. ",
      id4: "Parce que le métier de freelance nécessite une relation de confiance et de l'autonomie... Je fais des points réguliers sur l'avancée du projet, planifie mes objectifs pour tenir les délais, discute des feedbacks constructifs pour faire aboutir le projet.",
    },
  },
  services: {
    header: {
      h1: 'Mon accompagnement dans votre projet de digitalisation',
      h2: "Des étapes personnalisées et gratuites jusqu'à votre validation finale du devis...",
      p: 'Chaque étapes est plannifié avec un rendez vous visio (30 ou 60 min) pour échanger',
    },
    stepOne: {
      h3: 'Etapes 1',
      description: [
        'Présentation et échange sur votre projet',
        'Définir ensemble votre stratégie, vos ressources et vos besoins',
        'Ce que je peux vous apporter dans votre digitalisation',
        'Premier retour sur la faisabilité et la viabilité de votre projet',
      ],
    },
    stepTwo: {
      h3: 'Etapes 2',
      description: [
        'Etude individualisée de votre projet',
        'Evaluation des possibilités, recommandations et solutions adaptées',
        'Proposition de devis, délai et cahier des charges reprenant le résultat convenu',
        'Réponse à vos interrogations et questionnements',
      ],
    },
    stepThree: {
      h3: 'Etapes 3',
      description: [
        'Lancement et développement du projet',
        'Plannification des étapes pour le développement',
        "Un rapport hebdomadaire sur l'avancement du projet",
        'Un échange visio pour avoir les impressions du rendu',
      ],
    },
    footer: 'Prendre un rendez-vous en visio',
  },
  projects: {
    mobile: [
      {
        id: '13',
        date: "mars 2024 - Aujourd'hui",
        name: `Wordle Game`,
        summary: 'Mini jeu - Test-Driven-Development',
        mobileFirst: true,
        description: `
          Création du jeu en donnant la priorité au Test first grâce à 3 étapes. 
          <ul>
            <li>Feux Rouge: Écrire le test du résultat attendu </li>
            <li>Feux Vert: Écrire le code pour que le test passe</li>
            <li>Refactoriser le code et le test.</li>
          </ul>`,
        tech: 'Typescript, VueJs 3, Vitest, JsDom, Tailwinds',
        imageURL: ['wordle2.png', 'wordle1.png'],
        link: 'https://wordle-game-gg-wev-dev.netlify.app/',
      },
      {
        id: '12',
        date: 'juin 2023',
        name: 'Mon Vocabulaire en carte',
        summary: 'Flashcard - Application web PWA',
        mobileFirst: true,
        description: `
          App permettant de traduire des mots ou expressions mais aussi de les organiser et archiver sous forme de carte. L'application permet de:
          <ul>
            <li>Réécouter 'mon vocabulaire' dans la langue choisie à différentes vitesses</li>
            <li>Offre une aide à la prononciation pour certaine langue comme le Khmer.</li>
            <li>Enregistrer le mot avec la voix ou le clavier</li>
          </ul>`,
        tech: 'Typescript, Nuxt 3, PWA, i18n, Firebase GitHub',
        imageURL: [
          'carte_sample.png',
          'carte_account.png',
          'carte_options.png',
          'carte_tuto1.png',
          'carte_tuto2.png',
          'carte_tuto3.png',
        ],
        link: 'https://my-flashcard-lang.netlify.app',
      },
      {
        id: '8',
        date: 'janvier 2022',
        name: 'Cartographie',
        summary: 'Outil de mapping - Application web PWA',
        mobileFirst: true,
        description: `Développement d'un outil d'aide à la cartographie pour une chercheuse en sociologie. 
            <ul>
            <li>- Enregistrer une position</li>
            <li>- Suivre ma position</li>
            <li>- Possibilité d'ajouter des zones géographiques</li>
            <li>- Large sélections de marqueurs parmis plus de 2500 icones</li>
            <li>- Enregistrer et exporter les données</li>
            <li>- Organiser les marqueurs dans des dossiers pour affichage dynamique</li>
            <li>- Des données sauvegardées et sécurisées via Firebase</li>
          </ul>
          `,
        tech: 'Nuxt, vuetify, leaflet, Firebase, import/export GeoJson-excel',
        imageURL: [
          'mapping1.PNG',
          'mapping2.PNG',
          'mapping3.PNG',
          'mapping5.PNG',
          'mapping6.PNG',
          'mapping8.PNG',
          'mapping9.PNG',
        ],
        link: 'https://map-tool-village.netlify.app/',
      },
    ],
    desktop: [
      // {
      //   id: '13',
      //   date: "Juillet 2024 - Aujourd'hui",
      //   name: `Développeur Frontend: Saas Ubbik`,
      //   summary:
      //     "Développeur Vue js / Nuxt Js pour une application SaaS d'aide à la gestion managériale",
      //   description: `
      //     <ul>
      //       <li>Amélioration de l’expérience utilisateur UX/UI</li>
      //       Intégration de fonctionnalités de paiement : Stripe
      //       <li>
      //         Amélioration des performances (gestion d’état et trie des appels API)
      //       </li>
      //       <li>Maintenance, refactorisation du code et correction des bugs</li>
      //       <li>Amélioration du drag & drop</li>
      //     </ul>`,
      //   tech: 'Typescript, VueJs / Nuxt 2, Element, Stripe',
      //   link: 'https://ubbik.co/',
      // },
      {
        id: '10',
        date: 'juillet 2022',
        name: 'Web App - Collecte de données',
        summary: 'Collecte et de traitement de données',
        mobileFirst: false,
        description:
          "Mise en place d'un simulateur de financements avec son plan d'amortissement, élaboration du questionnaire pour la collecte de donnée avec authentification, une page administrateur pour le suivi et la synthèse des données",
        tech: 'Nuxt, vuetify, firebase auth & store, moment JS, chart JS, notification par messagerie, export vers fichier excel, netlify, GitHub',
        imageURL: [
          'community_tool2.png',

          'community_tool1.png',
          'community_tool3.png',
          'community_tool4.png',
        ],
      },
      // {
      //   id: '9',
      //   date: 'mai 2022',
      //   name: 'Création plateforme web de dons',
      //   summary: "Création d'une application de simulation de dons",
      //   description: `
      //           <ul>
      //         <li>
      //           Création d'un site web représentant une maquette de simulation de don
      //           (100% frontend) avec explication du concept
      //         </li>
      //         <li>
      //           Conversion de la maquette en application web: base de donnée, API, rendu
      //           frontend
      //         </li>
      //         <li>
      //           Application 100% dynamique, suivant le contenu enregistrer dans la base
      //           de donnée
      //         </li>
      //         <li>Intégration Stripe pour test de paiement</li>
      //         <li>URL confidentiel</li>
      //       </ul>
      //     `,
      //   tech: 'Node js, Express, Axios, Vue js, Nuxt js, Vuetify, Stripe, GitHub, Mysql workbench, railway',
      // },

      {
        id: '7',
        date: 'aout 2021',
        name: 'BeToFeel - fullstack app',
        summary: "Visualisation et gestion d'émotions",

        mobileFirst: false,
        description:
          "Personnaliser et animer le rendu d'une image SVG, rendre dynamique une image en fonction de la base de donnée de l'utilisateur, Gérer et implémenter un stockage de données à l'aide de SQL, Déployer le site Netlify et le serveur Heroku",
        tech: 'Node js, Express, Axios, bcrypt, Figma, bootstrap vue, Nuxt js, GitHub, Mysql workbench',
        imageURL: [
          'beToFeelUser.PNG',

          'beToFeelsign.PNG',
          'beToFeeling.PNG',
          'beToFeelShare.PNG',
          'beToFeelTree.PNG',
        ],
        link: 'https://betofeel.netlify.app/',
      },
      // {
      //     id: "6",
      //     date: "mai 2021",
      //     name: "Groupomania",
      //     summary: "Création d'un réseau social interne à une entreprise",
      //     mobileFirst: false,
      //     description:
      //       "Personnaliser le contenu envoyé à un client web, Gérer un stockage de données à l'aide de SQL, Implémenter un stockage de données sécurisé en utilisant SQL, Authentifier un utilisateur et maintenir sa session, Définir des rôles et des privilèges suivant l'utilisateur",
      //     tech: "Mysql, Node js, Express, bcrypt, multer, bootstrap, Vue js, GitHub",
      //     imageURL: [
      //       "groupomania_log.PNG",
      //       "groupomania_signup.PNG",
      //       "groupomania_home.PNG",
      //       "groupomania_delete.PNG",
      //       "groupomania_forum.PNG",
      //       "groupomania_update.PNG",
      //       "groupomania_empty.PNG",
      //     ],
      //   },
      // {
      //   id: "4",
      //   date: "avril 2021",
      //   name: "Orinoco",
      //   summary: "Création d'un 1er projet pour un site e-commerce",
      //   mobileFirst: false,
      //   description:
      //     "Interagir avec une API avec JavaScript. Valider des données issues de sources externes avant leur envoie vers API. Créer un plan de test pour une application et gérer des événements JavaScript",
      //   tech: "Javascript, bootstrap, Regex, GitHub",
      //   imageURL: [
      //     "orinoco_accueil.PNG",
      //     "orinoco_produit.PNG",
      //     "orinoco_basket.PNG",
      //     "orinoco_forms.PNG",
      //     "orinoco_confirm.PNG",
      //   ],
      // },
      {
        id: '1',
        date: 'décembre 2020',
        name: 'Reservia',
        summary: "Intégration d'une maquette en site web",
        mobileFirst: false,
        description:
          'Implémenter une interface responsive, Utiliser un système de gestion de versions pour le suivi du projet',
        tech: 'HTML, CSS, GitHub',
        imageURL: ['reservia.PNG'],
        link: 'https://ghislaingirardeau.github.io/GhislainGirardeau_2_23122020/',
      },
      {
        id: '2',
        date: 'janvier 2021',
        name: 'Ohmyfood',
        mobileFirst: false,
        summary: 'Mise en œuvre une structure de navigation web',
        description:
          "Mettre en œuvre des effets CSS graphiques avancés en assurant une cohérence graphique. Mise en place d'animation Keyframes et transitions pour rendre enrichir l'expérience utilisateur",
        tech: 'HTML, CSS, SASS, GitHub, méthode BEM pour un code clair',
        imageURL: ['ohmyfood.PNG', 'ohmyfood_menu1.PNG'],
        loader: 'true',
        link: 'https://ghislaingirardeau.github.io/GirardeauGhislain_3_13012021/index.html',
      },
      /* {
          id: "3",
          date: "février 2021",
          name: "La chouette agence",
          summary:
            "Utiliser les techniques d'amélioration et de référencement d'un site web",
          description:
            "Sur la base d'un site web existant, améliorer son référencement par un retravail des mots clés, rendre le site responsive et assurer son accessibilité. Optimiser son référencement, sa taille et son temps de chargement",
          tech: "Aria, SEO, google analytics, google search console, wave evaluation, headingMap  GitHub",
          imageURL: [
            "chouette_agence_loading.PNG",
            "chouette_agence_titre.PNG",
            "chouette_agence_responsive.PNG",
          ],
          link: "https://ghislaingirardeau.github.io/GirardeauGhislain_4_02022021/index.html",
        }, */
      /* {
          id: "5",
          date: "mars 2021",
          name: "So Peckoko",
          summary:
            "Construction d'une interface de programmation applicative (API Rest)",
          description:
            "Mettre en œuvre des opérations CRUD de manière sécurisée. Construire l'API en stockant des données (data personnel, image, texte...) de manière sécurisée, Implémenter un modèle logique de données conformément à la réglementation OWASP",
          tech: "Node js, Express, bcrypt, multer, MongoDb, GitHub",
          imageURL: [
            "so_peckoko_log.PNG",
            "so_peckoko_create.PNG",
            "so_peckoko_CRUD.PNG",
          ],
        }, */
    ],
  },
  projectsPage: {
    title: 'Découvrez toutes mes réalisations',
    description:
      'Cliquer sur un projet pour en savoir plus: technologies utilisées, objectifs attendus...',
    dateCreation: 'Date de réalisation',
  },
  projectsIdPage: {
    description: 'Description du projet et objectifs :',
    tech: 'Les technologies et outils utilisés :',
    gallery: 'Galerie du projet :',
    loader: 'Creation du loader :',
    other: 'Mes autres projets',
    backButton: 'RETOUR',
  },
  date: {
    day: 'Nous sommes le ',
    time: ', il est',
  },
}
