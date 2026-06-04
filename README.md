# Cashflow Harian

Aplikasi front-end untuk mencatat, memantau, dan menganalisis cashflow harian. Dibangun dengan tampilan modern SaaS financial dashboard.

## Teknologi

- HTML Native
- Tailwind CSS Play CDN
- JavaScript Native
- CSS Native

## Struktur Project

```txt
cashflow_harian/
├── index.html
├── AGENTS.md
├── README.md
├── assets/
│   ├── js/
│   │   ├── app.js
│   │   ├── menu.js
│   │   └── data.js
│   └── css/
│       └── style.css
├── components/
│   ├── sidebar.html
│   ├── topbar.html
│   └── mobile-menu.html
├── pages/
│   ├── dashboard.html
│   ├── transaksi.html
│   ├── tambah-transaksi.html
│   ├── kategori.html
│   ├── laporan.html
│   └── pengaturan.html
└── docs/
    ├── PRD.md
    ├── IMPLEMENTATION_PLAN.md
    └── UI_GUIDELINES.md
```

## Fitur

- **Dashboard** — Ringkasan pemasukan, pengeluaran, saldo bersih, grafik cashflow, dan transaksi terbaru
- **Transaksi** — Daftar transaksi dengan pencarian, filter jenis, dan filter status
- **Tambah Transaksi** — Form input transaksi dengan kategori dinamis berdasarkan jenis
- **Kategori** — Grid kategori pemasukan dan pengeluaran dengan jumlah transaksi
- **Laporan** — Laporan cashflow dengan filter tanggal, ringkasan per kategori, dan tombol export
- **Pengaturan** — Form profil usaha dan preferensi aplikasi

## Cara Menjalankan

Aplikasi membutuhkan local server karena menggunakan `fetch()` untuk memuat halaman.

### Menggunakan Live Server (VS Code)

1. Buka folder project di VS Code
2. Install extension **Live Server**
3. Klik kanan `index.html` → **Open with Live Server**

### Menggunakan Python

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

### Menggunakan Node.js

```bash
npx serve .
```

## Target Pengguna

- UMKM
- Freelancer
- Pemilik toko kecil
- Personal finance user
- Admin keuangan sederhana

## Responsive

Aplikasi mendukung ukuran layar:

- **Mobile** — 360px ke atas (bottom navigation)
- **Tablet** — 768px ke atas
- **Desktop** — 1024px ke atas (sidebar + topbar)

## Status

Front-end prototype. Semua data menggunakan dummy data. Belum ada backend atau database.
