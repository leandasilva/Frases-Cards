"use client"; // <--- necesario porque usamos Redux Provider

import "../styles/globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Navbar from "../features/frases/component/navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#533483] to-[#0f3460]">
        <Provider store={store}>
          <Navbar />
          <main className="p-6">{children}</main>
        </Provider>
      </body>
    </html>
  );
}


