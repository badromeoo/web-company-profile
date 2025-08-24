import { create } from 'zustand';
import Backendless from 'backendless';

// Definisikan tipe kustom untuk pengguna kita,
// yang merupakan gabungan dari tipe standar Backendless DAN properti 'name'
export type AppUser = Backendless.User & {
  name?: string;
};

// Definisikan tipe untuk state dan actions di dalam store kita
interface UserState {
  currentUser: AppUser | null; // <-- Gunakan tipe kustom kita
  isLoading: boolean;
  setCurrentUser: (user: AppUser | null) => void;
  setIsLoading: (loading: boolean) => void;
}

// Buat store Zustand
export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: true,
  setCurrentUser: (user) => set({ currentUser: user, isLoading: false }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));