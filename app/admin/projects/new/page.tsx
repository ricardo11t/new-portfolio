import { prisma } from "@/lib/prisma";
import ProjectForm from "../ProjectForm";

export default async function NewProjectPage() {
  const allSkills = await prisma.skill.findMany();

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 24 }}>Criar Novo Projeto</h1>
      <div style={{ background: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
        <ProjectForm allSkills={allSkills} />
      </div>
    </div>
  );
}
