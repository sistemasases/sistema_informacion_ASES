/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        estudiantes: [],
        shosenStudent: null,

        setUser: (payload) => set((state) => ({ user: payload })),
        setEstudiantes: (payload) =>
          set((state) => ({ estudiantes: payload })),
        setShosenStudent: (payload) =>
          set((state) => ({ shosenStudent: payload })),
      }),
      {
        name: "auth",
      }
    )
  )
);
