import { useLibraryStore } from "../store/useLibraryStore";
import { AlertTriangle } from "lucide-react";

export function EmergencyAlert() {
  const emergencyAlert = useLibraryStore((s) => s.settings.emergencyAlert);

  if (!emergencyAlert) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[100] animate-fade-scale">
      <div className="text-white px-6 py-4 flex items-center justify-center gap-4 shadow-2xl border-b-4 animate-emergency-flash">
        <AlertTriangle className="w-8 h-8 animate-ping text-yellow-300" />
        <h2 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase">
          {emergencyAlert}
        </h2>
        <AlertTriangle className="w-8 h-8 animate-ping text-yellow-300" />
      </div>
    </div>
  );
}
