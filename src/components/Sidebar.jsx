import React, { useState } from "react";

const Sidebar = ({ screen, setScreen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button (Works on All Screens) */}
      <button
        className="fixed top-5 left-5 z-50 flex items-center justify-center w-14 h-14 bg-red-800 text-white rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-bars text-xl"></i>
      </button>

      {/* Sidebar (Completely Hidden When Closed) */}
      <aside
        className={`fixed top-0 left-0 h-full bg-red-800 text-white shadow-xl flex flex-col text-lg font-medium justify-center transition-all duration-500 z-50 
        ${isOpen ? "w-3/5 sm:w-1/4 lg:w-[15%]" : "w-0"} overflow-hidden`}
      >
        <div className="w-full flex flex-col gap-1 items-center justify-center">
          {/* Dashboard */}
          <div
            className={`flex gap-3 w-3/4 px-4 py-3 items-center rounded-lg hover:shadow-md cursor-pointer transition-all duration-300 ${
              screen === 0 ? "bg-red-500" : ""
            }`}
            onClick={() => {
              setScreen(0);
              setIsOpen(false);
            }}
          >
            <i className="fa-solid fa-gauge"></i>
            <span>Dashboard</span>
          </div>

          {/* Settings */}
          <div
            className={`flex gap-3 w-3/4 px-4 py-3 items-center rounded-lg hover:shadow-md cursor-pointer transition-all duration-300 ${
              screen === 1 ? "bg-red-500" : ""
            }`}
            onClick={() => {
              setScreen(1);
              setIsOpen(false);
            }}
          >
            <i className="fa-solid fa-gear"></i>
            <span>Settings</span>
          </div>

          {/* History */}
          <div
            className={`flex gap-3 w-3/4 px-4 py-3 items-center rounded-lg hover:shadow-md cursor-pointer transition-all duration-300 ${
              screen === 2 ? "bg-red-500" : ""
            }`}
            onClick={() => {
              setScreen(2);
              setIsOpen(false);
            }}
          >
            <i className="fa-solid fa-history"></i>
            <span>History</span>
          </div>

          {/* Info */}
          <div
            className={`flex gap-3 w-3/4 px-4 py-3 items-center rounded-lg hover:shadow-md cursor-pointer transition-all duration-300 ${
              screen === 3 ? "bg-red-500" : ""
            }`}
            onClick={() => {
              setScreen(3);
              setIsOpen(false);
            }}
          >
            <i className="fa-solid fa-circle-info"></i>
            <span>Info</span>
          </div>
        </div>
      </aside>

      {/* Background Overlay (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
