"use client";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const COLS = 8; // A–H
const ROWS = 6; // 1–6

export default function HomeGrid() {
  const cw = `calc(100vw / ${COLS + 1})`;
  const ch = `calc(100vh / ${ROWS + 1})`;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0B0F1E] text-[#E5E7EB]">
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLS + 1}, ${cw})`,
          gridTemplateRows: `repeat(${ROWS + 1}, ${ch})`,
        }}
      >
        {/* headers (A–H) */}
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={`col-${i}`}
            style={{ gridColumn: i + 2, gridRow: 1 }}
            className="flex items-center justify-center text-sm text-slate-400"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}

        {/* row numbers (1–6) */}
        {Array.from({ length: ROWS }).map((_, i) => (
          <div
            key={`row-${i}`}
            style={{ gridColumn: 1, gridRow: i + 2 }}
            className="flex items-center justify-center text-sm text-slate-400"
          >
            {i + 1}
          </div>
        ))}

        {/* draw cell borders */}
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <div
              key={`cell-${c}-${r}`}
              style={{ gridColumn: c + 2, gridRow: r + 2 }}
              className="border border-white/10"
            />
          ))
        )}

        {/* ===== MAIN CONTENT ===== */}
        {/* Row 3 (labels) — Home removed, About/Projects shifted left */}
        {/* Row 3 (labels) */}
        <MainCell c={3} r={3} display>Weongyu Jeon</MainCell>
        <MainLinkCell c={4} r={3} href="/about" display>About</MainLinkCell>
        <MainLinkCell c={5} r={3} href="/projects" display>Projects</MainLinkCell>


        {/* Row 4 (icons) */}
        <MainLinkCell c={3} r={4} href="https://github.com/edwinjeon" target="_blank" ariaLabel="GitHub">
          <Github className="h-5 w-5" />
        </MainLinkCell>
        <MainLinkCell c={4} r={4} href="https://www.linkedin.com/in/weongyujeon/" target="_blank" ariaLabel="LinkedIn">
          <Linkedin className="h-5 w-5" />
        </MainLinkCell>
        <MainLinkCell c={5} r={4} href="https://www.kaggle.com/ratin21" target="_blank" ariaLabel="Kaggle">
          <span className="font-semibold">K</span>
        </MainLinkCell>
        <MainLinkCell c={6} r={4} href="mailto:weongyujeon@gmail.com" ariaLabel="Email">
          <Mail className="h-5 w-5" />
        </MainLinkCell>


        {/* ===== NON-MAIN: INTERACTIVE FORMULA → RESULT ===== */}
        <HoverFormulaCell c={1} r={2} formula="=Living()" result="Seoul 🇰🇷" />
        <HoverFormulaCell c={5} r={1} formula="=Studying()" result="IS @ CMU" />
        <HoverFormulaCell c={7} r={2} formula='=List("Skills")' result={<span>Python<br />Tableau<br />SQL</span>}/>
        <HoverFormulaCell c={2} r={5} formula='=Coffee_Intake()' result="3 cups/day" />
        <HoverFormulaCell c={7} r={5} formula='=Instagram()' result="@0329__re" />

        {/* Keep a couple purely blurred stat-like cells if you want */}
        <BlurCell c={5} r={6} text="Give me any dataset!" />
      </div>
    </main>
  );
}

/* ===== Components ===== */

function MainCell({
  c,
  r,
  children,
  display = false,
}: {
  c: number;
  r: number;
  children: React.ReactNode;
  display?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: c + 1,
        gridRow: r + 1,
        fontFamily: display ? "var(--font-home-display)" : undefined,
        fontWeight: display ? 600 : undefined, // optional: give Manrope a stronger weight
      }}
      className="group relative z-10 flex cursor-pointer items-center justify-center text-white transition-colors duration-150 hover:bg-white/10 hover:text-white"
    >
      {children}
    </div>
  );
}

function MainLinkCell({
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
      className="group relative z-10 flex h-full w-full cursor-pointer items-center justify-center
                 text-white transition-colors duration-150 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}

/** Non-main cell that stays blurred, and on hover unblurs & swaps formula → result */
function HoverFormulaCell({
  c,
  r,
  formula,
  result,
}: {
  c: number;
  r: number;
  formula: string;
  result: React.ReactNode; // ← change this so lists/JSX work
}) {
  return (
    <div
      style={{ gridColumn: c + 1, gridRow: r + 1 }}
      className="group relative z-10 flex flex-col items-center justify-center text-sm transition-all duration-200
                 text-white/70 opacity-55 blur-[0.6px]
                 hover:blur-none hover:opacity-100 hover:text-white cursor-default text-center"
    >
      {/* Formula (default) */}
      <span
        className="block group-hover:hidden select-none"
        style={{ fontFamily: "var(--font-formula)", fontWeight: 500, letterSpacing: "0.015em" }}
      >
        {formula}
      </span>

      {/* Result (on hover) */}
      <span
        className="hidden group-hover:block select-none"
        style={{ fontFamily: "var(--font-formula)", fontWeight: 500, letterSpacing: "0.015em" }}
      >
        {result}
      </span>
    </div>
  );
}


/** Plain blurred non-main cell (kept for numeric/extra fillers) */
function BlurCell({
  c,
  r,
  text,
  size = "xs", // default size
}: {
  c: number;
  r: number;
  text: string;
  size?: "xs" | "sm" | "base" | "lg";
}) {
  const sizeClass =
    size === "xs"
      ? "text-xs"
      : size === "sm"
      ? "text-sm"
      : size === "base"
      ? "text-base"
      : "text-lg";

  return (
    <div
      style={{
        gridColumn: c + 1,
        gridRow: r + 1,
        fontFamily: "var(--font-formula)",
        fontWeight: 500,
        letterSpacing: "0.015em",
      }}
      className={`relative z-10 flex items-center justify-center ${sizeClass} text-white/70 opacity-55 blur-[2px]
                 transition-all duration-200 hover:blur-none hover:opacity-100 hover:text-white cursor-default`}
    >
      {text}
    </div>
  );
}


