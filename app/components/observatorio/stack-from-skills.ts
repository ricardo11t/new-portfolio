type SkillRow = { name: string; category: string };

export type StackRow =
  | { k: string; v: string }
  | { k: string; v: string; accent: string };

export function buildStackRows(skills: SkillRow[]): StackRow[] {
  const langLike = skills
    .filter((s) => /typescript|javascript/i.test(s.name))
    .slice(0, 6)
    .map((s) => s.name)
    .join(", ");

  const dbLike = skills
    .filter((s) => /redis|prisma|postgres|supabase|mysql|qdrant/i.test(s.name))
    .slice(0, 5)
    .map((s) => s.name)
    .join(", ");

  return [
    { k: "lang", v: langLike || "TypeScript, JavaScript" },
    { k: "front", v: "React, Next.js" },
    { k: "back", v: "Node.js, NestJS" },
    { k: "db", v: dbLike || "Postgres, MySQL, Redis, Qdrant" },
    { k: "infra", v: "Docker, AWS, Linux" },
    { k: "auto", v: "n8n, Cypress, Jest" },
    { k: "editor", v: "nvim", accent: "btw" },
  ];
}
