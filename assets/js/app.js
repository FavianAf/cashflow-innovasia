let currentPage = 'dashboard'

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container')
  const toast = document.createElement('div')
  const bgColor = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-blue-600'
  toast.className = `${bgColor} text-white px-5 py-3 rounded-2xl shadow-soft text-sm font-medium toast-enter`
  toast.textContent = message
  container.appendChild(toast)
  setTimeout(() => {
    toast.classList.add('toast-exit')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

function renderMenus() {
  const sidebarMenu = document.getElementById('sidebar-menu')
  const mobileMenu = document.getElementById('mobile-menu')

  if (sidebarMenu) {
    sidebarMenu.innerHTML = menus.map(menu => `
      <button onclick="loadPage('${menu.id}')" id="sidebar-${menu.id}"
        class="menu-sidebar flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
        <span class="text-lg">${menu.icon}</span>
        <span>${menu.label}</span>
      </button>
    `).join('')
  }

  if (mobileMenu) {
    mobileMenu.innerHTML = menus.map(menu => `
      <button onclick="loadPage('${menu.id}')" id="mobile-${menu.id}"
        class="menu-mobile flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-2 text-[10px] font-medium text-slate-500 transition">
        <span class="text-base">${menu.icon}</span>
        <span class="truncate w-full text-center">${menu.label}</span>
      </button>
    `).join('')
  }
}

function setActiveMenu(pageId) {
  document.querySelectorAll('.menu-sidebar').forEach(btn => {
    btn.className = 'menu-sidebar flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950'
  })
  document.querySelectorAll('.menu-mobile').forEach(btn => {
    btn.className = 'menu-mobile flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-2 text-[10px] font-medium text-slate-500 transition'
  })

  const sidebarBtn = document.getElementById(`sidebar-${pageId}`)
  if (sidebarBtn) {
    sidebarBtn.className = 'menu-sidebar flex w-full items-center gap-3 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm'
  }
  const mobileBtn = document.getElementById(`mobile-${pageId}`)
  if (mobileBtn) {
    mobileBtn.className = 'menu-mobile flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl bg-blue-50 px-1 py-2 text-[10px] font-semibold text-blue-700'
  }

  const menu = menus.find(m => m.id === pageId)
  const topbarTitle = document.getElementById('topbar-title')
  if (topbarTitle && menu) {
    topbarTitle.textContent = menu.label
  }
}

function showLoading() {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = `
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p class="mt-3 text-sm text-slate-400">Memuat...</p>
        </div>
      </div>`
  }
}

function showError() {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = `
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <div class="text-4xl mb-3">⚠️</div>
          <p class="text-sm text-slate-500">Halaman gagal dimuat</p>
          <button onclick="loadPage('dashboard')" class="mt-3 text-sm text-blue-600 font-semibold hover:underline">Kembali ke Dashboard</button>
        </div>
      </div>`
  }
}

async function loadPage(pageId) {
  currentPage = pageId
  const menu = menus.find(m => m.id === pageId)
  if (!menu) return

  setActiveMenu(pageId)
  showLoading()

  try {
    const response = await fetch(menu.page)
    if (!response.ok) throw new Error('Gagal memuat')
    const html = await response.text()
    const app = document.getElementById('app')
    if (app) {
      app.innerHTML = html
      renderPageScripts(pageId)
    }
  } catch (error) {
    showError()
  }
}

function renderPageScripts(pageId) {
  switch (pageId) {
    case 'dashboard':
      renderDashboard()
      break
    case 'transaksi':
      renderTransactionTable()
      break
    case 'tambah':
      handleTransactionForm()
      break
    case 'kategori':
      renderKategori()
      break
    case 'laporan':
      renderReport()
      break
    case 'pengaturan':
      renderPengaturan()
      break
  }
}

function renderDashboard() {
  const today = '2026-06-04'
  const todayTx = transactions.filter(t => t.date === today)
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const todayIncome = todayTx.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const todayExpense = todayTx.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const saldo = totalIncome - totalExpense
  const recentTx = transactions.slice(0, 5)

  const summaryCards = document.getElementById('dashboard-summary')
  if (summaryCards) {
    summaryCards.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-slate-500">Pemasukan Hari Ini</span>
            <span class="text-lg">📈</span>
          </div>
          <p class="text-2xl font-bold text-emerald-600">${formatRupiah(todayIncome)}</p>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-slate-500">Pengeluaran Hari Ini</span>
            <span class="text-lg">📉</span>
          </div>
          <p class="text-2xl font-bold text-rose-600">${formatRupiah(todayExpense)}</p>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-slate-500">Saldo Bersih</span>
            <span class="text-lg">💰</span>
          </div>
          <p class="text-2xl font-bold text-slate-950">${formatRupiah(saldo)}</p>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-slate-500">Total Transaksi</span>
            <span class="text-lg">📊</span>
          </div>
          <p class="text-2xl font-bold text-slate-950">${transactions.length}</p>
        </div>
      </div>`
  }

  const recentTable = document.getElementById('dashboard-recent')
  if (recentTable) {
    recentTable.innerHTML = recentTx.map(t => `
      <tr class="border-t border-slate-100 hover:bg-slate-50/80">
        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.date}</td>
        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.description}</td>
        <td class="whitespace-nowrap px-4 py-4">
          <span class="rounded-full ${t.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'} px-3 py-1 text-xs font-semibold">
            ${t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
          </span>
        </td>
        <td class="whitespace-nowrap px-4 py-4 text-sm font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">
          ${t.type === 'income' ? '+' : '-'}${formatRupiah(t.amount)}
        </td>
      </tr>
    `).join('')
  }

  const chartBars = document.getElementById('chart-bars')
  if (chartBars) {
    const days = ['29 Mei', '30 Mei', '31 Mei', '1 Jun', '2 Jun', '3 Jun', '4 Jun']
    const dayMap = {
      '29 Mei': ['2026-05-29'], '30 Mei': ['2026-05-30'], '31 Mei': ['2026-05-31'],
      '1 Jun': ['2026-06-01'], '2 Jun': ['2026-06-02'], '3 Jun': ['2026-06-03'], '4 Jun': ['2026-06-04']
    }
    const maxVal = Math.max(...days.map(d => {
      const dates = dayMap[d]
      return transactions.filter(t => dates.includes(t.date) && t.type === 'income').reduce((s, t) => s + t.amount, 0)
    }))
    chartBars.innerHTML = days.map(d => {
      const dates = dayMap[d]
      const inc = transactions.filter(t => dates.includes(t.date) && t.type === 'income').reduce((s, t) => s + t.amount, 0)
      const exp = transactions.filter(t => dates.includes(t.date) && t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      const incH = maxVal > 0 ? Math.max((inc / maxVal) * 100, 4) : 4
      const expH = maxVal > 0 ? Math.max((exp / maxVal) * 100, 4) : 4
      return `
        <div class="flex flex-col items-center gap-2 flex-1">
          <div class="flex gap-1 items-end h-32">
            <div class="chart-bar w-3 md:w-4 rounded-t-lg bg-blue-500 transition-all duration-700" style="height:${incH}%"></div>
            <div class="chart-bar w-3 md:w-4 rounded-t-lg bg-rose-400 transition-all duration-700" style="height:${expH}%"></div>
          </div>
          <span class="text-[10px] md:text-xs text-slate-400">${d}</span>
        </div>`
    }).join('')
  }
}

function renderTransactionTable() {
  const searchInput = document.getElementById('tx-search')
  const typeFilter = document.getElementById('tx-type-filter')
  const statusFilter = document.getElementById('tx-status-filter')

  function applyFilters() {
    const search = searchInput ? searchInput.value.toLowerCase() : ''
    const type = typeFilter ? typeFilter.value : ''
    const status = statusFilter ? statusFilter.value : ''

    let filtered = [...transactions]
    if (search) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(search) ||
        t.category.toLowerCase().includes(search)
      )
    }
    if (type) filtered = filtered.filter(t => t.type === type)
    if (status) filtered = filtered.filter(t => t.status === status)

    const tbody = document.getElementById('tx-tbody')
    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-sm text-slate-400">Tidak ada transaksi ditemukan</td></tr>`
        return
      }
      tbody.innerHTML = filtered.map(t => `
        <tr class="border-t border-slate-100 hover:bg-slate-50/80">
          <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.date}</td>
          <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.category}</td>
          <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.description}</td>
          <td class="whitespace-nowrap px-4 py-4">
            <span class="rounded-full ${t.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'} px-3 py-1 text-xs font-semibold">
              ${t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            </span>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">
            ${t.type === 'income' ? '+' : '-'}${formatRupiah(t.amount)}
          </td>
          <td class="whitespace-nowrap px-4 py-4">
            <span class="rounded-full ${t.status === 'Selesai' ? 'bg-blue-50 text-blue-700' : t.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'} px-3 py-1 text-xs font-semibold">
              ${t.status}
            </span>
          </td>
          <td class="whitespace-nowrap px-4 py-4">
            <button onclick="showToast('Detail transaksi #${t.id}', 'info')" class="text-xs text-blue-600 font-semibold hover:underline">Detail</button>
          </td>
        </tr>
      `).join('')
    }
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters)
  if (typeFilter) typeFilter.addEventListener('change', applyFilters)
  if (statusFilter) statusFilter.addEventListener('change', applyFilters)
  applyFilters()
}

function filterTransactions() {
  renderTransactionTable()
}

function handleTransactionForm() {
  const typeSelect = document.getElementById('tx-form-type')
  const categorySelect = document.getElementById('tx-form-category')
  const form = document.getElementById('tx-form')
  const resetBtn = document.getElementById('tx-form-reset')

  function updateCategoryOptions() {
    if (!typeSelect || !categorySelect) return
    const type = typeSelect.value
    const cats = type === 'income' ? incomeCategories : expenseCategories
    categorySelect.innerHTML = `<option value="">Pilih Kategori</option>` + cats.map(c => `<option value="${c.name}">${c.icon} ${c.name}</option>`).join('')
  }

  if (typeSelect) {
    typeSelect.addEventListener('change', updateCategoryOptions)
    updateCategoryOptions()
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      showToast('Transaksi berhasil disimpan!', 'success')
      form.reset()
      updateCategoryOptions()
    })
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (form) form.reset()
      updateCategoryOptions()
      showToast('Form berhasil direset', 'info')
    })
  }
}

function updateCategoryOptions() {
  const typeSelect = document.getElementById('tx-form-type')
  const categorySelect = document.getElementById('tx-form-category')
  if (!typeSelect || !categorySelect) return
  const type = typeSelect.value
  const cats = type === 'income' ? incomeCategories : expenseCategories
  categorySelect.innerHTML = `<option value="">Pilih Kategori</option>` + cats.map(c => `<option value="${c.name}">${c.icon} ${c.name}</option>`).join('')
}

function renderKategori() {
  const incGrid = document.getElementById('kategori-income-grid')
  const expGrid = document.getElementById('kategori-expense-grid')
  const incCount = document.getElementById('kategori-income-count')
  const expCount = document.getElementById('kategori-expense-count')

  if (incGrid) {
    incGrid.innerHTML = incomeCategories.map(c => `
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
        <div class="text-2xl">${c.icon}</div>
        <div>
          <p class="font-semibold text-slate-900">${c.name}</p>
          <p class="text-xs text-slate-400">${transactions.filter(t => t.category === c.name && t.type === 'income').length} transaksi</p>
        </div>
      </div>
    `).join('')
  }
  if (expGrid) {
    expGrid.innerHTML = expenseCategories.map(c => `
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex items-center gap-4">
        <div class="text-2xl">${c.icon}</div>
        <div>
          <p class="font-semibold text-slate-900">${c.name}</p>
          <p class="text-xs text-slate-400">${transactions.filter(t => t.category === c.name && t.type === 'expense').length} transaksi</p>
        </div>
      </div>
    `).join('')
  }
  if (incCount) incCount.textContent = incomeCategories.length
  if (expCount) expCount.textContent = expenseCategories.length

  document.querySelectorAll('.btn-add-kategori').forEach(btn => {
    btn.addEventListener('click', () => showToast('Fitur tambah kategori belum tersedia', 'info'))
  })
}

function renderReport() {
  const startDateInput = document.getElementById('report-start')
  const endDateInput = document.getElementById('report-end')

  function filterReportByDate() {
    const start = startDateInput ? startDateInput.value : ''
    const end = endDateInput ? endDateInput.value : ''

    let filtered = [...transactions]
    if (start) filtered = filtered.filter(t => t.date >= start)
    if (end) filtered = filtered.filter(t => t.date <= end)

    const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const saldo = totalIncome - totalExpense

    const summaryEl = document.getElementById('report-summary')
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500 mb-2">Total Pemasukan</p>
            <p class="text-2xl font-bold text-emerald-600">${formatRupiah(totalIncome)}</p>
          </div>
          <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500 mb-2">Total Pengeluaran</p>
            <p class="text-2xl font-bold text-rose-600">${formatRupiah(totalExpense)}</p>
          </div>
          <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-sm font-medium text-slate-500 mb-2">Saldo Akhir</p>
            <p class="text-2xl font-bold text-slate-950">${formatRupiah(saldo)}</p>
          </div>
        </div>`
    }

    const tbody = document.getElementById('report-tbody')
    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-sm text-slate-400">Tidak ada data</td></tr>`
        return
      }
      tbody.innerHTML = filtered.map(t => `
        <tr class="border-t border-slate-100 hover:bg-slate-50/80">
          <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.date}</td>
          <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.category}</td>
          <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">${t.description}</td>
          <td class="whitespace-nowrap px-4 py-4">
            <span class="rounded-full ${t.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'} px-3 py-1 text-xs font-semibold">
              ${t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            </span>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">
            ${t.type === 'income' ? '+' : '-'}${formatRupiah(t.amount)}
          </td>
        </tr>
      `).join('')
    }

    const catSummary = document.getElementById('report-category-summary')
    if (catSummary) {
      const allCats = {}
      filtered.forEach(t => {
        if (!allCats[t.category]) allCats[t.category] = { income: 0, expense: 0 }
        if (t.type === 'income') allCats[t.category].income += t.amount
        else allCats[t.category].expense += t.amount
      })
      catSummary.innerHTML = Object.entries(allCats).map(([cat, vals]) => `
        <div class="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
          <span class="text-sm font-medium text-slate-700">${cat}</span>
          <div class="text-right">
            <span class="text-xs text-emerald-600 font-semibold">${formatRupiah(vals.income)}</span>
            <span class="mx-2 text-slate-300">|</span>
            <span class="text-xs text-rose-600 font-semibold">${formatRupiah(vals.expense)}</span>
          </div>
        </div>
      `).join('')
    }
  }

  if (startDateInput) startDateInput.addEventListener('change', filterReportByDate)
  if (endDateInput) endDateInput.addEventListener('change', filterReportByDate)
  filterReportByDate()

  const exportPdf = document.getElementById('btn-export-pdf')
  const exportExcel = document.getElementById('btn-export-excel')
  if (exportPdf) exportPdf.addEventListener('click', () => showToast('Export PDF berhasil (dummy)', 'success'))
  if (exportExcel) exportExcel.addEventListener('click', () => showToast('Export Excel berhasil (dummy)', 'success'))
}

function renderPengaturan() {
  const nameInput = document.getElementById('setting-name')
  const ownerInput = document.getElementById('setting-owner')
  const currencySelect = document.getElementById('setting-currency')
  const dateFormatSelect = document.getElementById('setting-date')
  const darkToggle = document.getElementById('setting-dark')
  const notifToggle = document.getElementById('setting-notif')

  if (nameInput) nameInput.value = businessProfile.name
  if (ownerInput) ownerInput.value = businessProfile.owner
  if (currencySelect) currencySelect.value = businessProfile.currency
  if (dateFormatSelect) dateFormatSelect.value = businessProfile.dateFormat
  if (darkToggle) darkToggle.checked = businessProfile.darkMode
  if (notifToggle) notifToggle.checked = businessProfile.notification

  const saveBtn = document.getElementById('btn-save-settings')
  if (saveBtn) {
    saveBtn.addEventListener('click', () => showToast('Pengaturan berhasil disimpan!', 'success'))
  }
}

function updateTopbarDate() {
  const el = document.getElementById('topbar-date')
  if (el) {
    const now = new Date()
    el.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderMenus()
  updateTopbarDate()
  loadPage('dashboard')
})
