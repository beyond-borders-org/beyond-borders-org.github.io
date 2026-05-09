import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RESEARCH_DIR = path.join(process.cwd(), "content", "research");

export interface ResearchProject {
  slug: string;
  title: string;
  status: "published" | "exploring" | "planned";
  tag: string;
  venue: string;
  authors: string;
  date: string;
  excerpt: string;
  highlights: string[];
  image?: string;
  github?: string;
  demo?: string;
  paper?: string;
  content: string;
}

export function getAllProjects(): ResearchProject[] {
  if (!fs.existsSync(RESEARCH_DIR)) return [];

  const files = fs.readdirSync(RESEARCH_DIR).filter((f) => f.endsWith(".md"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(RESEARCH_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug || file.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      status: data.status || "planned",
      tag: data.tag || "",
      venue: data.venue || "",
      authors: data.authors || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      highlights: data.highlights || [],
      image: data.image,
      github: data.github,
      demo: data.demo,
      paper: data.paper,
      content,
    } as ResearchProject;
  });

  // Published first, then exploring, then planned
  const order = { published: 0, exploring: 1, planned: 2 };
  return projects.sort((a, b) => order[a.status] - order[b.status]);
}

export function getProjectBySlug(slug: string): ResearchProject | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}
