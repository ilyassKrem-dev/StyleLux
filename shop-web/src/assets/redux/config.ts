import CryptoJS from 'crypto-js';
import { Storage } from 'redux-persist';
const SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY

const encrypt = (data:any) => {
    const stringData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
};

const decrypt = (data:any) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export  const localStorageWrapper:Storage = {
    getItem: (key: string): Promise<any> => {
        return new Promise((resolve) => {
            const value = localStorage.getItem(key);
            resolve(value !== null ? decrypt(value) : null);
        });
    },
    setItem: (key: string, value: any): Promise<void> => {
        return new Promise((resolve) => {
            localStorage.setItem(key, encrypt(value));
            resolve();
        });
    },
    removeItem: (key: string): Promise<void> => {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            resolve();
        });
    },
};
