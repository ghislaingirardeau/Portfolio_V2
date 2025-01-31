export default {
  cta: {
    next: 'Suivant',
    back: 'Retour',
    link: 'Lien du projet',
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
      visitor: 'Pourquoi ce portfolio ?',
      me: [
        "Pour en savoir plus sur moi, comment je travaille, des exemples de projets. Ce portfolio est fait dans l'esprit d'un petit entretien ;)",
        "Tu as déjà peut etre beaucoup d'informations sur les liens ci-dessous",
      ],
    },
    projectMobile: {
      mobileTab: {
        0: {
          0: {
            title: `Pourquoi avoir fait un mini jeu?`,
            description: [
              "Pour apprendre autres choses qu'une application ou site web. L'objectif ici était aussi de travailler les tests unitaires et fonctionnels",
            ],
          },
          1: {
            title: `Je peux y voir le détail ?`,
            description: ['Tu y retrouveras les technologies utilisées, les objectifs attendus...'],
          },
        },
        1: {
          0: {
            title: `Ce sont des applications mobiles ?`,
            description: [
              "Ce sont des PWA (Progressive Web App), c'est à dire une appli web et web mobile.",
            ],
          },
          1: {
            title: `Je peux y voir le détail ?`,
            description: ['Tu y retrouveras les technologies utilisées, les objectifs attendus...'],
          },
        },
        2: {
          0: {
            title: `Ce sont des projets persos ou pro ?`,
            description: [
              `Cela dépend. Si je n'ai pas de missions, je continue toujours à me former via des projets persos. 
              Ce projet là est pro, il a été conçu pour réponsdre à une demande spécifique`,
            ],
          },
          1: {
            title: `Je peux y voir le détail ?`,
            description: ['Tu y retrouveras les technologies utilisées, les objectifs attendus...'],
          },
        },
      },
      desktopTab: {
        0: {
          title: `Ce sont toutes tes réalisations ?`,
          description: [
            "C'est un aperçu de mes réalisations, certains projets sont confidentiels",
            "D'autres sont des projets tutoriels que je n'ai pas mis. Oui il faut toujours se former ;)",
          ],
        },
        1: {
          title: `Et tu as fait la partie backend ?`,
          description: [
            `Oui, sur les projets desktop travaillés, j'ai construit le serveur ainsi que la base de donnée`,
          ],
        },
      },
    },
    projectDesktop: {
      mobileTab: {
        0: {
          0: {
            title: `C'est un mini jeu pour mobiles ?`,
            description: [
              "Oui, c'est un wordle. Je l'ai développé en Test Driven Development avec les librairies suivantes",
              `Typescript, VueJs 3, Vitest, JsDom, Tailwinds.`,
              `L'objectif était d'en savoir plus sur les outils de test (tests unitaires et fonctionnels via Jest ou Vitest)`,
            ],
          },
          1: {
            title: `Qu'est-ce que le développement piloté par les tests ?`,
            description: [
              `Il donne la priorité au test pour le développement en utilisant 3 étapes.`,
              `Feux Rouge: Écrire le test du résultat attendu.`,
              `Feux Vert: Écrire le code pour que le test passe.`,
              `Refactoriser le code et le test.`,
            ],
          },
        },
        1: {
          0: {
            title: `C'est une application mobile ? Dans quel but ?`,
            description: [
              "Oui, c'est PWA (Progressive Web App), c'est à dire une appli web et web mobile.",
              `Je l'ai fait à partir de Typescript, Nuxt 3, PWA, i18n, Firebase et GitHub`,
              `C'est un outil qui m'a servi pour apprendre la langue du Khmer. Ainsi lors de la traduction d'un mot, je peux aussi de suite le 
              catégoriser pour m'en souvenir. Sorte de flashcard perso ;)`,
            ],
          },
          1: {
            title: `Qu'est-ce qu'une PWA ?`,
            description: [
              `Comme un site web, une PWA peut fonctionner sur plusieurs plateformes et appareils à partir d'une base de code unique.`,
              ` 
                Comme une application spécifique à une plate-forme, elle peut être installée sur l'appareil, fonctionner hors ligne et en arrière-plan, 
                et peut s'intégrer à l'appareil et aux autres applications installées.`,
            ],
          },
        },
        2: {
          0: {
            title: `C'est une application mobile ? Dans quel but ?`,
            description: [
              "Oui, c'est PWA (Progressive Web App), c'est à dire une appli web et web mobile.",
              `Je l'ai fait à partir de Nuxt, vuetify, leaflet, Firebase, import/export GeoJson-excel`,
              `C'est un outil de cartographie, réalisé pour une chercheuse en sociologie.`,
            ],
          },
          1: {
            title: `Qu'est-ce qu'une PWA ?`,
            description: [
              `Comme un site web, une PWA peut fonctionner sur plusieurs plateformes et appareils à partir d'une base de code unique.`,
              ` 
                Comme une application spécifique à une plate-forme, elle peut être installée sur l'appareil, fonctionner hors ligne et en arrière-plan, 
                et peut s'intégrer à l'appareil et aux autres applications installées.`,
            ],
          },
        },
      },
      desktopTab: {
        0: {
          0: {
            title: `C'est une application web ?`,
            description: [
              `Oui, developpée pour aider et informer une communauté`,
              `Mise en place d'un simulateur de financements avec son plan d'amortissement.`,
              `Elaboration du questionnaire pour la collecte de donnée avec authentification, une page administrateur pour le suivi et la synthèse des données`,
            ],
          },
          1: {
            title: `Qu'as tu appris sur ce projet ?`,
            description: [
              `Ce projet a été fait avec Nuxt, firebase auth & store, chart JS, notification par messagerie, export vers fichier excel`,
              `J'y ai appris le traitement et l'analyse de donnée brute, la structuration de formulaire, l'affichage tableau ou sous graphique...`,
            ],
          },
        },
        1: {
          0: {
            title: `Tu as réalisé des projets persos ?`,
            description: [
              `Oui, cette application web de visualisation et gestion d'émotions en est un exemple`,
              `En renseignant chaque jour l'émotion domniante de notre journée, cela permet d'avoir un rendu graphique globale entre nos émotions positives et négatives`,
              `Cela peut etre un outil d'aide pour mieux nous comprendre et voir nos évolutions visuellement plutot que via des statistiques`,
            ],
          },
          1: {
            title: `Qu'as tu appris sur ce projet ?`,
            description: [
              `C'est un projet fullstack avec Node js, Express, Axios, bcrypt, Figma, Bootstrap, Nuxt js`,
              `J'y ai appris comment personnaliser et animer le rendu d'une image SVG, rendre dynamique une image en fonction de la base de donnée de l'utilisateur, Gérer et implémenter un stockage de données à l'aide de SQL, Déployer le site Netlify et le serveur Heroku`,
            ],
          },
        },
        2: {
          0: {
            title: `Ce sont toutes tes réalisations ?`,
            description: [
              "C'est un aperçu de mes réalisations, certains projets sont confidentiels",
              "D'autres sont des projets tutoriels que je n'ai pas mis. Oui il faut toujours se former ;)",
            ],
          },
          1: {
            title: `Et tu as fait la partie backend ?`,
            description: [
              `Oui, sur les projets desktop travaillés, j'ai construit le serveur ainsi que la base de donnée`,
            ],
          },
        },
        3: {
          0: {
            title: `Ce sont toutes tes réalisations ?`,
            description: [
              "C'est un aperçu de mes réalisations, certains projets sont confidentiels",
              "D'autres sont des projets tutoriels que je n'ai pas mis. Oui il faut toujours se former ;)",
            ],
          },
          1: {
            title: `Et tu as fait la partie backend ?`,
            description: [
              `Oui, sur les projets desktop travaillés, j'ai construit le serveur ainsi que la base de donnée`,
            ],
          },
        },
      },
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
        title: "Peux tu m'en dire plus sur toi ?",
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
        title: 'Quels sont tes habitudes de travail ?',
        description: [
          `Je suis pro-actif dans un projet. J'aime m'impliquer dans celui-ci, partager mes idées et 
          mes points de vue pour choisir l'option la plus adaptée. 
          `,
          `Je me limite à travailler sur maximum 2 projets en même temps avec pour chacun, un temps dédié`,
          `J'explique les choix techniques et leurs avantages`,
        ],
      },
      2: {
        title: 'Quels sont tes valeurs fortes ?',
        description: [
          `Honnêteté, Respect, Juste, Humilité, Partage et Ouverture d'esprit`,
          `Mon souhait est de travailler avec et pour des personnes qui partagent ces mêmes valeurs`,
        ],
      },
      1: {
        title: 'Comment percois-tu ta relation avec tes clients ou collabrateurs ?',
        description: [
          `Etant freelance, je suis en relation directe avec mon client. L'écoute, la communication et la clareté des informations 
          sont essentielles, surtout en travaillant à distance.`,
          `Un de mes objectifs forts, c'est de créer une relation gagnant-gagnant entre moi, mes collaborateurs et le client pour que chacun soit satisfait
        du travail de l'autre et que l'on prenne plaisir à collaborer ensemble.`,
        ],
      },
    },
    stack: {
      0: {
        title: 'Pourquoi ce choix de stack ?',
        description: [
          `Je fais le choix de me spécialiser.`,
          `Certe je réduis les opportunités, mais j'ouvre sur une expertise. 
          Je reste malgré tout ouvert et suit les tendances sur les langages les plus utilisés.
          `,
        ],
      },
      1: {
        title: 'Coté front ou coté backend ?',
        description: [
          `Le Front, c'est ma préférence si je devais choisir dans un développpement fullstack. Notamment du fait que je maitrise plus VueJs`,
          `Mais j'apprécie également faire du backend notamment concevoir des API Rest.
          `,
        ],
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
    visitor: {
      perso: 'Qui es-tu ?',
      pro: 'Comment travailles-tu ?',
    },
    personal: {
      imageURL: ['moi2.jpg', 'moi.jpg', 'moi3.jpg'],
    },
    professionaly: {
      imageURL: ['work1.webp', 'work2.webp', 'work3.webp'],
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
        summary: 'Test-Driven-Development',
        mobileFirst: true,
        visitorChat: {
          0: "Quel est l'objectif de l'app ?",
          1: "Qu'est-ce que le développement piloté par les tests ?",
        },
        description: {
          0: [
            `L'objectif était d'en savoir plus sur les outils de test (tests unitaires et fonctionnels via Jest ou Vitest)`,
          ],
          1: [
            `
           Il donne la priorité au test pour le développement en utilisant 3 étapes. 
          `,
            `<ul>
            <li>Feux Rouge: Écrire le test du résultat attendu </li>
            <li>Feux Vert: Écrire le code pour que le test passe</li>
            <li>Refactoriser le code et le test.</li>
          </ul>`,
          ],
        },
        tech: 'Typescript, VueJs 3, Vitest, JsDom, Tailwinds',
        imageURL: ['wordle2.png', 'wordle1.png'],
        link: 'https://wordle-game-gg-wev-dev.netlify.app/',
      },
      {
        id: '12',
        date: 'juin 2023',
        name: 'Mon Vocabulaire en carte',
        summary: 'Application web PWA',
        mobileFirst: true,
        visitorChat: {
          0: "Quel est l'objectif de l'app ?",
          1: "Qu'est-ce qu'une PWA ?",
        },
        description: {
          0: [
            `C'est un outil qui m'a servi pour apprendre la langue du Khmer. Ainsi lors de la traduction d'un mot, je peux aussi de suite le 
              catégoriser pour m'en souvenir. Sorte de flashcard perso ;)`,
          ],
          1: [
            `Comme un site web, une PWA peut fonctionner sur plusieurs plateformes et appareils à partir d'une base de code unique.`,
            ` 
          Comme une application spécifique à une plate-forme, elle peut être installée sur l'appareil, fonctionner hors ligne et en arrière-plan, 
          et peut s'intégrer à l'appareil et aux autres applications installées.`,
          ],
        },
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
        name: 'Outil de cartographie',
        summary: 'Application web PWA',
        mobileFirst: true,
        visitorChat: {
          0: "Quel est l'objectif de l'app ?",
          1: "Qu'est-ce qu'une PWA ?",
        },
        description: {
          0: [`C'est un outil de cartographie, réalisé pour une chercheuse en sociologie.`],
          1: [
            `Comme un site web, une PWA peut fonctionner sur plusieurs plateformes et appareils à partir d'une base de code unique.`,
            ` 
            Comme une application spécifique à une plate-forme, elle peut être installée sur l'appareil, fonctionner hors ligne et en arrière-plan, 
            et peut s'intégrer à l'appareil et aux autres applications installées.`,
          ],
        },

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
