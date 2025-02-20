"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/screens/Dashboard";
import Settings from "../components/screens/Settings";
import Info from "../components/screens/Info";
import History from "../components/screens/History";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../components/Header";

const Home = () => {
  const [screen, setScreen] = useState(0);

  const [heartbeatData, setHeartbeatData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [oximetryData, setOximetryData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  const [heartbeat, setHeartbeat] = useState(false);
  const [temperature, setTemperature] = useState(false);
  const [oximetry, setOximetry] = useState(false);

  const [historyData, setHistoryData] = useState([]);

  const [sex, setSex] = useState(localStorage.getItem("sex") || 0);
  const [ageRange, setAgeRange] = useState(
    localStorage.getItem("ageRange") || 1
  );
  const [name, setName] = useState(
    localStorage.getItem("name") || "Gabriela Ponciano"
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") || "gabriela.ponciano@yahoo.com.br"
  );
  const [address, setAddress] = useState(
    localStorage.getItem("address") || "Deti 725"
  );
  const [phone, setPhone] = useState(
    localStorage.getItem("phone") || "4002-8922"
  );

  useEffect(() => {
    localStorage.setItem("sex", sex);
    localStorage.setItem("ageRange", ageRange);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
    localStorage.setItem("phone", phone);
  }, [sex, ageRange, name, email, address, phone]);

  const fetchLatestSensorData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8000/sensors/latest")
        .then(({ data }) => data);
      console.log(response);
      if (response.data) {
        setHeartbeat(response.data.heartbeat);
        setTemperature(response.data.temperature);
        setOximetry(response.data.oximetry); // Update oximetry data

        // Add new data to the arrays for history
        setHeartbeatData((prevData) => [...prevData, response.data.heartbeat]);
        setTemperatureData((prevData) => [
          ...prevData,
          response.data.temperature,
        ]);
        setOximetryData((prevData) => [...prevData, response.data.oximetry]); // Update oximetry history

        // Add a new timestamp for the timeData
        const currentTime = new Date().toLocaleTimeString();
        setTimeData((prevData) => [...prevData, currentTime]);
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };
  const fetchHistoryData = async () => {
    try {
      const res = await axios
        .get("http://localhost:8000/sensors")
        .then(({ data }) => data);
      console.log(res.data);
      setHistoryData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to update data periodically
  useEffect(() => {
    fetchLatestSensorData();

    const interval = setInterval(() => {
      fetchLatestSensorData();
      fetchHistoryData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full h-auto flex`}>
      <div className="w-full h-full dark:bg-slate-900 duration-500 ease-in-out">
        <Sidebar screen={screen} setScreen={setScreen} />
        <Header setScreen={setScreen} name={name} email={email} />
        {screen === 0 && (
          <Dashboard
            heartbeatData={heartbeatData}
            heartbeat={heartbeat}
            temperatureData={temperatureData}
            temperature={temperature}
            oximetryData={oximetryData}
            oximetry={oximetry}
            timeData={timeData}
          />
        )}
        {screen === 1 && (
          <Settings
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            address={address}
            setAddress={setAddress}
            phone={phone}
            setPhone={setPhone}
            sex={sex}
            setSex={setSex}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
          />
        )}
        {screen === 2 && <History historyData={historyData} />}
        {screen === 3 && <Info />}
      </div>
    </div>
  );
};

export default Home;
