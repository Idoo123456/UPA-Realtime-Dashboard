import { Bar } from "react-chartjs-2";
import { useLibraryStore } from "../../store/useLibraryStore";
import { formatNumber } from "../../utils/formatters";
import { GraduationCap, Award } from "lucide-react";
import type { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";

export function AcademicWorkChart({ isActive = true }: { isActive?: boolean }) {
  const s = useLibraryStore((st) => st.stats);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setChartKey((prev) => prev + 1);
    }
  }, [isActive]);

  const categories = [
    { label: "Tugas Akhir/D3", value: s.ta_d3, color: "#16a34a" },
    { label: "Skripsi", value: s.skripsi_s1, color: "#ca8a04" },
    { label: "Tesis", value: s.tesis_s2, color: "#0ea5e9" },
    { label: "Disertasi", value: s.disertasi_s3, color: "#7c3aed" },
  ];

  const maxVal = Math.max(...categories.map((c) => c.value), 1);
  const values = categories.map((c) => c.value);

  const data: ChartData<"bar"> = {
    labels: categories.map((c) => c.label),
    datasets: [
      {
        label: "Jumlah",
        data: values,
        backgroundColor: categories.map((c) => c.color),
        borderRadius: 10,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.75,
      },
    ],
  };

  const yMax = Math.ceil((maxVal * 1.25) / 2) * 2;
  const opts: ChartOptions<"bar"> = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      y: {
        duration: 800,
        easing: "easeOutQuart",
        delay: (context: any) => {
          if (context.type === "data") {
            return 500 + context.dataIndex * 300; // 500ms base + 300ms per bar stagger
          }
          return 0;
        },
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#78350f",
        titleFont: { size: 13, family: "'Plus Jakarta Sans', Poppins, sans-serif", weight: 700 },
        bodyFont: { size: 12, family: "'Plus Jakarta Sans', Poppins, sans-serif" },
        padding: 12,
        cornerRadius: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 9, family: "'Plus Jakarta Sans', Poppins, sans-serif", weight: 600 },
          color: "#166534",
          maxRotation: 0,
          autoSkip: false,
        },
        border: { color: "#bbf7d0" },
      },
      y: {
        beginAtZero: true,
        max: yMax,
        ticks: {
          stepSize: maxVal > 8 ? 4 : 2,
          precision: 0,
          font: { size: 10, family: "'Plus Jakarta Sans', Poppins, sans-serif", weight: 500 },
          color: "#4b5563",
        },
        grid: { color: "rgba(22, 163, 74, 0.08)" },
        border: { color: "#bbf7d0" },
      },
    },
  };

  return (
    <div className="chart-card h-full animate-fade-in" style={{ animationDelay: "560ms" }}>
      <div className="chart-card-header">
        <div className="h-6 w-1.5 rounded-full bg-unri-yellow-500" />
        <GraduationCap className="h-5 w-5 text-unri-yellow-600" strokeWidth={2.2} />
        <h2 className="font-bold tracking-wide text-unri-green-800 text-sm md:text-base uppercase">
          Penerimaan Karya Ilmiah
        </h2>
        <Award className="h-4 w-4 ml-auto text-unri-yellow-500" />
      </div>
      <div className="flex-1 min-h-0 relative">
        <Bar
          key={chartKey}
          data={data}
          options={opts}
          plugins={[
            {
              id: "academicValueLabels",
              afterDatasetsDraw: (chart) => {
                const { ctx, scales } = chart;
                if (!scales.x || !scales.y) return;
                ctx.save();
                ctx.font = "bold 13px 'Plus Jakarta Sans', Poppins, sans-serif";
                ctx.fillStyle = "#78350f";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                const ds = chart.getDatasetMeta(0);
                ds.data.forEach((el, i) => {
                  const bar = el as unknown as { x: number; y: number; base: number };
                  const val = values[i];
                  if (val <= 0) return;
                  ctx.fillText(formatNumber(val), bar.x, bar.y - 4);
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
