// js/app.js
import { getData } from './storage.js';
import { hitungDashboard } from './dashboard.js';
import { handleFormSubmit } from './transaction.js'; // TAMBAHKAN IMPORT INI

const formatUang = (angka) => new Intl.NumberFormat('id-ID').format(angka);

const renderUI = () => {
    // ... (kode renderUI Anda tetap sama seperti sebelumnya) ...
    const data = getData();
    const stats = hitungDashboard();
    document.getElementById('dashPemasukan').innerText = 'Rp ' + formatUang(stats.pemasukan);
    document.getElementById('dashPengeluaran').innerText = 'Rp ' + formatUang(stats.pengeluaran);
    document.getElementById('dashSaldo').innerText = 'Rp ' + formatUang(stats.saldoBersih);
    
    const tabelBody = document.getElementById('tabelRiwayat');
    if (!tabelBody) return;
    tabelBody.innerHTML = '';

    data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)).forEach(t => {
        const baris = document.createElement('tr');
        baris.innerHTML = `
            <td>${t.tanggal}</td>
            <td>${t.keterangan}</td>
            <td>${t.kuantitas}</td>
            <td>${t.satuan}</td>
            <td style="color: ${t.jenis === 'pemasukan' ? 'var(--accent-green)' : 'var(--accent-red)'}">
                ${t.jenis === 'pemasukan' ? '+' : '-'}${formatUang(t.jumlahUang)}
            </td>
        `;
        tabelBody.appendChild(baris);
    });
};

const initEventHandlers = () => {
    // ... (kode initEventHandlers Anda tetap sama seperti sebelumnya) ...
    const ketInput = document.getElementById('keterangan');
    const qtyInput = document.getElementById('kuantitas');
    const uangInput = document.getElementById('jumlahUangTampil');
    const periksaAksesForm = () => {
        let teks = ketInput.value.trim().toUpperCase();
        let validB = teks.startsWith('B ') || teks === 'B';
        let validH = teks.startsWith('H ') || teks === 'H';
        qtyInput.disabled = !(validB || validH);
        uangInput.disabled = !(!qtyInput.disabled && qtyInput.value > 0);
    };
    ketInput.addEventListener('input', periksaAksesForm);
    qtyInput.addEventListener('input', periksaAksesForm);
};

// Jalankan semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderUI();
    initEventHandlers(); 

    // --- TEMPEL DI SINI ---
    const form = document.getElementById('transaksiForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    window.addEventListener('dataUpdated', renderUI);
    // ----------------------
});
