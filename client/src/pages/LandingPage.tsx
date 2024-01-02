import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";
import NavBar from "../components/NavBar";
import CreateModal from "../components/modals/CreateModal";
import ReadModal from "../components/modals/ReadModal";
import UpdateModal from "../components/modals/UpdateModal";
import DeleteModal from "../components/modals/DeleteModal";
import dataArray from "./data/data";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);
  
  
  //Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [readModalId, setReadModalId] = useState(null);
  const [updateModalId, setUpdateModalId] = useState(null);

  const handleCreateButtonClick = () => {
    setShowCreateModal(true);
  };

  const handleReadButtonClick = (id: any) => {
    setReadModalId(id);
    setShowReadModal(true);
  };

  const handleUpdateButtonClick = (id: any) => {
    setUpdateModalId(id);
    setShowUpdateModal(true);
  };
  
  const handleDeleteButtonClick = (id: any) => {
    setDeleteModalId(id);
    setShowDeleteModal(true);
  };

  

  

  //Pagination
  const [data, setData] = useState(dataArray);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = React.useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [currentData, setCurrentData] = useState(data.slice(startIndex, endIndex));
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / itemsPerPage));

  const handleClick = (pageNumber: any) => {
      setCurrentData(data.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
      setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentData(data.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <CreateModal showModal={showCreateModal} setShowModal={setShowCreateModal}/>
      <div className="container mx-auto p-8 mt-8 pl-0 pr-0">
        <h1 className="text-4xl font-bold mb-8 text-black">Registros</h1>
        
        <button
          className="bg-green-600 text-white py-1 px-2 rounded mb-4"
          onClick={handleCreateButtonClick}
        >
          Crear registro
        </button>
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4">Número de factura</th>
              <th className="py-2 px-4">Receptor</th>
              <th className="py-2 px-4">Creador</th>
              <th className="py-2 px-4">Fecha</th>
              <th className="py-2 px-4">Tipo de cuenta</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {currentData.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'white' : 'bg-indigo-200'}>  
                <td className="py-2 px-4 text-center">{item.numeroFactura}</td>
                <td className="py-2 px-4 text-center">{item.receptor}</td>
                <td className="py-2 px-4 text-center">{item.creador}</td>
                <td className="py-2 px-4 text-center">{item.fecha}</td>
                <td className="py-2 px-4 text-center">{item.tipoCuenta}</td>
                <td className="py-2 px-4 text-center">
                  <button className="bg-indigo-600 text-white py-1 px-2 rounded mr-2" onClick={() => handleReadButtonClick(item.id)}>
                    Detalles
                  </button>
                  <button className="bg-yellow-600 text-white py-1 px-2 rounded mr-2" onClick={() => handleUpdateButtonClick(item.id)}>
                    Editar
                  </button>
                  <button className="bg-red-600 text-white py-1 px-2 rounded" onClick={() => handleDeleteButtonClick(item.id)}>
                    Eliminar
                  </button>
                  <ReadModal id={index} numeroFactura={item.numeroFactura} receptor={item.receptor} nombreProveedor={item.nombreProveedor} creador={item.creador} importeFactura={item.importeFactura} porcentajeIVA={item.porcentajeIVA} fecha={item.fecha} tipoCuenta={item.tipoCuenta} showModal={(readModalId === item.id) && showReadModal} setShowModal={setShowReadModal}/>
                  <UpdateModal id={index} numeroFactura={item.numeroFactura} receptor={item.receptor} nombreProveedor={item.nombreProveedor} creador={item.creador} importeFactura={item.importeFactura} porcentajeIVA={item.porcentajeIVA} fecha={item.fecha} tipoCuenta={item.tipoCuenta} showModal={(updateModalId === item.id) && showUpdateModal} setShowModal={setShowUpdateModal}/>
                  <DeleteModal id={index} showModal={(deleteModalId === item.id) && showDeleteModal} setShowModal={setShowDeleteModal} idFactura={item.id} data={currentData} setData={setCurrentData} apiData={data} setApiData={setData}/>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 &&
      <div className="hidden sm:flex sm:flex-1 sm:items-center justify-center mb-6">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm " aria-label="Pagination">
            {currentPage > 1 &&
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handleClick(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
            </a>
            }
            {Array.from({ length: totalPages }, (_, index) => (
              <a
                  href="#"
                  key={index}
                  className={`${currentPage === index + 1 ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                  onClick={() => handleClick(index + 1)}
              >
                  {index}
              </a>
            ))}
            {currentPage < totalPages &&
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handleClick(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <FaAngleRight className="h-5 w-5" aria-hidden="true" />
            </a>
            }
          </nav>
        </div>
        }
    </div>
          
  );
}
