import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default function Chart({ data }) {
  const chartData = {
  labels: data.map(d => new Date(d.t).toLocaleDateString()), // fechas
  datasets: [
    {
      label: "Cierre",
      data: data.map(d => d.c),
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4,
    },
    {
      label: "Apertura",
      data: data.map(d => d.o),
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      tension: 0.4,
    }
  ]
};
;

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: { beginAtZero: false, title: { display: true, text: "USD" } },
      x: { title: { display: true, text: "Fecha" } }
    }
  };

  return <Line data={chartData} options={options} />;
}
