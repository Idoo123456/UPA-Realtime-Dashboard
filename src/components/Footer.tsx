import { useLibraryStore } from "../store/useLibraryStore";
import { StatusIndicator } from "./UI/StatusIndicator";
import { RefreshCw, MonitorDot, Zap } from "lucide-react";

export function Footer() {
  const lastUpdateDisplay = useLibraryStore((s) => s.lastUpdateDisplay);
  const stats = useLibraryStore((s) => s.stats);
  const online = stats.system_status === "online";

  return (
    <footer className="w-full bg-white border-t-2 border-unri-green-100 px-6 py-2 flex items-center justify-between gap-4 text-xs">
      <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-unri-green-50 to-unri-yellow-50 border border-unri-green-200">
        <StatusIndicator online={online} size="sm" />
        <span className="text-unri-green-700 font-extrabold text-base tracking-wider">LIVE</span>
        <span className="text-gray-300">•</span>
        <span className="text-[10px] font-bold text-unri-green-600 tracking-wider uppercase">
          Perpustakaan Aktif
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <MonitorDot className="h-3.5 w-3.5 text-unri-green-600" />
          <span className="text-gray-500">Automatic display</span>
          <Zap className="h-3.5 w-3.5 text-unri-yellow-500 fill-unri-yellow-400" />
          <span className="text-gray-500">Data updates in real time</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-unri-green-50 border border-unri-green-200">
          <StatusIndicator online={online} size="sm" />
          <span className={`font-bold ${online ? "text-unri-green-700" : "text-yellow-700"}`}>
            {online ? "SYSTEM ONLINE" : "CONNECTION LOST"}
          </span>
          <span className="text-gray-400">•</span>
          <RefreshCw className="h-3 w-3 text-unri-green-600" />
          <span className="text-gray-500">DATA UPDATED</span>
          <span className="font-bold text-unri-green-700 tabular-nums">{lastUpdateDisplay}</span>
        </div>
      </div>
    </footer>
  );
}
