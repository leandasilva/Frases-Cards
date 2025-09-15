import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import frasesReducer, { FrasesState } from "@/features/frases/frasesSlice";

describe("SearchBar", () => {
  let store: EnhancedStore<{ frases: FrasesState }>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        frases: frasesReducer,
      },
      preloadedState: {
        frases: {
          frases: [
            { _id: "1", texto: "Hola mundo" },
            { _id: "2", texto: "React testing" },
          ],
          status: "idle",
          error: null,
          search: "",
        } as FrasesState,
      },
    });
  });

  test("renderiza con el valor del estado inicial", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Buscar frase...") as HTMLInputElement;
    expect(input.value).toBe(""); // coincide con preloadedState
  });

  test("despacha setSearch al cambiar el input", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Buscar frase...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "nuevo texto" } });

    expect(store.getState().frases.search).toBe("nuevo texto");
  });
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchBar from "./SearchBar";