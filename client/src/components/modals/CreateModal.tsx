import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoIosAddCircle } from "react-icons/io";
import ReceptorDropdown from './utils/ReceptorDropdown';

const CreateModal = (props: any) =>  {

  const [numeroFacturaPost, setNumeroFacturaPost] = useState<string>("");
  const [receptorPost, setReceptorPost] = useState<string>("");
  const [nombreProveedorPost, setNombreProveedorPost] = useState<string>("");
  const [importeFacturaPost, setImporteFacturaPost] = useState<number>(0);
  const [porcentajeIVAPost, setPorcentajeIVAPost] = useState<number>(16);
  const [tipoCuentaPost, setTipoCuentaPost] = useState<string>("");

  function printValues() {
    console.log("Número de factura: ", numeroFacturaPost);
    console.log("Receptor: ", receptorPost);
    console.log("Nombre de proveedor: " ,nombreProveedorPost);
    console.log("Importe: ", importeFacturaPost);
    console.log("IVA: ", porcentajeIVAPost);
    console.log("Tipo de cuenta: ", tipoCuentaPost);
  }

  //REGEX Validation
  const [receptorError, setReceptorError] = useState<string | null>(null);
  const [numeroFacturaError, setNumeroFacturaError] = useState<string | null>(null);
  const [nombreProveedorError, setNombreProveedorError] = useState<string | null>(null);
  const [importeFacturaError, setImporteFacturaError] = useState<string | null>(null);
  const [porcentajeIVAError, setPorcentajeIVAError] = useState<string | null>(null);
  const [tipoCuentaError, setTipoCuentaError] = useState<string | null>(null);

  const handleReceptorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^[\p{L}0-9.,]{3,24}$/u;
    setReceptorPost(inputValue);
    if (regex.test(inputValue)) {
      setReceptorError(null);
    } else {
      setReceptorError('Ingrese caracteres válidos (mayúsculas, minúsculas, comas, puntos y números). Longitud de 3 - 24 carácteres.');
    }
  };

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={props.showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setShowModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <IoIosAddCircle className="h-6 w-6 text-green-600"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Crear registro
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* Aquí empieza el modal */}
                        <form>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Crea un nuevo registro de facturación.
                              </p>
                              <p className="mt-2 text-xs leading-6 text-red-500">
                                Los campos con * son obligatorios.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                <div className="flex items-center">
                                  <label htmlFor="receptor" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    Receptor
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="receptor"
                                    id="receptor"
                                    value={receptorPost}
                                    className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                      receptorError ? 'ring-red-300' : 'ring-gray-300'
                                    }`}
                                    onChange={handleReceptorChange}
                                  />
                                  {receptorError && (
                                    <div className="text-xs text-justify bottom-0 left-0 p-2 text-red-500">
                                      {receptorError}
                                  </div>
                                  )}
                                </div>
                                </div>
                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="tipo" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    Tipo de cuenta
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                  <ReceptorDropdown setTipo={setTipoCuentaPost} />
                                </div>


                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="numero" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                  Número de factura
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="numero"
                                      id="numero"
                                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      onChange={(e) => setNumeroFacturaPost(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    Nombre proveedor/cliente
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="nombre"
                                      id="nombre"
                                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      onChange={(e) => setNombreProveedorPost(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="importe" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    Importe ($)
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                  <div className="mt-2">
                                    <input 
                                      type="text" 
                                      name="importe" 
                                      id="importe" 
                                      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                      placeholder="0.00"
                                      onChange={(e) => setImporteFacturaPost(parseFloat(e.target.value))}
                                      />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="iva" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    IVA (%)
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="iva"
                                      id="iva"
                                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      defaultValue="16"
                                      onChange={(e) => setPorcentajeIVAPost(parseFloat(e.target.value))}
                                    />
                                  </div>
                                </div>

                                
                              </div>
                              
                            </div>
                            <div className="col-span-full">
                              <label htmlFor="pdf" className="block text-sm font-medium leading-6 text-gray-900">
                                PDF
                              </label>
                              <div className="max-w-2xl mx-auto">

                                <input className="block w-full text-sm text-white border border-indigo-600 rounded-lg cursor-pointer focus:outline-none bg-indigo-600" id="pdf" type="file" />
                              </div>
                            </div>
                            <div className="col-span-full">
                              <label htmlFor="xml" className="block text-sm font-medium leading-6 text-gray-900">
                                XML
                              </label>
                              <div className="max-w-2xl mx-auto">
                                <input className="block w-full text-sm text-white border border-indigo-600 rounded-lg cursor-pointer focus:outline-none bg-indigo-600" id="xml" type="file" />
                              </div>
                            </div>
                            
                              
                          </div>

                        </form>
                        {/* Aquí termina el modal */}
                      </div>
                    </div>
                  </div>
                     
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() => printValues()}
                  >
                    Crear
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                    onClick={() => props.setShowModal(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CreateModal;