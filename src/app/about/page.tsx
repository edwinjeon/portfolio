// src/app/about/page.tsx
import Image from "next/image";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "About | Weongyu Jeon",
  description:
    "Information Systems student at Carnegie Mellon University, focusing on data, analytics, and storytelling.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center">
        <div className="mb-8 h-75 w-75 overflow-hidden rounded-full ring-1 ring-white/15 shadow-[0_0_0_6px_rgba(255,255,255,0.02)]">
          <Image
            src="/about.jpg"
            alt="Weongyu Jeon"
            width={352}
            height={352}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl lg:text-4xl font-semibold text-white/95">About</h1>
      </div>

      <main className="mx-auto max-w-3xl leading-8 space-y-6 text-white/85">
        <p>
          I’m <strong className="text-white">Weongyu Jeon</strong>, an Information Systems student at
          <strong className="text-white"> Carnegie Mellon University</strong>, concentrating in
          <strong className="text-white"> Business Analytics</strong>.
        </p>
        <p>
          My work, and much of my personal curiosity, centers around data. I
          believe numerical data is the most powerful tool to explain and improve the world we
          live in. Studying Information Systems allows me to build expertise upon this
          passion, and I plan to continue pursuing it as a data analyst.
        </p>
        <p>
          I explore this interest through analyzing and visualizing data. My
          <strong className="text-white"> Salary Prediction</strong> model captures what I love most
          about working with data — the ability to forecast the future. My
          <strong className="text-white"> Happiness Project</strong> tells a story about how we should
          interpret the world beyond numbers.
        </p>
        <p>
          Through college and various personal projects, I’ve learned to use collaborative
          tools that support every step of the data process — from collection and
          cleaning to analysis and visualization. Yet, more than the tools
          themselves, I’ve grasped how to persuade others see the story behind the
          numbers.
        </p>
      </main>
    </PageShell>
  );
}
