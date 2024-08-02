import { create } from "zustand";

export interface Help {
  id: number;
  helpStatus: string;
  text: string;
  attachments: any;
  attachmentList: any;
  active: boolean;
}

interface HelpDate {
  helpData: Help | null;
  setHelpDate: (val: Help | null) => void;
  navigatName: string
  setNavigatName: (val: string) => void
  isLoading: boolean
  setIsLoading: (val: boolean) => void
}

const heplStore = create<HelpDate>((set) => ({
  helpData: null,
  setHelpDate: (val: Help | null) => set({ helpData: val }),
  navigatName: "",
  setNavigatName: (val: string) => set({navigatName: val}),
  isLoading: false,
  setIsLoading: (val: boolean) => set({isLoading: val})
}));

export default heplStore;
