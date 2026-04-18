import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/portfolio-data";
import ProjectDetailClient from "./ProjectDetailClient";

export const dynamic = "force-dynamic";

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const dto = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    details: project.details,
    highlights: project.highlights,
    challenges: project.challenges,
    imageUrl: project.imageUrl,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
    status: project.status,
    createdAt: project.createdAt.toISOString(),
    skills: project.skills.map((s) => ({
      skill: { name: s.skill.name, category: s.skill.category },
    })),
    images: project.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      createdAt: img.createdAt.toISOString(),
    })),
  };

  return <ProjectDetailClient project={dto} />;
}
