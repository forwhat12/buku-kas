// js/storage.js
export let dataTransaksi = JSON.parse(localStorage.getItem('dataAkuntansiTani')) || [];

export const saveToStorage = (data) => {
    dataTransaksi = data;
    localStorage.setItem('dataAkuntansiTani', JSON.stringify(dataTransaksi));
};

export const getData = () => dataTransaksi;

