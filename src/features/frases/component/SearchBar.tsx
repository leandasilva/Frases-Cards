"use client";

import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../frasesSlice";
import { RootState } from "@/store/store";

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.frases.search);

  return (
    <input
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      placeholder="Buscar frase..."
      className="border p-2 w-full mb-4"
    />
  );
}