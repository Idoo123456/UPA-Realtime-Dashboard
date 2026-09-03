import { Bar } from "react-chartjs-2";
import { useLibraryStore } from "../../store/useLibraryStore";
import { buildBarChartOptions } from "../../utils/chartConfig";
import { formatNumber } from "../../utils/formatters";
import { BarChart3, Layers } from "lucide-react";
import type { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";

const CLASS_ORDER = [
  "Kelas 000",
  "Kelas 100",
  "Kelas 200",
  "Kelas 300",
  "Kelas 400",
  "Kelas 500",
  "Kelas 600",
  "Kelas 700",
  "Kelas 800",
  "Kelas 900",
];

export function CollectionClassChart({ isActive = true }: { isActive?: boolean }) {
  const s = useLibraryStore((st) => st.stats);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setChartKey((prev) => prev + 1);
    }
  }, [isActive]);

  const labels = CLASS_ORDER.slice().reverse();
  const values = labels.map((k) => s.collection_by_class[k] ?? 0);
  const maxVal = Math.max(...values, 1);

  const barColors = labels.map((k) => {
    if (k === "Kelas 300") return "#ca8a04";
    if (k === "Kelas 600") return "#16a34a";
    const idx = CLASS_ORDER.indexOf(k);
    const grad = 1 - (idx + 1) / (CLASS_ORDER.length + 1);
    return `rgba(22, 163, 74, ${0.35 + 0.45 * grad})`;
  });

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Judul",
        data: values,
        backgroundColor: barColors,
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.85,
        categoryPercentage: 0.9,
      },
    ],
  };

  const baseOpts = buildBarChartOptions(true) as ChartOptions<"bar">;
  const opts: ChartOptions<"bar"> = {
    ...baseOpts,
    scales: {
      x: {
        beginAtZero: true,
        max: Math.ceil(maxVal * 1.12),
        ticks: {
          font: { size: 11, family: "'Plus Jakarta Sans', Poppins, sans-serif", weight: 500 },
          color: "#4b5563",
          callback: (tickValue) => formatNumber(Number(tickValue)) as string,
        },
        grid: { color: "rgba(202, 138, 4, 0.08)" },
        border: { color: "#fde68a" },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { size: 12, family: "'Plus Jakarta Sans', Poppins, sans-serif", weight: 700 },
          color: "#166534",
        },
        border: { color: "#fde68a" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#78350f",
        titleFont: { size: 13, family: "'Plus Jakarta Sans', Poppins, sans-serif", weight: 700 },
        bodyFont: { size: 12, family: "'Plus Jakarta Sans', Poppins, sans-serif" },
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => ` ${formatNumber(Number(ctx.parsed.x))} judul`,
        },
      },
    },
  };

  return (
    <div className="chart-card h-full animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="chart-card-header">
        <div className="h-6 w-1.5 rounded-full bg-unri-yellow-500" />
        <Layers className="h-5 w-5 text-unri-yellow-600" strokeWidth={2.2} />
        <h2 className="font-bold tracking-wide text-unri-green-800 text-sm md:text-base uppercase">
          Judul Buku Berdasarkan Kelas
        </h2>
        <BarChart3 className="h-4 w-4 ml-auto text-unri-yellow-500" />
      </div>
      <div className="flex-1 min-h-0 relative">
        <Bar
          key={chartKey}
          data={data}
          options={opts}
          plugins={[
            {
              id: "valueLabels",
              afterDatasetsDraw: (chart) => {
                const { ctx, scales } = chart;
                if (!scales.x || !scales.y) return;
                ctx.save();
                ctx.font = "bold 11px 'Plus Jakarta Sans', Poppins, sans-serif";
                ctx.fillStyle = "#166534";
                ctx.textBaseline = "middle";
                const ds = chart.getDatasetMeta(0);
                ds.data.forEach((el, i) => {
                  const bar = el as unknown as { x: number; base: number; y: number; width: number };
                  const val = values[i];
                  const txt = formatNumber(val);
                  const xPos = (bar.base ?? 0) + ((bar.x ?? 0) - (bar.base ?? 0)) + 8;
                  ctx.fillText(txt, xPos, bar.y);
                });
                ctx.restore();
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
