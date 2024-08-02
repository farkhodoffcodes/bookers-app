import { getOrderClientPastcomingInterface } from "@/type/client/editClient";
import { create } from "zustand";
interface AccardionStoreState {
  expanded: boolean;
  expanded2: boolean;
  expanded3: boolean;
  expanded4: boolean;
  expanded5: boolean;
  genderIndex: boolean;
  isSelected: boolean;
  isSelected1: boolean;
  setExpanded: (val: boolean) => void;
  setGenderIndex: (val: boolean) => void;
  setSelection: (val: boolean) => void;
  setExpended2: (val: boolean) => void;
  setExpended3: (val: boolean) => void;
  setExpended4: (val: boolean) => void;
  setExpended5: (val: boolean) => void;
  setSelected1: (val: boolean) => void;
}

export const useAccardionStore = create<AccardionStoreState>((set) => ({
  orderExpand: false,
  expanded: true,
  genderIndex: false,
  isSelected: false,
  isSelected1: false,
  expanded2: true,
  expanded3: true,
  expanded4: true,
  expanded5: true,
  setExpended2: (val: boolean) => set({ expanded2: val }),
  setExpended3: (val: boolean) => set({ expanded3: val }),
  setExpended4: (val: boolean) => set({ expanded3: val }),
  setExpended5: (val: boolean) => set({ expanded3: val }),
  setExpanded: (val: boolean) => set({ expanded: val }),
  setGenderIndex: (val: boolean) => set({ genderIndex: val }),
  setSelection: (val: boolean) => set({ isSelected: val }),
  setSelected1: (val: boolean) => set({ isSelected1: val }),
}));


interface AccardionState {
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  expandidIdTwo: string | null;
  setExpendidIdTwo: (id: string | null) => void;
  activeTab: 'upcoming' | 'past';
  setActiveTab: (tab: 'upcoming' | 'past') => void;
  ratingModal: boolean;
  setRatingModal: (val: boolean) => void;
  orderRatingModal: boolean;
  setOrderRatingModal: (val: boolean) => void;
  pastComing: getOrderClientPastcomingInterface[];
  setPastComing: (data: getOrderClientPastcomingInterface[]) => void;
}

export const useAccardionStoreId = create<AccardionState>((set) => ({
  expandedId: null,
  setExpandedId: (id) => set({ expandedId: id }),
  ratingModal: false,
  setRatingModal: (val) => set({ ratingModal: val }),
  orderRatingModal: false,
  setOrderRatingModal: (val) => set({ orderRatingModal: val }),
  activeTab: 'upcoming',
  setActiveTab: (tab) => set({ activeTab: tab }),
  expandidIdTwo: null,
  setExpendidIdTwo: (id) => set({ expandidIdTwo: id }),
  pastComing: [],
  setPastComing: (data) => set({ pastComing: data }),
}));
