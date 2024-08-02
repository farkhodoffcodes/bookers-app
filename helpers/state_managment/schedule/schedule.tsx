import { create } from "zustand";

type ScheduleState = {
    schedule: any[];
    setSchedule: (newSchedule: any[]) => void;
};
type ScheduleStateBooked = {
    scheduleBooked: any[];
    setScheduleBooked: (newSchedule: any[]) => void;
};
type ScheduleStatedate = {
    date: string;
    setScheduleDate: (newSchedule: string) => void;
};

type ScheduleStore = {
    serviceIds: any;
    setServiceId: (newServiceId: any) => void;
    date: string;
    setDate: (newDate: string) => void;
    timeHour: string;
    setTime: (newTimeHour: string) => void;
}

export const useScheduleBookedStore = create<ScheduleState>((set) => ({
    schedule: [],
    setSchedule: (newSchedule) => set({ schedule: newSchedule }),
}));


export const useScheduleAvialableStore = create<ScheduleStateBooked>((set) => ({
    scheduleBooked: [],
    setScheduleBooked: (newSchedule) => set({ scheduleBooked: newSchedule }),
}));

export const useScheduleDateStore = create<ScheduleStatedate>((set) => ({
    date: '',
    setScheduleDate: (newSchedule) => set({ date: newSchedule }),
}));

export const useSheduleData = create<ScheduleStore>((set) => ({
    serviceIds: [],
    setServiceId: (newServiceId: any) => set({ serviceIds: newServiceId }),
    date: '',
    setDate: (newDate) => set({ date: newDate }),
    timeHour: '',
    setTime: (newTimeHour) => set({ timeHour: newTimeHour }),
}))
