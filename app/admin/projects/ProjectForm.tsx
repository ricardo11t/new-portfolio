"use client";

import { useState } from "react";
import { createProject, updateProject } from "../../crud-actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Project, Skill, ProjectSkill } from "@prisma/client";

// Define a type for a project that includes the relations
type ProjectWithSkills = Project & {
  skills?: (ProjectSkill & { skill: Skill })[];
};

export default function ProjectForm({
  project,
  allSkills,
}: {
  project?: ProjectWithSkills;
  allSkills: Skill[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Pre-fill skillIds if we are editing an existing project
  const initialSkillIds = project?.skills?.map((ps) => ps.skillId.toString()) || [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar projeto. Veja o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Title & Slug */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Título *</label>
          <input
            name="title"
            required
            defaultValue={project?.title}
            placeholder="Nome do Projeto"
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Slug (URL) *</label>
          <input
            name="slug"
            required
            defaultValue={project?.slug}
            placeholder="nome-do-projeto"
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* Description */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Resumo Rápido *</label>
        <textarea
          name="description"
          required
          defaultValue={project?.description}
          rows={2}
          placeholder="Um resumo de 1-2 frases para o card principal"
          style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", resize: "vertical" }}
        />
      </div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Detalhes Completos *</label>
        <textarea
          name="details"
          required
          defaultValue={project?.details}
          rows={4}
          placeholder="Descrição aprofundada que aparecerá no modal."
          style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", resize: "vertical" }}
        />
      </div>

      {/* Highlights & Challenges */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Destaques (Array JSON)</label>
          <textarea
            name="highlights"
            defaultValue={project?.highlights || ""}
            rows={3}
            placeholder={'["Destaque 1", "Destaque 2"]'}
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", resize: "vertical" }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Desafios</label>
          <textarea
            name="challenges"
            defaultValue={project?.challenges || ""}
            rows={3}
            placeholder="Qual foi o maior desafio do projeto?"
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", resize: "vertical" }}
          />
        </div>
      </div>

      {/* URLs */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>GitHub URL</label>
          <input
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl || ""}
            placeholder="https://github.com/..."
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Demo URL</label>
          <input
            name="demoUrl"
            type="url"
            defaultValue={project?.demoUrl || ""}
            placeholder="https://..."
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* Status, Display Order, Featured */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Status</label>
          <select
            name="status"
            defaultValue={project?.status || "completed"}
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          >
            <option value="completed">Concluído</option>
            <option value="in_progress">Em Desenvolvimento</option>
          </select>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Ordem de Exibição (0 primeiro)</label>
          <input
            name="displayOrder"
            type="number"
            defaultValue={project?.displayOrder || 0}
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, paddingBottom: 10 }}>
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={project?.featured}
            style={{ width: 18, height: 18 }}
          />
          <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Destacado na Home?</label>
        </div>
      </div>

      {/* Skills Checkboxes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, background: "var(--bg-tertiary)", borderRadius: "var(--radius-lg)" }}>
        <label style={{ fontSize: "1rem", fontWeight: "bold" }}>Selecione as Skills Relacionadas</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {allSkills.map(skill => (
            <label key={skill.id} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input 
                type="checkbox" 
                name="skillIds" 
                value={skill.id}
                defaultChecked={initialSkillIds.includes(skill.id.toString())}
                style={{ width: 16, height: 16 }}
              />
              <span style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--bg-primary)", padding: "4px 8px", borderRadius: 8, border: "1px solid var(--border-color)", fontSize: "0.875rem" }}>
                <img src={skill.iconUrl} alt="" width={14} height={14} style={{ borderRadius: 2 }} />
                {skill.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12 }}>
        <Link href="/admin/projects" className="btn btn-ghost">
          Cancelar
        </Link>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : (project ? "Salvar Alterações" : "Criar Projeto")}
        </button>
      </div>
    </form>
  );
}
