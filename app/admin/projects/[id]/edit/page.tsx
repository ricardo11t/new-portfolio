import { prisma } from "@/lib/prisma";
import ProjectForm from "../ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(await Promise.resolve(params.id));
  
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      skills: {
        include: { skill: true }
      }
    }
  });

  if (!project) notFound();

  const allSkills = await prisma.skill.findMany();

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 24 }}>Editar Projeto: {project.title}</h1>
      <div style={{ background: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
        <ProjectForm project={project} allSkills={allSkills} />
      </div>
    </div>
  );
}
