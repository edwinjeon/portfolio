"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, Github, ExternalLink, BarChart4 } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, useRef } from "react";

import PageShell from "@/components/PageShell";
import Chip from "@/components/Chip";

/* =========================
   Types
   ========================= */
export type DetailLinkSet = {
  github?: string;
  tableau?: string;
  kaggle?: string;
  demo?: string;
};

export type ProjectSection = {
  id: string;
  title: string;
  content: string | string[];
};

export type ProjectDetailData = {
  title: string;
  summary: string;
  tools?: string[];
  tags?: string[];
  date?: string;
  detailLinks?: DetailLinkSet;
  sections?: ProjectSection[];
  image?: string | StaticImageData;                // single image (fallback)
  images?: (string | StaticImageData)[];           // slideshow (preferred)
};

/* =========================
   Small UI helpers
   ========================= */
function LinkPill({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm hover:bg-white/10 transition"
    >
      {icon ?? <ExternalLink className="h-4 w-4" aria-hidden />}
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  );
}

// Remove zero-width chars & exotic spaces, then trim
function normalizeTag(t: unknown) {
  if (typeof t !== "string") return "";
  return t.replace(/[\u200B-\u200D\u2060\uFEFF]/g, "").trim();
}

/* =========================
   Component
   ========================= */
export default function ProjectDetail({ data }: { data: ProjectDetailData }) {
  const {
    title,
    summary,
    tools = [],
    tags = [],
    date,
    detailLinks = {},
    sections = [],
    image,
    images,
  } = data;

  // Build image list for slideshow (fallback to single image)
  const imgs = useMemo<(string | StaticImageData)[]>(() => {
    if (Array.isArray(images) && images.length) return images;
    if (image) return [image];
    return [];
  }, [images, image]);

  const [idx, setIdx] = useState(0);
  const total = imgs.length;
  const hasCarousel = total > 1;

  const go = (n: number) => setIdx((p) => (p + n + total) % total);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragPx, setDragPx] = useState(0); // current drag offset in px

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!hasCarousel) return;
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(+1);
  };

  // basic touch-swipe
  const touchX = useRef<number | null>(null);
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : +1);
    touchX.current = null;
  };

  const cleanTags =
    Array.isArray(tags) ? tags.map(normalizeTag).filter(Boolean) : [];

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl">
        {/* Back link */}
        <div className="pt-2">
          <Link
            href="/projects"
            className="mb-6 inline-block text-sm underline-offset-4 hover:underline text-white/80"
          >
            ← Back to Projects
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          {summary && (
            <p className="mt-3 text-white/85 leading-7">{summary}</p>
          )}

          {/* Row 2: date + tags */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
            {date && (
              <span className="rounded bg-white/[0.06] px-2 py-0.5">
                {date}
              </span>
            )}

            {cleanTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {cleanTags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            )}
          </div>

          {/* Row 3: external links */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {detailLinks.github && (
              <LinkPill
                href={detailLinks.github}
                label="GitHub"
                icon={<Github className="h-4 w-4" aria-hidden />}
              />
            )}
            {detailLinks.tableau && (
              <LinkPill
                href={detailLinks.tableau}
                label="Tableau"
                icon={<BarChart4 className="h-4 w-4" aria-hidden />}
              />
            )}
            {detailLinks.kaggle && (
              <LinkPill
                href={detailLinks.kaggle}
                label="Kaggle"
                icon={<ExternalLink className="h-4 w-4" aria-hidden />}
              />
            )}
            {detailLinks.demo && (
              <LinkPill
                href={detailLinks.demo}
                label="Live Demo"
                icon={<ExternalLink className="h-4 w-4" aria-hidden />}
              />
            )}
          </div>
        </header>

        {/* Media / slideshow (arrows/dots only if multiple images) */}
        {imgs.length > 0 && (
          <figure
            className="mb-8 relative rounded-2xl overflow-hidden border border-white/10"
            tabIndex={hasCarousel ? 0 : -1}
            onKeyDown={onKeyDown}
            aria-label={
              hasCarousel ? `Screenshot ${idx + 1} of ${total}` : "Project screenshot"
            }
          >
            {/* Viewport */}
            <div
              className="relative w-full overflow-hidden aspect-video bg-white/[0.02]"
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
                setDragging(true);
                setDragPx(0);
              }}
              onTouchMove={(e) => {
                if (touchX.current == null) return;
                const dx = e.touches[0].clientX - touchX.current;
                setDragPx(dx);
              }}
              onTouchEnd={(e) => {
                if (touchX.current == null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                const width = trackRef.current?.clientWidth ?? 1;
                const threshold = Math.max(40, (width / total) * 0.08);
                if (Math.abs(dx) > threshold) go(dx > 0 ? -1 : +1);
                setDragging(false);
                setDragPx(0);
                touchX.current = null;
              }}
            >

              {/* Sliding track */}
              <div
                ref={trackRef}
                className="flex h-full"
                style={{
                  transform: `translateX(calc(${(-idx * 100).toString()}% + ${
                    ((dragPx / (trackRef.current?.clientWidth ?? 1)) * 100 * total) || 0
                  }%))`,
                  transition: dragging ? "none" : "transform 360ms cubic-bezier(.22,.61,.36,1)",
                  willChange: "transform",
                }}
              >
                  {imgs.map((src, i) => (
                  <div key={i} className="relative w-full shrink-0 h-full">
                    <Image
                      src={src}
                      alt={`${title} screenshot ${i + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {hasCarousel && (
              <>
                {/* Arrows */}
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 text-white/90" />
                </button>
                <button
                  type="button"
                  onClick={() => go(+1)}
                  className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 text-white/90" />
                </button>

                {/* Index + dots */}
                <div className="absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-xs bg-black/50 text-white/90">
                  {idx + 1} / {total}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === idx ? "bg-white" : "bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </figure>
        )}


        {/* Tools */}
        {tools.length > 0 && (
          <section className="mb-10 rounded-2xl border border-white/10 p-4">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/60">
              Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/[0.06] px-3 py-1 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Body sections (supports inline links via dangerouslySetInnerHTML) */}
        <div className="max-w-none">
          {sections.length ? (
            sections.map((s) => (
              <section key={s.id} id={s.id} className="mb-12 pl-6">
                {/* Heading with red '#' */}
                <h2
                  className="
                    relative text-xl font-semibold leading-tight
                    before:content-['#'] before:absolute before:-left-6
                    before:top-0 before:text-red-500 before:font-bold
                  "
                >
                  {s.title}
                </h2>

                {/* Indented body */}
                <div className="mt-3 space-y-4 text-white/85 leading-7">
                  {Array.isArray(s.content) ? (
                    s.content.map((para, idx) => (
                      <p
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: s.content }} />
                  )}
                </div>
              </section>
            ))
          ) : (
            <section className="mb-12 pl-6">
              <h2
                className="
                  relative text-xl font-semibold leading-tight
                  before:content-['#'] before:absolute before:-left-6
                  before:top-0 before:text-red-500 before:font-bold
                "
              >
                Overview
              </h2>
              <div className="mt-3 space-y-4 text-white/85 leading-7">
                <p>
                  Content coming soon. Add a{" "}
                  <code className="rounded bg-white/10 px-1.5 py-0.5">
                    sections
                  </code>{" "}
                  array to this project’s entry in <code>lib/projects.ts</code>{" "}
                  to render headings and paragraphs.
                </p>
              </div>
            </section>
          )}
        </div>
      </article>
    </PageShell>
  );
}
