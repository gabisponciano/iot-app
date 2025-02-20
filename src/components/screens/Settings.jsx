import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Settings({
  name,
  setName,
  email,
  setEmail,
  address,
  setAddress,
  phone,
  setPhone,
  sex,
  setSex,
  ageRange,
  setAgeRange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado temporário para edição
  const [tempData, setTempData] = useState({
    name,
    email,
    address,
    phone,
    sex,
    ageRange,
  });

  const validateForm = () => {
    if (
      !tempData.name.trim() ||
      !tempData.email.trim() ||
      !tempData.address.trim() ||
      !tempData.phone.trim() ||
      tempData.sex === "" ||
      tempData.ageRange === ""
    ) {
      toast.error("Todos os campos devem ser preenchidos.");
      return false;
    }

    // Validação de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempData.email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Aplicar as mudanças aos estados principais
    setName(tempData.name);
    setEmail(tempData.email);
    setAddress(tempData.address);
    setPhone(tempData.phone);
    setSex(tempData.sex);
    setAgeRange(tempData.ageRange);

    toast.success("Configurações salvas com sucesso!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <ToastContainer position="bottom-left" autoClose={5000} />
      <h3 className="text-4xl font-bold text-red-800 text-center mb-6">
        Perfil do Usuário
      </h3>
      <section className="relative bg-white py-8 antialiased md:py-8 w-full max-w-3xl rounded-lg shadow-lg p-8">
        {/* Ícone de editar */}
        <button
          onClick={() => {
            setTempData({ name, email, address, phone, sex, ageRange }); // Resetar os valores ao abrir
            setIsModalOpen(true);
          }}
          className="absolute top-4 right-4 bg-red-600 py-2 px-3 rounded-md hover:bg-red-700 transition-all duration-500 ease-in-out"
        >
          <i className="fa-solid fa-pencil text-xl text-white"></i>
        </button>

        <div className="flex items-center space-x-4">
          <div>
            <span className="mb-2 inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              PRO Account
            </span>
            <h2 className="text-xl font-bold leading-none text-gray-900 sm:text-2xl">
              {name}
            </h2>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
          <div>
            <dt className="font-semibold text-gray-900">Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Endereço</dt>
            <dd>{address}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Telefone</dt>
            <dd>{phone}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Sexo</dt>
            <dd>
              {sex === 0
                ? "Feminino"
                : sex === 1
                ? "Masculino"
                : "Não informado"}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Faixa Etária</dt>
            <dd>
              {ageRange === 0
                ? "8 - 17 anos"
                : ageRange === 1
                ? "18 - 65 anos"
                : "65+ anos"}
            </dd>
          </div>
        </dl>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg animate-scale-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Editar Perfil
            </h2>
            <label className="block text-gray-600 font-medium mb-1">Nome</label>
            <input
              type="text"
              value={tempData.name}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            />
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={tempData.email}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            />
            <label className="block text-gray-600 font-medium mb-1">
              Endereço
            </label>
            <input
              type="text"
              value={tempData.address}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, address: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            />
            <label className="block text-gray-600 font-medium mb-1">
              Telefone
            </label>
            <input
              type="tel"
              value={tempData.phone}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            />
            <label className="block text-gray-600 font-medium mb-1">Sexo</label>
            <select
              value={tempData.sex}
              onChange={(e) =>
                setTempData((prev) => ({
                  ...prev,
                  sex: Number(e.target.value),
                }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value="">Selecione</option>
              <option value={0}>Feminino</option>
              <option value={1}>Masculino</option>
            </select>
            <label className="block text-gray-600 font-medium mb-1">
              Faixa Etária
            </label>
            <select
              value={tempData.ageRange}
              onChange={(e) =>
                setTempData((prev) => ({
                  ...prev,
                  ageRange: Number(e.target.value),
                }))
              }
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value={0}>8 - 17 anos</option>
              <option value={1}>18 - 65 anos</option>
              <option value={2}>65+ anos</option>
            </select>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
