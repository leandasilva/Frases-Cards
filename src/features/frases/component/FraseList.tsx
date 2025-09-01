"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { deleteFrase } from "@/features/frases/frasesSlice";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi"; // <-- ícono de basura

export default function FraseList() {
  const dispatch = useDispatch<AppDispatch>();
  const { frases, error, search } = useSelector(
    (state: RootState) => state.frases
  );

  const frasesFiltradas = frases.filter((f) =>
    (f.texto ?? "").toLowerCase().includes((search ?? "").toLowerCase())
  );

  if (error) return <p className="text-red-500">{error}</p>;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This phrase will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFrase(id));
        Swal.fire("Deleted!", "The phrase has been removed.", "success");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {frasesFiltradas.map((frase, index) => (
        <div
          key={frase._id ? String(frase._id) : `temp-${index}`}
          className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
        >
          <p
            data-testid={`frase-${frase._id ?? index}`}
            className="text-gray-800 text-lg"
          >
            {frase.texto}
          </p>
          <button
            data-testid={`btn-eliminar-${frase._id ?? index}`}
            onClick={() => handleDelete(frase._id)}
            className="text-red-500 hover:text-red-700 ml-4"
          >
            <FiTrash2 size={20} /> {/* ícono de basura */}
          </button>
        </div>
      ))}
    </div>
  );
}
