"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/screens/Dashboard";
import Settings from "../components/screens/Settings";
import Info from "../components/screens/Info";
import History from "../components/screens/History";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [mode, setMode] = useState(false);
  const [screen, setScreen] = useState(0);

  const getMode = () => {
    if (localStorage.mode == "true") {
      setMode(true);
    }
  };
  useEffect(() => {
    getMode();
  }, []);

  return (
    <div className={`w-full h-auto flex  ${mode ? "dark" : ""}`}>
      <div className="w-full h-full dark:bg-slate-900 duration-500 ease-in-out">
        <ToastContainer position="bottom-left" autoClose={5000} />
        <Sidebar
          mode={mode}
          setMode={setMode}
          screen={screen}
          setScreen={setScreen}
        />
        {screen == 0 && <Dashboard />}
        {screen == 1 && <Settings />}
        {screen == 2 && <History />}
        {screen == 3 && <Info />}
      </div>
    </div>
  );
};

export default Home;
