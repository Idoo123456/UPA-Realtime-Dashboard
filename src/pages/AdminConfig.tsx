import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../store/useAdminStore";
import { useLibraryStore, Settings } from "../store/useLibraryStore";

export default function AdminConfig() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const logout = useAdminStore((s) => s.logout);
  const navigate = useNavigate();

  const settings = useLibraryStore((s) => s.settings);
  const updateSettings = useLibraryStore((s) => s.updateSettings);

  const [activeBranch, setActiveBranch] = useState<Settings["activeBranch"]>(settings.activeBranch);
  const [slideDuration, setSlideDuration] = useState(settings.slideDuration / 1000);
  const [showPopups, setShowPopups] = useState(settings.showPopups);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logoUrl);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSave = () => {
    updateSettings({
      activeBranch,
      slideDuration: slideDuration * 1000,
      showPopups,
      logoUrl: logoPreview,
    });
    alert("Pengaturan berhasil disimpan!");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-green-700 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Konfigurasi Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-sm font-medium transition-colors"
            >
              Lihat Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Branch Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Mode Dashboard</h2>
            <div className="flex gap-6">
              {(["Pusat", "Cabang A", "Cabang B"] as const).map((branch) => (
                <label key={branch} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="branch"
                    value={branch}
                    checked={activeBranch === branch}
                    onChange={(e) => setActiveBranch(e.target.value as Settings["activeBranch"])}
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700 font-medium">{branch}</span>
                </label>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Pusat menampilkan ringkasan, sementara Cabang menampilkan statistik spesifik seperti Bebas Pustaka.
            </p>
          </section>

          {/* Slide Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Pengaturan Slide</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durasi Slide (Detik)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={slideDuration}
                onChange={(e) => setSlideDuration(Number(e.target.value))}
                className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
              />
            </div>
          </section>

          {/* Header/Logo Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Logo Header</h2>
            <div className="flex items-start gap-6">
              <div className="w-48 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="h-full object-contain" />
                ) : (
                  <span className="text-sm text-gray-400">Default Logo</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded hover:bg-blue-100 transition-colors"
                >
                  Unggah Logo Baru
                </button>
                <button
                  onClick={() => setLogoPreview(null)}
                  className="px-4 py-2 text-red-600 font-medium rounded hover:bg-red-50 transition-colors text-left"
                >
                  Hapus / Gunakan Default
                </button>
              </div>
            </div>
          </section>

          {/* Feature Toggles */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Fitur Tambahan</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showPopups}
                  onChange={(e) => setShowPopups(e.target.checked)}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${showPopups ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showPopups ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="text-gray-700 font-medium">Tampilkan Notifikasi Popup</span>
            </label>
          </section>

        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-colors"
          >
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}
