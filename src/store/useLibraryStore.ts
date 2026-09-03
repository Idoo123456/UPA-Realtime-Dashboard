import { create } from "zustand";
import type { LibraryStats, LateBook } from "../types";

const INITIAL_HOURLY_VISITORS = [15, 35, 48, 42, 20, 40, 30, 22, 18];
const INITIAL_HOURLY_BORROWING = [8, 18, 25, 20, 10, 18, 15, 12, 10];
const INITIAL_HOURLY_RETURNING = [10, 22, 28, 22, 12, 20, 16, 14, 12];
const INITIAL_HOURLY_ADMINISTRATION = [5, 12, 18, 15, 8, 14, 12, 10, 8];

const INITIAL_COLLECTION: Record<string, number> = {
  "Kelas 000": 6008,
  "Kelas 100": 1152,
  "Kelas 200": 1025,
  "Kelas 300": 12061,
  "Kelas 400": 1167,
  "Kelas 500": 4539,
  "Kelas 600": 10946,
  "Kelas 700": 535,
  "Kelas 800": 1303,
  "Kelas 900": 1073,
};

const DUMMY_NAMES = [
  "Budi Santoso", "Siti Nurhaliza", "Rudi Hermawan", "Anisa Rahmawati", "Fajar Nugraha",
  "Diana Putri", "Kevin Sanjaya", "Putri Anggraini", "Ahmad Fauzan", "Rini Wulandari",
  "Gilang Ramadhan", "Dewi Lestari", "Andi Pratama", "Nadia Vega", "Reza Rahadian",
  "Maya Safira", "Hendra Wijaya", "Indah Permatasari", "Surya Saputra", "Ayu Ting Ting",
  "Aditya Pratama", "Bayu Saputra", "Citra Kirana", "Dian Sastrowardoyo", "Eko Patrio",
  "Fina Melati", "Gita Gutawa", "Hasan Basri", "Iqbal Ramadhan", "Joko Anwar",
  "Kiki Fatmala", "Lina Marlina", "Maudy Ayunda", "Naufal Abiyyu", "Oki Setiana",
  "Prilly Latuconsina", "Qory Sandioriva", "Raffi Ahmad", "Syahrini", "Tora Sudiro",
  "Umar Kayam", "Vino G. Bastian", "Wulan Guritno", "Xavier Nur", "Yayan Ruhian",
  "Zaskia Sungkar", "Agung Hercules", "Bagas Pangestu", "Cinta Laura", "Deddy Corbuzier",
  "Elly Sugigi", "Farid Aja", "Gading Marten", "Hesti Purwadinata", "Indro Warkop",
  "Jefri Nichol", "Kaesang Pangarep", "Lesti Kejora", "Melaney Ricardo", "Nirina Zubir",
  "Omesh", "Pamela Bowie", "Qomar", "Rina Nose", "Sule", "Tukul Arwana",
  "Uus", "Vidi Aldiano", "Wendi Cagur", "Yuni Shara", "Zacky Winter",
  "Ariel Noah", "Bunga Citra", "Chelsea Islan", "Dimas Anggara", "Eza Gionino",
  "Fedi Nuril", "Gisella Anastasia", "Herjunot Ali", "Iko Uwais", "Joe Taslim",
  "Kunto Aji", "Luna Maya", "Marcel Chandrawinata", "Nadine Chandrawinata", "Oka Antara",
  "Pevita Pearce", "Raditya Dika", "Sandra Dewi", "Tara Basro", "Vanesha Prescilla",
  "Wafda Saifan", "Yuki Kato", "Zidni Hakim", "Abimana Aryasatya", "Bisma Karisma",
  "Chicco Jerikho", "Darius Sinathrya", "Ernest Prakasa", "Fauzi Baadilla", "Giring Ganesha",
  "Hanggini", "Irfan Hakim", "Jessica Mila", "Kiky Saputri", "Lukman Sardi",
  "Marthino Lio", "Nikita Willy", "Oza Rangkuti", "Putri Marino", "Raline Shah",
  "Syifa Hadju", "Tatjana Saphira", "Umay Shahab", "Valerie Thomas"
];
const DUMMY_FACULTIES = ["FAPERTA", "FMIPA", "FE", "TEKNIK", "FISIP", "HUKUM", "FKIP"];
const DUMMY_TITLES = [
  "Pemrograman Java", "Statistika Terapan", "Ekonomi Makro", "Dasar Jaringan Komputer",
  "Metodologi Penelitian", "Hukum Internasional", "Manajemen Keuangan", "Kalkulus Lanjut",
  "Agroekoteknologi", "Psikologi Komunikasi", "Struktur Data", "Kecerdasan Buatan"
];

function generateLateBook(id: string): LateBook {
  return {
    id,
    memberName: DUMMY_NAMES[Math.floor(Math.random() * DUMMY_NAMES.length)],
    nim: "21" + Math.floor(Math.random() * 10000).toString().padStart(4, "0"),
    title: DUMMY_TITLES[Math.floor(Math.random() * DUMMY_TITLES.length)],
    daysLate: Math.floor(Math.random() * 14) + 1,
    fine: (Math.floor(Math.random() * 14) + 1) * 10000,
    faculty: DUMMY_FACULTIES[Math.floor(Math.random() * DUMMY_FACULTIES.length)]
  };
}

const INITIAL_STATS: LibraryStats = {
  // Kunjungan
  visit_main_door: 1,
  visit_circulation_room: 273,
  visit_thesis_room: 15,
  visit_multimedia_room: 45,
  visit_reference_room: 82,
  total_visitors_today: 416,

  // Transaksi
  borrowing_today: 140,
  returning_today: 158,
  validation_today: 12,
  free_pass_today: 8,
  registration_today: 5,
  fine_payment_today: 15,
  administration_today: 115,
  total_transactions_today: 413,

  // Koleksi
  total_book_titles: 39815,
  total_copies: 134668,
  available_circulation: 133977,
  availability_percent: 99.5,
  total_internal_resources: 2456,
  popular_collections: [
    { id: "1", title: "Pemrograman Web Modern", author: "Adi Nugroho", borrowCount: 245, class: "Kelas 000" },
    { id: "2", title: "Database Design", author: "C.J. Date", borrowCount: 198, class: "Kelas 100" },
    { id: "3", title: "Algoritma & Struktur Data", author: "Sedgewick", borrowCount: 187, class: "Kelas 300" },
    { id: "4", title: "Clean Code", author: "Robert C. Martin", borrowCount: 156, class: "Kelas 600" },
    { id: "5", title: "Desain Basis Data", author: "Connolly", borrowCount: 142, class: "Kelas 000" },
    { id: "6", title: "Jaringan Komputer", author: "Kurose", borrowCount: 130, class: "Kelas 000" },
    { id: "7", title: "Rekayasa Perangkat Lunak", author: "Pressman", borrowCount: 115, class: "Kelas 600" },
  ],

  // Total Transaksi
  total_borrowing_all: 392605,
  total_returning_all: 391916,
  total_extension_all: 14502,
  books_currently_borrowed: 689,
  members_currently_borrowing: 396,
  overdue_books: 104,
  late_books: Array.from({ length: 104 }, (_, i) => generateLateBook(`init-${i}`)),

  // Keanggotaan
  member_visitors: 396,
  reading_card_visitors: 0,
  general_visitors: 1,
  membership_by_faculty: [
    { faculty: "FAPERTA", count: 145 },
    { faculty: "FMIPA", count: 132 },
    { faculty: "FE", count: 98 },
    { faculty: "FH", count: 87 },
    { faculty: "FKIP", count: 156 },
  ],
  membership_by_gender: [
    { category: "Laki-laki", count: 298 },
    { category: "Perempuan", count: 420 },
  ],
  membership_by_program: [
    { category: "S1", count: 485 },
    { category: "S2", count: 156 },
    { category: "S3", count: 45 },
    { category: "D3", count: 32 },
  ],
  membership_by_age: [
    { category: "18-22", count: 245 },
    { category: "23-27", count: 312 },
    { category: "28-32", count: 124 },
    { category: "33+", count: 37 },
  ],

  // Tugas Akhir
  ta_d3: 2,
  skripsi_s1: 15,
  tesis_s2: 3,
  disertasi_s3: 1,
  academic_works: [
    { id: "1", title: "Pengaruh Algoritma Machine Learning pada Prediksi Cuaca", author: "Budi Santoso", type: "skripsi_s1", submissionDate: "2024-09-01T08:15:00", faculty: "FMIPA" },
    { id: "2", title: "Sistem Informasi Manajemen Perpustakaan", author: "Siti Nurhaliza", type: "ta_d3", submissionDate: "2024-09-01T09:30:00", faculty: "TEKNIK" },
    { id: "3", title: "Analisis Sentimen Menggunakan NLP", author: "Ahmad Fauzan", type: "tesis_s2", submissionDate: "2024-09-01T10:45:00", faculty: "FMIPA" },
    { id: "4", title: "Pengembangan Model Deep Learning untuk Diagnosa Medis", author: "Dr. Hendra Wijaya", type: "disertasi_s3", submissionDate: "2024-09-01T11:20:00", faculty: "KEDOKTERAN" },
    { id: "5", title: "Rancang Bangun Jaringan Sensor Nirkabel", author: "Gilang Ramadhan", type: "skripsi_s1", submissionDate: "2024-09-01T13:10:00", faculty: "TEKNIK" },
    { id: "6", title: "Optimasi Query pada Database Terdistribusi", author: "Dewi Lestari", type: "skripsi_s1", submissionDate: "2024-09-01T14:05:00", faculty: "FMIPA" },
  ],

  // Admin Transactions
  admin_transactions: [
    { type: "peminjaman", count: 140 },
    { type: "pengembalian", count: 158 },
    { type: "validasi", count: 12 },
    { type: "bebas_pustaka", count: 8 },
    { type: "pendaftaran", count: 5 },
    { type: "pembayaran_denda", count: 15 },
  ],

  // Hourly Data
  hourly_visitors: [...INITIAL_HOURLY_VISITORS],
  hourly_borrowing: [...INITIAL_HOURLY_BORROWING],
  hourly_returning: [...INITIAL_HOURLY_RETURNING],
  hourly_administration: [...INITIAL_HOURLY_ADMINISTRATION],

  // Koleksi per Kelas
  collection_by_class: { ...INITIAL_COLLECTION },

  last_updated: new Date().toISOString(),
  system_status: "online",
};

interface LibraryStore {
  stats: LibraryStats;
  lastUpdateDisplay: string;
  refreshTimestamp: () => void;
  startAutoRefresh: () => () => void;
  resetToSnapshot: () => void;
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  stats: { ...INITIAL_STATS },
  lastUpdateDisplay:
    new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    }) + " WIB",

  refreshTimestamp: () => {
    const ts = new Date();
    const timeStr =
      ts.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }) + " WIB";

    set((state) => {
      const s = { ...state.stats };

      // Determine current hourly index (0: 08:00 to 8: 16:00)
      const currentHour = ts.getHours();
      let hourIdx = currentHour - 8;
      if (hourIdx < 0) hourIdx = 0;
      if (hourIdx > 8) hourIdx = 8; // active hour index in array

      // 1. Visitors Simulation (65% chance per tick)
      if (Math.random() < 0.65) {
        const randDoor = Math.random();
        let dMain = 0;
        let dCirc = 0;
        let dThesis = 0;

        if (randDoor < 0.3) dMain = 1;
        else if (randDoor < 0.8) dCirc = Math.floor(Math.random() * 2) + 1;
        else dThesis = 1;

        s.visit_main_door += dMain;
        s.visit_circulation_room += dCirc;
        s.visit_thesis_room += dThesis;
        s.total_visitors_today =
          s.visit_main_door + s.visit_circulation_room + s.visit_thesis_room;

        const totalAdd = dMain + dCirc + dThesis;
        const mRand = Math.random();
        if (mRand < 0.7) {
          s.member_visitors += totalAdd;
        } else if (mRand < 0.9) {
          s.reading_card_visitors += totalAdd;
        } else {
          s.general_visitors += totalAdd;
        }

        const newHourlyVisitors = [...s.hourly_visitors];
        newHourlyVisitors[hourIdx] = (newHourlyVisitors[hourIdx] || 0) + totalAdd;
        s.hourly_visitors = newHourlyVisitors;
      }

      // 2. Transactions Simulation (55% chance per tick)
      if (Math.random() < 0.55) {
        const tRand = Math.random();
        if (tRand < 0.35) {
          // Borrowing
          const add = 1;
          s.borrowing_today += add;
          s.total_borrowing_all += add;
          s.books_currently_borrowed += add;
          s.available_circulation = Math.max(0, s.available_circulation - add);
          if (Math.random() < 0.6) s.members_currently_borrowing += 1;
          if (s.admin_transactions[0]) s.admin_transactions[0].count += add;

          const newHourlyBorrowing = [...s.hourly_borrowing];
          newHourlyBorrowing[hourIdx] = (newHourlyBorrowing[hourIdx] || 0) + add;
          s.hourly_borrowing = newHourlyBorrowing;
        } else if (tRand < 0.70) {
          // Returning
          const add = 1;
          s.returning_today += add;
          s.total_returning_all += add;
          if (s.books_currently_borrowed > 0) s.books_currently_borrowed -= add;
          s.available_circulation += add;
          if (s.admin_transactions[1]) s.admin_transactions[1].count += add;

          const newHourlyReturning = [...s.hourly_returning];
          newHourlyReturning[hourIdx] = (newHourlyReturning[hourIdx] || 0) + add;
          s.hourly_returning = newHourlyReturning;
        } else if (tRand < 0.80) {
          // Validation
          const add = 1;
          s.validation_today += add;
          if (s.admin_transactions[2]) s.admin_transactions[2].count += add;
        } else if (tRand < 0.85) {
          // Free Pass
          const add = 1;
          s.free_pass_today += add;
          if (s.admin_transactions[3]) s.admin_transactions[3].count += add;
        } else if (tRand < 0.90) {
          // Registration
          const add = 1;
          s.registration_today += add;
          if (s.admin_transactions[4]) s.admin_transactions[4].count += add;
        } else {
          // Fine Payment
          const add = 1;
          s.fine_payment_today += add;
          if (s.admin_transactions[5]) s.admin_transactions[5].count += add;
        }

        s.administration_today = s.validation_today + s.free_pass_today + s.registration_today + s.fine_payment_today;
        s.total_transactions_today =
          s.borrowing_today + s.returning_today + s.administration_today;
        s.availability_percent = Number(
          ((s.available_circulation / s.total_copies) * 100).toFixed(1),
        );
      }

      // 3. Academic Work Submissions (15% chance per tick)
      if (Math.random() < 0.15) {
        const aRand = Math.random();
        if (aRand < 0.4) s.skripsi_s1 += 1;
        else if (aRand < 0.65) s.ta_d3 += 1;
        else if (aRand < 0.85) s.tesis_s2 += 1;
        else s.disertasi_s3 += 1;
      }

      // 4. Collection by Class Live Cataloging (20% chance per tick)
      if (Math.random() < 0.2) {
        const classes = [
          "Kelas 000",
          "Kelas 100",
          "Kelas 200",
          "Kelas 300",
          "Kelas 400",
          "Kelas 500",
          "Kelas 600",
          "Kelas 700",
          "Kelas 800",
          "Kelas 900",
        ];
        const randomClass = classes[Math.floor(Math.random() * classes.length)];
        const addTitle = Math.random() < 0.7 ? 1 : 2;
        const addCopies = addTitle * (Math.floor(Math.random() * 3) + 1);

        const newCollection = { ...s.collection_by_class };
        newCollection[randomClass] = (newCollection[randomClass] || 0) + addTitle;
        s.collection_by_class = newCollection;

        s.total_book_titles += addTitle;
        s.total_copies += addCopies;
        s.available_circulation += addCopies;
        s.availability_percent = Number(
          ((s.available_circulation / s.total_copies) * 100).toFixed(1),
        );
      }

      // 5. Overdue Books Slight Fluctuation (12% chance per tick)
      if (Math.random() < 0.12) {
        const delta = Math.random() < 0.5 ? 1 : -1;
        s.overdue_books = Math.max(50, s.overdue_books + delta);
      }

      // Sync late_books with overdue_books count
      if (s.late_books.length !== s.overdue_books) {
        let newBooks = [...s.late_books];
        if (newBooks.length < s.overdue_books) {
          while (newBooks.length < s.overdue_books) {
            newBooks.push(generateLateBook(`gen-${Date.now()}-${newBooks.length}`));
          }
        } else {
          newBooks = newBooks.slice(0, s.overdue_books);
        }
        s.late_books = newBooks;
      }

      s.last_updated = ts.toISOString();
      s.system_status = "online";

      return {
        lastUpdateDisplay: timeStr,
        stats: s,
      };
    });
  },

  resetToSnapshot: () => {
    set({
      stats: JSON.parse(JSON.stringify(INITIAL_STATS)),
    });
  },

  startAutoRefresh: () => {
    const id = window.setInterval(() => {
      get().refreshTimestamp();
    }, 2500);
    return () => window.clearInterval(id);
  },
}));
