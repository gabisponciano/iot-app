import React from "react";

const Info = () => {
  const healthData = [
    { "range": "8-17 anos", "bpm": "80-100 bpm", "temp": "32.5°C - 35.0°C", "oximetria": "97% - 100%" },
    { "range": "Sexo Feminino de 18-65 anos", "bpm": "70-80 bpm", "temp": "30.0°C - 33.0°C", "oximetria": "95% - 99%" },
    { "range": "Sexo Masculino de 18-65 anos", "bpm": "67-87 bpm", "temp": "31.0°C - 34.0°C", "oximetria": "95% - 99%" },
    { "range": "65+ anos", "bpm": "50-70 bpm", "temp": "29.5°C - 33.0°C", "oximetria": "94% - 98%" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 w-full max-w-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">Informações de Saúde em Repouso</h2>

        {/* Faixas etárias */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">Frequência Cardíaca, Temperatura e Oximetria</h3>
          {healthData.map((item, index) => (
            <div key={index} className="p-3 sm:p-4 mb-2 border rounded-lg bg-gray-50 text-center">
              <p className="text-gray-800 font-medium">Categoria: {item.range}</p>
              <p className="text-red-600">Batimentos: {item.bpm}</p>
              <p className="text-orange-600">Temperatura: {item.temp}</p>
              <p className="text-teal-600">Oximetria: {item.oximetria}</p>
            </div>
          ))}
        </div>

        {/* Contato de emergência */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Emergência</h3>
          <p className="text-gray-800">Caso não esteja se sentindo bem, entre em contato com um profissional de saúde.</p>
          <p className="text-lg font-bold text-red-600 mt-2">☎ 192 - Serviço de Emergência</p>
        </div>

        {/* Aviso */}
        <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-500 text-center">
          <p className="text-yellow-700 font-medium">⚠️ Importante:</p>
          <p className="text-gray-700 text-sm">
            Este aplicativo tem o intuito de alertar possíveis riscos de saúde, mas não substitui um diagnóstico médico. Sempre consulte um profissional da saúde em caso de dúvidas ou sintomas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
