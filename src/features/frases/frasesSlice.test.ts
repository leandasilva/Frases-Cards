import reducer, {
  setSearch,
  fetchFrases,
  addFrase,
  deleteFrase,
  eliminarFraseAsync,
  Frase,
} from "./frasesSlice";
import axios from "axios";
import { AnyAction } from "@reduxjs/toolkit";

// 👉 Mockeamos axios para controlar las respuestas
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("frasesSlice", () => {
 const initialState = {
  frases: [] as Frase[],
  status: "idle",
  error: null,
  search: "",
} as const;

  it("debería manejar setSearch", () => {
    const newState = reducer(initialState, setSearch("hola"));
    expect(newState.search).toBe("hola");
  });

  it("debería manejar fetchFrases.pending", () => {
    const action = { type: fetchFrases.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe("loading");
  });

  it("debería manejar fetchFrases.fulfilled", () => {
    const frasesMock = [{ _id: "1", texto: "Hola" }];
    const action: AnyAction = {
      type: fetchFrases.fulfilled.type,
      payload: frasesMock,
    };
    const state = reducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.frases).toEqual(frasesMock);
  });

  it("debería manejar fetchFrases.rejected", () => {
    const action: AnyAction = {
      type: fetchFrases.rejected.type,
      error: { message: "Error" },
    };
    const state = reducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Error");
  });

  it("debería manejar addFrase.fulfilled", () => {
    const fraseNueva = { _id: "2", texto: "Nueva" };
    const action: AnyAction = {
      type: addFrase.fulfilled.type,
      payload: fraseNueva,
    };
    const state = reducer(initialState, action);
    expect(state.frases).toContainEqual(fraseNueva);
  });

  it("debería manejar deleteFrase.fulfilled", () => {
    const prev = {
      ...initialState,
      frases: [
        { _id: "1", texto: "Hola" },
        { _id: "2", texto: "Chau" },
      ],
    };
    const action: AnyAction = {
      type: deleteFrase.fulfilled.type,
      payload: "1",
    };
    const state = reducer(prev, action);
    expect(state.frases).toHaveLength(1);
    expect(state.frases[0]._id).toBe("2");
  });

  it("debería manejar eliminarFraseAsync.fulfilled", () => {
    const prev = {
      ...initialState,
      frases: [
        { _id: "1", texto: "Hola" },
        { _id: "2", texto: "Chau" },
      ],
    };
    const action: AnyAction = {
      type: eliminarFraseAsync.fulfilled.type,
      payload: "2",
    };
    const state = reducer(prev, action);
    expect(state.frases).toEqual([{ _id: "1", texto: "Hola" }]);
  });

  it("fetchFrases thunk obtiene datos (mock axios)", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ _id: "10", texto: "Mock" }],
    });

    const result = await fetchFrases()(
      () => {},
      () => initialState,
      undefined
    );

    expect(result.payload).toEqual([{ _id: "10", texto: "Mock" }]);
  });
});
