// src/components/Navbar.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar", () => {
  test("renderiza correctamente con el título", () => {
    render(<Navbar />);
    
    // Verificamos que el texto esté en el documento
    const titulo = screen.getByText("Proyecto de Leandro");
    expect(titulo).toBeInTheDocument();
    
    // Opcional: verificamos clases de estilo
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("bg-[#0f172a]");
    expect(nav).toHaveClass("shadow-md");
  });
});
