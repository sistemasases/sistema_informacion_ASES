/**
 * @file auth.js
 * @version 1.0.0
 * @description Este componente se encarga de manejar el estado global de ciertas variables.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

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
        setEstudiantes: (payload) => set((state) => ({ estudiantes: payload })),
        setShosenStudent: (payload) =>
          set((state) => ({ shosenStudent: payload })),
      }),
      {
        name: "auth",
      }
    )
  )
);
