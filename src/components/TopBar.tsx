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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F1E]/70">
      {/* top hairline (optional) */}
      <div className="h-px w-full bg-white/10" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* wraps on small screens, keeps space on desktop */}
        <div className="flex min-h-12 sm:min-h-14 items-center justify-between gap-3 py-2 flex-wrap">
          {/* Left: filename (clickable) */}
          <Link
            href="/"
            className="min-w-0 truncate text-[clamp(12px,2.8vw,13px)] leading-none text-slate-300 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-formula)", letterSpacing: "0.02em" }}
          >
            Weongyu Jeon.xlsx
          </Link>

          {/* Center: nav (centers on mobile, normal on desktop) */}
          <nav className="
            order-last w-full basis-full
            sm:order-none sm:w-auto sm:basis-auto
            mx-auto flex items-center justify-center sm:justify-center gap-4 sm:gap-8 flex-wrap
          ">
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
          <div className="flex items-center gap-3 sm:gap-5 text-slate-300">
            <Link
              href="https://github.com/edwinjeon"
              target="_blank"
              aria-label="GitHub"
              className="p-2 min-w-11 min-h-11 inline-flex items-center justify-center hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/weongyujeon/"
              target="_blank"
              aria-label="LinkedIn"
              className="p-2 min-w-11 min-h-11 inline-flex items-center justify-center hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.kaggle.com/ratin21"
              target="_blank"
              aria-label="Kaggle"
              className="p-2 min-w-11 min-h-11 inline-flex items-center justify-center hover:text-white transition-colors font-semibold text-[15px]"
            >
              K
            </Link>

            <Link
              href="mailto:weongyujeon@gmail.com"
              aria-label="Email"
              className="p-2 min-w-11 min-h-11 inline-flex items-center justify-center hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* bottom hairline */}
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
      className="group relative px-2 py-2 text-[clamp(14px,3.2vw,18px)] text-slate-300 outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 rounded-md"
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
