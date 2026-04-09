import { prisma } from "@/lib/prisma";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default async function Home() {
  const [skills, projects, aboutImages] = await Promise.all([
    prisma.skill.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.project.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        images: true,
      },
    }),
    prisma.aboutImage.findMany({
      orderBy: { createdAt: "asc" },
    })
  ]);

  return (
    <main>
      <Hero />
      <About images={aboutImages} />
      <Skills skills={skills} />
      <ProjectsSection projects={projects} />
      <Contact />
      <Footer />
    </main>
  );
}
