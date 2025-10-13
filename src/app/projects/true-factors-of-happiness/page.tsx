import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "True Factors of Happiness | Weongyu Jeon",
  description:
    "A Tableau narrative dashboard exploring the psychological and social roots of happiness through data.",
};

export default function TrueFactorsOfHappiness() {
  const data = projects.find(p => p.slug === "true-factors-of-happiness");
  if (!data) throw new Error("Project not found: true-factors-of-happiness");
  return <ProjectDetail data={data as any} />;
}
