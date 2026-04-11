import { prisma } from "@/lib/prisma";
import AboutImageManager from "./AboutImageManager";

export const dynamic = "force-dynamic";

export default async function AdminAbout() {
  const images = await prisma.aboutImage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 24 }}>Imagens: Sobre Mim</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Faça o upload de fotos suas para serem exibidas na galeria interativa da aba "Sobre Mim".</p>
      
      <AboutImageManager images={images} />
    </div>
  );
}
