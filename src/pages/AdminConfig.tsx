import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminStore } from "../store/useAdminStore";
import { useLibraryStore, Settings } from "../store/useLibraryStore";
import { 
  CheckCircle, LogOut, X, AlertTriangle, RotateCcw, 
  LayoutDashboard, MonitorPlay, Database, Megaphone,
  Users, BookUp, BookDown, FileEdit, BellRing
} from "lucide-react";

export default function AdminConfig() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const logout = useAdminStore((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const settings = useLibraryStore((s) => s.settings);
  const stats = useLibraryStore((s) => s.stats);
  const fetchSettings = useLibraryStore((s) => s.fetchSettings);
  const saveSettings = useLibraryStore((s) => s.saveSettings);
  const resetToSnapshot = useLibraryStore((s) => s.resetToSnapshot);
  const updateStatsManually = useLibraryStore((s) => s.updateStatsManually);

  const [activeTab, setActiveTab] = useState<"overview" | "display" | "data">("overview");

  // Display Settings States
  const [activeBranch, setActiveBranch] = useState<Settings["activeBranch"]>(settings.activeBranch);
  const [slideDuration, setSlideDuration] = useState(settings.slideDuration / 1000);
  const [showPopups, setShowPopups] = useState(settings.showPopups);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logoUrl);
  const [runningText, setRunningText] = useState(settings.runningText || "");
  const [operationalHours, setOperationalHours] = useState(settings.operationalHours || "");
  const [emergencyAlert, setEmergencyAlert] = useState(settings.emergencyAlert || "");
  const [isSaving, setIsSaving] = useState(false);

  // Data Override States
  const [manualVisitors, setManualVisitors] = useState(stats.total_visitors_today);
  const [manualBorrowing, setManualBorrowing] = useState(stats.borrowing_today);

  // Popup States
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    setActiveBranch(settings.activeBranch);
    setSlideDuration(settings.slideDuration / 1000);
    setShowPopups(settings.showPopups);
    setLogoPreview(settings.logoUrl);
    setRunningText(settings.runningText || "");
    setOperationalHours(settings.operationalHours || "");
    setEmergencyAlert(settings.emergencyAlert || "");
  }, [settings]);

  useEffect(() => {
    setManualVisitors(stats.total_visitors_today);
    setManualBorrowing(stats.borrowing_today);
  }, [stats.total_visitors_today, stats.borrowing_today]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowLoginSuccess(true);
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setShowLoginSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleSaveDisplay = async () => {
    setIsSaving(true);
    await saveSettings({
      activeBranch,
      slideDuration: slideDuration * 1000,
      showPopups,
      logoUrl: logoPreview,
      runningText,
      operationalHours,
      emergencyAlert: emergencyAlert.trim() === "" ? null : emergencyAlert,
    });
    setIsSaving(false);
    alert("Pengaturan layar berhasil disinkronkan ke TV!");
  };

  const handleUpdateData = () => {
    updateStatsManually({
      total_visitors_today: Number(manualVisitors),
      borrowing_today: Number(manualBorrowing)
    });
    alert("Data simulasi berhasil di-override manual!");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const confirmLogout = () => {
    logout();
    navigate("/");
  };

  const handleResetData = () => {
    resetToSnapshot();
    setShowResetConfirm(false);
    alert("Semua data statistik berhasil dikembalikan ke keadaan awal (snapshot).");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Login Success Notification */}
      {showLoginSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-white border-l-4 border-unri-green-500 shadow-xl rounded-xl px-6 py-4 flex items-center gap-4 min-w-[320px]">
            <CheckCircle className="w-8 h-8 text-unri-green-500" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">Login Berhasil!</h3>
              <p className="text-sm text-gray-500">Selamat datang di Sistem CMS Admin UPA.</p>
            </div>
            <button onClick={() => setShowLoginSuccess(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-scale">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Konfirmasi Keluar</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Apakah Anda yakin ingin keluar dari sesi Admin?</p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors flex-1">Batal</button>
              <button onClick={confirmLogout} className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-colors flex-1 flex items-center justify-center gap-2"><LogOut className="w-4 h-4" /> Keluar</button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-scale">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Reset Sistem Penuh</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Aksi ini akan mereset seluruh angka simulasi kembali ke kondisi snapshot awal.</p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
              <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors flex-1">Batal</button>
              <button onClick={handleResetData} className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors flex-1 flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-72 bg-unri-green-900 text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="px-6 py-8 border-b border-white/10">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
            <Database className="w-7 h-7 text-unri-yellow-400" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">UPA CMS</h1>
          <p className="text-unri-green-200/70 text-sm mt-1">Admin Management System</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === "overview" ? "bg-unri-green-800 text-white shadow-inner" : "text-unri-green-100 hover:bg-white/5"}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Ringkasan Admin
          </button>
          <button
            onClick={() => setActiveTab("display")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === "display" ? "bg-unri-green-800 text-white shadow-inner" : "text-unri-green-100 hover:bg-white/5"}`}
          >
            <MonitorPlay className="w-5 h-5" /> Konfigurasi Layar TV
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === "data" ? "bg-unri-green-800 text-white shadow-inner" : "text-unri-green-100 hover:bg-white/5"}`}
          >
            <FileEdit className="w-5 h-5" /> Manajemen Data
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all mb-2"
          >
            <MonitorPlay className="w-4 h-4" /> Lihat Dashboard Layar
          </button>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/80 hover:bg-red-500 rounded-xl font-bold text-sm transition-all"
          >
            <LogOut className="w-4 h-4" /> Keluar Sesi
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">
        <header className="px-8 py-6 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            {activeTab === "overview" && "Ringkasan Aktivitas Perpustakaan"}
            {activeTab === "display" && "Konfigurasi Penayangan TV"}
            {activeTab === "data" && "Manajemen Override Data Statistik"}
          </h2>
          <div className="flex items-center gap-3 px-4 py-2 bg-unri-green-50 rounded-full border border-unri-green-200">
            <span className="w-2.5 h-2.5 bg-unri-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-unri-green-700">Sistem Aktif</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">

            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-scale">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 mb-1">Total Kunjungan Hari Ini</p>
                      <p className="text-3xl font-extrabold text-gray-900">{stats.total_visitors_today}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                      <BookUp className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 mb-1">Buku Dipinjam Hari Ini</p>
                      <p className="text-3xl font-extrabold text-gray-900">{stats.borrowing_today}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                      <BookDown className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 mb-1">Buku Dikembalikan</p>
                      <p className="text-3xl font-extrabold text-gray-900">{stats.returning_today}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mt-8 flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <LayoutDashboard className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Semua sistem berjalan normal</h3>
                  <p className="text-gray-500 mt-2 max-w-md">Data disinkronisasi secara otomatis setiap beberapa detik dari sensor simulasi.</p>
                </div>
              </div>
            )}

            {/* TAB: DISPLAY */}
            {activeTab === "display" && (
              <div className="space-y-8 animate-fade-scale">
                
                <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><MonitorPlay className="w-5 h-5 text-unri-green-600"/> Pengaturan Umum Tampilan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Mode Tampilan</label>
                      <div className="flex gap-4">
                        {(["Pusat", "Cabang A", "Cabang B"] as const).map((branch) => (
                          <label key={branch} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="branch" value={branch} checked={activeBranch === branch} onChange={(e) => setActiveBranch(e.target.value as Settings["activeBranch"])} className="w-5 h-5 text-unri-green-600 focus:ring-unri-green-500 cursor-pointer" />
                            <span className="font-semibold text-gray-700">{branch}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Durasi Slide (Detik)</label>
                      <input type="number" min="5" max="120" value={slideDuration} onChange={(e) => setSlideDuration(Number(e.target.value))} className="w-32 rounded-xl border-gray-300 focus:border-unri-green-500 focus:ring-2 focus:ring-unri-green-500/20 font-bold p-3 text-center" />
                    </div>
                  </div>
                </section>

                <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Megaphone className="w-5 h-5 text-unri-yellow-500"/> Konten Komunikasi</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Teks Pengumuman Berjalan (Marquee)</label>
                      <textarea value={runningText} onChange={(e) => setRunningText(e.target.value)} rows={2} className="w-full rounded-xl border-gray-300 focus:border-unri-green-500 focus:ring-2 focus:ring-unri-green-500/20 font-medium p-3 resize-none" placeholder="Masukkan pengumuman..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Jam Operasional Layanan</label>
                      <input type="text" value={operationalHours} onChange={(e) => setOperationalHours(e.target.value)} className="w-full md:w-1/2 rounded-xl border-gray-300 focus:border-unri-green-500 focus:ring-2 focus:ring-unri-green-500/20 font-medium p-3" placeholder="Senin - Jumat | 08:00 - 16:00 WIB" />
                    </div>
                  </div>
                </section>

                <section className="bg-red-50 p-8 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2"><BellRing className="w-5 h-5 text-red-600"/> Peringatan Darurat TV (Emergency Alert)</h3>
                  <p className="text-sm text-red-600/80 mb-4 font-medium max-w-2xl">Jika diisi, akan memunculkan banner merah raksasa secara paksa di seluruh layar TV perpustakaan. Kosongkan untuk menonaktifkan.</p>
                  <input type="text" value={emergencyAlert} onChange={(e) => setEmergencyAlert(e.target.value)} className="w-full rounded-xl border-red-300 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-bold text-red-700 p-4 shadow-inner" placeholder="Cth: PERPUSTAKAAN AKAN TUTUP DALAM 15 MENIT. HARAP SEGERA..." />
                </section>

                <div className="flex justify-end pt-4">
                  <button onClick={handleSaveDisplay} disabled={isSaving} className={`px-10 py-4 w-full md:w-auto ${isSaving ? 'bg-gray-400' : 'bg-unri-green-600 hover:bg-unri-green-700'} text-white font-extrabold rounded-xl shadow-lg transition-all active:scale-95 text-lg flex items-center justify-center gap-3`}>
                    {isSaving ? "Menyimpan ke TV..." : "Terapkan Konfigurasi ke Layar TV"}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: DATA */}
            {activeTab === "data" && (
              <div className="space-y-8 animate-fade-scale">
                <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><FileEdit className="w-5 h-5 text-blue-500"/> Input Manual / Override Statistik</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Ubah angka di bawah ini untuk memodifikasi simulasi sistem saat ini.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Total Kunjungan Hari Ini</label>
                      <input type="number" value={manualVisitors} onChange={(e) => setManualVisitors(Number(e.target.value))} className="w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold p-3 text-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Total Peminjaman Hari Ini</label>
                      <input type="number" value={manualBorrowing} onChange={(e) => setManualBorrowing(Number(e.target.value))} className="w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold p-3 text-lg" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end border-t border-gray-100 pt-6">
                    <button onClick={handleUpdateData} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                      <Database className="w-4 h-4" /> Timpa Data Simulasi
                    </button>
                  </div>
                </section>

                <section className="bg-red-50 p-8 rounded-2xl border border-red-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">Reset Sistem & Snapshot</h3>
                    <p className="text-base text-red-700/80 font-medium">Mengembalikan seluruh angka (kunjungan, peminjaman) ke keadaan bersih (snapshot awal).</p>
                  </div>
                  <button onClick={() => setShowResetConfirm(true)} className="shrink-0 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-3 text-lg">
                    <RotateCcw className="w-5 h-5" /> Reset Semua Data
                  </button>
                </section>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
