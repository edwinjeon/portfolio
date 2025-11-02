"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import Chip from "@/components/Chip";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  // Build tag cloud from tools + tags (unique per project)
  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      const set = new Set([...(p.tags ?? []), ...p.tools]);
      for (const tag of set) map.set(tag, (map.get(tag) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((p) =>
      (p.tags ?? []).includes(activeTag) || p.tools.includes(activeTag)
    );
  }, [activeTag]);

  return (
    <PageShell>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        {/* Left: list */}
        <section>
          <h1 className="text-3xl lg:text-4xl font-semibold text-white/95 mb-8">
            Projects
          </h1>

          {/* Column headers (md+) */}
          <div className="hidden md:grid grid-cols-[minmax(300px,1fr)_180px_minmax(260px,1fr)_40px] gap-6 px-2 text-sm text-white/60 items-center">
            <span>Project</span>
            <span>Type</span>
            <span>Tools</span>
            <span className="sr-only">Open</span>
          </div>
          <div className="hidden md:block border-b border-white/10 mb-2" />

          <ul className="divide-y divide-white/10">
            {filtered.map((p) => (
              <li key={p.slug} className="py-4">
                {/* Row 1: title + type + tools + arrow */}
                <div className="flex flex-col gap-2 md:grid md:grid-cols-[minmax(300px,1fr)_180px_minmax(260px,1fr)_40px] md:items-center md:gap-6 px-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-lg font-semibold text-white hover:underline underline-offset-4"
                  >
                    {p.title}
                  </Link>

                  <div className="text-white/70">{(p.tags?.[0]) ?? "Project"}</div>

                  <div className="flex flex-wrap gap-2">
                    {p.tools.slice(0, 3).map((tool) => (
                      <Chip key={tool}>{tool}</Chip>
                    ))}
                    {p.tools.length > 3 && (
                      <span className="text-white/40 text-xs ml-1">+{p.tools.length - 3}</span>
                    )}
                  </div>

                  <Link
                    href={`/projects/${p.slug}`}
                    className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:bg-white/[0.08]"
                    aria-label={`Open ${p.title}`}
                  >
                    →
                  </Link>

                </div>

                {/* Row 2: one-line summary */}
                <p className="mt-2 px-1 text-white/70 leading-relaxed">{p.summary}</p>

                {/* Mobile: external links under summary */}
                {p.links && (
                  <div className="mt-3 flex md:hidden flex-wrap gap-3 px-1">
                    {p.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-sm text-white/80 underline underline-offset-4 hover:text-white"
                        target={l.href.startsWith("/") ? "_self" : "_blank"}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Right: Tags / filter */}
        <aside className="lg:sticky lg:top-24">
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-base font-medium text-white/90">Tags</h2>
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="text-xs text-white/60 hover:text-white underline underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tagCounts.map(([tag, count]) => (
              <Chip
                key={tag}
                active={tag === activeTag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                as="button"
              >
                {tag} <span className="ml-1 text-white/50">· {count}</span>
              </Chip>
            ))}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
