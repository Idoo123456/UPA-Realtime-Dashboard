import { useRealTimeClock } from "../hooks/useRealTimeClock";
import { useLibraryStore } from "../store/useLibraryStore";
import { UnriLogo } from "./UI/UnriLogo";
import { StatusIndicator } from "./UI/StatusIndicator";
import { Clock, RefreshCw } from "lucide-react";

export function Header() {
  const { dateString, timeString } = useRealTimeClock();
  const lastUpdateDisplay = useLibraryStore((s) => s.lastUpdateDisplay);

  return (
    <header className="w-full px-5 py-2.5 bg-white border-b-2 border-unri-green-100 shadow-sm shrink-0">
      <div className="w-full flex items-center justify-between gap-4">
        {/* LEFT: Logo + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <UnriLogo size="sm" />
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg md:text-xl font-extrabold text-unri-green-800 tracking-tight leading-tight whitespace-nowrap">
              PERPUSTAKAAN UNIVERSITAS RIAU
            </h1>
            <p className="text-[11px] md:text-xs font-medium text-unri-green-600/80 whitespace-nowrap">
              Real-Time Library Information System
            </p>
          </div>
        </div>

        {/* CENTER: LIVE Badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-unri-green-50 to-unri-yellow-50 border border-unri-green-200">
          <StatusIndicator online size="sm" />
          <span className="text-unri-green-700 font-extrabold text-base tracking-wider">LIVE</span>
          <span className="text-gray-300">•</span>
          <span className="text-[10px] font-bold text-unri-green-600 tracking-wider uppercase">
            Perpustakaan Aktif
          </span>
        </div>

        {/* RIGHT: Date + Clock */}
        <div className="flex items-center gap-3">
          <div className="text-right flex flex-col">
            <span className="text-xs md:text-sm font-semibold text-unri-green-700 whitespace-nowrap">
              {dateString}
            </span>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-xl md:text-2xl font-black text-unri-yellow-600 tabular-nums tracking-tight leading-none">
                {timeString}
              </span>
            </div>
            <div className="flex items-center gap-1 justify-end mt-0.5 text-[10px] text-gray-500 font-medium">
              <RefreshCw className="h-2.5 w-2.5 text-unri-green-600" />
              <span>Updated:</span>
              <span className="font-bold text-unri-green-700">{lastUpdateDisplay}</span>
            </div>
          </div>
          <Clock className="h-7 w-7 text-unri-green-600 shrink-0" strokeWidth={2} />
        </div>
      </div>
    </header>
  );
}
