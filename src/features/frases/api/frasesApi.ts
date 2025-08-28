import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const frasesApi = createApi({
  reducerPath: "frasesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api-frases-cards.onrender.com/api" }),
  endpoints: (builder) => ({
    listarFrases: builder.query({
      query: () => "/listarfrasesTodas",
    }),
    agregarFrase: builder.mutation({
      query: (nuevaFrase) => ({
        url: "/agregarfrase",
        method: "POST",
        body: nuevaFrase,
      }),
    }),
    eliminarFrase: builder.mutation({
      query: (id) => ({
        url: `/eliminarfrase/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useListarFrasesQuery,
  useAgregarFraseMutation,
  useEliminarFraseMutation,
} = frasesApi;
