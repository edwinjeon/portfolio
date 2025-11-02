"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

/** Mobile Excel-style homepage
 * - Column headers A–D only (no row numbers)
 * - Grid height = 100dvh exactly (no bottom gap / no scroll)
 * - Cells fill full width
 */
export default function HomeMobile() {
  const COLS = 4;      // A–D
  const BODY_ROWS = 6; // rows of cells beneath the header row

  // Width: exactly fill screen across 4 columns
  const cw = `calc(100dvw / ${COLS})`;
  // Height: header row + body rows must exactly fill the screen
  const ch = `calc(100dvh / ${BODY_ROWS + 1})`;

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#0B0F1E] text-[#E5E7EB]">
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${cw})`,            // no left gutter column
          gridTemplateRows: `repeat(${BODY_ROWS + 1}, ${ch})`,      // +1 for header row
        }}
      >
        {/* ===== Column headers (A–D) ===== */}
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={`col-${i}`}
            style={{ gridColumn: i + 1, gridRow: 1 }}
            className="flex items-center justify-center text-[10px] leading-none text-white/55"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}

        {/* ===== Grid borders for body (rows 2..BODY_ROWS+1) ===== */}
        {Array.from({ length: BODY_ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <div
              key={`cell-${c}-${r}`}
              style={{ gridColumn: c + 1, gridRow: r + 2 }}
              className="border border-white/10"
            />
          ))
        )}

        {/* ===== Main cells (use body row index: 1 = first row under headers) ===== */}

        {/* Name — centered and spanning 2 columns */}
        <Cell
          col={2}
          row={2}
          colSpan={2}
          display
          className="text-center text-[clamp(18px,4.8vw,22px)]"
        >
          Weongyu Jeon
        </Cell>

        {/* About / Projects (same row, side-by-side) */}
        <LinkCell col={2} row={4} href="/about" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">About</span>
        </LinkCell>
        <LinkCell col={3} row={4} href="/projects" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">Projects</span>
        </LinkCell>

        {/* Icon row */}
        <LinkCell col={1} row={5} href="https://github.com/edwinjeon" target="_blank" ariaLabel="GitHub">
          <Github className="h-6 w-6" />
        </LinkCell>
        <LinkCell col={2} row={5} href="https://www.linkedin.com/in/weongyujeon/" target="_blank" ariaLabel="LinkedIn">
          <Linkedin className="h-6 w-6" />
        </LinkCell>
        <LinkCell col={3} row={5} href="https://www.kaggle.com/ratin21" target="_blank" ariaLabel="Kaggle">
          <span className="font-semibold text-lg">K</span>
        </LinkCell>
        <LinkCell col={4} row={5} href="mailto:weongyujeon@gmail.com" ariaLabel="Email">
          <Mail className="h-6 w-6" />
        </LinkCell>
      </div>
    </main>
  );
}

/* ---------- tiny cell helpers (mobile-only) ---------- */
function Cell({
  col,
  row,
  children,
  display = false,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: {
  col: number; // 1..COLS
  row: number; // 1 = header row, 2.. = body rows
  children: React.ReactNode;
  display?: boolean;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}) {
  return (
    <div
      style={{
        gridColumn: `${col} / span ${colSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className={`group relative z-10 flex items-center justify-center text-white transition-colors duration-150 hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

function LinkCell({
  col,
  row,
  href,
  target,
  ariaLabel,
  children,
  display = false,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: {
  col: number;
  row: number;
  href: string;
  target?: "_blank";
  ariaLabel?: string;
  children: React.ReactNode;
  display?: boolean;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}) {
  return (
    <Link
      href={href}
      target={target}
      aria-label={ariaLabel}
      style={{
        gridColumn: `${col} / span ${colSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className={`group relative z-10 flex h-full w-full items-center justify-center text-white transition-colors duration-150 hover:bg-white/10 p-2 min-w-11 min-h-11 text-center ${className}`}
    >
      {children}
    </Link>
  );
}
