import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [heartbeat, setHeartbeat] = useState(85);
  const [temperature, setTemperature] = useState(33);
  const [name, setName] = useState("Usuário");

  // Recupera o nome salvo nas configurações do localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  // Função para gerar valores aleatórios dentro de um intervalo
  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  // Atualiza os valores a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartbeat = getRandomValue(60, 100);
      const newTemperature = getRandomValue(30, 38);
      setHeartbeat(newHeartbeat);
      setTemperature(newTemperature);

      // Salva os dados diários no localStorage
      const today = new Date().toLocaleDateString();
      const savedHistory = JSON.parse(localStorage.getItem("healthHistory")) || [];
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Header */}
      <div className="text-3xl font-bold text-red-800 dark:text-white text-center">
        Olá, {name}! 👋
      </div>
      <p className="text-gray-600 text-lg mt-2">Bem-vindo ao seu Healthcare Dashboard</p>

      {/* Dashboard Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 w-full max-w-3xl">
        {/* Heartbeat */}
        <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-red-600 text-center w-72">
          <h3 className="text-xl font-semibold text-gray-700">Heartbeat</h3>
          <p className="text-4xl font-bold text-red-600 mt-2">{heartbeat} BPM</p>
        </div>

        {/* Temperatura */}
        <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-orange-500 text-center w-72">
          <h3 className="text-xl font-semibold text-gray-700">Temperatura</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">{temperature}°C</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;