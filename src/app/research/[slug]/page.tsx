import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/research";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects()
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyond-borders-org.github.io';
  const url = `${baseUrl}/research/${slug}/`;
  const imageUrl = project.image ? `${baseUrl}${project.image}` : `${baseUrl}/og-default.png`;

  return {
    title: project.title,
    description: project.excerpt,
    authors: [{ name: project.authors }],
    openGraph: {
      title: project.title,
      description: project.excerpt,
      url,
      type: 'article',
      publishedTime: new Date(project.date).toISOString(),
      authors: [project.authors],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      siteName: 'Beyond Borders',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.excerpt,
      images: [imageUrl],
      creator: '@BeyondBordersOrg',
    },
  };
}

export default async function ResearchProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const htmlContent = await markdownToHtml(project.content);

  return (
    <div className="mx-auto max-w-[740px] px-6 py-14 sm:py-20">
      <nav className="mb-8 text-[13px] text-text-caption">
        <Link href="/research" className="hover:text-text transition-colors">Research</Link>
        <span className="mx-2">/</span>
      </nav>

      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
        {project.tag} &middot; {project.venue}
      </span>
      <h1 className="mt-2 font-serif text-[32px] leading-[1.15] tracking-tight text-text sm:text-[40px]">
        {project.title}
      </h1>
      {project.authors && (
        <p className="mt-3 text-[15px] text-text-secondary">{project.authors}</p>
      )}

      {(project.demo || project.github || project.paper) && (
        <div className="mt-5 flex gap-5">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[14px] text-text underline underline-offset-3 decoration-border hover:decoration-text">
              Live Demo &nearr;
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[14px] text-text-secondary underline underline-offset-3 decoration-border hover:text-text hover:decoration-text">
              GitHub &nearr;
            </a>
          )}
          {project.paper && (
            <a href={project.paper} target="_blank" rel="noopener noreferrer" className="text-[14px] text-text-secondary underline underline-offset-3 decoration-border hover:text-text hover:decoration-text">
              Paper &nearr;
            </a>
          )}
        </div>
      )}

      <hr className="my-8 border-border" />

      {project.image && (
        <figure className="mb-8">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full rounded-lg shadow-sm"
          />
          {project.highlights && project.highlights[0] && (
            <figcaption className="mt-3 text-center text-[13px] text-text-secondary italic">
              {project.title}
            </figcaption>
          )}
        </figure>
      )}

      <article className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
