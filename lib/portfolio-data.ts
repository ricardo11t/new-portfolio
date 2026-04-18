import { prisma } from "@/lib/prisma";

export async function getPortfolioData() {
  const [skills, projects, aboutImages] = await Promise.all([
    prisma.skill.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.project.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        skills: {
          include: { skill: true },
        },
        images: true,
      },
    }),
    prisma.aboutImage.findMany({
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return { skills, projects, aboutImages };
}
