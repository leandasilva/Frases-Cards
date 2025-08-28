"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchFrases } from "@/features/frases/frasesSlice"; 
import SearchBar from "@/features/frases/component/SearchBar";
import FraseList from "@/features/frases/component/FraseList";
import { useRouter } from "next/navigation";
import "../styles/globals.css";


export default function AddCardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchFrases());
  }, [dispatch]);

   const ViewAgregarFrase = () => {
    router.push("/frases/addFrase");
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#533483] to-[#0f3460] bg-gradient-to-bl from-[#1a1a2e] via-[#533483] to-[#0f3460] p-6">    
      <h1 className="text-center text-white text-3xl font-bold mb-8">
        Listado de Frases
      </h1>

      <div className="flex justify-between mb-6 gap-4">
        <button 
        onClick={ViewAgregarFrase}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          Agregar Frase
        </button>      
      </div>
      <SearchBar />
      <FraseList />
    </div>
  );
}
