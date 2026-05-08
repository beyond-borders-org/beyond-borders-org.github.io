import Link from "next/link";
import { getAllProjects } from "@/lib/research";
import { getAllPosts } from "@/lib/blog";

const stats = [
  { value: "100%", label: "Open Source" },
  { value: "Africa", label: "Focus" },
  { value: "3", label: "Projects" },
  { value: "2025", label: "Founded" },
];

export default function Home() {
  const projects = getAllProjects();
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[860px] px-6 pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
          Open Research Initiative
        </p>
        <h1 className="mt-5 font-serif text-[clamp(36px,6vw,60px)] leading-[1.1] tracking-tight text-text">
          Building <em>open tools</em> for the African continent
        </h1>
        <p className="mx-auto mt-6 max-w-[580px] font-serif text-[18px] leading-relaxed text-text-secondary">
          Beyond Borders applies rigorous research methods &mdash; from
          Bayesian inference to self-supervised learning to geospatial AI
          &mdash; to challenges that matter for the African continent.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/research"
            className="inline-flex h-[42px] items-center rounded-sm bg-text px-5 text-[14px] font-medium text-white transition-opacity hover:opacity-80"
          >
            Explore Research
          </Link>
          <Link
            href="/about"
            className="inline-flex h-[42px] items-center rounded-sm border border-text px-5 text-[14px] font-medium text-text transition-opacity hover:opacity-70"
          >
            About Us
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-6 text-center ${
                i < stats.length - 1 ? "border-r border-border" : ""
              }`}
            >
              <div className="font-serif text-[28px] font-bold text-text">{s.value}</div>
              <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-text-caption">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="mx-auto max-w-[1100px] px-6 py-14 sm:py-20">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
            Research
          </h2>
          <Link
            href="/research"
            className="text-[14px] text-text-secondary hover:text-text transition-colors"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
          {projects.map((p) => (
            <div key={p.slug} className="bg-bg p-6 sm:p-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-caption">
                {p.tag} {p.status !== "published" && ` — ${p.status === "exploring" ? "Exploring" : "Planned"}`}
              </span>
              <h3 className="mt-2 font-serif text-[20px] leading-snug text-text">
                <Link href={`/research/${p.slug}`} className="hover:underline underline-offset-3 decoration-border hover:decoration-text">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary line-clamp-3">
                {p.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent blog */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1100px] px-6 py-14 sm:py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
              Recent
            </h2>
            <Link
              href="/blog"
              className="text-[14px] text-text-secondary hover:text-text transition-colors"
            >
              All posts &rarr;
            </Link>
          </div>

          <div className="mt-8 divide-y divide-border">
            {posts.map((post) => (
              <div key={post.slug} className="flex items-baseline justify-between gap-4 py-4">
                <div className="min-w-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[16px] font-medium text-text hover:underline underline-offset-3 decoration-border hover:decoration-text"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-0.5 text-[14px] text-text-secondary line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <span className="flex-shrink-0 font-mono text-[11px] text-text-caption">
                  {post.readingTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[860px] px-6 py-14 text-center sm:py-20">
          <h2 className="font-serif text-[28px] tracking-tight text-text sm:text-[36px]">
            Open science, across borders
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-relaxed text-text-secondary">
            We welcome researchers, engineers, and domain experts.
            All our work is open source and reproducible.
          </p>
          <div className="mt-6">
            <a
              href="mailto:contact@beyond-borders.africa"
              className="text-[14px] text-text underline underline-offset-3 decoration-border hover:decoration-text"
            >
              Get in touch &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
