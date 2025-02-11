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
  const [screen, setScreen] = useState(0);

  return (
    <div className={`w-full h-auto flex`}>
      <div className="w-full h-full dark:bg-slate-900 duration-500 ease-in-out">
        <ToastContainer position="bottom-left" autoClose={5000} />
        <Sidebar screen={screen} setScreen={setScreen} />
        {screen == 0 && <Dashboard />}
        {screen == 1 && <Settings />}
        {screen == 2 && <History />}
        {screen == 3 && <Info />}
      </div>
    </div>
  );
};

export default Home;
