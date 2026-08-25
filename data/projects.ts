import { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 'learnwise',
    slug: 'learnwise',
    title: 'LearnWise',
    category: 'AI / Machine Learning',
    shortDescription:
      'AI-powered Python learning platform with intelligent tutoring, real-time code review, and adaptive assessment.',
    description:
      'An intelligent learning system engineered to accelerate Python mastery through context-aware AI tutoring, real-time code debugging, adaptive quizzes, and comprehensive student analytics.',
    year: '2024',
    role: 'Full-Stack Architecture & AI Integration',
    status: 'Active Product Build',
    timeline: '2024',
    technologies: ['React.js', 'FastAPI', 'Google Gemini API', 'MongoDB Atlas', 'Python'],
    image: '/images/projects/learnwise.svg',
    thumbnail: '/images/projects/learnwise.svg',
    liveUrl: null,
    githubUrl: null,
    featured: true,
    order: 1,
    features: [
      'AI tutoring for interactive Python guidance',
      'AI code review and intelligent debugging',
      'Adaptive quizzes dynamically generated per learner level',
      'Analytics dashboard for performance metrics',
      'Session and progress tracking across learning modules',
    ],
    caseStudy: {
      overview:
        'LearnWise bridges foundational programming education and modern generative AI assistance, providing immediate feedback loops for learners tackling Python development hurdles.',
      problem:
        'Learning Python independently often leads to syntax roadblocks and conceptual friction without immediate, personalized code review and guided debugging.',
      solution:
        'Engineered an integrated ecosystem pairing a reactive React.js interface with asynchronous FastAPI microservices and Google Gemini API to deliver instantaneous code diagnostics, hints, and dynamic assessments.',
      architecture: [
        'Frontend Layer: React.js interactive editor, student analytics dashboard, and stateful session UI',
        'Backend Services: FastAPI asynchronous microservice endpoints handling validation and code execution queues',
        'AI Engine: Google Gemini API integration for contextual code reasoning and personalized hint generation',
        'Data Store: MongoDB Atlas managing user session states, progress trees, and quiz performance telemetry',
      ],
      keyFeatures: [
        'Contextual AI Tutoring Engine',
        'Real-Time AI Code Debugging & Feedback',
        'Dynamic Adaptive Quizzes',
        'Comprehensive Analytics Dashboard',
        'Session & Learning Progress Tracker',
      ],
    },
  },
  {
    id: 'pdf-craft',
    slug: 'pdf-craft',
    title: 'PDF Craft',
    category: 'Web Application',
    shortDescription:
      'Modern, streamlined PDF utility suite designed for fast, seamless document manipulation.',
    description:
      'A high-performance web utility built for intuitive PDF processing, conversion, and document workflows.',
    year: '2024',
    role: 'Frontend Engineering & UI Design',
    status: 'Live on Vercel',
    timeline: '2024',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/projects/pdf-craft.svg',
    thumbnail: '/images/projects/pdf-craft.svg',
    liveUrl: 'https://pdf-craft-oprs.vercel.app',
    githubUrl: null,
    featured: true,
    order: 2,
    features: [
      'Document manipulation and processing tools',
      'Client-side performance optimizations',
      'Clean, accessible user interface',
      'Instant responsive workflows',
    ],
    caseStudy: {
      overview:
        'PDF Craft is a modern, lightweight web utility designed to solve common document workflows with speed, clean typography, and zero friction.',
      problem:
        'Many existing PDF tools are cluttered with intrusive ads, complex interfaces, or slow server roundtrips for basic document tasks.',
      solution:
        'Constructed a minimal, fast web interface focused on streamlined usability, responsive client-side execution, and clean interaction design.',
      architecture: [
        'Frontend: Next.js and TypeScript for type-safe document component state',
        'Styling: Tailwind CSS design system with minimal editorial tokens',
        'Deployment: Production hosting on Vercel with global edge distribution',
      ],
      keyFeatures: [
        'Streamlined PDF Workflow Utilities',
        'Client-Side Optimizations',
        'Accessible, Minimalist Interface',
        'Zero-Distraction Interaction Model',
      ],
    },
  },
  {
    id: 'metro-times',
    slug: 'metro-times',
    title: 'Metro Times',
    category: 'Web Application',
    shortDescription:
      'Editorial digital publication and luxury watch boutique platform with Porter same-day delivery.',
    description:
      'A modern, premium visual and horology commerce platform designed for curated timepieces, Porter same-day express delivery in Surat, and velvet tray in-store reservations.',
    year: '2024',
    role: 'Frontend Engineering & Visual Design',
    status: 'Live on Vercel',
    timeline: '2024',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/projects/metro-times.svg',
    thumbnail: '/images/projects/metro-times.svg',
    liveUrl: 'https://metro-times-nu.vercel.app',
    githubUrl: null,
    featured: true,
    order: 3,
    features: [
      'Curated editorial layout and watch vault',
      'Same-day Porter express delivery integration',
      'VIP velvet tray in-store pass generator',
      'Modern typography and luxury visual hierarchy',
    ],
    caseStudy: {
      overview:
        'Metro Times explores high-end editorial web design, blending digital publication aesthetics with modern frontend performance.',
      problem:
        'Digital news and lifestyle platforms often suffer from visual clutter, poor typographic hierarchy, and sluggish mobile rendering.',
      solution:
        'Developed a sophisticated, grid-driven publishing experience with generous whitespace, crisp editorial typography, and fluid responsive layouts.',
      architecture: [
        'Frontend: Next.js App Router for server-rendered editorial content',
        'Typography: Fluid clamp() type hierarchy for seamless multi-device scaling',
        'Design System: Tailored Tailwind CSS tokens for editorial contrast and spacing',
      ],
      keyFeatures: [
        'Curated Editorial Layout Structure',
        'Responsive Typography & Dynamic Scaling',
        'Optimized Component Rendering',
        'Modern Content Presentation',
      ],
    },
  },
  {
    id: 'employee-information-portal',
    slug: 'employee-information-portal',
    title: 'Employee Information Portal',
    category: 'Enterprise Software',
    shortDescription:
      'Enterprise management system for streamlined employee records, CRUD operations, and secure data access.',
    description:
      'A robust corporate portal built with C# and .NET with SQL Server database integration, facilitating secure authentication, comprehensive CRUD workflows, and structured reporting.',
    year: '2023',
    role: 'Software Development & Database Integration',
    status: 'Complete',
    timeline: '2023',
    technologies: ['C#', '.NET Framework', 'ASP.NET', 'SQL Server'],
    image: '/images/projects/employee-portal.svg',
    thumbnail: '/images/projects/employee-portal.svg',
    liveUrl: null,
    githubUrl: null,
    featured: false,
    order: 4,
    features: [
      'Employee record management',
      'CRUD operations for organizational directory',
      'Secure login and authentication',
      'Database integration with SQL Server',
      'Reporting and data management interface',
    ],
    caseStudy: {
      overview:
        'A centralized enterprise management portal engineered to handle corporate employee records, administrative operations, and secure authentication.',
      problem:
        'Managing employee records across unstructured spreadsheets leads to data inconsistency, permission gaps, and inefficient updating workflows.',
      solution:
        'Built a structured C# / .NET application integrated with a relational SQL Server database to enforce role-based authentication and reliable CRUD capabilities.',
      architecture: [
        'Application Layer: C# and .NET Framework enterprise architecture',
        'Web Framework: ASP.NET for secure session management and controller routing',
        'Database Layer: Microsoft SQL Server for relational employee data storage',
      ],
      keyFeatures: [
        'Employee Directory & Profile Management',
        'Relational CRUD Data Operations',
        'Secure Role-Based Authentication',
        'Reporting & Administrative Interface',
      ],
    },
  },
  {
    id: 'ai-tic-tac-toe',
    slug: 'ai-tic-tac-toe',
    title: 'AI Tic-Tac-Toe',
    category: 'AI / Machine Learning',
    shortDescription:
      'Interactive game interface featuring intelligent algorithmic decision-making.',
    description:
      'An interactive implementation of Tic-Tac-Toe powered by algorithmic game-state evaluation for intelligent opponent moves.',
    year: '2023',
    role: 'Algorithm Development & Interactive UI',
    status: 'Complete',
    timeline: '2023',
    technologies: ['Python', 'JavaScript'],
    image: '/images/projects/ai-tic-tac-toe.svg',
    thumbnail: '/images/projects/ai-tic-tac-toe.svg',
    liveUrl: null,
    githubUrl: null,
    featured: false,
    order: 5,
    features: [
      'Algorithmic decision making',
      'Interactive turn-based game loop',
      'Game state and win/draw evaluation',
    ],
    caseStudy: {
      overview:
        'An algorithmic game exploration implementing intelligent game-state evaluation to compute optimal counter-moves in turn-based play.',
      architecture: [
        'Engine: Python / JavaScript game logic for state evaluation',
        'Interface: Interactive browser board with responsive turn handling',
      ],
      keyFeatures: [
        'Algorithmic Game-State Evaluation',
        'Interactive Turn-Based Logic',
        'Dynamic Win / Draw Detection',
      ],
    },
  },
  {
    id: 'metro-e-mobility',
    slug: 'metro-e-mobility',
    title: 'Metro E-Mobility',
    category: 'Frontend Engineering',
    shortDescription:
      'Responsive multi-page commercial showcase for electric mobility solutions.',
    description:
      'A multi-page responsive web experience built for an EV enterprise, featuring structured sections for company services, insights blog, visual gallery, and direct customer inquiry.',
    year: '2023',
    role: 'Frontend Web Development',
    status: 'Complete',
    timeline: '2023',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/projects/metro-e-mobility.svg',
    thumbnail: '/images/projects/metro-e-mobility.svg',
    liveUrl: null,
    githubUrl: null,
    featured: false,
    order: 6,
    features: [
      'Home showcase with brand presentation',
      'Services overview for EV products',
      'Blog section for industry insights',
      'Media gallery for vehicle highlights',
      'Interactive contact and inquiry form',
    ],
    caseStudy: {
      overview:
        'A comprehensive multi-page commercial web project crafted for an EV mobility venture, organizing commercial offerings, media, and customer communication.',
      architecture: [
        'Markup & Styling: Semantic HTML5 and custom modular CSS3',
        'Interactivity: Vanilla JavaScript for mobile navigation and dynamic gallery controls',
      ],
      keyFeatures: [
        'Multi-Page Company Showcase (Home, Services, Blog, Gallery, Contact)',
        'Custom Responsive CSS Architecture',
        'Interactive Media Gallery',
      ],
    },
  },
];
