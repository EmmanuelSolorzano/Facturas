import React, { useState } from 'react';
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";



const ReceptorDropdown = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.default === 'Cliente' ? 'Cliente (por cobrar)' : props.default === 'Proveedor' ? 'Proveedor (por pagar)' : 'Seleccionar');
  const options = ['Cliente (por cobrar)', 'Proveedor (por pagar)'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function handleSelectItem(item: string) {
    setSelectedItem(item);
    setIsOpen(false);
    props.setTipo(item === 'Cliente (por cobrar)' ? 'Cliente' : 'Proveedor');
  };

  return (
    <div className="relative">
      <button
        type='button'
        className={`flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold ${props.default !== props.tipo ? 'ring-yellow-600 ring-4' : ''} leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={toggleDropdown}
      >
        {selectedItem}
        {isOpen ? <IoMdArrowDropup className="text-2xl" /> : <IoMdArrowDropdown className="text-2xl" />}
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Dropdown content */}
          <ul className="py-2">
            <li className="text-sm px-4 py-2 hover:bg-gray-100" onClick={() => handleSelectItem(options[0])}>{options[0]}<br/></li>
            <li className="text-sm px-4 py-2 hover:bg-gray-100" onClick={() => handleSelectItem(options[1])}>{options[1]}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReceptorDropdown;
