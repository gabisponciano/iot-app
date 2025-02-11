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

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [heartbeat, setHeartbeat] = useState(85);
  const [temperature, setTemperature] = useState(33);
  const [name, setName] = useState("Usuário");
  const [heartbeatData, setHeartbeatData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [timeData, setTimeData] = useState([]); // Store timestamps

  // Smoothing window size
  const smoothingWindow = 5; // The number of data points to average

  // Recupera o nome salvo nas configurações do localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  // Função para gerar valores aleatórios dentro de um intervalo
  const getRandomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  // Smoothing function (Moving Average)
  const calculateMovingAverage = (data, windowSize) => {
    if (data.length < windowSize) return data;
    return data.map((_, index) => {
      if (index < windowSize - 1) return data[index]; // Not enough data to average yet
      const window = data.slice(index - windowSize + 1, index + 1); // Get last n elements
      const sum = window.reduce((acc, value) => acc + value, 0);
      return sum / windowSize; // Return average
    });
  };

  // Atualiza os valores a cada 1 segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartbeat = getRandomValue(60, 100);
      const newTemperature = getRandomValue(30, 38);
      const currentTime = new Date().toLocaleTimeString(); // Get current time

      setHeartbeat(newHeartbeat);
      setTemperature(newTemperature);

      // Update heartbeat and temperature data arrays for the graph
      setHeartbeatData((prevData) => [...prevData, newHeartbeat]);
      setTemperatureData((prevData) => [...prevData, newTemperature]);

      // Add current time to the timeData array
      setTimeData((prevData) => [...prevData, currentTime]);

      // Salva os dados diários no localStorage
      const today = new Date().toLocaleDateString();
      const savedHistory =
        JSON.parse(localStorage.getItem("healthHistory")) || [];
      const todayData = savedHistory.find((day) => day.date === today);

      if (todayData) {
        todayData.heartbeats.push(newHeartbeat);
        todayData.temperatures.push(newTemperature);
      } else {
        savedHistory.push({
          date: today,
          heartbeats: [newHeartbeat],
          temperatures: [newTemperature],
        });
      }

      localStorage.setItem("healthHistory", JSON.stringify(savedHistory));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Apply smoothing to heartbeat and temperature data
  const smoothedHeartbeatData = calculateMovingAverage(
    heartbeatData,
    smoothingWindow
  );
  const smoothedTemperatureData = calculateMovingAverage(
    temperatureData,
    smoothingWindow
  );

  // Data for the heartbeat chart
  const heartbeatChartData = {
    labels: timeData, // Use timeData for the x-axis
    datasets: [
      {
        label: "Heartbeat (BPM)",
        data: smoothedHeartbeatData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Data for the temperature chart
  const temperatureChartData = {
    labels: timeData, // Use timeData for the x-axis
    datasets: [
      {
        label: "Temperature (°C)",
        data: smoothedTemperatureData,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options to limit x-axis labels
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow flexible resizing
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Header */}
      <div className="text-3xl font-bold text-red-800 dark:text-white text-center">
        Olá, {name}! 👋
      </div>
      <p className="text-gray-600 text-lg mt-2">
        Bem-vindo ao seu Healthcare Dashboard
      </p>

      {/* Dashboard Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 w-full max-w-3xl">
        {/* Heartbeat */}
        <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-red-600 text-center w-72">
          <h3 className="text-xl font-semibold text-gray-700">Heartbeat</h3>
          <p className="text-4xl font-bold text-red-600 mt-2">
            {heartbeat} BPM
          </p>
        </div>

        {/* Temperature */}
        <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-orange-500 text-center w-72">
          <h3 className="text-xl font-semibold text-gray-700">Temperatura</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">
            {temperature}°C
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 w-full max-w-3xl flex flex-col md:flex-row gap-5 items-center justify-center">
        {/* Heartbeat Chart */}
        <div className="w-full min-w-[300px] sm:min-w-[500px] lg:min-w-[800px] min-h-[300px] h-auto flex flex-col gap-3 border-l-4 border-red-600 bg-white rounded-md p-5 shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Heartbeat Over Time
          </h3>
          <div className="relative w-full h-[300px]">
            <Line data={heartbeatChartData} options={chartOptions} />
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="w-full min-w-[300px] sm:min-w-[500px] lg:min-w-[800px] min-h-[300px] h-auto flex flex-col gap-3 border-l-4 border-orange-500 bg-white rounded-md p-5 shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Temperature Over Time
          </h3>
          <div className="relative w-full h-[300px]">
            <Line data={temperatureChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
