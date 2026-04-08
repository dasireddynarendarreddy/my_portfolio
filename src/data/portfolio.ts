export const personalInfo = {
  name: 'Narendar Reddy',
  title: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'React Specialist', 'Java Engineer', 'UI/UX Enthusiast'],
  email: 'narendarreddy2002@gmail.com',
  github: 'https://github.com/dasireddynarendarreddy',
  linkedin: 'https://linkedin.com',
  bio: "I'm a passionate Full Stack Developer who crafts exceptional digital experiences. I specialize in building scalable, performant web applications with clean architecture and intuitive design.",
  bioExtended: "From React frontends to Java backends, I bridge the gap between beautiful UI and robust engineering — turning complex problems into elegant, production-ready solutions.",
  location: 'India',
  available: true,
};

export const stats = [
  { label: 'Projects Built', value: '10+' },
  { label: 'Technologies', value: '12+' },
  { label: 'GitHub Repos', value: '20+' },
  { label: 'Years Coding', value: '3+' },
];

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, cart management, authentication, and order tracking. Built with a modern full-stack architecture.',
    longDescription: 'Full-stack e-commerce solution featuring product catalog, user authentication, cart & checkout flow, and order management using Prisma ORM and MongoDB.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=450&fit=crop&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Prisma'],
    liveUrl: 'https://mynextjsproject-phi.vercel.app/',
    githubUrl: 'https://github.com/dasireddynarendarreddy/mynextjsproject',
    featured: true,
    color: '#6366f1',
  },
  {
    id: 2,
    title: 'Collaborative Drawing Board',
    description: 'A real-time collaborative canvas app where users can draw, annotate, and store their artwork using Firebase for sync.',
    longDescription: 'Real-time drawing application with collaborative features, shape tools, color picker, undo/redo, and persistent storage via Firebase Firestore.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=450&fit=crop&q=80',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'Canvas API'],
    liveUrl: 'https://drawboard-ten.vercel.app/',
    githubUrl: 'https://github.com/dasireddynarendarreddy/drawboard',
    featured: true,
    color: '#06b6d4',
  },
  {
    id: 3,
    title: 'Keep Notes + PDF Export',
    description: 'A notes manager with text-to-speech (Amazon Polly), PDF export, and a clean Google Keep-inspired UI.',
    longDescription: 'Notes management application with Amazon Polly TTS integration, PDF export, rich text editing, and local persistence.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=450&fit=crop&q=80',
    tags: ['React', 'Tailwind CSS', 'Amazon Polly', 'Material UI'],
    liveUrl: 'https://makenotesandpdf.netlify.app/',
    githubUrl: 'https://github.com/dasireddynarendarreddy/makenotes',
    featured: false,
    color: '#10b981',
  },
  {
    id: 4,
    title: 'AI Chat Bot',
    description: 'A GPT/Gemini-style chatbot with history tracking, response navigation, and features beyond standard LLM interfaces.',
    longDescription: 'AI-powered chat application with conversation history, delete/navigate responses, session persistence via localStorage, and a polished chat UI.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop&q=80',
    tags: ['React', 'Tailwind CSS', 'Gemini API', 'Material UI'],
    liveUrl: 'https://geminigpt1.netlify.app/',
    githubUrl: 'https://github.com/dasireddynarendarreddy/chatbot',
    featured: true,
    color: '#f59e0b',
  },
  {
    id: 5,
    title: 'AI-Powered Quiz App',
    description: 'Gemini-powered quiz generator that creates custom MCQs based on topic, difficulty, and count — with instant scoring.',
    longDescription: 'Dynamic quiz application where Gemini API generates programming questions based on user-selected topic, difficulty level, and question count. Features real-time answer validation and score tracking.',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=450&fit=crop&q=80',
    tags: ['React', 'Tailwind CSS', 'Gemini API', 'shadcn/ui'],
    liveUrl: 'https://geminiquizapp.netlify.app/',
    githubUrl: 'https://github.com/dasireddynarendarreddy/QuiZApp',
    featured: false,
    color: '#ec4899',
  },
];

export const skillCategories = [
  {
    label: 'Frontend',
    icon: '⚡',
    skills: [
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 85, icon: '📘' },
      { name: 'Next.js', level: 75, icon: '▲' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
    ],
  },
  {
    label: 'Backend',
    icon: '🛠',
    skills: [
      { name: 'Node.js', level: 80, icon: '🟢' },
      { name: 'Java', level: 80, icon: '☕' },
      { name: 'Spring Boot', level: 70, icon: '🌱' },
      { name: 'GraphQL', level: 70, icon: '🔗' },
    ],
  },
  {
    label: 'Tools & Cloud',
    icon: '☁️',
    skills: [
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Firebase', level: 75, icon: '🔥' },
      { name: 'Git & GitHub', level: 90, icon: '🐙' },
      { name: 'Prisma ORM', level: 75, icon: '🔺' },
    ],
  },
];

export const experiences = [
  {
    company: 'Freelance / Self-Employed',
    role: 'Full Stack Developer',
    duration: '2023 — Present',
    type: 'Full-time',
    description: 'Designed and built production web applications end-to-end. Delivered 5+ projects including AI-integrated apps, e-commerce platforms, and real-time collaboration tools.',
    highlights: ['Built AI-powered quiz & chatbot apps using Gemini API', 'Developed full e-commerce platform with Prisma + MongoDB', 'Reduced page load times by 35% through code-splitting & lazy loading'],
    color: '#6366f1',
  },
  {
    company: 'Open Source & Personal Projects',
    role: 'Frontend Engineer',
    duration: '2021 — 2023',
    type: 'Self-Directed',
    description: 'Explored modern frontend ecosystems. Built collaborative tools, note-taking apps, and contributed to React ecosystem projects while mastering TypeScript and advanced patterns.',
    highlights: ['Mastered React, TypeScript, and state management patterns', 'Integrated Amazon Polly TTS in a production notes application', 'Built real-time Canvas drawing board with Firebase sync'],
    color: '#06b6d4',
  },
];

export const techStack = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
  'Node.js', 'Java', 'Spring Boot', 'MongoDB',
  'Firebase', 'GraphQL', 'Prisma', 'Git',
  'Framer Motion', 'REST APIs', 'Gemini API', 'Vercel',
];
