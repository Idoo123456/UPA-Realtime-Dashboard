import { useLibraryStore } from "../../store/useLibraryStore";
import { AnimatedNumber } from "../UI/AnimatedNumber";
import { CheckCircle2 } from "lucide-react";

export function BebasPustakaCard() {
  const stats = useLibraryStore((s) => s.stats);

  return (
    <div className="kpi-card flex flex-col animate-fade-in h-full bg-gradient-to-br from-purple-50/50 to-fuchsia-50/50 border-purple-100">
      <div className="kpi-card-header shrink-0">
        <div className="h-6 w-1.5 rounded-full bg-purple-500" />
        <CheckCircle2 className="h-5 w-5 text-purple-600" strokeWidth={2.2} />
        <span className="kpi-title text-purple-700 tracking-wider">
          BEBAS PUSTAKA HARI INI
        </span>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] right-[-10%] w-24 h-24 bg-purple-200/50 rounded-full blur-xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-20 h-20 bg-fuchsia-200/50 rounded-full blur-xl" />
        
        <div className="relative z-10 flex items-baseline gap-2">
          <AnimatedNumber
            value={stats.bebas_pustaka_today || 0}
            className="text-6xl font-black text-purple-700 tabular-nums drop-shadow-sm"
            showDelta
            deltaColorClass="text-purple-500"
          />
          <span className="text-sm font-bold text-purple-600/70 uppercase tracking-widest mb-2">Pemustaka</span>
        </div>
        <p className="mt-2 text-xs font-semibold text-purple-600/60 text-center max-w-[80%]">
          Jumlah surat keterangan bebas pustaka yang diterbitkan hari ini
        </p>
      </div>
    </div>
  );
}
