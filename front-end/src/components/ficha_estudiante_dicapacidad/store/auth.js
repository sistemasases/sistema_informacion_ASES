/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        estudiantesDiscapacidad: [],
        estudianteSelected: null,

        setUser: (payload) => set((state) => ({ user: payload })),
        setEstudiantesDiscapacidad: (payload) =>
          set((state) => ({ estudiantesDiscapacidad: payload })),
        setEstudianteSelected: (payload) =>
          set((state) => ({ estudianteSelected: payload })),
      }),
      {
        name: "auth",
      }
    )
  )
);
