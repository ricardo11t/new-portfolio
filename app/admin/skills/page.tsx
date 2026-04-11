import { prisma } from "@/lib/prisma";
import { createSkill, deleteSkill } from "../crud-actions";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSkills() {
  const skills = await prisma.skill.findMany({ orderBy: { category: "asc" } });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 24 }}>Gerenciar Skills</h1>

      <div style={{ background: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 16 }}>Adicionar Nova Skill</h2>
        <form action={createSkill} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <input required name="name" placeholder="Nome (Ex: React)" className="form-input" style={{ flex: 1, minWidth: 200, padding: 12, borderRadius: 8, background: "var(--bg-tertiary)", border: "1px solid var(--border-color)", color: "white" }} />
          <input required name="category" placeholder="Categoria (Ex: frontend)" className="form-input" style={{ flex: 1, minWidth: 200, padding: 12, borderRadius: 8, background: "var(--bg-tertiary)", border: "1px solid var(--border-color)", color: "white" }} />
          <input required name="iconUrl" placeholder="URL do Ícone (SVG ou PNG)" className="form-input" style={{ flex: 2, minWidth: 300, padding: 12, borderRadius: 8, background: "var(--bg-tertiary)", border: "1px solid var(--border-color)", color: "white" }} />
          <button type="submit" className="btn btn-primary">Salvar Skill</button>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {skills.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-card)", padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={s.iconUrl} alt={s.name} width={24} height={24} style={{ objectFit: "contain" }} />
              <div>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{s.category}</div>
              </div>
            </div>
            <form action={async () => { "use server"; await deleteSkill(s.id); }}>
              <button type="submit" style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer", padding: 8 }}>
                <Trash2 size={18} />
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
