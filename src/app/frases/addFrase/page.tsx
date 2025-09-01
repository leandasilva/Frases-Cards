"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { addFrase } from "@/features/frases/frasesSlice";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";

export default function AddFrasePage() {
  const [texto, setTexto] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;

    await dispatch(addFrase(texto));
    router.push("/"); // redirige a la lista de frases
  };

  const handleBack = () => {
    router.push("/"); // volver a la página principal
  };

  return (
    <div className="w-full max-w-7xl p-6">
      
      {/* Botón Volver arriba a la izquierda */}
      <div className="mb-6">

         <h1 className="text-center text-white text-3xl font-bold mb-8">
          Agregar Nueva Frase
        </h1>
        <button
          type="button"
          onClick={handleBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Volver a la Lista
        </button>
      </div>

      {/* Formulario */}
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">

        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribí tu frase"
            className="w-full border rounded p-2 mb-4 text-black"
            required
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Generar Frase
          </button>
        </form>
      </div>
    </div>
  );
}
