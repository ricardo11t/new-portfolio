"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { addAboutImage, deleteAboutImage } from "../../crud-actions";
import { Trash2, UploadCloud, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ImageProps {
  id: number;
  url: string;
}

export default function AboutImageManager({ images }: { images: ImageProps[] }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `about/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      await addAboutImage(publicUrl, file.name);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao fazer upload da imagem.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div style={{ background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px dashed var(--border-color)", marginBottom: 40, textAlign: "center" }}>
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: uploading ? "wait" : "pointer", opacity: uploading ? 0.5 : 1 }}>
          <UploadCloud size={48} color="var(--accent-primary)" />
          <div>
            <span style={{ fontWeight: 600 }}>Clique para fazer upload</span> ou arraste a imagem
          </div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>PNG, JPG ou WebP</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: "none" }} />
        </label>
        {loadingIndicator(uploading)}
        {error && <p style={{ color: "#ef4444", marginTop: 16, fontSize: "0.875rem" }}>{error}</p>}
      </div>

      <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 16 }}>Imagens Pessoais (${images.length})</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {images.map((img) => (
          <div key={img.id} style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)", aspectRatio: "16/9" }}>
            <img src={img.url} alt="Sobre Mim" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button 
              onClick={() => { if(confirm("Apagar imagem?")) deleteAboutImage(img.id) }}
              style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", color: "#ef4444", border: "none", borderRadius: "var(--radius-full)", padding: 8, cursor: "pointer" }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function loadingIndicator(uploading: boolean) {
  if (!uploading) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, color: "var(--accent-primary)" }}>
      <Loader2 className="animate-spin" size={18} /> Fazendo Upload...
    </div>
  );
}
