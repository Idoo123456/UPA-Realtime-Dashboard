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

      <div className="flex-1 p-2 flex flex-col gap-2 min-h-0 overflow-y-auto">
        {rows.map((r) => {
          const Icon = r.icon;
          const pct = stats.total_visitors_today > 0 ? (r.value / stats.total_visitors_today) * 100 : 0;
          return (
            <div key={r.label} className="flex flex-col bg-white border border-green-100 rounded-lg p-2 shadow-sm shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon className="h-4 w-4 text-unri-green-600 shrink-0" style={{ color: r.color }} />
                  <span className="text-xs font-bold text-gray-700 truncate uppercase tracking-wide">
                    {r.label}
                  </span>
                </div>
                <AnimatedNumber
                  value={r.value}
                  className="text-lg font-black tabular-nums shrink-0 ml-1"
                  style={{ color: r.color }}
                />
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden bg-gray-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: r.color,
                    transition: "width 1s ease-out",
                  }}
                />
              </div>
            </div>
          );
        })}

        <div
          className="pt-2 mt-auto"
          style={{
            borderTop: "1px dashed rgba(22, 163, 74, 0.2)",
          }}
        >
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(135deg, rgba(22, 163, 74, 0.08) 0%, rgba(22, 163, 74, 0.02) 100%)",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-unri-green-600/80">
              Total Pengunjung
            </p>
            <AnimatedNumber
              value={stats.total_visitors_today}
              className="text-3xl font-black text-unri-green-700 tabular-nums"
              showDelta
              deltaColorClass="text-unri-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
