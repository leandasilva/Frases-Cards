// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import frasesReducer from "@/features/frases/frasesSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    frases: frasesReducer,
  },
});

// Tipos para dispatch y selector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados que debes exportar
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


