import { useLibraryStore } from "../../store/useLibraryStore";
import { AnimatedNumber } from "../UI/AnimatedNumber";
import {
  ArrowRightLeft,
  ArrowUpCircle,
  ArrowDownCircle,
  BookX,
  CircleUserRound,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { buildDonutOptions } from "../../utils/chartConfig";
import type { ChartData } from "chart.js";

export function TransactionInfoCard() {
  const stats = useLibraryStore((s) => s.stats);

  const rows = [
    {
      label: "Total Peminjaman",
      value: stats.total_borrowing_all,
      icon: ArrowUpCircle,
      valueColor: "text-unri-yellow-600",
      color: "#eab308",
    },
    {
      label: "Total Pengembalian",
      value: stats.total_returning_all,
      icon: ArrowDownCircle,
      valueColor: "text-unri-yellow-600",
      color: "#22c55e",
    },
    {
      label: "Total Perpanjangan",
      value: stats.total_extension_all,
      icon: RefreshCw,
      valueColor: "text-unri-yellow-600",
      color: "#3b82f6",
    },
    {
      label: "Buku Dipinjam",
      value: stats.books_currently_borrowed,
      icon: BookX,
      valueColor: "text-unri-green-700",
    },
    {
      label: "Member Pinjam",
      value: stats.members_currently_borrowing,
      icon: CircleUserRound,
      valueColor: "text-unri-green-700",
    },
    {
      label: "Terlambat",
      value: stats.overdue_books,
      icon: AlertTriangle,
      valueColor: "text-unri-red-600",
      isWarning: true,
    },
  ];

  const chartData: ChartData<"doughnut"> = {
    labels: [rows[0].label, rows[1].label, rows[2].label],
    datasets: [{
      data: [rows[0].value, rows[1].value, rows[2].value],
      backgroundColor: [rows[0].color, rows[1].color, rows[2].color],
      borderWidth: 2,
      borderColor: "#fff",
      hoverOffset: 4,
    }]
  };

  const totalTransactions = stats.total_borrowing_all + stats.total_returning_all + stats.total_extension_all;

  return (
    <div className="kpi-card flex flex-col animate-fade-in h-full" style={{ animationDelay: "240ms" }}>
      <div className="kpi-card-header shrink-0">
        <div className="h-6 w-1.5 rounded-full bg-unri-red-500" />
        <ArrowRightLeft className="h-5 w-5 text-unri-red-600" strokeWidth={2.2} />
        <span className="kpi-title text-unri-red-700 tracking-wider">
          TOTAL TRANSAKSI S.D. HARI INI
        </span>
      </div>

      <div className="flex-1 p-2 overflow-hidden min-h-0 flex flex-col gap-1 justify-start">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.label}
              className={`stat-row ${r.isWarning ? "!bg-unri-red-50/60" : ""}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    r.isWarning ? "text-unri-red-500" : "text-unri-green-600"
                  }`}
                />
                <span className="text-sm font-semibold text-gray-700 truncate">{r.label}</span>
              </div>
              <AnimatedNumber
                value={r.value}
                className={`text-lg font-black ${r.valueColor} tabular-nums shrink-0 ml-1`}
                showDelta
                deltaColorClass={r.isWarning ? "text-unri-red-500" : "text-unri-green-500"}
              />
            </div>
          );
        })}

        {/* Visual Graphic to fill space */}
        <div className="mt-auto mb-1 flex-1 min-h-0 flex items-center justify-center relative py-2">
          <div className="w-full h-full relative flex items-center justify-center">
            <Doughnut data={chartData} options={buildDonutOptions()} />
            <div className="donut-center flex flex-col items-center">
              <AnimatedNumber
                value={totalTransactions}
                className="text-xl md:text-2xl font-black text-unri-red-700 tabular-nums leading-none"
              />
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Transaksi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
