import type { Metadata } from "next";
import Link from "next/link";
import { getAllMembers } from "@/lib/team";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const members = getAllMembers();

  return (
    <div className="mx-auto max-w-[740px] px-6 py-14 sm:py-20">
      <h1 className="font-serif text-[32px] tracking-tight text-text sm:text-[40px]">
        About
      </h1>

      <div className="mt-6 space-y-4 font-serif text-[18px] leading-[1.7] text-text-secondary">
        <p>
          Beyond Borders is an open research initiative tackling African
          challenges through data science, applied mathematics, and machine
          learning. Our work spans agriculture, governance, language
          technology, and beyond &mdash; wherever rigorous methods and open
          data can make a difference.
        </p>
        <p>
          All our research is reproducible. All our code is open source.
          We work across national boundaries.
        </p>
      </div>

      <hr className="my-10 border-border" />

      {/* Team */}
      <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
        Team
      </h2>
      <div className="mt-6 space-y-5">
        {members.map((m) => (
          <Link
            key={m.slug}
            href={`/about/${m.slug}`}
            className="group flex items-start gap-4"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-surface font-serif text-[15px] text-text-secondary">
              {m.initials}
            </div>
            <div>
              <span className="text-[16px] font-medium text-text group-hover:underline underline-offset-3 decoration-border group-hover:decoration-text">
                {m.name}
              </span>
              <p className="text-[14px] text-text-secondary">{m.short}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-[15px] text-text-secondary">
        We welcome collaborators from all backgrounds.{" "}
        <a
          href="mailto:contact@beyond-borders.africa"
          className="text-text underline underline-offset-3 decoration-border hover:decoration-text"
        >
          Get in touch
        </a>
      </p>

      <hr className="my-10 border-border" />

      {/* Principles */}
      <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
        Principles
      </h2>
      <ul className="mt-5 space-y-3 text-[15px] text-text-secondary">
        <li>
          <strong className="text-text">Open by default.</strong>{" "}
          Code, data, and methods are public.
        </li>
        <li>
          <strong className="text-text">Africa-centered.</strong>{" "}
          Built for African contexts, with African data.
        </li>
        <li>
          <strong className="text-text">Rigorous.</strong>{" "}
          Honest evaluation. No cherry-picked metrics.
        </li>
      </ul>
    </div>
  );
}
