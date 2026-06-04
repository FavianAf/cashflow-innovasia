const transactions = [
  { id: 1, date: '2026-06-04', type: 'income', category: 'Penjualan', description: 'Penjualan produk harian', amount: 1500000, method: 'QRIS', status: 'Selesai' },
  { id: 2, date: '2026-06-04', type: 'expense', category: 'Operasional', description: 'Pembelian bahan baku', amount: 450000, method: 'Cash', status: 'Selesai' },
  { id: 3, date: '2026-06-03', type: 'income', category: 'Jasa', description: 'Jasa konsultasi keuangan', amount: 2000000, method: 'Transfer Bank', status: 'Selesai' },
  { id: 4, date: '2026-06-03', type: 'expense', category: 'Gaji', description: 'Gaji karyawan bagian produksi', amount: 3500000, method: 'Transfer Bank', status: 'Selesai' },
  { id: 5, date: '2026-06-03', type: 'income', category: 'Penjualan', description: 'Penjualan online marketplace', amount: 875000, method: 'E-Wallet', status: 'Selesai' },
  { id: 6, date: '2026-06-02', type: 'expense', category: 'Transportasi', description: 'Biaya pengiriman barang', amount: 200000, method: 'Cash', status: 'Selesai' },
  { id: 7, date: '2026-06-02', type: 'income', category: 'Investasi', description: 'Dividen saham periode ini', amount: 500000, method: 'Transfer Bank', status: 'Selesai' },
  { id: 8, date: '2026-06-01', type: 'expense', category: 'Makan', description: 'Makan siang meeting klien', amount: 350000, method: 'QRIS', status: 'Selesai' },
  { id: 9, date: '2026-06-01', type: 'income', category: 'Bonus', description: 'Bonus proyek selesai', amount: 1000000, method: 'Transfer Bank', status: 'Pending' },
  { id: 10, date: '2026-05-31', type: 'expense', category: 'Tagihan', description: 'Tagihan listrik bulan Mei', amount: 650000, method: 'Transfer Bank', status: 'Selesai' },
  { id: 11, date: '2026-05-31', type: 'income', category: 'Penjualan', description: 'Penjualan produk grosir', amount: 3200000, method: 'Transfer Bank', status: 'Selesai' },
  { id: 12, date: '2026-05-30', type: 'expense', category: 'Belanja', description: 'Pembelian perlengkapan kantor', amount: 275000, method: 'E-Wallet', status: 'Selesai' },
  { id: 13, date: '2026-05-30', type: 'income', category: 'Jasa', description: 'Jasa desain grafic freelance', amount: 750000, method: 'QRIS', status: 'Pending' },
  { id: 14, date: '2026-05-29', type: 'expense', category: 'Operasional', description: 'Sewa tempat usaha bulanan', amount: 2500000, method: 'Transfer Bank', status: 'Selesai' },
  { id: 15, date: '2026-05-29', type: 'expense', category: 'Lainnya', description: 'Biaya tak terduga lainnya', amount: 150000, method: 'Cash', status: 'Dibatalkan' }
]

const incomeCategories = [
  { id: 'inc-1', name: 'Penjualan', icon: '🛒', color: 'emerald' },
  { id: 'inc-2', name: 'Jasa', icon: '💼', color: 'blue' },
  { id: 'inc-3', name: 'Investasi', icon: '📈', color: 'violet' },
  { id: 'inc-4', name: 'Bonus', icon: '🎁', color: 'amber' },
  { id: 'inc-5', name: 'Lainnya', icon: '📦', color: 'slate' }
]

const expenseCategories = [
  { id: 'exp-1', name: 'Operasional', icon: '🏭', color: 'rose' },
  { id: 'exp-2', name: 'Gaji', icon: '👥', color: 'blue' },
  { id: 'exp-3', name: 'Transportasi', icon: '🚗', color: 'amber' },
  { id: 'exp-4', name: 'Makan', icon: '🍽️', color: 'orange' },
  { id: 'exp-5', name: 'Belanja', icon: '🛍️', color: 'pink' },
  { id: 'exp-6', name: 'Tagihan', icon: '📄', color: 'red' },
  { id: 'exp-7', name: 'Lainnya', icon: '📦', color: 'slate' }
]

const paymentMethods = [
  { id: 'pm-1', name: 'Cash', icon: '💵' },
  { id: 'pm-2', name: 'Transfer Bank', icon: '🏦' },
  { id: 'pm-3', name: 'QRIS', icon: '📱' },
  { id: 'pm-4', name: 'E-Wallet', icon: '💳' }
]

const businessProfile = {
  name: 'Toko Maju Jaya',
  owner: 'Ahmad Favian',
  currency: 'IDR',
  dateFormat: 'DD/MM/YYYY',
  darkMode: false,
  notification: true
}
