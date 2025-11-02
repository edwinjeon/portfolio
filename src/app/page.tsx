"use client";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

// Detect small screens (≤640px)
function useIsSmall() {
  const [isSmall, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = () => set(mq.matches);
    onChange(); // run once on mount
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isSmall;
}

export default function HomeGrid() {
  const isSmall = useIsSmall();

  // Desktop = 8×6; Mobile = 4×8
  const COLS = isSmall ? 4 : 8; // A–D (mobile) / A–H (desktop)
  const ROWS = isSmall ? 8 : 6; // 1–8 (mobile) / 1–6 (desktop)

  // Smooth scaling and no overflow on small screens
  const cw = isSmall
    ? `clamp(40px, ${100 / (COLS + 1)}vw, 96px)`
    : `calc(100vw / ${COLS + 1})`;
  const ch = isSmall
    ? `clamp(36px, ${100 / (ROWS + 1)}vh, 56px)`
    : `calc(100vh / ${ROWS + 1})`;

  // Coordinates: small nudges for mobile centering
  const nameCol = isSmall ? 2 : 3;
  const aboutCol = isSmall ? 3 : 4;
  const projectsCol = isSmall ? 2 : 5;
  const iconStartCol = isSmall ? 2 : 3;
  const textRow = 3;
  const iconRow = 4;

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#0B0F1E] text-[#E5E7EB]">
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLS + 1}, ${cw})`,
          gridTemplateRows: `repeat(${ROWS + 1}, ${ch})`,
        }}
      >
        {/* headers (A–H) — desktop only */}
        {!isSmall &&
          Array.from({ length: COLS }).map((_, i) => (
            <div
              key={`col-${i}`}
              style={{ gridColumn: i + 2, gridRow: 1 }}
              className="flex items-center justify-center text-sm text-slate-400"
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}

        {/* row numbers — desktop only */}
        {!isSmall &&
          Array.from({ length: ROWS }).map((_, i) => (
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
        {/* Row 3 (labels) — Home removed, About/Projects shifted */}
        <MainCell c={nameCol} r={textRow} display>
          Weongyu Jeon
        </MainCell>
        <MainLinkCell c={aboutCol} r={textRow} href="/about" display>
          About
        </MainLinkCell>
        <MainLinkCell c={projectsCol} r={textRow} href="/projects" display>
          Projects
        </MainLinkCell>

        {/* Row 4 (icons) */}
        <MainLinkCell
          c={iconStartCol}
          r={iconRow}
          href="https://github.com/edwinjeon"
          target="_blank"
          ariaLabel="GitHub"
        >
          <Github className="h-5 w-5" />
        </MainLinkCell>
        <MainLinkCell
          c={iconStartCol + 1}
          r={iconRow}
          href="https://www.linkedin.com/in/weongyujeon/"
          target="_blank"
          ariaLabel="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </MainLinkCell>
        <MainLinkCell
          c={iconStartCol + 2}
          r={iconRow}
          href="https://www.kaggle.com/ratin21"
          target="_blank"
          ariaLabel="Kaggle"
        >
          <span className="font-semibold">K</span>
        </MainLinkCell>
        <MainLinkCell
          c={iconStartCol + 3}
          r={iconRow}
          href="mailto:weongyujeon@gmail.com"
          ariaLabel="Email"
        >
          <Mail className="h-5 w-5" />
        </MainLinkCell>

        {/* ===== NON-MAIN: INTERACTIVE FORMULA → RESULT ===== */}
        <HoverFormulaCell c={1} r={4} formula="=Living()" result="Seoul 🇰🇷" />
        <HoverFormulaCell c={5} r={1} formula="=Studying()" result="IS @ CMU" />
        <HoverFormulaCell
          c={7}
          r={2}
          formula='=List("Skills")'
          result={
            <span>
              Python
              <br />
              Tableau
              <br />
              SQL
            </span>
          }
        />
        <HoverFormulaCell c={3} r={6} formula="=Coffee_Intake()" result="3 cups/day" />
        <HoverFormulaCell c={7} r={5} formula="=Instagram()" result="@0329__re" />

        {/* Purely blurred stat-like cell */}
        <BlurCell c={2} r={1} text="Try hover over cells!" />
      </div>
    </main>
  );
}

/* ===== Components (unchanged, with tiny touch-target tweak for links) ===== */

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
        fontWeight: display ? 600 : undefined,
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
      className="group relative z-10 flex h-full w-full cursor-pointer items-center justify-center text-white transition-colors duration-150 hover:bg-white/10 hover:text-white p-2 min-w-11 min-h-11"
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
  result: React.ReactNode;
}) {
  return (
    <div
      style={{ gridColumn: c + 1, gridRow: r + 1 }}
      className="group relative z-10 flex flex-col items-center justify-center text-sm transition-all duration-200
                 text-white/70 opacity-55 blur-[0.6px]
                 hover:blur-none hover:opacity-100 hover:text-white cursor-default text-center"
    >
      <span
        className="block group-hover:hidden select-none"
        style={{ fontFamily: "var(--font-formula)", fontWeight: 500, letterSpacing: "0.015em" }}
      >
        {formula}
      </span>
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
  size = "xs",
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
