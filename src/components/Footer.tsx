import Link from "next/link";
import AfricaIcon from "./AfricaIcon";

const cols = [
  {
    title: "Research",
    links: [
      { label: "All Projects", href: "/research" },
      { label: "Datasets", href: "/datasets" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "GitHub", href: "https://github.com/beyond-borders-project", external: true },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Team", href: "/about" },
      { label: "Contact", href: "mailto:contact@beyond-borders.africa" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-[1100px] px-6 pt-12 pb-8">
        <div className="grid gap-8 sm:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <span className="flex items-center gap-2 font-serif text-[18px] text-text">
              <AfricaIcon size={18} className="text-text" />
              Beyond Borders
            </span>
            <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-text-secondary">
              Open research applying data science and machine learning
              to challenges across the African continent.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-caption">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-text-secondary hover:text-text transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[14px] text-text-secondary hover:text-text transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-caption">
            &copy; {new Date().getFullYear()} Beyond Borders. Open source under MIT.
          </p>
        </div>
      </div>
    </footer>
  );
}
