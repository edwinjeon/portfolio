"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Mobile Excel-style homepage (no hover cells).
 * 4×6 grid, big tappable cells, no headers.
 */
export default function HomeMobile() {
  const COLS = 4;
  const ROWS = 6;

  // Slightly generous sizing for readability on phones
  const cw = `clamp(64px, ${100 / (COLS + 1)}vw, 96px)`;
  const ch = `clamp(56px, ${100 / (ROWS + 1)}vh, 84px)`;

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#0B0F1E] text-[#E5E7EB]">
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLS + 1}, ${cw})`,
          gridTemplateRows: `repeat(${ROWS + 1}, ${ch})`,
        }}
      >
        {/* faint grid borders (no headers on mobile) */}
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <div
              key={`mcell-${c}-${r}`}
              style={{ gridColumn: c + 2, gridRow: r + 2 }}
              className="border border-white/10"
            />
          ))
        )}

        {/* Row 2 — Name (two columns wide visually by using two adjacent cells) */}
        <Cell c={2} r={2} display>
          Weongyu Jeon
        </Cell>

        {/* Row 3 — About / Projects */}
        <LinkCell c={2} r={3} href="/about" display>
          About
        </LinkCell>
        <LinkCell c={3} r={3} href="/projects" display>
          Projects
        </LinkCell>

        {/* Row 4 — Icons */}
        <LinkCell
          c={1}
          r={4}
          href="https://github.com/edwinjeon"
          target="_blank"
          ariaLabel="GitHub"
        >
          <Github className="h-6 w-6" />
        </LinkCell>
        <LinkCell
          c={2}
          r={4}
          href="https://www.linkedin.com/in/weongyujeon/"
          target="_blank"
          ariaLabel="LinkedIn"
        >
          <Linkedin className="h-6 w-6" />
        </LinkCell>
        <LinkCell
          c={3}
          r={4}
          href="https://www.kaggle.com/ratin21"
          target="_blank"
          ariaLabel="Kaggle"
        >
          <span className="font-semibold text-lg">K</span>
        </LinkCell>
        <LinkCell c={4} r={4} href="mailto:weongyujeon@gmail.com" ariaLabel="Email">
          <Mail className="h-6 w-6" />
        </LinkCell>

        {/* Optional small static formula line to keep the vibe */}
        <SmallFormula c={2} r={5} text='=Living("Seoul 🇰🇷")' />
      </div>
    </main>
  );
}

/* --- local helpers --- */

function Cell({
  c,
  r,
  children,
  display = false,
  className = "",
}: {
  c: number;
  r: number;
  children: React.ReactNode;
  display?: boolean;
  className?: string;
}) {
  return (
    <div
      style={{
        gridColumn: c + 1,
        gridRow: r + 1,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className={`group relative z-10 flex items-center justify-center text-white transition-colors duration-150 active:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

function LinkCell({
  c,
  r,
  href,
  target,
  ariaLabel,
  children,
  display = false,
}: {
  c: number;
  r: number;
  href: string;
  target?: "_blank";
  ariaLabel?: string;
  children: React.ReactNode;
  display?: boolean;
}) {
  return (
    <Link
      href={href}
      target={target}
      aria-label={ariaLabel}
      style={{
        gridColumn: c + 1,
        gridRow: r + 1,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className="relative z-10 flex h-full w-full items-center justify-center text-white transition-colors duration-150 active:bg-white/10 p-2 min-w-11 min-h-11"
    >
      {children}
    </Link>
  );
}

function SmallFormula({
  c,
  r,
  text,
}: {
  c: number;
  r: number;
  text: string;
}) {
  return (
    <div
      style={{ gridColumn: c + 1, gridRow: r + 1 }}
      className="relative z-10 flex items-center justify-center text-[13px] text-white/70"
    >
      <span
        className="select-none"
        style={{ fontFamily: "var(--font-formula)", letterSpacing: "0.015em" }}
      >
        {text}
      </span>
    </div>
  );
}
