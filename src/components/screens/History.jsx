import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const History = ({ historyData }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interval, setInterval] = useState("hour"); // Default to 'hour'

  const today = new Date().toISOString().split("T")[0];

  const groupData = (data) => {
    const grouped = {};

    data.forEach((entry) => {
      const dateObj = new Date(entry.timestamp * 1000);
      let key;

      // Grouping based on selected interval
      switch (interval) {
        case "hour":
          key = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          break;
        case "day":
          key = dateObj.toISOString().split("T")[0]; // Group by day (YYYY-MM-DD)
          break;
        case "week":
          const startOfWeek = new Date(
            dateObj.setDate(dateObj.getDate() - dateObj.getDay())
          );
          key = startOfWeek.toISOString().split("T")[0]; // Group by week start date
          break;
        case "month":
          key = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`; // Group by month (YYYY-MM)
          break;
        default:
          key = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
      }

      if (!grouped[key]) {
        grouped[key] = { heartbeats: [], temperatures: [], oximetries: [] };
      }
      grouped[key].heartbeats.push(entry.heartbeat);
      grouped[key].temperatures.push(entry.temperature);
      if (entry.oximetry) grouped[key].oximetries.push(entry.oximetry);
    });

    return Object.keys(grouped).map((key) => {
      const { heartbeats, temperatures, oximetries } = grouped[key];
      return {
        key,
        avgHeartbeat: heartbeats.reduce((a, b) => a + b, 0) / heartbeats.length,
        avgTemperature:
          temperatures.reduce((a, b) => a + b, 0) / temperatures.length,
        avgOximetry:
          oximetries.length > 0
            ? oximetries.reduce((a, b) => a + b, 0) / oximetries.length
            : null,
      };
    });
  };

  const filteredData = historyData.filter((entry) => {
    const entryDate = new Date(entry.timestamp * 1000)
      .toISOString()
      .split("T")[0];
    return (
      (!startDate && entryDate === today) ||
      (!endDate && entryDate === today) ||
      (startDate && entryDate >= startDate && endDate && entryDate <= endDate)
    );
  });

  const averages = groupData(filteredData);

  const chartData = {
    labels: averages.map((data) => data.key),
    datasets: [
      {
        label: "Média de Batimento Cardíaco (BPM)",
        data: averages.map((data) => data.avgHeartbeat),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Média de Temperatura (°C)",
        data: averages.map((data) => data.avgTemperature),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Média de Oximetria (%)",
        data: averages.map((data) => data.avgOximetry),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h3 className="text-4xl font-bold text-red-800 text-center mb-6">
        Histórico de Saúde
      </h3>

      {/* Date Filter */}
      <div className="mb-6 flex gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 shadow-md rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 shadow-md rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
        />
      </div>

      {/* Interval Dropdown */}
      <div className="mb-6">
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="p-2 shadow-md rounded-md focus:outline-none focus:ring-0 focus:border-transparent"
        >
          <option value="hour">Hora</option>
          <option value="day">Dia</option>
          <option value="week">Semana</option>
          <option value="month">Mês</option>
        </select>
      </div>

      {/* Chart */}
      <div className="max-w-4xl relative w-full h-[450px] bg-white p-5 shadow-md rounded-md border-l-4 border-red-800">
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default History;
