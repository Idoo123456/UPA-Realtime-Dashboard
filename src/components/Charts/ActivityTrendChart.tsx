import { Line } from "react-chartjs-2";
import { useLibraryStore } from "../../store/useLibraryStore";
import { HOURLY_LABELS } from "../../types";
import { buildLineChartOptions } from "../../utils/chartConfig";
import { Activity, TrendingUp } from "lucide-react";
import type { ChartData } from "chart.js";
import { useEffect, useState } from "react";

export function ActivityTrendChart({ isActive = true }: { isActive?: boolean }) {
  const s = useLibraryStore((st) => st.stats);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setChartKey((prev) => prev + 1);
    }
  }, [isActive]);

  const data: ChartData<"line"> = {
    labels: HOURLY_LABELS,
    datasets: [
      {
        label: "Pengunjung",
        data: s.hourly_visitors,
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.18)",
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#16a34a",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Peminjaman",
        data: s.hourly_borrowing,
        borderColor: "#ca8a04",
        backgroundColor: "rgba(202, 138, 4, 0.14)",
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#ca8a04",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pengembalian",
        data: s.hourly_returning,
        borderColor: "#dc2626",
        backgroundColor: "rgba(220, 38, 38, 0.1)",
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#dc2626",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Administrasi",
        data: s.hourly_administration,
        borderColor: "#0f766e",
        backgroundColor: "rgba(15, 118, 110, 0.1)",
        borderWidth: 2.5,
        borderDash: [5, 4],
        pointRadius: 3,
        pointBackgroundColor: "#0f766e",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const maxY = Math.max(
    Math.max(...s.hourly_visitors),
    Math.max(...s.hourly_borrowing),
    Math.max(...s.hourly_returning),
    Math.max(...s.hourly_administration),
  );
  const yCeil = Math.ceil((maxY + 10) / 15) * 15;

  return (
    <div className="chart-card h-full animate-fade-in" style={{ animationDelay: "320ms" }}>
      <div className="chart-card-header">
        <div className="h-6 w-1.5 rounded-full bg-unri-green-500" />
        <TrendingUp className="h-5 w-5 text-unri-green-700" strokeWidth={2.2} />
        <h2 className="font-bold tracking-wide text-unri-green-800 text-sm md:text-base uppercase">
          Tren Aktivitas Perpustakaan Hari Ini
        </h2>
        <Activity className="h-4 w-4 ml-auto text-unri-green-500 animate-pulse-slow" />
      </div>
      <div className="flex-1 min-h-0 relative">
        <div className={`absolute inset-0 ${isActive ? 'animate-reveal-right' : 'opacity-0'}`}>
          <Line key={chartKey} data={data} options={buildLineChartOptions(yCeil)} />
        </div>
      </div>
    </div>
  );
}
