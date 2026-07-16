// Single source of truth for portfolio content. Powers both static
// components and the AI assistant so answers can never drift from what
// is actually shown on the site.

export const PROFILE = {
  name: "Bhakti Bhosle",
  title: "CSE (AI & ML) student · aspiring Software Engineer",
  location: "Jaipur, India",
  email: "bhaktibhosle123@gmail.com",
  linkedin: "https://linkedin.com/in/bhakti-bhosle",
  github: "https://github.com/bhakti263",
  leetcode: "https://leetcode.com/u/bhakti263",
  summary:
    "Computer Science Engineering student specialising in Artificial Intelligence & Machine Learning at Manipal University Jaipur. I build intelligent, scalable systems — from full-stack AI platforms to agentic LLM pipelines and responsive web applications.",
};

export const EDUCATION = [
  {
    degree: "B.Tech CSE (AI & ML)",
    school: "Manipal University Jaipur",
    year: "2023 – 2027",
    score: "CGPA 8.23",
    location: "Jaipur, India",
  },
  {
    degree: "Class XII",
    school: "Narayana Junior College",
    year: "2021 – 2023",
    score: "93%",
    location: "Hyderabad, India",
  },
  {
    degree: "Class X",
    school: "DAV Public School",
    year: "May 2021",
    score: "91%",
    location: "",
  },
];

export const SKILLS = {
  Languages: ["C++", "Python", "MySQL", "JavaScript", "HTML/CSS", "Node.js"],
  Frameworks: [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Streamlit",
    "Angular",
    "Express.js",
  ],
  "AI & ML": [
    "LLMs",
    "RAG",
    "Agentic Pipelines",
    "Prompt Engineering",
    "NLP",
    "Machine Learning",
    "Deep Learning",
  ],
  "Cloud & Tools": [
    "Microsoft Azure (AI Fundamentals)",
    "Firebase",
    "Git",
    "GitHub Copilot",
    "Docker",
  ],
  Methodologies: ["SDLC", "Agile (Scrum)"],
  "Core CS": ["OOP", "Operating Systems", "DBMS", "Computer Networks", "DSA"],
};

export const PROJECTS = [
  {
    idx: "P/01",
    title: "AI Interview Simulator",
    subtitle: "Full-stack AI Interview Platform",
    year: "2025",
    description:
      "Full-stack AI interview platform with dual interfaces — a Streamlit web app (472-line modular codebase with session state management) and a CLI app — featuring real-time audio recording, transcript display, and a ChatGPT-style chat UI. Engineered a multi-turn agentic pipeline using LiteLLM (Mistral / OpenAI) that parses a candidate's PDF résumé, auto-generates JD-specific questions, and dynamically produces follow-up questions from prior answers via async LLM calls.",
    tech: ["Python", "Streamlit", "LiteLLM", "Speechmatics", "Docker"],
    github: "https://github.com/bhakti263",
    live: "",
  },
  {
    idx: "P/02",
    title: "Krishi Mitr",
    subtitle: "Agricultural Web Platform",
    year: "2024",
    description:
      "Developed and deployed an 8-page platform (crop advisory, weather API, mandi prices, news) in HTML/CSS/JavaScript — live on Firebase Hosting. Integrated Firebase Auth and Realtime Database for secure login and role-based data access; trained YOLOv12 on 23,000+ plant images for crop disease detection; followed SDLC across 26 commits using GitHub Copilot.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase", "YOLOv12"],
    github: "https://github.com/bhakti263",
    live: "https://krishimitra-in.web.app",
  },
];

export const EXPERIENCE = [
  {
    role: "Student Placement Coordinator",
    org: "Manipal University Jaipur",
    period: "2025 – Present",
    bullets: [
      "Primary liaison for 1,800+ CSE-AIML students — managing recruiter communication, scheduling drives, facilitating mock interviews, and supporting resume reviews using Agile-style planning.",
    ],
  },
];

export const CERTIFICATIONS = [
  { name: "Microsoft Azure AI Fundamentals", issuer: "Microsoft" },
  { name: "Cisco Python Essentials 1 & 2", issuer: "Cisco" },
  { name: "Oracle Database Foundations & Design", issuer: "Oracle" },
  { name: "NPTEL — Design and Analysis of Algorithms", issuer: "NPTEL" },
  { name: "NPTEL — Machine Learning", issuer: "NPTEL" },
  { name: "NPTEL — Deep Learning", issuer: "NPTEL" },
  { name: "CodeChef — DSA Lab Program", issuer: "CodeChef" },
  {
    name: "Coursera — Building RESTful APIs with Node.js & Express",
    issuer: "Coursera",
  },
  { name: "Coursera — Frontend Development using Angular", issuer: "Coursera" },
];

/* ------------------------ AI assistant knowledge ----------------------- */

const linkLine = () =>
  `- Email: [${PROFILE.email}](mailto:${PROFILE.email})\n- LinkedIn: [bhakti-bhosle](${PROFILE.linkedin})\n- GitHub: [bhakti263](${PROFILE.github})\n- LeetCode: [bhakti263](${PROFILE.leetcode})`;

const projectsMd = () =>
  PROJECTS.map(
    (p) =>
      `**${p.title}** — *${p.subtitle}* (${p.year})\n${p.description}\n\n\`${p.tech.join(" · ")}\`${
        p.live ? `\n\n[Live](${p.live}) · [Code](${p.github})` : `\n\n[Code](${p.github})`
      }`,
  ).join("\n\n---\n\n");

const skillsMd = () =>
  Object.entries(SKILLS)
    .map(([k, v]) => `- **${k}** — ${v.join(", ")}`)
    .join("\n");

const educationMd = () =>
  EDUCATION.map(
    (e) => `- **${e.degree}**, ${e.school} · *${e.year}* — ${e.score}`,
  ).join("\n");

const experienceMd = () =>
  EXPERIENCE.map(
    (e) =>
      `**${e.role}** — ${e.org} · *${e.period}*\n${e.bullets.map((b) => `- ${b}`).join("\n")}`,
  ).join("\n\n");

const certsMd = () => CERTIFICATIONS.map((c) => `- ${c.name}`).join("\n");

export const SUGGESTED_PROMPTS = [
  "Tell me about Bhakti",
  "Projects",
  "Skills",
  "Resume",
  "Contact",
];

/** Lightweight, deterministic answer engine — only uses portfolio data. */
export function answerQuery(raw: string): string {
  const q = raw.toLowerCase().trim();

  const has = (...k: string[]) => k.some((x) => q.includes(x));

  if (!q) return "Ask me anything about Bhakti's portfolio — try one of the suggestions below.";

  if (has("hi", "hello", "hey") && q.length < 12) {
    return `Hi! I'm Bhakti's portfolio assistant. Ask me about her **projects**, **skills**, **experience**, **certifications**, or how to **contact** her.`;
  }

  if (has("about", "who", "bhakti", "yourself", "intro", "summary", "background")) {
    return `### About ${PROFILE.name}\n${PROFILE.summary}\n\n- **Currently:** ${PROFILE.title}\n- **Location:** ${PROFILE.location}\n- **Currently pursuing:** B.Tech CSE (AI & ML) at Manipal University Jaipur (CGPA 8.23)`;
  }

  if (has("project", "krishi", "interview simulator", "portfolio work", "built", "work")) {
    return `### Featured Projects\n\n${projectsMd()}`;
  }

  if (has("skill", "tech stack", "technolog", "language", "framework", "tools")) {
    return `### Skills\n${skillsMd()}`;
  }

  if (has("education", "college", "university", "school", "cgpa", "degree", "manipal")) {
    return `### Education\n${educationMd()}`;
  }

  if (has("experience", "placement", "coordinator", "role", "internship", "job")) {
    return `### Experience\n\n${experienceMd()}\n\n*No prior industry internships listed on the résumé yet — actively open to SDE / AI-ML opportunities.*`;
  }

  if (has("cert", "certification", "azure", "nptel", "cisco", "oracle", "coursera", "codechef")) {
    return `### Certifications\n${certsMd()}`;
  }

  if (has("resume", "cv", "download")) {
    return `You can request Bhakti's résumé directly:\n\n- Email: [${PROFILE.email}](mailto:${PROFILE.email})\n- LinkedIn: [bhakti-bhosle](${PROFILE.linkedin})`;
  }

  if (has("contact", "email", "reach", "hire", "linkedin", "github", "leetcode", "connect")) {
    return `### Contact\n${linkLine()}`;
  }

  if (has("ai", "ml", "llm", "rag", "agent")) {
    return `Bhakti's AI/ML focus includes **LLMs, RAG, Agentic Pipelines, Prompt Engineering, NLP**, and classical **ML/DL**. She's applied these in the **AI Interview Simulator** (LiteLLM-powered multi-turn agentic pipeline) and **Krishi Mitr** (YOLOv12 crop-disease model on 23K+ images).`;
  }

  return `I can only answer using information from Bhakti's portfolio and résumé, and I couldn't find a direct match for that. Try asking about:\n\n- **About** Bhakti\n- **Projects** (AI Interview Simulator, Krishi Mitr)\n- **Skills** or **Technologies**\n- **Education** or **Certifications**\n- **Experience**\n- **Contact** / Resume`;
}
