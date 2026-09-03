import { useLibraryStore } from "../../store/useLibraryStore";
import { AnimatedNumber } from "../UI/AnimatedNumber";
import { Users, DoorOpen, Library, BookMarked, MonitorPlay, FileText } from "lucide-react";

export function VisitorsCard() {
  const stats = useLibraryStore((s) => s.stats);

  const rows = [
    {
      label: "Pintu Utama",
      value: stats.visit_main_door,
      icon: DoorOpen,
    },
    {
      label: "Ruang Sirkulasi",
      value: stats.visit_circulation_room,
      icon: Library,
    },
    {
      label: "Ruang Skripsi",
      value: stats.visit_thesis_room,
      icon: BookMarked,
    },
    {
      label: "Ruang Multimedia",
      value: stats.visit_multimedia_room,
      icon: MonitorPlay,
    },
    {
      label: "Ruang Referensi",
      value: stats.visit_reference_room,
      icon: FileText,
    },
  ];

  return (
    <div className="kpi-card flex flex-col animate-fade-in h-full">
      <div className="kpi-card-header shrink-0">
        <div className="h-6 w-1.5 rounded-full bg-unri-green-500" />
        <Users className="h-5 w-5 text-unri-green-600" strokeWidth={2.2} />
        <span className="kpi-title text-unri-green-700 tracking-wider">
          KUNJUNGAN HARI INI
        </span>
      </div>

      <div className="flex-1 p-2 flex flex-col justify-between min-h-0 overflow-hidden">
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

        <div
          className="pt-1 mt-auto"
          style={{
            borderTop: "1px dashed rgba(22, 163, 74, 0.2)",
          }}
        >
          <div
            className="rounded-lg px-2 py-1.5 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(135deg, rgba(22, 163, 74, 0.08) 0%, rgba(22, 163, 74, 0.02) 100%)",
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-unri-green-600/80">
              Total Pengunjung
            </p>
            <AnimatedNumber
              value={stats.total_visitors_today}
              className="text-2xl font-black text-unri-green-700 tabular-nums"
              showDelta
              deltaColorClass="text-unri-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
