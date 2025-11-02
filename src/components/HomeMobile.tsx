"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

/* ---------- Local copies of the cell components ---------- */
function MainCell({
  c, r, children, display = false, className = "",
}: {
  c: number; r: number; children: React.ReactNode; display?: boolean; className?: string;
}) {
  return (
    <div
      style={{
        gridColumn: c + 1,
        gridRow: r + 1,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined,
      }}
      className={`group relative z-10 flex items-center justify-center text-white transition-colors duration-150 hover:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
}

function MainLinkCell({
  c, r, href, target, ariaLabel, children, display = false,
}: {
  c: number; r: number; href: string; target?: "_blank"; ariaLabel?: string; children: React.ReactNode; display?: boolean;
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
      className="group relative z-10 flex h-full w-full items-center justify-center text-white transition-colors duration-150 hover:bg-white/10 p-2 min-w-11 min-h-11"
    >
      {children}
    </Link>
  );
}

/* ---------- Mobile Excel-style homepage (with headers) ---------- */
export default function HomeMobile() {
  const COLS = 4;
  const ROWS = 6;

  // Larger cells for readability; grid centered on screen
  const cw = `clamp(72px, ${100 / (COLS + 1)}vw, 112px)`;
  const ch = `clamp(64px, ${100 / (ROWS + 1)}vh, 96px)`;

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#0B0F1E] text-[#E5E7EB]">
      <div
        className="grid h-full w-full place-content-center"
        style={{
          gridTemplateColumns: `repeat(${COLS + 1}, ${cw})`,
          gridTemplateRows: `repeat(${ROWS + 1}, ${ch})`,
        }}
      >
        {/* Column headers A–D */}
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={`m-col-${i}`}
            style={{ gridColumn: i + 2, gridRow: 1 }}
            className="flex items-center justify-center text-[11px] leading-none text-white/60"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}

        {/* Row headers 1–6 */}
        {Array.from({ length: ROWS }).map((_, i) => (
          <div
            key={`m-row-${i}`}
            style={{ gridColumn: 1, gridRow: i + 2 }}
            className="flex items-center justify-center text-[11px] leading-none text-white/60"
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

        {/* Main cells (no hover cells on mobile) */}
        <MainCell c={2} r={2} display className="text-[clamp(16px,4.2vw,20px)]">
          Weongyu Jeon
        </MainCell>

        <MainLinkCell c={2} r={3} href="/about" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">About</span>
        </MainLinkCell>
        <MainLinkCell c={3} r={3} href="/projects" display>
          <span className="text-[clamp(16px,4.2vw,20px)]">Projects</span>
        </MainLinkCell>

        <MainLinkCell c={1} r={4} href="https://github.com/edwinjeon" target="_blank" ariaLabel="GitHub">
          <Github className="h-6 w-6" />
        </MainLinkCell>
        <MainLinkCell c={2} r={4} href="https://www.linkedin.com/in/weongyujeon/" target="_blank" ariaLabel="LinkedIn">
          <Linkedin className="h-6 w-6" />
        </MainLinkCell>
        <MainLinkCell c={3} r={4} href="https://www.kaggle.com/ratin21" target="_blank" ariaLabel="Kaggle">
          <span className="font-semibold text-lg">K</span>
        </MainLinkCell>
        <MainLinkCell c={4} r={4} href="mailto:weongyujeon@gmail.com" ariaLabel="Email">
          <Mail className="h-6 w-6" />
        </MainLinkCell>
      </div>
    </main>
  );
}
