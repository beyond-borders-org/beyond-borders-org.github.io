import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/research";

export const metadata: Metadata = { title: "Research" };

const statusLabel: Record<string, string> = {
  published: "Published",
  exploring: "Exploring",
  planned: "Planned",
};

export default function ResearchPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-[740px] px-6 py-14 sm:py-20">
      <h1 className="font-serif text-[32px] tracking-tight text-text sm:text-[40px]">
        Research
      </h1>
      <p className="mt-3 text-[17px] text-text-secondary leading-relaxed">
        Open research applying data science, applied math, and machine
        learning to African challenges.
      </p>

      <div className="mt-12 divide-y divide-border">
        {projects.map((p) => (
          <article key={p.slug} className="py-8 first:pt-0">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
              {p.tag} &middot; {statusLabel[p.status] || p.venue}
            </span>

            <h2 className="mt-2 font-serif text-[22px] leading-snug text-text">
              <Link href={`/research/${p.slug}`} className="hover:underline underline-offset-3 decoration-border hover:decoration-text">
                {p.title}
              </Link>
            </h2>

            <p className="mt-2 font-serif text-[17px] leading-relaxed text-text-secondary">
              {p.excerpt}
            </p>

            {p.highlights.length > 0 && (
              <ul className="mt-3 space-y-1">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[14px] text-text-secondary">
                    <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-border" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex gap-5 text-[14px]">
              <Link
                href={`/research/${p.slug}`}
                className="text-text underline underline-offset-3 decoration-border hover:decoration-text"
              >
                Read more
              </Link>
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text transition-colors">
                  Demo &nearr;
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text transition-colors">
                  GitHub &nearr;
                </a>
              )}
              {p.paper && (
                <a href={p.paper} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text transition-colors">
                  Paper &nearr;
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
