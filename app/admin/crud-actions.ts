"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// SKILLS ACTIONS
export async function createSkill(formData: FormData) {
  const name = formData.get("name") as string;
  const iconUrl = formData.get("iconUrl") as string;
  const category = formData.get("category") as string;

  await prisma.skill.create({
    data: { name, iconUrl, category },
  });
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function deleteSkill(id: number) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

// PROJECTS ACTIONS
export async function createProject(formData: FormData) {
  const projectFields = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    details: formData.get("details") as string,
    highlights: formData.get("highlights") as string || null,
    challenges: formData.get("challenges") as string || null,
    githubUrl: formData.get("githubUrl") as string || null,
    demoUrl: formData.get("demoUrl") as string || null,
    status: formData.get("status") as string,
    featured: formData.get("featured") === "true",
    displayOrder: Number(formData.get("displayOrder") || 0),
  };

  const skillIds = formData.getAll("skillIds").map(Number);

  await prisma.project.create({
    data: {
      ...projectFields,
      skills: {
        create: skillIds.map(skillId => ({
          skill: { connect: { id: skillId } }
        }))
      }
    },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function updateProject(id: number, formData: FormData) {
  const projectFields = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    details: formData.get("details") as string,
    highlights: formData.get("highlights") as string || null,
    challenges: formData.get("challenges") as string || null,
    githubUrl: formData.get("githubUrl") as string || null,
    demoUrl: formData.get("demoUrl") as string || null,
    status: formData.get("status") as string,
    featured: formData.get("featured") === "true",
    displayOrder: Number(formData.get("displayOrder") || 0),
  };

  const skillIds = formData.getAll("skillIds").map(Number); // array of IDs

  await prisma.project.update({
    where: { id },
    data: {
      ...projectFields,
      skills: {
        deleteMany: {},
        create: skillIds.map(skillId => ({
          skill: { connect: { id: skillId } }
        }))
      }
    },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function deleteProject(id: number) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function addProjectImage(projectId: number, url: string, alt: string) {
  await prisma.projectImage.create({
    data: { projectId, url, alt },
  });
  revalidatePath(`/admin/projects`);
  revalidatePath("/");
}

export async function deleteProjectImage(id: number) {
  await prisma.projectImage.delete({ where: { id } });
  revalidatePath(`/admin/projects`);
  revalidatePath("/");
}

// ABOUT IMAGES ACTIONS
export async function addAboutImage(url: string, alt: string) {
  await prisma.aboutImage.create({
    data: { url, alt },
  });
  revalidatePath("/admin/about");
  revalidatePath("/");
}

export async function deleteAboutImage(id: number) {
  await prisma.aboutImage.delete({ where: { id } });
  revalidatePath("/admin/about");
  revalidatePath("/");
}
