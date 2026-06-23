import { MMKV } from 'react-native-mmkv';

// @ts-ignore
export const storage = new MMKV();

export const storageService = {
  set: (key: string, value: string) => storage.set(key, value),
  get: (key: string) => storage.getString(key),
  delete: (key: string) => storage.delete(key),
  clear: () => storage.clearAll(),
};

