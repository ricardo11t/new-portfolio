import "./observatorio.css";
import { getPortfolioData } from "@/lib/portfolio-data";
import { ObservatorioProviders } from "./ObservatorioProviders";
import ObservatorioMenubar from "./ObservatorioMenubar";
import ObservatorioHero from "./ObservatorioHero";
import ObservatorioAtlas from "./ObservatorioAtlas";
import ObservatorioLog from "./ObservatorioLog";
import ObservatorioContact from "./ObservatorioContact";
import ObservatorioInteractions from "./ObservatorioInteractions";
import ObservatorioFooter from "./ObservatorioFooter";

export default async function ObservatorioView() {
  const { skills, projects } = await getPortfolioData();

  const projectsForClient = projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    status: p.status,
    createdAt: p.createdAt.toISOString(),
    skills: p.skills.map((s) => ({
      skill: { name: s.skill.name, category: s.skill.category },
    })),
  }));

  return (
    <ObservatorioProviders>
      <ObservatorioInteractions />
      <ObservatorioMenubar />
      <ObservatorioHero skills={skills} />
      <ObservatorioAtlas projects={projectsForClient} />
      <ObservatorioLog />
      <ObservatorioContact />
      <ObservatorioFooter />
    </ObservatorioProviders>
  );
}
