import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "NBA Salary Prediction | Weongyu Jeon",
  description:
    "NBA player salary prediction using traditional stats, machine learning, and deep learning.",
};

export default function NbaSalaryPrediction() {
  const data = projects.find(p => p.slug === "nba-salary-prediction");
  if (!data) throw new Error("Project not found: nba-salary-prediction");
  return <ProjectDetail data={data as any} />;
}
