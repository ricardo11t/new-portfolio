"use client";

import { useState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      await loginAction(formData);
    } catch (err: any) {
      setError(err.message || "Erro de login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400, background: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-lg)" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 8, color: "var(--text-primary)" }}>Área Restrita</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: "0.875rem" }}>Faça login para gerenciar o portfólio.</p>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: "0.875rem", fontWeight: 500, color: "var(--text-secondary)" }}>
              Senha de Acesso
            </label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              required
              style={{
                width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", 
                background: "var(--bg-tertiary)", border: "1px solid var(--border-color)",
                color: "var(--text-primary)", outline: "none", fontSize: "1rem"
              }}
            />
          </div>

          {error && <p style={{ color: "#ef4444", fontSize: "0.875rem", margin: 0 }}>{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
          >
            {loading ? "Entrando..." : "Entrar no Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
