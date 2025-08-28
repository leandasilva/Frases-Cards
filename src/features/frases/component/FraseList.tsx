// features/frases/components/FraseList.tsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { deleteFrase } from "@/features/frases/frasesSlice";


export default function FraseList() {
  const dispatch = useDispatch<AppDispatch>();
  const { frases, error, search } = useSelector(
    (state: RootState) => state.frases
  );

 const frasesFiltradas = frases.filter((f) =>
  (f.texto ?? "").toLowerCase().includes((search ?? "").toLowerCase())
);


  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frasesFiltradas.map((frase, index) => (
          <div
            key={frase._id ? String(frase._id) : `temp-${index}`}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <p data-testid="frase-1" className="text-gray-800 text-lg">{frase.texto}</p>
            <button
              data-testid="btn-eliminar-1"
              onClick={() => dispatch(deleteFrase(frase._id))}
              className="text-red-500 hover:text-red-700 font-bold ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
  );
}