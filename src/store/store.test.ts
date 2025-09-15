import { store, RootState } from "./store";
import { setSearch, fetchFrases } from "@/features/frases/frasesSlice";

describe("Redux store", () => {
  it("debería tener el estado inicial correcto", () => {
    const state: RootState = store.getState();
    expect(state.frases.frases).toEqual([]);
    expect(state.frases.status).toBe("idle");
    expect(state.frases.error).toBeNull();
    expect(state.frases.search).toBe("");
  });

  it("debería actualizar el search mediante setSearch", () => {
    store.dispatch(setSearch("hola mundo"));
    const state: RootState = store.getState();
    expect(state.frases.search).toBe("hola mundo");
  });

  it("debería actualizar el estado al dispatch de fetchFrases.fulfilled", () => {
    const fakeFrases = [{ _id: "1", texto: "Test" }];
    store.dispatch({ type: fetchFrases.fulfilled.type, payload: fakeFrases });
    const state: RootState = store.getState();
    expect(state.frases.frases).toEqual(fakeFrases);
    expect(state.frases.status).toBe("succeeded");
  });
});
