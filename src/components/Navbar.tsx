"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AfricaIcon from "./AfricaIcon";

const links = [
  { href: "/research", label: "Research" },
  { href: "/datasets", label: "Datasets" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-[57px] max-w-[1100px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-[22px] tracking-tight text-text">
          <AfricaIcon size={22} className="text-text" />
          Beyond Borders
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] transition-colors ${
                  active ? "text-text" : "text-text-secondary hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="text-text-secondary md:hidden"
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[15px] text-text-secondary hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
