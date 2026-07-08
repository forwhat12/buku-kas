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

import { getData } from './storage.js';

export const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Ambil data dari form
    const form = e.target;
    const item = {
        id: Date.now(),
        tanggal: form.tanggal.value,
        kuantitas: parseFloat(form.kuantitas.value),
        satuan: form.satuanPilihan.value,
        jenis: document.getElementById('jenisIndikator').textContent.includes('PENGELUARAN') ? 'pengeluaran' : 'pemasukan',
        keterangan: form.keterangan.value,
        jumlahUang: parseInt(form.jumlahUangAsli.value)
    };

    // Panggil fungsi tambahTransaksi (yang sudah dibuat sebelumnya)
    tambahTransaksi(item);
    form.reset();
    
    // Refresh tampilan (bisa lewat event dispatch atau panggil fungsi render langsung)
    alert("Data berhasil disimpan!");
    window.dispatchEvent(new Event('dataUpdated')); 
};

