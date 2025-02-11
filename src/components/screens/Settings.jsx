import React, { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("18-25");
  const [distance, setDistance] = useState(10);

  const handleSave = () => {
    // Salvar nome no localStorage
    localStorage.setItem("userName", name);
    // Aqui você pode adicionar outras ações de salvamento se necessário
    alert("Configurações salvas!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editar Perfil</h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
            placeholder="Seu nome"
          />
        </div>

        {/* Sexo */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Sexo</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
          >
            <option value="">Selecione</option>
            <option value="0">Feminino</option>
            <option value="1">Masculino</option>
          </select>
        </div>

        {/* Faixa Etária */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Faixa Etária</label>
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-red-300"
          >
            <option value="0">8 - 17 anos</option>
            <option value="1">18 - 65 anos</option>
            <option value="2">65+ anos</option>
          </select>
        </div>

        {/* Distância no GPS */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Distância Máxima (km)</label>
          <input
            type="range"
            min="1"
            max="100"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full cursor-pointer"
          />
          <p className="text-center text-gray-700 mt-1">{distance} km</p>
        </div>

        {/* Botão de Salvar */}
        <button
          onClick={handleSave}
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Settings;
