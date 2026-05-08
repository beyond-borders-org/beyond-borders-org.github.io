import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllMembers, getMemberBySlug } from "@/lib/team";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMembers().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return {};
  return { title: member.name };
}

export default async function MemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  const htmlContent = await markdownToHtml(member.content);

  return (
    <div className="mx-auto max-w-[740px] px-6 py-14 sm:py-20">
      <nav className="mb-8 text-[13px] text-text-caption">
        <Link href="/about" className="hover:text-text transition-colors">About</Link>
        <span className="mx-2">/</span>
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface font-serif text-[20px] text-text-secondary">
          {member.initials}
        </div>
        <div>
          <h1 className="font-serif text-[28px] tracking-tight text-text">{member.name}</h1>
          <p className="text-[14px] text-text-secondary">
            {member.role} &middot; {member.affiliation}
          </p>
        </div>
      </div>

      {Object.keys(member.links).length > 0 && (
        <div className="mt-5 flex gap-4 text-[14px] text-text-secondary">
          {member.links.github && (
            <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">GitHub</a>
          )}
          {member.links.email && (
            <a href={`mailto:${member.links.email}`} className="hover:text-text transition-colors">Email</a>
          )}
          {member.links.twitter && (
            <a href={member.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Twitter</a>
          )}
          {member.links.scholar && (
            <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Scholar</a>
          )}
        </div>
      )}

      <hr className="my-8 border-border" />

      <article className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
