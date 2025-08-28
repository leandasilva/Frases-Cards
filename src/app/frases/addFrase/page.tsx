"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { addFrase } from "@/features/frases/frasesSlice";
import { useRouter } from "next/navigation";

export default function Page() {
  const [texto, setTexto] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;

    await dispatch(addFrase(texto));
    router.push("/"); // redirige a la lista de frases
  };

  return (
   <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#1a1a2e] via-[#533483] to-[#0f3460] bg-gradient-to-bl from-[#1a1a2e] via-[#533483] to-[#0f3460]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl text-black font-grey-200 mb-4">Agregar Frase</h2>
        <textarea
          rows={4}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full border text-black rounded p-2 mb-4"
          placeholder="Escribí tu frase"
          required

        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Guardar
        </button>
      </form>
    </main>
  );
}