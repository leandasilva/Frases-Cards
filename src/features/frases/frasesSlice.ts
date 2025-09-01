// src/features/frases/frasesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Frase {
  _id: string;
  texto: string;
}

interface FrasesState {
  frases: Frase[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  search: string;   // 👈 nuevo campo
}

const initialState: FrasesState = {
  frases: [],
  status: "idle",
  error: null,
  search: "",      // 👈 inicializamos
};

const  FrasesState = {
  frases: [],
  search: "",
};

// ✅ Thunks
export const fetchFrases = createAsyncThunk("frases/fetchFrases", async () => {
  const res = await axios.get("https://api-cards-4a1i.onrender.com/api/listarfrasesTodas");
  return res.data;
});
export const eliminarFraseAsync = createAsyncThunk(
  "frases/eliminarFraseAsync",
  async (id: string) => {
    await fetch(`https://api-cards-4a1i.onrender.com/frases/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);


export const addFrase = createAsyncThunk(
  "frases/addFrase",
  async (texto: string) => {
    const res = await axios.post("https://api-cards-4a1i.onrender.com/api/agregarfrase", {
      texto: texto,
    });
    return res.data;
  }
);

export const deleteFrase = createAsyncThunk(
  "frases/deleteFrase",
  async (id: string) => {
    await axios.delete(`https://api-cards-4a1i.onrender.com/api/eliminarfrase/${id}`);
    return id;
  }
);

const frasesSlice = createSlice({
  name: "frases",
  initialState,
  reducers: {
    // 👇 Reducer para actualizar el search
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchFrases.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFrases.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.frases = action.payload;
      })
      .addCase(fetchFrases.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error desconocido";
      })
      .addCase(addFrase.fulfilled, (state, action) => {
       state.frases.push(action.payload);
      })
      .addCase(deleteFrase.fulfilled, (state, action) => {
        state.frases = state.frases.filter((f) => f._id !== action.payload);
      })
      .addCase(eliminarFraseAsync.fulfilled, (state, action) => {
      state.frases = state.frases.filter((f) => f._id !== action.payload);
    });
  },
});

export const { setSearch } = frasesSlice.actions;
export default frasesSlice.reducer;


