import { create } from "zustand";

interface ContactStore {
  isContactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  isContactOpen: false,
  openContact: () => set({ isContactOpen: true }),
  closeContact: () => set({ isContactOpen: false }),
}));