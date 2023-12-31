import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";
import NavBar from "../components/NavBar";
import CreateModal from "../components/modals/CreateModal";
import DeleteModal from "../components/modals/DeleteModal";

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateButtonClick = () => {
    setShowCreateModal(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://127.0.0.1:5000/@me");
        setUser(resp.data);
      } catch (error) {
        window.location.href = "/login";
      }
    })();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <div className="container mx-auto p-8 mt-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Registros</h1>
        
        <button
          className="bg-green-600 text-white py-1 px-2 rounded mb-4"
          onClick={handleCreateButtonClick}
        >
          Crear registro
        </button>
        {showCreateModal && <CreateModal />}
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4">Número de factura</th>
              <th className="py-2 px-4">Receptor</th>
              <th className="py-2 px-4">Creador</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 text-center">1</td>
              <td className="py-2 px-4 text-center">Product 1</td>
              <td className="py-2 px-4 text-center">John Doe</td>
              <td className="py-2 px-4 text-center">
                <button className="bg-indigo-600 text-white py-1 px-2 rounded mr-2">
                  Detalles
                </button>
                <button className="bg-yellow-600 text-white py-1 px-2 rounded mr-2">
                  Editar
                </button>
                <button className="bg-red-600 text-white py-1 px-2 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
