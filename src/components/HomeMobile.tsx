"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

/* Local cell components (mobile-only versions) with span support */
function MainCell({
  c, r, children, display = false, className = "", colSpan = 1, rowSpan = 1,
}: {
  c: number; r: number; children: React.ReactNode; display?: boolean; className?: string;
  colSpan?: number; rowSpan?: number;
}) {
  return (
    <div
      style={{
        gridColumn: `${c + 1} / span ${colSpan}`,
        gridRow: `${r + 1} / span ${rowSpan}`,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className={`group relative z-10 flex items-center justify-center text-center text-white transition-colors duration-150 hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

function MainLinkCell({
  c, r, href, target, ariaLabel, children, display = false, className = "", colSpan = 1, rowSpan = 1,
}: {
  c: number; r: number; href: string; target?: "_blank"; ariaLabel?: string; children: React.ReactNode;
  display?: boolean; className?: string; colSpan?: number; rowSpan?: number;
}) {
  return (
    <Link
      href={href}
      target={target}
      aria-label={ariaLabel}
      style={{
        gridColumn: `${c + 1} / span ${colSpan}`,
        gridRow: `${r + 1} / span ${rowSpan}`,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className={`group relative z-10 flex h-full w-full items-center justify-center text-center text-white transition-colors duration-150 hover:bg-white/10 p-2 min-w-11 min-h-11 ${className}`}
    >
      {children}
    </Link>
  );
}

/* Mobile Excel-style homepage (headers smaller, grid bigger, lifted up, 7 rows) */
export default function HomeMobile() {
  const COLS = 4;
  const ROWS = 7; // add row 7 so the sheet feels complete

  // Larger cells, but guaranteed to fit: 100dvh/(ROWS+1) is the governing size
  const cw = `clamp(68px, calc(100dvw / ${COLS + 1}), 112px)`;
  const ch = `clamp(56px, calc(100dvh / ${ROWS + 1}), 88px)`;

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#0B0F1E] text-[#E5E7EB]">
      <div
        className="
          grid h-full w-full place-content-start
          pt-2   /* lift the grid up a bit */
        "
        style={{
          gridTemplateColumns: `repeat(${COLS + 1}, ${cw})`,
          gridTemplateRows: `repeat(${ROWS + 1}, ${ch})`,
        }}
      >
        {/* Column headers A–D (smaller) */}
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={`m-col-${i}`}
            style={{ gridColumn: i + 2, gridRow: 1 }}
            className="flex items-center justify-center text-[10px] leading-none text-white/55"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}

        {/* Row headers 1–7 (smaller) */}
        {Array.from({ length: ROWS }).map((_, i) => (
          <div
            key={`m-row-${i}`}
            style={{ gridColumn: 1, gridRow: i + 2 }}
            className="flex items-center justify-center text-[10px] leading-none text-white/55"
          >
            {i + 1}
          </div>
        ))}

        {/* Grid borders */}
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <div
              key={`mcell-${c}-${r}`}
              style={{ gridColumn: c + 2, gridRow: r + 2 }}
              className="border border-white/10"
            />
          ))
        )}

        {/* Main cells */}
        {/* Name spans 2 columns so it fits on one line and is centered */}
        <MainCell
          c={2}
          r={2}
          display
          colSpan={2}
          className="text-[clamp(18px,4.6vw,22px)]"
        >
          Weongyu Jeon
        </MainCell>

        {/* About / Projects */}
        <MainLinkCell c={2} r={3} href="/about" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">About</span>
        </MainLinkCell>
        <MainLinkCell c={3} r={3} href="/projects" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">Projects</span>
        </MainLinkCell>

        {/* Icon row */}
        <MainLinkCell c={1} r={4} href="https://github.com/edwinjeon" target="_blank" ariaLabel="GitHub">
          <span className="inline-flex min-w-11 min-h-11 items-center justify-center">
            <Github className="h-6 w-6" />
          </span>
        </MainLinkCell>
        <MainLinkCell c={2} r={4} href="https://www.linkedin.com/in/weongyujeon/" target="_blank" ariaLabel="LinkedIn">
          <span className="inline-flex min-w-11 min-h-11 items-center justify-center">
            <Linkedin className="h-6 w-6" />
          </span>
        </MainLinkCell>
        <MainLinkCell c={3} r={4} href="https://www.kaggle.com/ratin21" target="_blank" ariaLabel="Kaggle">
          <span className="inline-flex min-w-11 min-h-11 items-center justify-center font-semibold text-lg">
            K
          </span>
        </MainLinkCell>
        <MainLinkCell c={4} r={4} href="mailto:weongyujeon@gmail.com" ariaLabel="Email">
          <span className="inline-flex min-w-11 min-h-11 items-center justify-center">
            <Mail className="h-6 w-6" />
          </span>
        </MainLinkCell>
      </div>
    </main>
  );
}
