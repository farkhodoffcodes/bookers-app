import AsyncStorage from "@react-native-async-storage/async-storage";

export const clientIdStore = async (data: string) => {
    try {
        await AsyncStorage.setItem('clientID', data);
    } catch (e) {
        console.error(e);
    }
};

export const getClientIdStore = async (setData: (val: string) => void) => {
    try {
        const value = await AsyncStorage.getItem('clientID');
        if (value !== null) setData(value)
    } catch (e) {
        console.error(e);
    }
};

// role
export const setClientOrMaster = async (data: string) => {
    try {
        await AsyncStorage.setItem('clientOrMasterRole', data);
    } catch (e) {
        console.error(e);
    }
};

export const getClientOrMaster = async (setData: (val: string) => void) => {
    try {
        const value = await AsyncStorage.getItem('clientOrMasterRole');
        if (value !== null) setData(value)
    } catch (e) {
        console.error(e);
    }
};

//auth
export const authStorage = async (token: string) => {
    try {
        await AsyncStorage.setItem('registerToken', token);
    } catch (e) {
        console.error(e);
    }
};

//master tariff
export const setMasterTariff = async (tariff: any) => {
    try {
        await AsyncStorage.setItem('masterTariff', tariff);
    } catch (e) {
        console.error(e);
    }
}

export const getMasterTariff = async (setData: any) => {
    try {
        const value = await AsyncStorage.getItem('masterTariff');
        if (value !== null) setData(value)
    } catch (e) {
        console.error(e);
    }
}