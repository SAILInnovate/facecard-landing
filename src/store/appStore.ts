import { create } from 'zustand';

interface AppState {
  scroll: number;
  mouse: { x: number; y: number };
  setScroll: (scroll: number) => void;
  setMouse: (mouse: { x: number; y: number }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scroll: 0,
  mouse: { x: 0, y: 0 },
  setScroll: (scroll) => set({ scroll }),
  setMouse: (mouse) => set({ mouse }),
}));