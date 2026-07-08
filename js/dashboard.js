// js/dashboard.js
import { getData } from './storage.js';

export const hitungDashboard = () => {
    const data = getData();
    let pemasukan = 0;
    let pengeluaran = 0;
    
    data.forEach(t => {
        if (t.jenis === 'pemasukan') pemasukan += Number(t.jumlahUang);
        else pengeluaran += Number(t.jumlahUang);
    });

    const saldoBersih = pemasukan - pengeluaran;
    
    // Logika persentase keuntungan[span_1](start_span)[span_1](end_span)
    let persentase = 0;
    if (pengeluaran > 0) persentase = (saldoBersih / pengeluaran) * 100;
    else if (pengeluaran === 0 && pemasukan > 0) persentase = 100;

    return { 
        pemasukan, 
        pengeluaran, 
        saldoBersih, 
        persentase: persentase.toFixed(1) 
    };
};

