import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.projectSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.siteImage.deleteMany();

  // === SKILLS ===
  const skills = await Promise.all([
    prisma.skill.create({
      data: {
        name: "React",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        category: "frontend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Next.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        category: "frontend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "TypeScript",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        category: "frontend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "JavaScript",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        category: "frontend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "HTML5",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        category: "frontend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "CSS3",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        category: "frontend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "TailwindCSS",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        category: "frontend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Node.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        category: "backend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Express",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        category: "backend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Python",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        category: "backend",
      },
    }),
    prisma.skill.create({
      data: {
        name: "MySQL",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        category: "database",
      },
    }),
    prisma.skill.create({
      data: {
        name: "PostgreSQL",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        category: "database",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Prisma",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
        category: "database",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Docker",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        category: "devops",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Git",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        category: "devops",
      },
    }),
    prisma.skill.create({
      data: {
        name: "Linux",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        category: "devops",
      },
    }),
    prisma.skill.create({
      data: {
        name: "AWS",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        category: "devops",
      },
    }),
  ]);

  const skillMap = Object.fromEntries(skills.map((s) => [s.name, s.id]));

  // === PROJECTS ===
  await prisma.project.create({
    data: {
      title: "Portfólio Pessoal",
      slug: "portfolio-pessoal",
      description:
        "Website pessoal desenvolvido com Next.js e Prisma para apresentar projetos, habilidades e experiência profissional.",
      details:
        "Portfólio pessoal desenvolvido do zero utilizando Next.js 16 com App Router, Prisma ORM com SQLite, e um design system premium construído com CSS puro. O site conta com animações de scroll, globo 3D de skills, modal de detalhes de projeto rico, suporte a dark/light mode, e é totalmente responsivo.\n\nO backend utiliza Server Components do Next.js para buscar dados diretamente do banco via Prisma, eliminando a necessidade de um servidor Express separado. As API Routes protegidas por API key permitem gerenciar conteúdo de forma segura.",
      highlights: JSON.stringify([
        "Design premium com dark mode e animações suaves",
        "Server Components para carregamento otimizado",
        "Sistema de gerenciamento de conteúdo via API",
        "Modal de projeto com detalhes ricos",
        "SEO otimizado com metadata dinâmica",
      ]),
      challenges:
        "O principal desafio foi criar uma arquitetura que fosse simples de manter e ao mesmo tempo oferecesse uma excelente experiência visual. A migração de uma stack Vite + Express + MySQL para Next.js + Prisma + SQLite simplificou significativamente o deploy e a manutenção.",
      githubUrl: "https://github.com/ricardo11t/portfolio",
      status: "completed",
      featured: true,
      displayOrder: 1,
      skills: {
        create: [
          { skillId: skillMap["React"] },
          { skillId: skillMap["Next.js"] },
          { skillId: skillMap["TypeScript"] },
          { skillId: skillMap["Prisma"] },
          { skillId: skillMap["CSS3"] },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "Sorte Mais Brasil",
      slug: "sorte-mais-brasil",
      description:
        "Plataforma web para gerenciamento e venda de bolões de loteria com scraping automatizado de dados.",
      details:
        "Plataforma completa para a venda de bolões de loteria online. Inclui scraping automatizado do Marketplace da Caixa para coletar dados de bolões e lotéricas, processamento e normalização de dados, e uma interface amigável para o usuário final navegar e comprar bolões.\n\nO sistema conta com um painel administrativo, integração com múltiplas loterias (Mega-Sena, Lotofácil, Quina, etc.), carrinho de compras, e filtros avançados para encontrar bolões específicos.",
      highlights: JSON.stringify([
        "Scraping automatizado do Marketplace da Caixa",
        "Normalização e deduplicação inteligente de dados",
        "Interface com filtros avançados por loteria",
        "Carrinho de compras funcional",
        "Seção de últimos resultados em tempo real",
      ]),
      challenges:
        "O maior desafio foi lidar com a inconsistência dos dados do scraping — payloads enormes que causavam erros 413, e dados de lotéricas misturados com bolões. A solução envolveu filtros inteligentes e normalização de chaves para deduplicação.",
      githubUrl: "https://github.com/ricardo11t",
      status: "completed",
      featured: true,
      displayOrder: 2,
      skills: {
        create: [
          { skillId: skillMap["React"] },
          { skillId: skillMap["TypeScript"] },
          { skillId: skillMap["Node.js"] },
          { skillId: skillMap["Express"] },
          { skillId: skillMap["MySQL"] },
          { skillId: skillMap["Docker"] },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "Bot Discord — Mudae Kakera",
      slug: "mudae-kakera-bot",
      description:
        "Bot de Discord em TypeScript que monitora e reage automaticamente a personagens com kakera de alto valor.",
      details:
        "Bot desenvolvido em TypeScript para Discord que monitora canais específicos em busca de mensagens do bot Mudae. O bot analisa as mensagens para identificar personagens com valor de kakera acima de 500 e reage automaticamente a eles.\n\nO projeto é containerizado com Docker para facilitar o deploy em VPS, e utiliza a biblioteca discord.js para a integração com a API do Discord.",
      highlights: JSON.stringify([
        "Monitoramento em tempo real de canais Discord",
        "Parser inteligente de mensagens do Mudae",
        "Reação automática baseada em valor de kakera",
        "Containerizado com Docker para easy deploy",
        "Configuração flexível de canais e thresholds",
      ]),
      challenges:
        "O desafio principal foi parsear as mensagens embed do Mudae de forma confiável, já que o formato pode variar. A solução envolveu regex robustos e fallbacks para diferentes formatos de mensagem.",
      githubUrl: "https://github.com/ricardo11t",
      status: "completed",
      featured: false,
      displayOrder: 3,
      skills: {
        create: [
          { skillId: skillMap["TypeScript"] },
          { skillId: skillMap["Node.js"] },
          { skillId: skillMap["Docker"] },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "SaaS VoIP — Plataforma de Chamadas",
      slug: "saas-voip",
      description:
        "Plataforma SaaS para gerenciamento de chamadas VoIP com integração Wavoip e importação de contatos CSV.",
      details:
        "Plataforma SaaS para gerenciamento de chamadas VoIP inspirada no Vapi.ai. Inclui integração com a API Wavoip para realizar chamadas, importação de contatos via CSV, painel de agentes de IA, e interface moderna para gerenciar campanhas de chamadas.\n\nO sistema permite criar agentes de IA que realizam chamadas automaticamente, com suporte a scripts personalizados, gravação de chamadas, e analytics detalhados por campanha.",
      highlights: JSON.stringify([
        "Integração completa com API Wavoip",
        "Importação de contatos via CSV",
        "Painel de gerenciamento de agentes de IA",
        "Interface moderna e responsiva",
        "Sistema de webhooks e function calling",
      ]),
      challenges:
        "A integração com audio bridging em tempo real e a sincronização de estado entre múltiplas chamadas simultâneas foram os maiores desafios técnicos. O sistema de websockets para atualizações em tempo real também exigiu cuidado especial.",
      githubUrl: "https://github.com/ricardo11t",
      status: "in_progress",
      featured: true,
      displayOrder: 4,
      skills: {
        create: [
          { skillId: skillMap["React"] },
          { skillId: skillMap["Next.js"] },
          { skillId: skillMap["TypeScript"] },
          { skillId: skillMap["Node.js"] },
          { skillId: skillMap["PostgreSQL"] },
          { skillId: skillMap["Docker"] },
          { skillId: skillMap["AWS"] },
        ],
      },
    },
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
