"use client";

import { useState } from "react";
import { useAgregarFraseMutation } from "../api/frasesApi";

export default function FraseForm() {
  const [texto, setTexto] = useState("");
  const [agregarFrase] = useAgregarFraseMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto) return;
    await agregarFrase({ texto });
    setTexto("");
  };

  return (
   <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white rounded-2xl shadow-md"
    >
      <input
        type="text"
        placeholder="Escribe una frase..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Agregar
      </button>
    </form>
  );
}


