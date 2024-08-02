import { ServiceTime } from "@/app/(standart)/(onlineBooking)/(booking)/breakBetweenSessionIn";
import { NotificationsAllData } from "@/type/notifications/notifications";
import { create } from "zustand";

export interface SalonIdObj {
  day: number | string
  id: string
}
export interface IState {
  allowClient: boolean;
  setAllowClient: (val: boolean) => void;
  isEnabled: boolean;
  setIsEnabled: (val: boolean) => void;
  isEnabled2: boolean;
  setIsEnabled2: (val: boolean) => void;
  isEnabled3: boolean;
  setIsEnabled3: (val: boolean) => void;
  data: IsActive | null;
  setData: (val: IsActive | null) => void;
  isLoading: boolean
  setIsLoading: (val: boolean) => void
}
export interface IState2 {
  isEnabled: boolean;
  setIsEnabled: (val: boolean) => void;
  isEnabled2: boolean;
  setIsEnabled2: (val: boolean) => void;
  data2: any;
  setData2: (val: any) => void;
}
export interface IState3 {
  timeEnabled: boolean;
  setTimeEnabled: (val: boolean) => void;
  vipCount: NotificationsAllData | null,
  setVipCount: (data: NotificationsAllData | null) => void
}


export interface Urgently {
  Urgently: boolean;
  setUrgentlyt: (val: boolean) => void;
  salonId: SalonIdObj | null
  setSalonId: (val: SalonIdObj | null) => void
  servicesId: string | null
  setServicesId: (val: string | null) => void
  serviseData: any
  setServiseData: (val: any) => void
  selectedMinute: number
  setSelectedMinute: (val: number) => void
  selectedHour: number
  setSelectedHour: (val: number) => void
  serviceTimes: ServiceTime[];
  setServiceTime: (serviceId: string | null, hour: number, minute: number) => void;
}

export interface IsActive {
  allClient: boolean;
  newClient: boolean;
  notConfirm: boolean;
}

export const OnlineBookingStory = create<IState>((set) => ({
  allowClient: false,
  setAllowClient: (val: boolean) => set({ allowClient: val }),
  isEnabled: false,
  setIsEnabled: (val: boolean) => set({ isEnabled: val }),
  isEnabled2: false,
  setIsEnabled2: (val: boolean) => set({ isEnabled2: val }),
  isEnabled3: false,
  setIsEnabled3: (val: boolean) => set({ isEnabled3: val }),
  data: null,
  setData: (val: IsActive | null) => set({ data: val }),
  isLoading: false,
  setIsLoading: (val: boolean) => set({isLoading: val})

}));
export const OnlineBookingStory2 = create<IState2>((set) => ({
  isEnabled: false,
  setIsEnabled: (val: boolean) => set({ isEnabled: val }),
  isEnabled2: false,
  setIsEnabled2: (val: boolean) => set({ isEnabled2: val }),
  data2: null,
  setData2: (val: any) => set({ data2: val }),
}));
export const OnlineBookingStory3 = create<IState3>((set) => ({
  timeEnabled: false,
  setTimeEnabled: (val: boolean) => set({ timeEnabled: val }),
  vipCount: null,
  setVipCount: (data: NotificationsAllData | null) => set({vipCount: data})
}));

export const OnlineBookingSettingsUrgentlyStory = create<Urgently>((set) => ({
  Urgently: false,
  setUrgentlyt: (val: boolean) => set({ Urgently: val }),
  salonId: null,
  setSalonId: (val: SalonIdObj | null) => set({salonId: val}),
  servicesId: null,
  setServicesId: (val: string | null) => set({servicesId: val}),
  serviseData: [],
  setServiseData: (val: any) => set({serviseData: val}),
  selectedMinute: 0,
  setSelectedMinute: (val: number) => set({selectedMinute: val}),
  selectedHour: 0,
  setSelectedHour: (val: number) => set({selectedHour: val}),
  serviceTimes: [],
  setServiceTime: (serviceId, hour, minute) => set((state) => {
    const existingIndex = state.serviceTimes.findIndex(time => time.serviceId === serviceId);
    if (existingIndex > -1) {
      const updatedServiceTimes = [...state.serviceTimes];
      updatedServiceTimes[existingIndex] = { serviceId, hour, minute };
      return { serviceTimes: updatedServiceTimes };
    } else {
      return { serviceTimes: [...state.serviceTimes, { serviceId, hour, minute }] };
    }
  })
  
}));

// export const OnlineBookingCheck = create((set) => ({
//   recording: false,
//   breakSession: false,
//   setBreack: (val: boolean) => set({ breakSession: val }),
//   confirmation: false,
//   setConfirmation: (val: boolean) => set({ confirmation: val }),
//   request: false,
//   setRequest: (val: boolean) => set({ request: val }),
//   time: false,
//   setTime: (val: boolean) => set({ time: val }),
// }));
