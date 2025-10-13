import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], display: "swap" });

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F1E]/70">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="inline-flex items-baseline gap-2">
            <span className={`${dmSerif.className} text-xl leading-none tracking-tight`}>
              Weongyu Jeon
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6 text-sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <span className="mx-2 h-5 w-px bg-white/10" aria-hidden />

            {/* Socials */}
            <a
              href="https://github.com/edwinjeon"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#22D3EE] transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} strokeWidth={1.8} />
            </a>
            <a
              href="https://www.linkedin.com/in/weongyujeon/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#22D3EE] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.8} />
            </a>
            <a
              href="https://www.kaggle.com/ratin21"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#22D3EE] transition-colors"
              aria-label="Kaggle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M9.48 12.7L15.47 6h2.24l-6.09 6.7 6.38 7.3h-2.33l-6.2-7.02v7.02H7.96V4.7h1.52v8z" />
              </svg>
            </a>
            <a href="mailto:weongyujeon@gmail.com" className="hover:text-[#22D3EE] transition-colors" aria-label="Email">
              <Mail size={18} strokeWidth={1.8} />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative hover:text-[#22D3EE] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#22D3EE] hover:after:w-full after:transition-[width]"
    >
      {children}
    </Link>
  );
}
