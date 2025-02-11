import React, { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const Dashboard = () => {
  // Estados para os valores variáveis
  const [heartbeat, setHeartbeat] = useState(85);
  const [temperature, setTemperature] = useState(33);

  // Função para gerar valores aleatórios dentro de um intervalo
  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  // Efeito para atualizar os valores a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(getRandomValue(60, 100)); // Simula valores entre 60 e 100 BPM
      setTemperature(getRandomValue(30, 38)); // Simula valores entre 30°C e 38°C
    }, 5000);

    return () => clearInterval(interval); // Cleanup do intervalo ao desmontar o componente
  }, []);

  return (
    <div className="min-h-screen flex-1 flex flex-col gap-5 pl-20 pr-8 py-5">
      <div className="text-xl text-red-800 font-semibold dark:text-white md:pr-8 max-md:ml-1">
        Healthcare Dashboard
      </div>

      <div className="flex md:flex-row flex-col gap-4">
        {/* Heartbeat */}
        <div className="bg-red-300 shadow-lg p-6 border rounded-lg dark:bg-slate-800 md:w-[50%] max-md:ml-1">
          <div className="text-white text-xl font-bold">Heartbeat</div>
          <div className="text-2xl font-medium text-red-700">{heartbeat}</div>
        </div>

        {/* Temperatura */}
        <div className="bg-orange-200 shadow-lg p-6 border rounded-lg dark:bg-slate-800 md:w-[50%] max-md:ml-1">
          <div className="text-white text-xl font-bold">Temperature</div>
          <div className="text-2xl font-medium text-orange-600">{temperature}°C</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

