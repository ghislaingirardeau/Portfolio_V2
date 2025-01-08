export default {
  cta: {
    next: 'Next',
    back: 'Back',
  },
  navBar: {
    index: 'Home',
    projects: 'My works',
    services: 'My services',
    aboutMe: 'About me',
  },
  chatMessage: {
    home: [
      "J'ai fais le choix de créer ce portfolio différement",
      "Tu as déjà beaucoup d'information sur moi sur le lien ci-dessous",
    ],
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
        "Ceci n'est qu'un échantillon des projets développés, pour des raisons de confidentialités, les projets privés ne sont pas visible ici ! ",
        'Retour vers les projets mobiles ?',
      ],
    },
  },
  routes: {
    index: '/Home',
    projects: '/projects',
    services: '/services',
    aboutMe: '/aboutMe',
  },
  index: {
    me: {
      p1: 'Hello,',
      p2: "I'm Ghislain,",
      p3: 'Web Developer',
    },
    offer: {
      hService: 'How can I help you ?',
      textService: [
        'You have a web project or a business to digitalize... ',
        "but you don't know where and how to start... ?",
        'Find here, what kind of solution and assistance I can bring to you ! ',
      ],

      hWork: 'Knowing me through my works',
      textWork: [
        'You are probably familiar with the web technology... ',
        'And if you want to know what I can offer ',
        'Look at my projects and see which tools I work with !',
      ],
    },
  },
  footer: {
    title: 'Find me on :',
    contact: 'My email :',
    animation: 'Disable Animation',
    description: `
    This portofolio was (and still is to some extent) my test laboratory. I deliberately didn't use any other libraries except Nuxt and Sass for its development (because I chose to learn during my first months as a developer).`,
  },
  about: {
    h1: 'More about me',
    h2who: 'Who I am...',
    h2Pro: 'Commitment...',

    h2commit: 'My work commitment...',
    personal: {
      h3: '...Personally',
      description: [
        'After more than 10 years working as a manager for an international sports brand (Intersport), I decided to explore one of my other hobbie which is IT.',
        'I took part in a six-month training course to become a web developer.',
        'Next...',
      ],
      description1: [
        "I'm eager to work on any interesting projects that I can bring to this intersection of my skills and knowledge (sports and web development).",
        'Previous...',
      ],
      text: "After more than 10 years working as a manager for an international sports brand (Intersport), I decided to explore one of my other hobbie which is IT. I took part in a six-month training course to become a web developer. As an athlete and a web developer, I'm eager to work on any interesting projects that I can bring to this intersection of my skills and knowledge (sports and web development).",
    },
    professionaly: {
      h3: '...Professionally',
      description: [
        "Over the last 3 years, I've developed solid expertise in creating dynamic and intuitive user interfaces, using the Vue Js framework in particular. ",
        'I give occasional training courses in Javascript fullstack for the Oclock online school. I also ran a Vue JS training workshop ',
        'Next...',
      ],
      description1: [
        'I was able to learn about and create unit tests using Jest and Vue Test Utils to guarantee a reliable, high-performance application.',
        'Previous...',
      ],
      id1: "Freelancer, I'm self-employed since June 2021 as a web developer : I realised this e-portfolio using Vue and Nuxt Js, 2 js frameworks that I particularly like to work with !",
      id2: 'OPEN CLASSROOM: attended six months intensive training as a web developer. As a practitioner of the AGILE method, all my training came from real work projects. These projects were approved and evaluated by a tutor, a professor and a jury of professional web developers. I am used to organising my work autonomously in relation to the project deadline set by the client.',
    },
    willingness: {
      id1: 'Because digitalisation can have an impact on the environment... I would like to work on projects, that share my vision of being ecological.',
      id2: "Because in a fast and dematerialised world, where the personal data are being exposed, the data protection is at stake... Trust and respect are the main values for a fair relationship to guarantee the security of the customer's data.",
      id3: "Because technology also makes our daily lives easier, without any physical connection... I like to remember that there's always a human being behind it. Clear, fair and constructive dealings are the core values of my work.",
      id4: 'Because being a freelancer means being autonomous, responsible and organised... Planning my work, having clear schedules, setting deadlines, reporting and regularly presenting the progress of the project are the commitments of my work.',
    },
  },
  services: {
    header: {
      h1: 'Be at your side for your web projects',
      h2: 'Free advice until the project contracts are signed...',
      p: 'Each steps is made through a web meeting (30 to 60 min) to discuss about your project',
    },
    stepOne: {
      h3: 'Step 1',
      description: [
        'Projects presentation and willingness',
        'Define your need, strategy and resource',
        'What and how can I help you in your digitalisation process',
        'First feedback on your projects sharing about my knowledge/skills fitting or not your project',
      ],
    },
    stepTwo: {
      h3: 'Step 2',
      description: [
        'Get the specific details (need, scope and features) for your new application',
        'Possibilities, solutions and recommendations regarding your strategy',
        'Offer, deadlines and clear detail about the expected outcome for both of us',
        "Questions and answers if it's still not clear",
      ],
    },
    stepThree: {
      h3: 'Step 3',
      description: [
        'After quote validation, project development start',
        'Steps planifications to see the project forwards',
        'Weekly report ',
        'Exchange and feedback regularly to get the first impressions or made corrections',
      ],
    },
    footer: 'Schedule a visio conference',
  },
  projects: {
    mobile: [
      {
        id: '13',
        date: 'march 2024 - Today',
        name: `Wordle Game`,
        mobileFirst: true,
        summary: 'Mini game - Test-Driven-Development',
        description: `
    Creation of the game giving priority to Test first using 3 steps.
    <ul>
    <li>Red Lights: Write the test for the expected result </li>
    <li>Green Lights: Write the code for the test to pass</li>
    <li>Refactor code and test.</li>
    </ul>`,
        tech: 'Typescript, VueJs 3, Vitest, JsDom, Tailwinds',
        imageURL: ['wordle2.png', 'wordle1.png'],
        link: 'https://wordle-game-gg-wev-dev.netlify.app/',
      },
      {
        id: '12',
        date: 'juin 2023',
        name: 'Mon Vocabulaire en carte',
        mobileFirst: true,
        summary: 'Flashcard - Web App PWA',
        description:
          "An application that allows you to translate words or phrases, but also to organise and archive them in the form of a card. The application allows you to listen to 'my vocabulary' in the chosen language at different speeds and offers pronunciation help for certain languages such as Khmer.",
        tech: 'Typescript, Nuxt 3, PWA, i18n, Firebase GitHub',
        imageURL: [
          'carte_sample.png',
          'carte_account.png',
          'carte_options.png',
          'carte_tuto1.png',
          'carte_tuto2.png',
          'carte_tuto3.png',
        ],
        link: 'https://my-flashcard-lang.netlify.app/en',
      },
      {
        id: '8',
        date: 'january 2022',
        name: 'PWA - Cartographie',
        summary: 'Mapping Tool - Web App PWA',
        mobileFirst: true,
        description: `Development of a mapping tool for a sociology researcher. 
      <ul>
      <li>- Save a position</li>
      <li>- Track my position</li>
      <li>- Ability to add geographical areas</li>
      <li>Large selection of markers from over 2500 icons</li>
      <li>- Save and export data</li>
      <li>- Organize markers in folders for dynamic display</li>
      <li>- Data backed up and secured via Firebase</li>
    </ul>`,
        tech: 'Nuxt, vuetify, leaflet, Firebase, import et export from/to Excel file, netlify, GitHub',
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
      {
        id: '10',
        date: 'july 2022',
        name: 'Web App - Data collection app',
        summary: 'Web application for data collection and processing',
        mobileFirst: false,
        description:
          'Loan simulator and payment table, data forms template to collect the data, the admin page to visualise the collections and view the data tables.',
        tech: 'Nuxt, vuetify, firebase auth & store, moment JS, chart JS, notification, export to excel, netlify, GitHub',
        imageURL: [
          'community_tool2.png',
          'community_tool1.png',
          'community_tool3.png',
          'community_tool4.png',
        ],
      },

      {
        id: '7',
        date: 'august 2021',
        name: 'BeToFeel',
        mobileFirst: false,
        summary: 'Building a full-stack website: sharing and visualising dynamic emotions',
        description:
          'SVG image dynamic, motion and personalised front rendering based on user data, including SQL database and authentication user control. Offer the ability to share your personal image with other users, Full stack deployment API server on Heroku / app on Netlify',
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
      {
        id: '1',
        date: 'december 2020',
        name: 'Reservia',
        summary: 'Turn Mock-ups into a Web Page',
        mobileFirst: false,
        description:
          "Get started with HTML & CSS by implementing a travel booking platform's website from scratch.",
        tech: 'HTML, CSS, GitHub',
        imageURL: ['reservia.PNG'],
        link: 'https://ghislaingirardeau.github.io/GhislainGirardeau_2_23122020/',
      },
      {
        id: '2',
        date: 'january 2021',
        name: 'Ohmyfood',
        summary: 'Integrate a mobile website with animations in CSS',
        mobileFirst: false,
        description: 'Implement the mobile version of this foodtech website with CSS animations.',
        tech: 'HTML, CSS, SASS, GitHub, BEM methods for a clear code',
        imageURL: ['ohmyfood.PNG', 'ohmyfood_menu1.PNG'],
        loader: 'true',
        link: 'https://ghislaingirardeau.github.io/GirardeauGhislain_3_13012021/index.html',
      },
      /* {
    id: "3",
    date: "february 2021",
    name: "La chouette agence",
    summary: "Optimize an existing Website",
    description:
      "Research and implement current best practices and standards in web development, including SEO, size and speed, and accessibility.",
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
    date: "march 2021",
    name: "So Peckoko",
    summary: "Build a Secure API for a review app",
    description:
      "Hot Takes is a new app for customer reviews of specialty hot sauces. Use Node.js, Express, and MongoDB to build its NoSQL database. Secure customer data by applying the OWASP web security standards.",
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
    title: 'Find all project descriptions',
    description:
      'Click on a project to get more details: web development tools, features scoped expected...',
    dateCreation: 'Made in',
  },
  projectsIdPage: {
    description: 'Details and objectives :',
    tech: 'Technology or framework used:',
    gallery: 'Render gallery :',
    loader: 'Loader creation :',
    other: 'Others projects',
    backButton: 'BACK',
  },
  date: {
    day: 'The ',
    time: ", it's ",
  },
}
