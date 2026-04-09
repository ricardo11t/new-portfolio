import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ImageManager from "./ImageManager";

export default async function ProjectImagesPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projectId = parseInt(resolvedParams.id);
  
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { images: true }
  });

  if (!project) notFound();

  return <ImageManager projectId={project.id} projectTitle={project.title} images={project.images} />;
}
