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

export function TransactionInfoCard() {
  const stats = useLibraryStore((s) => s.stats);

  const rows = [
    {
      label: "Total Peminjaman",
      value: stats.total_borrowing_all,
      icon: ArrowUpCircle,
      valueColor: "text-unri-yellow-600",
    },
    {
      label: "Total Pengembalian",
      value: stats.total_returning_all,
      icon: ArrowDownCircle,
      valueColor: "text-unri-yellow-600",
    },
    {
      label: "Total Perpanjangan",
      value: stats.total_extension_all,
      icon: RefreshCw,
      valueColor: "text-unri-yellow-600",
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

  return (
    <div className="kpi-card flex flex-col animate-fade-in h-full" style={{ animationDelay: "240ms" }}>
      <div className="kpi-card-header shrink-0">
        <div className="h-6 w-1.5 rounded-full bg-unri-red-500" />
        <ArrowRightLeft className="h-5 w-5 text-unri-red-600" strokeWidth={2.2} />
        <span className="kpi-title text-unri-red-700 tracking-wider">
          TOTAL TRANSAKSI S.D. HARI INI
        </span>
      </div>

      <div className="flex-1 p-2 overflow-hidden min-h-0 flex flex-col gap-1.5 justify-around">
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
      </div>
    </div>
  );
}
