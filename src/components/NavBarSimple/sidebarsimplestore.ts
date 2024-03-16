import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SideBarState {
  active: string;
}

interface SideBarAction {
  setActive: (active: string) => void;
}

const initValue: SideBarState = {
  active: "Billing",
};

export const navbarStore = create<SideBarState & SideBarAction>()(
  devtools((set, get) => ({
    ...initValue,
    setActive: (active: string) => set({ active }),
  }))
);

export default navbarStore;
