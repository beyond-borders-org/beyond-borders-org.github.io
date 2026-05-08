import fs from "fs";
import path from "path";
import matter from "gray-matter";

const TEAM_DIR = path.join(process.cwd(), "content", "team");

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  initials: string;
  affiliation: string;
  short: string;
  links: Record<string, string>;
  content: string;
}

export function getAllMembers(): TeamMember[] {
  if (!fs.existsSync(TEAM_DIR)) return [];

  const files = fs.readdirSync(TEAM_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(TEAM_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug || file.replace(/\.md$/, ""),
      name: data.name || "Unknown",
      role: data.role || "",
      initials: data.initials || data.name?.slice(0, 2).toUpperCase() || "??",
      affiliation: data.affiliation || "",
      short: data.short || "",
      links: data.links || {},
      content,
    };
  });
}

export function getMemberBySlug(slug: string): TeamMember | null {
  const members = getAllMembers();
  return members.find((m) => m.slug === slug) || null;
}
