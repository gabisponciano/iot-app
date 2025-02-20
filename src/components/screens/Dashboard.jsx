import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Dashboard = ({
  heartbeat,
  heartbeatData,
  temperature,
  temperatureData,
  oximetry,
  oximetryData,
  timeData,
  ageRange,
}) => {
  const [name, setName] = useState("Usuário");
  const smoothingWindow = 5;

  // Estados para armazenar as últimas 5 medições
  const heartbeatHistory = useRef([]);
  const temperatureHistory = useRef([]);
  const oximetryHistory = useRef([]);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const calculateMovingAverage = (data, windowSize) => {
    if (data.length < windowSize) return data;
    return data.map((_, index) => {
      if (index < windowSize - 1) return data[index];
      const window = data.slice(index - windowSize + 1, index + 1);
      return window.reduce((acc, value) => acc + value, 0) / windowSize;
    });
  };

  const smoothedHeartbeatData = calculateMovingAverage(
    heartbeatData,
    smoothingWindow
  );
  const smoothedTemperatureData = calculateMovingAverage(
    temperatureData,
    smoothingWindow
  );
  const smoothedOximetryData = calculateMovingAverage(
    oximetryData,
    smoothingWindow
  );

  const generateChartData = (label, data, borderColor, backgroundColor) => ({
    labels: timeData,
    datasets: [
      {
        label,
        data,
        borderColor,
        backgroundColor,
        fill: true,
        tension: 0.4,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { ticks: { autoSkip: true, maxTicksLimit: 10 } } },
  };

  const getHeartbeatThreshold = () => {
    // Ajusta as faixas conforme o ageRange
    if (ageRange === 0) return 140;
    if (ageRange === 2) return 110;
    return 120;
  };
  useEffect(() => {
    heartbeatHistory.current = [
      ...heartbeatHistory.current.slice(-4),
      heartbeat,
    ];
    temperatureHistory.current = [
      ...temperatureHistory.current.slice(-4),
      temperature,
    ];
    oximetryHistory.current = [...oximetryHistory.current.slice(-4), oximetry];

    const ageThreshold = getHeartbeatThreshold();

    // Verifica se TODAS as últimas 5 medições atendem aos critérios de alerta
    const isShockCondition =
      heartbeatHistory.current.every((hb) => hb >= ageThreshold) &&
      temperatureHistory.current.every((temp) => temp < 30 || temp > 36) &&
      oximetryHistory.current.every((ox) => ox < 90);

    const isHeatStrokeCondition =
      heartbeatHistory.current.every((hb) => hb >= ageThreshold) &&
      temperatureHistory.current.every((temp) => temp > 37);

    const isHypoxiaCondition =
      oximetryHistory.current.every((ox) => ox < 90) &&
      heartbeatHistory.current.every((hb) => hb >= ageThreshold) &&
      temperatureHistory.current.every((temp) => temp > 37);

    try {
      toast.dismiss();

      if (isShockCondition) {
        toast.error(
          "⚠️ Risco de Emergência! Possível choque. Procure ajuda imediata!",
          { autoClose: 5000 }
        );
      }

      if (isHeatStrokeCondition) {
        toast.error(
          "⚠️ Emergência! Sinais de golpe de calor. Procure ajuda imediata!",
          { autoClose: 5000 }
        );
      }

      if (isHypoxiaCondition) {
        toast.warning(
          "⚠️ Atenção! Possível hipóxia detectada. Procure ajuda imediata!",
          { autoClose: 5000 }
        );
      }
    } catch (error) {
      console.error("Toast error:", error);
    }
  }, [heartbeat, temperature, oximetry, ageRange]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <ToastContainer closeOnClick pauseOnFocusLoss={false} />

      <div className="text-3xl font-bold text-red-800 text-center">
        Olá, {name}! 👋
      </div>
      <p className="text-gray-600 text-lg mt-2">
        Bem-vindo ao seu SafeSense Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
        {[
          {
            label: "Heartbeat",
            value: heartbeat,
            unit: "BPM",
            color: "red-600",
          },
          {
            label: "Temperatura",
            value: temperature,
            unit: "°C",
            color: "orange-500",
          },
          { label: "Oximetry", value: oximetry, unit: "%", color: "teal-500" },
        ].map(({ label, value, unit, color }, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg p-6 rounded-lg border-l-4 border-${color} text-center`}
          >
            <h3 className="text-xl font-semibold text-gray-700">{label}</h3>
            <p className={`text-4xl font-bold text-${color} mt-2`}>
              {value !== false ? `${value} ${unit}` : "Carregando..."}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="w-full h-[350px] flex flex-col gap-3 border-l-4 bg-white rounded-md p-5 shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Batimento Durante o Tempo
          </h3>
          <div className="relative w-full h-full">
            <Line
              data={generateChartData(
                "Heartbeat (BPM)",
                smoothedHeartbeatData,
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 0.2)"
              )}
              options={chartOptions}
            />
          </div>
        </div>
        <div className="w-full h-[350px] flex flex-col gap-3 border-l-4 bg-white rounded-md p-5 shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Temperatura Durante o Tempo
          </h3>
          <div className="relative w-full h-full">
            <Line
              data={generateChartData(
                "Temperature (°C)",
                smoothedTemperatureData,
                "rgba(255, 159, 64, 1)",
                "rgba(255, 159, 64, 0.2)"
              )}
              options={chartOptions}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 w-full max-w-3xl flex justify-center">
        <div className="w-full h-[350px] flex flex-col gap-3 border-l-4 bg-white rounded-md p-5 shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Oximetria Durante o Tempo
          </h3>
          <div className="relative w-full h-full">
            <Line
              data={generateChartData(
                "Oximetry (%)",
                smoothedOximetryData,
                "rgba(75, 192, 192, 1)",
                "rgba(75, 192, 192, 0.2)"
              )}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
