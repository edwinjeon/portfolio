"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0B0F1E]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F1E]/75">
      {/* thin divider line */}
      <div className="h-px w-full bg-white/10" />

      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        {/* Left: file name */}
        {/* Left: file name (now clickable) */}
        <Link
          href="/"
          className="min-w-0 text-[13px] leading-none text-slate-300 hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-formula)", letterSpacing: "0.02em" }}
        >
          Weongyu Jeon.xlsx
        </Link>


        {/* Center: nav */}
        <nav className="mx-auto flex items-center gap-8">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <NavLink key={item.href} href={item.href} active={!!active}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: social icons */}
      <div className="flex items-center gap-5 text-slate-300">
        <Link
          href="https://github.com/edwinjeon"
          target="_blank"
          aria-label="GitHub"
          className="hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </Link>

        <Link
          href="https://www.linkedin.com/in/weongyujeon/"
          target="_blank"
          aria-label="LinkedIn"
          className="hover:text-white transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </Link>

        <Link
          href="https://www.kaggle.com/ratin21"
          target="_blank"
          aria-label="Kaggle"
          className="hover:text-white transition-colors font-semibold text-[15px]"
        >
          K
        </Link>

        <Link
          href="mailto:weongyujeon@gmail.com"
          aria-label="Email"
          className="hover:text-white transition-colors"
        >
          <Mail className="w-5 h-5" />
        </Link>
      </div>

      </div>

      {/* bottom divider */}
      <div className="h-px w-full bg-white/10" />
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative px-2 py-1 text-[18px] text-slate-300 outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 rounded-md`}
      style={{
        fontFamily: "var(--font-home-display)",
        fontWeight: 600,
        letterSpacing: "0.015em",
      }}
    >
      {children}
      {/* underline */}
      <span
        className={`pointer-events-none absolute left-1/2 -bottom-1 h-[2px] -translate-x-1/2 bg-white transition-all duration-300 ${
          active
            ? "w-12 opacity-90"
            : "w-0 opacity-0 group-hover:w-12 group-hover:opacity-60"
        }`}
      />
    </Link>
  );
}
