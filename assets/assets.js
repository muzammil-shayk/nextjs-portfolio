import user_image from './user-image.png';

export const assets = { user_image };

// Copy comes from docs/career/portfolio-copy.md (Iris). Facts are checked
// against the project repos; link public repos and live URLs only.

export const site = {
  name: 'Muhammad Muzammil',
  role: 'Full Stack Engineer',
  url: 'https://www.m-muzammil.dev',
  email: 'm.muzammil47@protonmail.com',
  location: 'Lahore, Pakistan',
  availability: 'Available for work',
  openTo:
    "I'm open to internships, part-time and junior roles that fit alongside my studies, remote or on-site in Lahore.",
  workModes: 'Remote or on-site in Lahore',
  github: 'https://github.com/muzammil-shayk',
  linkedin: 'https://www.linkedin.com/in/muhammad-muzammil-8771a4309/',
  cv: '/MuzammilCV.pdf',
  summary: 'I build apps for the web, your phone and your desktop.',
};

export const hireHref = `mailto:${site.email}?subject=${encodeURIComponent(
  'Work with Muhammad Muzammil'
)}`;

// Hero dive captions, one per layer of the chip.
export const chapters = [
  [
    '01',
    'Interface',
    'React and Next.js on the web, React Native and Expo on phones.',
  ],
  ['02', 'Engine', 'Node, Express and NestJS APIs that web and mobile share.'],
  ['03', 'Data', 'MongoDB and SQL, modelled to fit the problem.'],
  [
    '04',
    'Platforms',
    'Electron desktop apps and AI tooling, down to C++ roots.',
  ],
];

// `link` = live site or download page, `repo` = public source. Both are
// optional: a card with neither shows `note` (default "Private build").
export const workData = [
  {
    title: 'Marginalia',
    problem:
      'Reading and annotating across PDF, EPUB, DOCX and TXT usually means several apps.',
    platform: 'Desktop · Co-developed',
    summary:
      'Co-developed one desktop app to read and mark up PDF, EPUB, DOCX and TXT, with notes export, backups and self-updates. Released through v2.6.0.',
    stack: ['Electron', 'React', 'TypeScript', 'Vite', 'GitHub Actions'],
    bgImage: '/work/marginalia.svg',
    link: 'https://github.com/muzammil-shayk/Marginalia/releases/latest',
    linkLabel: 'Download',
    repo: 'https://github.com/muzammil-shayk/Marginalia',
  },
  {
    title: 'Byters Mobile',
    problem:
      "Byters' reviewers needed the community on their phones, not only in a browser.",
    platform: 'Mobile · Team project',
    summary:
      'Team project with friends: an Expo app for iOS and Android with secure token login and the full review flow, on the same REST API as the site.',
    stack: ['React Native', 'Expo Router', 'TypeScript', 'Redux Toolkit'],
    bgImage: '/work/byters-mobile.svg',
  },
  {
    title: 'Byters Web',
    problem:
      'Diners in Pakistan had no single community place to find and review restaurants.',
    platform: 'Web · Team project',
    summary:
      "Team project with friends: one place for Pakistan's diners to find and review restaurants, with leaderboards, badges and AI review summaries.",
    stack: ['Next.js', 'MongoDB', 'Redux Toolkit', 'Cloudinary', 'AI APIs'],
    bgImage: '/work/byters.svg',
    link: 'https://byters.site',
  },
  {
    title: 'AirBeam',
    problem:
      'Sending a file to someone nearby should not need accounts or chat apps.',
    platform: 'Web · Full stack',
    summary:
      'Send up to 10 files with a key or QR code, no account, then download them as one ZIP. Everything deletes after 5 minutes.',
    stack: ['React', 'Express', 'MongoDB GridFS', 'Tailwind'],
    bgImage: '/work/airbeam.svg',
    link: 'https://airbeam.onrender.com/',
    repo: 'https://github.com/muzammil-shayk/AirBeam',
  },
  {
    title: 'i penned it!!!',
    problem: 'Typed text looks cold next to a real handwritten page.',
    platform: 'Web · Canvas',
    summary:
      "Type text and get it on an A4 page in a real person's handwriting, with ink colours and per-line random placement.",
    stack: ['JavaScript', 'Canvas', 'Python', 'OpenCV', 'GitHub Actions'],
    bgImage: '/work/handwritten.svg',
    link: 'https://i-penned-it.vercel.app',
  },
  {
    title: 'AirQR',
    problem: 'QR generators are slow, ad-heavy or send your data to a server.',
    platform: 'Web · Next.js',
    summary:
      'Fast, ad-free QR codes for URLs, WiFi and vCards, made in the browser, with a free public API.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    bgImage: '/work/airqr.svg',
    link: 'https://airqr.vercel.app',
    repo: 'https://github.com/muzammil-shayk/AirQR',
  },
  {
    title: 'SlingKick',
    platform: 'Game · Collaborative',
    problem: 'Game jam: make a game in a short time as a team.',
    summary:
      'A football-themed puzzle game where players navigate obstacles to score goals. Made at the M-Labs Rookie Game Jam 2024; I did the gameplay logic, C# scripts, object setup and tuning.',
    stack: ['Unity', 'C#'],
    bgImage: '/work/slingkick.svg',
    note: 'Game jam build',
  },
  {
    title: 'This portfolio',
    problem: 'A list of skills does not show range; a working site does.',
    platform: 'Web · 3D',
    summary:
      'A one-page site with a scroll-driven 3D hero: a dive into a chip, from silicon up to the stack.',
    stack: ['Next.js', 'three.js', 'GSAP', 'Tailwind'],
    bgImage: '/work/portfolio.svg',
    link: 'https://www.m-muzammil.dev',
    repo: 'https://github.com/muzammil-shayk/nextjs-portfolio',
  },
];

export const serviceData = [
  {
    title: 'Web apps',
    description:
      'Sites and web apps in Next.js and React, with Express or Next.js APIs and MongoDB. Auth, forms, dashboards, admin tools.',
  },
  {
    title: 'Mobile apps',
    description:
      'React Native with Expo for iOS and Android from one codebase, talking to your existing backend.',
  },
  {
    title: 'Desktop apps',
    description:
      'Electron apps for Windows and macOS, with installers and auto-update through GitHub Actions.',
  },
  {
    title: 'AI-assisted builds',
    description:
      'Features that call AI APIs only when the user asks, and a workflow where coding agents draft and I do the review, tests and release.',
  },
];

export const infoList = [
  {
    title: 'Languages',
    description: 'JavaScript, TypeScript, C++, C#, SQL',
  },
  {
    title: 'Frontend',
    description:
      'React, Next.js, Angular, Tailwind CSS, GSAP, three.js, React Three Fiber',
  },
  {
    title: 'Backend & data',
    description: 'Node.js, Express, NestJS, REST APIs, MongoDB, SQL',
  },
  {
    title: 'Mobile & desktop',
    description: 'React Native, Expo, Electron, Unity',
  },
  {
    title: 'Tooling & AI',
    description:
      'Git, GitHub Actions, Vercel, LLM APIs (Gemini, Groq), AI-assisted development',
  },
];

export const toolsData = [
  'JavaScript',
  'TypeScript',
  'C++',
  'C#',
  'React',
  'Next.js',
  'Angular',
  'Node.js',
  'Express',
  'NestJS',
  'MongoDB',
  'SQL',
  'Tailwind',
  'React Native',
  'Expo',
  'Electron',
  'Unity',
  'GSAP',
  'three.js',
  'GitHub Actions',
  'Vercel',
  'AI / LLMs',
];
