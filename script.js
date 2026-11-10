/* ========================================================
   FILE: script.js
   DESKRIPSI: Logika Navigasi & Interaktivitas Presentasi
   MATA KULIAH: Multimedia - Dosen: Pak Prapto
======================================================== */

// 1. Variabel Global
let slideAktif = 1;
const totalSlide = 14;

// Data untuk Fitur Interaktif 1: Timeline
const dataTimeline = {
    2000: {
        judul: "Tahun 2000: Era Dial-Up 56 Kbps & Web 1.0",
        deskripsi: "Internet masih lambat via sambungan telepon rumah. Website hanya berisi teks dan gambar kecil statis. Pengguna hanya bisa membaca (Read-Only) tanpa bisa membuat konten sendiri."
    },
    2008: {
        judul: "Tahun 2008: Lahirnya YouTube & Era Smartphone",
        deskripsi: "YouTube dan media sosial (Facebook, Twitter) mengubah internet menjadi interaktif. Peluncuran iPhone membuat internet mulai dinikmati di saku celana setiap saat."
    },
    2016: {
        judul: "Tahun 2016: Kecepatan 4G & Dominasi Streaming",
        deskripsi: "Jaringan 4G memungkinkan streaming video HD dan musik (Spotify, Netflix) tanpa buffering. Format Stories dan video vertikal mulai populer."
    },
    2026: {
        judul: "Tahun 2026: Era Generative AI & Media Spasial",
        deskripsi: "Konten multimedia (teks, gambar, video, dan suara) kini bisa dibuat instan dengan AI. Tampilan web mulai terintegrasi dengan perangkat spasial 3D (WebXR)."
    }
};

// 2. Fungsi Berpindah Slide
function bukaSlide(nomor) {
    if (nomor < 1 || nomor > totalSlide) return;

    slideAktif = nomor;
    const slides = document.querySelectorAll('.slide');

    // Sembunyikan semua slide dan tampilkan slide aktif
    slides.forEach((s, index) => {
        s.classList.toggle('active', index + 1 === slideAktif);
    });

    // Perbarui teks indikator atas (Slide X / 14)
    document.getElementById('slideIndicator').textContent = `Slide ${slideAktif} / ${totalSlide}`;

    // Perbarui panjang progress bar atas
    const persen = (slideAktif / totalSlide) * 100;
    document.getElementById('progressFill').style.width = `${persen}%`;

    // Atur tombol mundur/maju di bawah
    document.getElementById('btnPrev').disabled = (slideAktif === 1);
    document.getElementById('btnNext').disabled = (slideAktif === totalSlide);
}

function nextSlide() {
    bukaSlide(slideAktif + 1);
}

function prevSlide() {
    bukaSlide(slideAktif - 1);
}

// 3. Navigasi Keyboard (Panah Kanan / Kiri)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// 4. Logika Interaktif 1: Timeline Tahun
function pilihTahun(tahun) {
    // Ubah warna tombol aktif
    document.querySelectorAll('.t-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === tahun.toString());
    });

    // Ubah isi kotak penjelasan
    const box = document.getElementById('timelineCard');
    const data = dataTimeline[tahun];
    if (data && box) {
        box.innerHTML = `
            <h3>${data.judul}</h3>
            <p>${data.deskripsi}</p>
        `;
    }
}

// 5. Logika Interaktif 2: Kuis Pemahaman
let jawabanKuis = {};

function cekKuis(soal, pilihan, isBenar, tombol) {
    // Cegah klik ulang jika soal ini sudah dijawab
    if (jawabanKuis[soal] !== undefined) return;

    jawabanKuis[soal] = isBenar;

    // Kunci tombol di soal ini
    const parent = tombol.parentElement;
    parent.querySelectorAll('.opt').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });

    // Beri warna hijau jika benar, merah jika salah
    if (isBenar) {
        tombol.classList.add('benar');
    } else {
        tombol.classList.add('salah');
    }

    // Jika ketiga soal sudah dijawab, tampilkan total nilai
    const totalDijawab = Object.keys(jawabanKuis).length;
    if (totalDijawab === 3) {
        let jumlahBenar = 0;
        for (let s in jawabanKuis) {
            if (jawabanKuis[s] === true) jumlahBenar++;
        }
        const skor = Math.round((jumlahBenar / 3) * 100);
        document.getElementById('quizResult').innerHTML = `
            🎉 Kuis Selesai! Skor Anda: <strong>${skor} / 100</strong> (${jumlahBenar} dari 3 benar)
        `;
    }
}

// 6. Jalankan Saat Halaman Pertama Kali Dibuka
window.onload = function() {
    bukaSlide(1);
    pilihTahun(2000);
};
