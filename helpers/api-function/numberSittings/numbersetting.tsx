import {getConfig} from "@/app/(tabs)/(master)/main";
import {master_get_number, master_put_number} from "@/helpers/api";
import axios from "axios";

export const getNumbers = async (setData: (data: any) => void) => {
    try {
        const config = await getConfig();
        const response = await axios.get(master_get_number, config ? config : {});
        if (response.data.success) {
            setData(response.data.body);
        } else {
            setData([1]); // Example fallback data if no success
        }
    } catch (error) {
        console.error('Error fetching numbers:', error);
        setData([1]); // Example fallback data on error
    }
};

export const putNumbers = async (number: number, getData: () => void) => {
    try {
        if (!number) {
            return null // Return early if number is falsy
        }
        const config = await getConfig();
        await axios.put(`${master_put_number}?number=${number}`, '', config ? config : {});
        getData()
        // Optionally handle success case if needed
    } catch (error) {
        console.error('Error updating number:', error);
        // Optionally handle error case if needed
    }
};