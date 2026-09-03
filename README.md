# 📊 Dashboard Statistik UPA Perpustakaan Unri

Sistem dashboard statistik real-time untuk Unit Pelayanan Administrasi (UPA) Perpustakaan Universitas Riau dengan visualisasi data komprehensif dan terorganisir.

## 🎯 Fitur Utama

### ✨ Dashboard Komprehensif
- **Kategori Koleksi:** Statistik buku, resource, dan koleksi populer
- **Kategori Keanggotaan:** Data pengunjung dengan breakdown demografis (fakultas, gender, program, umur)
- **Kategori Tugas Akhir:** Tracking submission dan penerimaan karya ilmiah (TA, Skripsi, Tesis, Karya Dosen)

### 📈 Visualisasi Data
- **Real-time Charts:** Activity trends, collection distribution, membership analysis
- **KPI Cards:** Metrik kunci dengan animasi angka real-time
- **Running Ticker:** Streaming informasi statistik terkini
- **Late Books List:** Detail keterlambatan dengan informasi anggota, NIM, denda, dan fakultas
- **Popular Collections:** Top 5 buku berdasarkan peminjaman

### 🔄 Data Real-Time
- Update otomatis setiap 2.5 detik
- Simulasi realistis untuk berbagai transaksi
- Perubahan data live di semua komponen

### 📱 Responsive Design
- Optimal di desktop, tablet, dan mobile
- Clean UI dengan color-coded categories
- Smooth animations dan transitions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm atau yarn

### Installation

```bash
# Clone repository
cd RealtimeUPA

# Install dependencies
npm install

# Run development server
npm run dev
```

Akses dashboard di: **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output akan tersimpan di folder `dist/`

### Type Checking

```bash
npm run check
```

---

## 📊 Dashboard Pages

### 1. Home Dashboard (`/`)
Halaman utama dengan:
- Navigasi kategori (3 quick links)
- 6 KPI Cards
- 6 Chart sections
- Late books list & popular collections

### 2. Collection Category (`/collection`)
Kategori koleksi (1, 3, 9):
- Total koleksi & ketersediaan
- Resource internal
- Distribution per class (DDC 000-900)
- Popular collections ranking
- Late books detail

### 3. Membership Category (`/membership`)
Kategori keanggotaan (2, 4, 6, 7, 8):
- Daily visitors by location
- Membership composition (anggota, kartu baca, umum)
- Breakdown by:
  - Faculty
  - Gender
  - Study Program (S1, S2, S3, D3)
  - Age Group
- Activity trend chart

### 4. Academic Works Category (`/academic-works`)
Kategori tugas akhir (5, 10, 11):
- Tugas Akhir D3
- Skripsi S1
- Tesis S2
- Karya Ilmiah Dosen
- Latest submissions dengan detail author, faculty, date

---

## 📋 Data Structure

### LibraryStats Interface
```typescript
interface LibraryStats {
  // Visitors
  visit_main_door: number
  visit_circulation_room: number
  visit_thesis_room: number
  total_visitors_today: number

  // Transactions (Today)
  borrowing_today: number
  returning_today: number
  validation_today: number
  free_pass_today: number
  registration_today: number
  fine_payment_today: number
  administration_today: number
  total_transactions_today: number

  // Collections
  total_book_titles: number
  total_copies: number
  available_circulation: number
  availability_percent: number
  total_internal_resources: number
  popular_collections: PopularCollection[]

  // Total Transactions (All-Time)
  total_borrowing_all: number
  total_returning_all: number
  books_currently_borrowed: number
  members_currently_borrowing: number
  overdue_books: number
  late_books: LateBook[]

  // Membership
  member_visitors: number
  reading_card_visitors: number
  general_visitors: number
  membership_by_faculty: MembershipByFaculty[]
  membership_by_gender: MembershipByDemographic[]
  membership_by_program: MembershipByDemographic[]
  membership_by_age: MembershipByDemographic[]

  // Academic Works
  ta_d3: number
  skripsi_s1: number
  tesis_s2: number
  karya_ilmiah_dosen: number
  academic_works: AcademicWorkDetail[]

  // Admin Transactions
  admin_transactions: AdminTransaction[]

  // Hourly Data
  hourly_visitors: number[]
  hourly_borrowing: number[]
  hourly_returning: number[]
  hourly_administration: number[]

  // Collection by Class
  collection_by_class: Record<string, number>

  last_updated: string
  system_status: "online" | "offline"
}
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Chart.js & react-chartjs-2** - Data Visualization
- **React Router** - Navigation
- **Lucide React** - Icons

### State Management
- **Zustand** - Lightweight state management with real-time updates

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Charts/
│   │   ├── AcademicWorkChart.tsx         # Bar chart untuk tugas akhir
│   │   ├── AcademicWorksLatest.tsx       # Daftar karya ilmiah terbaru
│   │   ├── ActivityTrendChart.tsx        # Line chart aktivitas harian
│   │   ├── AdminTransactionsCard.tsx     # Breakdown transaksi admin
│   │   ├── CollectionClassChart.tsx      # Horizontal bar chart koleksi
│   │   ├── LateBooksList.tsx             # Daftar buku terlambat
│   │   ├── MembershipBreakdown.tsx       # Tabbed breakdown keanggotaan
│   │   ├── MembershipDonut.tsx           # Donut chart keanggotaan
│   │   └── PopularCollections.tsx        # Top 5 koleksi populer
│   ├── KPICards/
│   │   ├── CollectionCard.tsx
│   │   ├── InternalResourcesCard.tsx
│   │   ├── OverdueBooksSummary.tsx
│   │   ├── TotalTransactionsCard.tsx
│   │   ├── TransactionInfoCard.tsx
│   │   ├── TransactionsCard.tsx
│   │   └── VisitorsCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── RunningTicker.tsx
├── pages/
│   ├── Home.tsx                          # Dashboard utama
│   ├── CollectionPage.tsx                # Halaman kategori koleksi
│   ├── MembershipPage.tsx                # Halaman kategori keanggotaan
│   └── AcademicWorksPage.tsx             # Halaman kategori tugas akhir
├── store/
│   └── useLibraryStore.ts                # Zustand store dengan simulasi real-time
├── types/
│   └── index.ts                          # TypeScript interfaces
├── utils/
│   ├── chartConfig.ts
│   └── formatters.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🎨 Color Scheme

- **Green (#16a34a)** - Kunjungan
- **Orange (#ca8a04)** - Koleksi
- **Red (#ef4444)** - Keterlambatan
- **Cyan (#0891b2)** - Keanggotaan
- **Violet (#7c3aed)** - Tugas Akhir
- **Indigo (#4f46e5)** - Administrasi
- **Pink (#ec4899)** - Resource Internal

---

## 📝 Usage

### Untuk Development
```bash
npm run dev
```

### Untuk Type Checking
```bash
npm run check
```

### Untuk Linting
```bash
npm run lint
```

### Untuk Preview Production Build
```bash
npm run preview
```

---

## 🔮 Future Enhancements

- [ ] API Integration dengan backend real
- [ ] Export data (PDF, Excel)
- [ ] Advanced filtering & search
- [ ] User authentication & roles
- [ ] Custom date range selection
- [ ] Email notifications untuk overdues
- [ ] Mobile app version
- [ ] Dark mode
- [ ] Multi-language support

---

## 📄 Documentation

Lihat [DASHBOARD_DOCUMENTATION.md](./DASHBOARD_DOCUMENTATION.md) untuk dokumentasi lengkap.

---

## 📞 Support

Untuk pertanyaan, bug reports, atau feature requests, silakan buat issue di repository ini.

---

## 📜 License

This project is part of UPA Perpustakaan Universitas Riau.

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** 2024
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
