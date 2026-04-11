import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ImagePlus, Plus, Edit2 } from "lucide-react";
import { deleteProject } from "../crud-actions";
import { DeleteProjectButton } from "./DeleteProjectButton";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({ 
    orderBy: { displayOrder: "asc" },
    include: { images: true }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Meus Projetos</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {/* Adicionar Novo */}
        <Link href="/admin/projects/new" style={{ display: "flex", flexDirection: "column", gap: 16, background: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px dashed var(--border-color)", alignItems: "center", justifyContent: "center", minHeight: 200, color: "var(--text-secondary)", transition: "border-color 0.2s" }} className="hover-border-primary">
          <Plus size={32} />
          <h3>Novo Projeto</h3>
        </Link>

        {projects.map((p) => (
          <div key={p.id} style={{ display: "flex", flexDirection: "column", background: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", gap: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{p.title}</h3>
                <span className={`badge ${p.status === 'completed' ? 'completed' : 'in_progress'}`}>
                  {p.status === 'completed' ? 'Concluído' : 'Dev'}
                </span>
              </div>
              <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem", marginTop: 4 }}>{p.images.length} imagem(ns) conectada(s)</p>
            </div>
            
            <div style={{ display: "flex", gap: 8, marginTop: "auto", flexWrap: "wrap" }}>
              <Link href={`/admin/projects/${p.id}/images`} className="btn btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: "0.875rem", padding: "8px 12px" }}>
                <ImagePlus size={16} />
                Fotos
              </Link>
              <Link href={`/admin/projects/${p.id}/edit`} className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.875rem", padding: "8px 12px" }}>
                <Edit2 size={16} />
                Editar
              </Link>
              <form action={deleteProject.bind(null, p.id)} style={{ width: "100%" }}>
                <DeleteProjectButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
