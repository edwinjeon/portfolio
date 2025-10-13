import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "KPI Dashboard | Weongyu Jeon",
  description:
    "A business intelligence dashboard tracking KPIs across products, customers, and HR using SQL and Tableau.",
};

export default function KpiDashboard() {
  const data = projects.find(p => p.slug === "kpi-dashboard");
  if (!data) throw new Error("Project not found: kpi-dashboard");
  return <ProjectDetail data={data as any} />;
}
