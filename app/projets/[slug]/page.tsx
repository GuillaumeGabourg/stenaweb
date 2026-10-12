import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { Footer } from "@/components/sections/Footer";
import { getProject, projects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} · ${p.sector}`,
    description: p.summary,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: { images: [`/projects/${p.slug}/desktop.png`] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <CaseStudy project={projects[index]} next={next} />
      <Footer />
    </>
  );
}
