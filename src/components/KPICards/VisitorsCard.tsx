import { useLibraryStore } from "../../store/useLibraryStore";
import { AnimatedNumber } from "../UI/AnimatedNumber";
import { Users, DoorOpen, Library, BookMarked, MonitorPlay, FileText } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { buildDonutOptions } from "../../utils/chartConfig";
import type { ChartData } from "chart.js";

export function VisitorsCard() {
  const stats = useLibraryStore((s) => s.stats);

  const rows = [
    { label: "Pintu Utama", value: stats.visit_main_door, icon: DoorOpen, color: "#16a34a" },
    { label: "Ruang Sirkulasi", value: stats.visit_circulation_room, icon: Library, color: "#10b981" },
    { label: "Ruang Skripsi", value: stats.visit_thesis_room, icon: BookMarked, color: "#2dd4bf" },
    { label: "Ruang Multimedia", value: stats.visit_multimedia_room, icon: MonitorPlay, color: "#06b6d4" },
    { label: "Ruang Referensi", value: stats.visit_reference_room, icon: FileText, color: "#3b82f6" },
  ];

  const chartData: ChartData<"doughnut"> = {
    labels: rows.map(r => r.label),
    datasets: [{
      data: rows.map(r => r.value),
      backgroundColor: rows.map(r => r.color),
      borderWidth: 2,
      borderColor: "#fff",
      hoverOffset: 4,
    }]
  };

  return (
    <div className="kpi-card flex flex-col animate-fade-in h-full">
      <div className="kpi-card-header shrink-0">
        <div className="h-6 w-1.5 rounded-full bg-unri-green-500" />
        <Users className="h-5 w-5 text-unri-green-600" strokeWidth={2.2} />
        <span className="kpi-title text-unri-green-700 tracking-wider">
          KUNJUNGAN HARI INI
        </span>
      </div>

      <div className="flex-1 p-2 flex flex-col justify-start min-h-0 overflow-hidden">
        <div className="flex flex-col gap-1.5">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="stat-row">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon className="h-3.5 w-3.5 text-unri-green-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700 truncate">
                    {r.label}
                  </span>
                </div>
                <AnimatedNumber
                  value={r.value}
                  className="text-lg font-black text-unri-green-700 tabular-nums shrink-0 ml-1"
                  showDelta
                  deltaColorClass="text-unri-green-500"
                />
              </div>
            );
          })}
        </div>

        {/* Visual Graphic to fill space */}
        <div className="mt-auto mb-1 flex-1 min-h-0 flex items-center justify-center relative py-2">
          <div className="w-full h-full relative flex items-center justify-center">
            <Doughnut data={chartData} options={buildDonutOptions()} />
            <div className="donut-center flex flex-col items-center">
              <AnimatedNumber
                value={stats.total_visitors_today}
                className="text-xl md:text-2xl font-black text-unri-green-700 tabular-nums leading-none"
              />
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Total</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
