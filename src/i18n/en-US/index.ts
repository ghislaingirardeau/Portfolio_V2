export default {
  navBar: {
    index: 'Home',
    projects: 'My works',
    services: 'My services',
    aboutMe: 'About me',
  },
  index: {
    me: {
      p1: 'Hello,',
      p2: "I'm Ghislain,",
      p3: 'Web Developer',
    },
    offer: {
      hService: 'How can I help you ?',
      textService:
        "You have a web project or a business to digitalize... <br> but you don't know where and how to start... ?<br> Find here, what kind of solution and assistance I can bring to you ! ",
      hWork: 'Knowing me through my works',
      textWork:
        'You are probably familiar with the web technology... <br> And if you want to know what I can offer <br> Look at my projects and see which tools I work with !',
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
    h2commit: 'My work commitment...',
    personal: {
      h3: '...Personally',
      text: "After more than 10 years working as a manager for an international sports brand (Intersport), I decided to explore one of my other hobbie which is IT. I took part in a six-month training course to become a web developer. As an athlete and a web developer, I'm eager to work on any interesting projects that I can bring to this intersection of my skills and knowledge (sports and web development).",
    },
    professionaly: {
      h3: '...Professionally',
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
      description:
        '<ul> <li> Projects presentation and willingness</li> <li>Define your need, strategy and resource</li><li> What and how can I help you in your digitalisation process</li><li>First feedback on your projects sharing about my knowledge/skills fitting or not your project</li> </ul>',
    },
    stepTwo: {
      h3: 'Step 2',
      description:
        "<ul> <li>Get the specific details (need, scope and features) for your new application</li> <li>Possibilities, solutions and recommendations regarding your strategy</li><li> Offer, deadlines and clear detail about the expected outcome for both of us</li><li>Questions and answers if it's still not clear</li> </ul>",
    },
    stepThree: {
      h3: 'Step 3',
      description:
        '<ul> <li>After quote validation, project development start</li> <li>Steps planifications to see the project forwards </li><li> Weekly report </li><li>Exchange and feedback regularly to get the first impressions or made corrections</li> </ul>',
    },
    footer: 'Schedule a visio conference',
  },
  projects: [
    {
      id: '13',
      date: 'march 2024 - Today',
      name: `Wordle Game`,
      mobileFirst: true,
      summary: 'Create a mini game (wordle) in Test-Driven-Development',
      description: `
      Creation of the game giving priority to Test first using 3 steps.
      <ul>
      <li>Red Lights: Write the test for the expected result </li>
      <li>Green Lights: Write the code for the test to pass</li>
      <li>Refactor code and test.</li>
      </ul>`,
      tech: 'Typescript, VueJs 3, Vitest, JsDom, Tailwinds',
      imageURL: ['wordle1.png', 'wordle2.png'],
      link: 'https://wordle-game-gg-wev-dev.netlify.app/',
    },
    {
      id: '12',
      date: 'juin 2023',
      name: 'Mon Vocabulaire en carte',
      mobileFirst: true,
      summary: 'Building a web application with PWA, Typescript & Nuxt 3',
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
      summary: 'Mobile free Mapping App',
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
        'mapping4.PNG',
        'mapping5.PNG',
        'mapping6.PNG',
        'mapping7.PNG',
        'mapping8.PNG',
        'mapping9.PNG',
      ],
      link: 'https://map-tool-village.netlify.app/',
    },
    {
      id: '11',
      date: 'january 2023',
      name: 'Weather Mobile App',
      summary: 'Dicsover & Explore React Native',
      mobileFirst: true,
      description:
        'Explore React Native & Expo components, set up a React navigation, get API data. Play with additional components: camera, save files, picker, env, touch event, animation...',
      tech: 'React native, Expo Go, Ionicons, AsyncStorage, GitHub',
      video: 'reactNative.mp4',
    },
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
        'community_tool1.png',
        'community_tool2.png',
        'community_tool3.png',
        'community_tool4.png',
      ],
    },
    // {
    //   id: "9",
    //   date: "mai 2022",
    //   name: "Multi languages e-commerce website",
    //   summary: "E-commerce website template",
    //   description:
    //     "Understand how to integrate a dynamic database related to the user language, create a dynamic shopping table summary and add an API Stripe payment simulation, currency conversion feature",
    //   tech: "Node js, Express, Axios, Vue js, Nuxt js, i18n, Vuetify, Stripe, GitHub, Mysql workbench, railway",
    //   imageURL: ["e-commerce1.png", "e-commerce2.png"],
    // },

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
        'beToFeelsign.PNG',
        'beToFeelMenu.PNG',
        'beToFeeling.PNG',
        'beToFeelShare.PNG',
        'beToFeelShareAsk.PNG',
        'beToFeelTree.PNG',
        'beToFeelUser.PNG',
      ],
      link: 'https://betofeel.netlify.app/',
    },
    {
      id: '6',
      date: 'may 2021',
      name: 'Groupomania',
      summary: 'Build a Full-Stack Solution',
      mobileFirst: false,
      description:
        "Analyse a client's requirements to define the scope and features of a new application. Build a full-stack solution using a front-end framework, including a SQL database.",
      tech: 'Mysql, Node js, Express, bcrypt, multer, bootstrap, Vue js, GitHub',
      imageURL: [
        'groupomania_log.PNG',
        'groupomania_signup.PNG',
        'groupomania_home.PNG',
        'groupomania_delete.PNG',
        'groupomania_forum.PNG',
        'groupomania_update.PNG',
        'groupomania_empty.PNG',
      ],
    },
    {
      id: '4',
      date: 'april 2021',
      name: 'Orinoco',
      summary: 'Build an eCommerce Website',
      mobileFirst: false,
      description:
        'Use the JavaScript programming language to interact with users and external services. Apply a test-driven approach to web development.',
      tech: 'Javascript, bootstrap, Regex, GitHub',
      imageURL: [
        'orinoco_accueil.PNG',
        'orinoco_produit.PNG',
        'orinoco_basket.PNG',
        'orinoco_forms.PNG',
        'orinoco_confirm.PNG',
      ],
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
