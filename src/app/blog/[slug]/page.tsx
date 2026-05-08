import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  return (
    <div className="mx-auto max-w-[740px] px-6 py-14 sm:py-20">
      <nav className="mb-8 text-[13px] text-text-caption">
        <Link href="/blog" className="hover:text-text transition-colors">Blog</Link>
        <span className="mx-2">/</span>
      </nav>

      <header>
        <div className="flex items-center gap-2 text-[13px] text-text-caption">
          <time>{post.date}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-3 font-serif text-[32px] leading-[1.15] tracking-tight text-text sm:text-[42px]">
          {post.title}
        </h1>
        <div className="mt-3 flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-tag-bg px-2.5 py-0.5 text-[12px] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <hr className="my-8 border-border" />

      <article className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
