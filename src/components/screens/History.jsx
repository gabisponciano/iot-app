import React, { useState, useEffect } from "react";
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

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  // Recupera os dados históricos do localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("healthHistory")) || [];
    setHistoryData(savedHistory);
  }, []);

  // Função para calcular a média dos valores de um dia
  const calculateAverages = (data) => {
    const averages = data.map((day) => ({
      date: day.date,
      avgHeartbeat: day.heartbeats.reduce((a, b) => a + b, 0) / day.heartbeats.length,
      avgTemperature: day.temperatures.reduce((a, b) => a + b, 0) / day.temperatures.length,
    }));
    return averages;
  };

  const averages = calculateAverages(historyData);

  // Dados para o gráfico
  const chartData = {
    labels: averages.map((day) => day.date),
    datasets: [
      {
        label: "Média de Batimento Cardíaco (BPM)",
        data: averages.map((day) => day.avgHeartbeat),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Média de Temperatura (°C)",
        data: averages.map((day) => day.avgTemperature),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Histórico de Saúde",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-800 text-center mb-6">Histórico de Saúde</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Line data={chartData} options={options} />
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Médias Diárias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {averages.map((day, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700">{day.date}</h3>
                <p className="text-gray-600">Batimento Cardíaco Médio: {day.avgHeartbeat.toFixed(2)} BPM</p>
                <p className="text-gray-600">Temperatura Média: {day.avgTemperature.toFixed(2)}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;