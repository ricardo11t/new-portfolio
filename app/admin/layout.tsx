"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Code2, LogOut } from "lucide-react";
import { logoutAction } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If login page, don't show sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const links = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/projects", icon: FolderKanban, label: "Projetos" },
    { href: "/admin/skills", icon: Code2, label: "Skills" },
    { href: "/admin/about", icon: LayoutDashboard, label: "Sobre Mim" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-secondary)" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: "var(--bg-card)", borderRight: "1px solid var(--border-color)", padding: "32px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 24px", marginBottom: 40 }}>
          <span style={{ fontSize: "1.25rem", fontWeight: "bold", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            RH Admin
          </span>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: "var(--radius-md)", fontSize: "0.9375rem", fontWeight: 500,
                  textDecoration: "none",
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  background: active ? "var(--bg-tertiary)" : "transparent",
                }}
              >
                <link.icon size={18} style={{ color: active ? "var(--accent-primary)" : "inherit" }} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "0 16px" }}>
          <button 
            onClick={() => logoutAction()}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              width: "100%", borderRadius: "var(--radius-md)", fontSize: "0.9375rem", 
              fontWeight: 500, color: "#ef4444", background: "transparent", border: "none",
              cursor: "pointer", textAlign: "left"
            }}
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 40, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
