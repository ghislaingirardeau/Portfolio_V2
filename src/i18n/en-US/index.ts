export default {
  cta: {
    next: 'Next',
    back: 'Back',
    link: 'Project Link',
  },
  navBar: {
    index: 'Home',
    projects: 'My works',
    services: 'My services',
    stack: 'My stack',
    aboutWork: 'Work with me',
    aboutMe: 'About me',
  },
  chatMessage: {
    home: {
      visitor: 'Why this portfolio ?',
      me: [
        "To show what is behind my resume and my work, to know more about me. It's has been made as a first interview ;)",
        '...You can find out a lot more about me on the link below',
      ],
    },
    projectMobile: {
      mobileTab: {
        0: {
          title: `Are these mobile applications?`,
          description: [
            'These are PWAs (Progressive Web Apps), in other words a web and mobile web application.',
          ],
        },
        1: {
          title: `Can I see the details?`,
          description: [`You'll find out about the technologies used, the expected objectives...`],
        },
      },
      desktopTab: {
        0: {
          title: `Are these all your achievements?`,
          description: [
            'This is an overview of my work, some projects are confidential',
            "Others are tutorial projects that I haven't included. Yes, you always have to be trained ;)",
          ],
        },
        1: {
          title: `And you did the backend?`,
          description: [
            `Yes, on many projects, I built the server (NodeJs and Express) as well as the database (SQL).`,
          ],
        },
      },
    },

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
    aboutDesktop: {
      perso: [
        'After more than 10 years working as a manager for an international sports brand (Intersport), I decided to explore one of my other hobbie which is IT.',
        'I took part in a six-month training course to become a web developer.',
        "I'm eager to work on any interesting projects that I can bring to this intersection of my skills and knowledge.",
        'back to professionally...',
      ],
      pro: [
        "Over the last 3 years, I've developed solid expertise in creating dynamic and intuitive user interfaces, using the Vue Js framework in particular. ",
        'I give occasional training courses in Javascript fullstack for the Oclock online school. I also ran a Vue JS training workshop ',
        'I was able to learn about and create unit tests using Jest and Vue Test Utils to guarantee a reliable, high-performance application.',
        "I'm eager to work on any interesting projects that I can bring to this intersection of my skills and knowledge.",
        'And personnaly ? ...',
      ],
    },
    meMobile: {
      1: {
        title: 'Do you also do sport? And why those in particular?',
        description: [
          `
          I'm passionate about sport. From football to board sports such as 
          surfing and skiing`,
          `Collective sport like football contributes to team spirit and teamwork to achieve a goal. We can only succeed collectively.
        `,
          `Skiing and surfing allow you to challenge yourself and teach yourself to constantly improve.`,
        ],
      },
      0: {
        title: 'Where do you live?',
        description: [
          `At the moment I'm living between South-East Asia and France (5/6 months in each country) to 
          to follow my partner, who is an anthropology researcher working with indigenous communities. 
          `,
          `Travelling opens up your mind and fosters autonomy and responsibility`,
          `So I mainly work remotely, except when I'm in France where I can be mobile. `,
        ],
      },
      2: {
        title: 'Why yoga?',
        description: [
          `I particularly enjoy practising yoga
          and meditation. In a fast-paced, demanding world, it helps me to slow down, 
          to take care of your mind and body.
          `,
          `Practising yoga stimulates concentration and creativity. 
          It gives me renewed energy and increased motivation by helping me to focus on what's essential.`,
        ],
      },
    },
    workEnvMobile: {
      0: {
        title: 'What are your working habits?',
        description: [
          `I'm proactive in a project. I like to get involved, share my ideas and points of view 
          to choose the most appropriate option. 
          `,
          `I limit myself to working on a maximum of 2 projects at the same time, with dedicated time for each.`,
          `I explain the technical choices simply and in particular their advantages`,
        ],
      },
      2: {
        title: 'What are your core values?',
        description: [
          `Honesty, Respect, Fairness, Humility, Sharing and Open-mindedness`,
          `My wish is to work with and for people who share these same values`,
        ],
      },
      1: {
        title: 'How do you perceive your relationship with your clients or collaborators?',
        description: [
          `As a freelancer, I have a direct relationship with my client. Listening, communicating and providing clear information are 
          are essential, especially when working remotely.`,
          `One of my key objectives is to create a win-win relationship between myself, my colleagues and the customer, so that everyone is satisfied with each other's work and enjoys working together.
        with each other's work and that we enjoy working together.`,
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
    visitor: {
      perso: 'Qui es-tu ?',
      pro: 'Comment travailles-tu ?',
    },
    personal: {
      imageURL: ['moi2.jpg', 'moi.jpg', 'moi3.jpg'],
    },
    professionaly: {
      imageURL: ['work1.png', 'work2.png', 'work3.jpg'],
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
        summary: 'Test-Driven-Development',
        visitorChat: 'What is Test-Driven-Development ?',
        description: [
          `
    It give priority to Test first for development using 3 steps.
    <ul>
    <li>- Red Lights: Write the test for the expected result </li>
    <li>- Green Lights: Write the code for the test to pass</li>
    <li>- Refactor code and test.</li>
    </ul>
    
    `,
        ],
        tech: 'Typescript, VueJs 3, Vitest, JsDom, Tailwinds',
        imageURL: ['wordle2.png', 'wordle1.png'],
        link: 'https://wordle-game-gg-wev-dev.netlify.app/',
      },
      {
        id: '12',
        date: 'juin 2023',
        name: 'Vocabulary Cards',
        mobileFirst: true,
        summary: 'Web App PWA',
        visitorChat: 'What is PWA ?',
        description: [
          `Like a website, a PWA can run on multiple platforms and devices from a single codebase.`,
          ` 
          Like a platform-specific app, it can be installed on the device, can operate while offline and in the background, 
          and can integrate with the device and with other installed apps`,
        ],
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
        name: 'Mapping Tool ',
        summary: 'Web App PWA',
        visitorChat: 'What is PWA ?',

        mobileFirst: true,
        description: [
          `Like a website, a PWA can run on multiple platforms and devices from a single codebase.`,
          ` 
          Like a platform-specific app, it can be installed on the device, can operate while offline and in the background, 
          and can integrate with the device and with other installed apps`,
        ],

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
      {
        id: '10',
        date: 'july 2022',
        name: 'Web App - Data collection app',
        summary: 'Data collection and processing',
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
        name: 'BeToFeel - fullstack app',
        mobileFirst: false,
        summary: 'Sharing and visualising dynamic emotions',
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
