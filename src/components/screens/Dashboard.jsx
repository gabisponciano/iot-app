import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { alpha, styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import axios from "axios";

const Dashboard = () => {
  const mockData = {
    lampada: { status: false },
    sensor: false,
    Ar_condicionado: { temperatura: 22, status: false },
    Caixa_de_som: { volume: 50, status: false },
  };
  const [lightLoaded, setLightLoaded] = useState(mockData);
  const [soundLoaded, setSoundLoaded] = useState(mockData);
  const [airLoaded, setAirLoaded] = useState(mockData);

  const RedSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: red[800],
      "&:hover": {
        backgroundColor: alpha(red[800], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: red[800],
    },
  }));

  const [lightData, setLightData] = useState(mockData);
  const [soundData, setSoundData] = useState(mockData);
  const [airData, setAirData] = useState(mockData);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return lightLoaded && soundLoaded && airLoaded ? (
    <div className="min-h-screen flex-1 flex flex-col gap-5 pl-20 pr-8 py-5">
      <div className="text-xl text-red-800 font-semibold dark:text-white">
        Dashboard
      </div>

      <div className="bg-white shadow-lg p-6 border rounded-md dark:bg-slate-800">
        <div className="text-red-800 text-lg font-medium">Lâmpada</div>
        <div>Status: {lightData.lampada.status ? "Ligado" : "Desligado"}</div>
        <RedSwitch {...label} checked={lightData.lampada.status} />
      </div>

      <div className="bg-white shadow-lg p-6 border rounded-md dark:bg-slate-800">
        <div className="text-red-800 text-lg font-medium">Temperatura</div>
        <div>Ambiente: {airData.sensor}°C</div>
        <div>Ar-condicionado: {airData.Ar_condicionado.temperatura}°C</div>
        <RedSwitch {...label} checked={airData.Ar_condicionado.status} />
      </div>

      <div className="bg-white shadow-lg p-6 border rounded-md dark:bg-slate-800">
        <div className="text-red-800 text-lg font-medium">Som</div>
        <div>Volume: {soundData.Caixa_de_som.volume}%</div>
        <RedSwitch {...label} checked={soundData.Caixa_de_som.status} />
      </div>
    </div>
  ) : (
    <div>Carregando...</div>
  );
};

export default Dashboard;
