import * as SecureStore from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';
import { APP_CONSTANTS } from '@/core/constants/app.constants';


// ✅ Zustand ke liye Storage Adapter
export const secureStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        // console.log(`Loading ${name} from SecureStore`);
        return await SecureStore.getItemAsync(name);
    },
    setItem: async (name: string, value: string): Promise<void> => {
        // console.log(`Saving ${name} to SecureStore`);
        await SecureStore.setItemAsync(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        // console.log(`Removing ${name} from SecureStore`);
        await SecureStore.deleteItemAsync(name);
    },
};

// (Optional) Agar aapko kabhi manually sirf token chahiye ho bina store ke
export const getTokenManual = async () => {
    return await SecureStore.getItemAsync(APP_CONSTANTS.STORAGE_KEYS.AUTH_STORAGE);
};
