import { create } from 'zustand';

interface AppState {
  isFirstLaunch: boolean;
  setFirstLaunch: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isFirstLaunch: true,
  setFirstLaunch: (isFirstLaunch) => set({ isFirstLaunch }),
}));
