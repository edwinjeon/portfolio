"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import type React from "react";

/**
 * Mobile Excel-style homepage
 * - Column headers A–D
 * - Row numbers (left gutter), tight and right-aligned
 * - Name in A1 spanning B1
 * - No scroll (fills 100dvh exactly)
 */

/* Type-safe CSS vars for the style prop */
type CSSVars = React.CSSProperties & {
  ["--hdr"]?: string; // header height
  ["--gut"]?: string; // left gutter width
};

export default function HomeMobile() {
  const COLS = 4;        // A..D
  const BODY_ROWS = 6;   // 1..6

  // layout variables
  const headerH = "clamp(14px, 4.7dvh, 24px)";          // small header row
  const gutterW = "clamp(18px, 5dvw, 26px)";          // narrow left gutter
  const cw = `calc((100dvw - var(--gut)) / ${COLS})`;   // each data column width
  const rows = `var(--hdr) repeat(${BODY_ROWS}, calc((100dvh - var(--hdr)) / ${BODY_ROWS}))`;

  const gridStyle: CSSVars = {
    ["--hdr"]: headerH,
    ["--gut"]: gutterW,
    gridTemplateColumns: `${gutterW} repeat(${COLS}, ${cw})`,
    gridTemplateRows: rows,
  };

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#0B0F1E] text-[#E5E7EB]">
      <div className="grid h-full w-full" style={gridStyle}>
        {/* Column headers A–D */}
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={`col-${i}`}
            style={{ gridColumn: i + 2, gridRow: 1 }}
            className="flex items-center justify-center text-[10px] leading-none text-white/50"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}

        {/* Row numbers (left gutter), right-aligned and snug */}
        {Array.from({ length: BODY_ROWS }).map((_, i) => (
          <div
            key={`row-${i}`}
            style={{ gridColumn: 1, gridRow: i + 2 }}
            className="flex items-center justify-end pr-[4px] text-[11px] leading-none text-white/60"
          >
            {i + 1}
          </div>
        ))}

        {/* Body grid borders */}
        {Array.from({ length: BODY_ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <div
              key={`cell-${c}-${r}`}
              style={{ gridColumn: c + 2, gridRow: r + 2 }}
              className="border border-white/15"
            />
          ))
        )}

        {/* Name at A1 spanning B1, centered */}
        <BodyCell c={1} r={1} colSpan={2} display merged className="text-center">
          <span className="text-[clamp(17px,4.3vw,21px)]">Weongyu Jeon</span>
        </BodyCell>

        {/* About / Projects on row 2 */}
        <BodyLink c={1} r={3} href="/about" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">About</span>
        </BodyLink>
        <BodyLink c={2} r={3} href="/projects" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">Projects</span>
        </BodyLink>

        {/* Icons on row 3 */}
        <BodyLink c={1} r={4} href="https://github.com/edwinjeon" target="_blank" ariaLabel="GitHub">
          <Github className="h-6 w-6" />
        </BodyLink>
        <BodyLink c={2} r={4} href="https://www.linkedin.com/in/weongyujeon/" target="_blank" ariaLabel="LinkedIn">
          <Linkedin className="h-6 w-6" />
        </BodyLink>
        <BodyLink c={3} r={4} href="https://www.kaggle.com/ratin21" target="_blank" ariaLabel="Kaggle">
          <span className="font-semibold text-lg">K</span>
        </BodyLink>
        <BodyLink c={4} r={4} href="mailto:weongyujeon@gmail.com" ariaLabel="Email">
          <Mail className="h-6 w-6" />
        </BodyLink>
      </div>
    </main>
  );
}

/* ===== Helpers map body coords (A1 = c1,r1) to grid positions (offset by gutter/header) ===== */

function BodyCell({
  c, r, children, display = false, className = "", colSpan = 1, rowSpan = 1, merged = false,
}: {
  c: number; r: number; children: React.ReactNode; display?: boolean; className?: string;
  colSpan?: number; rowSpan?: number; merged?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: `${c + 1} / span ${colSpan}`, // +1 to skip gutter
        gridRow: `${r + 1} / span ${rowSpan}`,    // +1 to skip header
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className={`relative ${merged ? "z-20 bg-[#0B0F1E] ring-1 ring-white/15" : "z-10"} flex items-center justify-center text-white transition-colors duration-150 hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

function BodyLink({
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
      className={`relative z-10 flex h-full w-full items-center justify-center text-center text-white transition-colors duration-150 hover:bg-white/10 p-2 min-w-11 min-h-11 ${className}`}
    >
      {children}
    </Link>
  );
}
