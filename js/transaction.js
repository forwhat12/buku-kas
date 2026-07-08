// js/transaction.js
import { dataTransaksi, saveToStorage } from './storage.js';

export const tambahTransaksi = (item) => {
    let currentData = dataTransaksi;
    currentData.push(item);
    saveToStorage(currentData);
};

export const hapusTransaksi = (id) => {
    let currentData = dataTransaksi.filter(t => t.id !== id);
    saveToStorage(currentData);
};

export const updateTransaksi = (id, item) => {
    let currentData = dataTransaksi;
    const index = currentData.findIndex(t => t.id === id);
    if (index !== -1) {
        currentData[index] = item;
        saveToStorage(currentData);
    }
};

