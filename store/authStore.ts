import { Admin } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: Admin | null;
  token: string | null;
  activeCarouselIndex: number;
  setSession: (user: Admin, token: string) => void;
  nextSlide: (totalSlides: number) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      activeCarouselIndex: 0,

      setSession: (user, token) => set({ user, token }),

      nextSlide: (totalSlides) =>
        set((state) => ({
          activeCarouselIndex: (state.activeCarouselIndex + 1) % totalSlides,
        })),

      clearSession: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
