"use client";

import type { MouseEvent } from "react";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton() {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!window.confirm("Tem certeza que deseja apagar o projeto inteiro?")) {
      event.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      className="btn btn-ghost"
      style={{ width: "100%", justifyContent: "center", fontSize: "0.875rem", padding: "8px 12px", color: "red" }}
      onClick={handleClick}
    >
      <Trash2 size={16} />
      Apagar Projeto
    </button>
  );
}
