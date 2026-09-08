import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "admin-auth-storage",
    }
  )
);
