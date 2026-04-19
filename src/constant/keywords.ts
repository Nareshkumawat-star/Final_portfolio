const names = [
  "Naresh Kumawat",
  "Naresh Kumawat Portfolio",
  "Naresh Architect",
  "Naresh Kumawat Jaipur",
  "Naresh Kumawat Rajasthan",
];

const roles = [
  "Software Architect",
  "3D Web Developer",
  "Full Stack Developer",
  "Next.js Developer",
  "Frontend Engineer",
  "Creative Technologist",
  "System Designer",
  "WebGL Expert",
  "Software Engineer",
  "Creative Developer",
  "UI/UX Architect"
];

const skills = [
  // Web Frameworks & Libraries
  "Next.js 15",
  "React.js",
  "Three.js",
  "WebGL",
  "React Three Fiber",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Express.js",

  // Database & Backend
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Prisma ORM",
  "System Architecture",
  "Microservices",
  "API Design",

  // Infrastructure & Tools
  "Google Cloud Platform",
  "DevOps",
  "Docker",
  "Kubernetes",
  "CI/CD Pipelines",
  "Git & GitHub",
  "Performance Engineering"
];

const projects = [
  "Nexus Architect Portfolio",
  "3D Immersive Web Experiences",
  "Enterprise Software Solutions",
  "Scalable Web Foundations",
  "Google Arcade Projects",
  "Architecture Design Patterns"
];

const locations = [
  "India",
  "Jaipur",
  "Rajasthan",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Remote",
  "Worldwide"
];

const longTail = [
  "Hire Software Architect in India",
  "Best 3D Web Developer Portfolio",
  "Expert Next.js Architect for Hire",
  "Immersive 3D Portfolio Developer",
  "High Performance Web Engineering",
  "Scaled Software Solutions Architect",
  "Creative Technologist for Startups",
  "Freelance Software Architect India",
  "Expert WebGL and Three.js Solutions"
];

export const Keywords = [
  ...names,
  ...roles,
  ...skills,
  ...projects,
  ...locations,
  ...longTail,

  ...roles.flatMap((role) => locations.map((loc) => `${role} in ${loc}`)),
  ...skills.map((skill) => `${skill} Developer`),
  ...skills.map((skill) => `${skill} Expert`),
  ...skills.map((skill) => `Hire ${skill} Developer`),
];

