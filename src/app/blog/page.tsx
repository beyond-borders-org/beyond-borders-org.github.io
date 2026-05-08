import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-[740px] px-6 py-14 sm:py-20">
      <h1 className="font-serif text-[32px] tracking-tight text-text sm:text-[40px]">
        Blog
      </h1>
      <p className="mt-3 text-[17px] text-text-secondary">
        Updates, insights, and technical write-ups.
      </p>

      <div className="mt-12 divide-y divide-border">
        {posts.map((post) => (
          <article key={post.slug} className="py-7 first:pt-0">
            <div className="flex items-center gap-2 text-[13px] text-text-caption">
              <time>{post.date}</time>
              <span>&middot;</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-1.5 font-serif text-[20px] leading-snug text-text">
              <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-3 decoration-border hover:decoration-text">
                {post.title}
              </Link>
            </h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-2 flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-tag-bg px-2.5 py-0.5 text-[12px] text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="py-8 text-[15px] text-text-caption">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
