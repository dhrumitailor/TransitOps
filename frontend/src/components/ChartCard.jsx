import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ChartCard() {
  const data = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ],

    datasets: [
      {
        label: "Trips",
        data: [8, 12, 10, 15, 18, 11],
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="card shadow-sm p-4">

      <h5 className="mb-4">
        Weekly Trips
      </h5>

      <Bar data={data} />

    </div>
  );
}

export default ChartCard;