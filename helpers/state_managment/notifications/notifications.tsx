import { EditedDataTexts, NotificationsAllData, NotificationsStore } from "@/type/notifications/notifications";
import { create } from "zustand";

const useNotificationsStore = create<NotificationsStore>((set) => ({
    texts: {
        cancelText: '',
        changingText: '',
        orderText: '',
        appoinmentText: '',
        windowText: ''
    },
    setTexts: (val: EditedDataTexts) => set({ texts: val }),
    isMainSwitch: false,
    isLoading: false,
    setIsloading: (val: boolean) => set({ isLoading: val }),
    appoinmentData: {
        id: '',
        content: '',
        minute: 0,
        hour: 0,
    },
    tariff: null,
    setTariff: (val: null) => set({ tariff: val }),
    appoinmentActiveData: false,
    setAppoinmentActiveData: (val: boolean) => set({ appoinmentActiveData: val }),
    isAppoinmentModal: false,
    feedbackData: {
        text: '',
        id: '',
        isActive: false
    },
    windowData: {
        id: '',
        isActive: false,
        text: ''
    },
    cancelData: {
        id: '',
        isActive: false,
        text: ''
    },
    changingData: {
        id: '',
        isActive: false,
        text: ''
    },
    smsData: {
        id: '',
        isActive: false,
        text: ''
    },
    setCancelData: (val: NotificationsAllData) => set({ cancelData: val }),
    setSmsData: (val: NotificationsAllData) => set({ smsData: val }),
    setChangingData: (val: NotificationsAllData) => set({ changingData: val }),
    setWindowData: (val: NotificationsAllData) => set({ windowData: val }),
    setFeedbackData: (val: NotificationsAllData) => set({ feedbackData: val }),
    setIsMainSwitch: (val: boolean) => set({ isMainSwitch: val }),
    setAppoinmentData: (val: NotificationsAllData) => set({ appoinmentData: val }),
    setIsAppoinmentModal: (val: boolean) => set({ isAppoinmentModal: val }),
}));

export default useNotificationsStore;