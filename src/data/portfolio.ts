import { Experience, Project, Skill, NavLink } from '../types';

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'skills', label: 'Technical Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const experiences: Experience[] = [
  {
    id: 'deloitte',
    date: 'August 2025',
    title: 'Data Analytics Job Simulation',
    company: 'Deloitte Australia - Forage',
    type: 'simulation',
    description: 'Completed Deloitte\'s comprehensive Data Analytics virtual experience program, gaining hands-on exposure to real-world data analytics challenges and consulting methodologies used by one of the world\'s leading professional services firms.',
    achievements: [
      'Applied advanced data analytics techniques to business problems',
      'Developed insights using Tableau for data visualization',
      'Performed data cleaning, analysis, and interpretation',
      'Created professional presentations for client deliverables',
      'Gained exposure to consulting best practices and methodologies',
    ],
    certificate: {
      title: 'Deloitte Data Analytics Job Simulation',
      description: 'Credential ID: FBf6vW4FzdCRNTGpwj',
      provider: 'Verified by Forage Platform',
      pdfPath: '/assets/Deloitte Data Analytics Job Simulation.pdf',
    },
  },
  {
    id: 'edify',
    date: 'June - July 2025',
    title: 'Data Science & Data Analytics Intern',
    company: 'Edify Techno Solutions',
    type: 'internship',
    grade: 'A+ Excellence',
    description: 'Successfully completed a comprehensive internship program focused on Data Science and Data Analytics under the guidance of Business Development & Human Resource department. Demonstrated exceptional analytical skills and keen interest in data-driven solutions.',
    achievements: [
      'Mastered Power BI fundamentals and advanced analytics techniques',
      'Developed interactive dashboards and data visualizations',
      'Applied statistical analysis and machine learning concepts',
      'Completed hands-on projects in business intelligence',
      'Earned A+ grade for outstanding performance and dedication',
    ],
    certificate: {
      title: 'Data Science & Data Analytics Internship',
      description: 'Grade: A+ Excellence',
      provider: 'Edify Techno Solutions',
      pdfPath: '/assets/Edify Internship.pdf',
    },
    relatedWork: {
      title: 'Power BI Basics Repository',
      description: 'Practical exercises and projects completed during internship',
      link: 'https://github.com/earnest-s/Earnest-Power-BI-Basics',
    },
  },
  {
    id: 'ea',
    date: 'August 2025',
    title: 'Product Management Job Simulation',
    company: 'Electronic Arts - Forage',
    type: 'simulation',
    description: 'Completed Electronic Arts\' Product Management virtual experience program, gaining insights into product strategy, user experience design, and data-driven decision making in the gaming industry from one of the world\'s leading video game companies.',
    achievements: [
      'Analyzed product performance metrics and user engagement data',
      'Developed product roadmaps and strategic recommendations',
      'Applied data analytics to improve user experience and retention',
      'Created product proposals based on market research and data insights',
      'Gained experience in agile product management methodologies',
    ],
    certificate: {
      title: 'Product Management Job Simulation',
      description: 'Credential ID: wK5u5naxZnTDKGpr',
      provider: 'Verified by Forage Platform',
      pdfPath: '/assets/Electronic Arts Product Management Job Simulation.pdf',
    },
  },
];

export const projects: Project[] = [
  {
    id: 'iot-health',
    title: 'IoT Patient Health Monitoring',
    description: 'Real-time monitoring system for bedridden patients using IoT, improving emergency response time by 40%.',
    icon: 'fa-chart-line',
    githubLink: 'https://github.com/earnest-s/Smart-IoT-based-remote-patient-health-monitoring-system.git',
    tags: ['IoT', 'Arduino', 'Real-time Monitoring'],
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot powered by Gemini',
    description: 'Conversational chatbot using Gemini API, featuring real-time NLP and a custom UI/UX front-end.',
    icon: 'fa-microchip',
    githubLink: 'https://github.com/earnest-s/Ai_ChatBot.git',
    tags: ['AI', 'NLP', 'Gemini API'],
  },
  {
    id: 'crop-monitoring',
    title: 'Intelligent Crop Monitoring System',
    description: 'Python + Power BI + IoT sensors to predict crop health, reduce waste, and visualize trends via dashboards.',
    icon: 'fa-brain',
    githubLink: 'https://github.com/earnest-s/IntelligentCropMonitoringSystem.git',
    tags: ['IoT', 'Python', 'Power BI', 'Machine Learning'],
  },
];

export const skills: Skill[] = [
  {
    id: 'data-analytics',
    category: 'data',
    title: 'Data Analysis & Visualization',
    icon: 'fa-chart-line',
    items: ['Power BI', 'Tableau', 'Python (Pandas, NumPy)', 'Matplotlib'],
  },
  {
    id: 'programming',
    category: 'dev',
    title: 'Programming',
    icon: 'fa-code',
    items: ['Python', 'SQL'],
  },
  {
    id: 'iot',
    category: 'dev',
    title: 'IoT Development',
    icon: 'fa-microchip',
    items: ['Arduino', 'Raspberry Pi', 'Sensors Integration'],
  },
  {
    id: 'database',
    category: 'devops',
    title: 'Database',
    icon: 'fa-database',
    items: ['PostgreSQL', 'MongoDB'],
  },
  {
    id: 'version-control',
    category: 'devops',
    title: 'Version Control',
    icon: 'fa-git-alt',
    items: ['Git', 'GitHub'],
  },
  {
    id: 'tools',
    category: 'tools',
    title: 'Tools',
    icon: 'fa-laptop-code',
    items: ['Visual Studio Code', 'Jupyter Notebook'],
  },
];

export const typingPhrases = [
  'Data Analyst',
  'IoT Developer',
  'AI Enthusiast',
  'Problem Solver',
];
