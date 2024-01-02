import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MdEdit } from "react-icons/md";
import ReceptorDropdown from './utils/ReceptorDropdown';


const UpdateModal = (props: any) =>  {

  const cancelButtonRef = useRef(null);

  const { numeroFactura, receptor, nombreProveedor, importeFactura, porcentajeIVA, tipoCuenta } = props;

  function handleCloseModal() {
    props.setShowModal(false);
    setNumeroFacturaPost(initialNumeroFactura);
    setReceptorPost(initialReceptor);
    setNombreProveedorPost(initialNombreProveedor);
    setImporteFacturaPost(initialImporteFactura);
    setPorcentajeIVAPost(initialPorcentajeIVA);
    setTipoCuentaPost(initialTipoCuenta);
    setChanges([]);
    setChangesPost({});
  };

  //Validate changes
  const [initialNumeroFactura, setInitialNumeroFactura] = useState<string>(numeroFactura);
  const [initialReceptor, setInitialReceptor] = useState<string>(receptor);
  const [initialNombreProveedor, setInitialNombreProveedor] = useState<string>(nombreProveedor);
  const [initialImporteFactura, setInitialImporteFactura] = useState<number>(importeFactura);
  const [initialPorcentajeIVA, setInitialPorcentajeIVA] = useState<number>(porcentajeIVA);
  const [initialTipoCuenta, setInitialTipoCuenta] = useState<string>(tipoCuenta);


  const [numeroFacturaPost, setNumeroFacturaPost] = useState<string>(numeroFactura);
  const [receptorPost, setReceptorPost] = useState<string>(receptor);
  const [nombreProveedorPost, setNombreProveedorPost] = useState<string>(nombreProveedor);
  const [importeFacturaPost, setImporteFacturaPost] = useState<number>(importeFactura);
  const [porcentajeIVAPost, setPorcentajeIVAPost] = useState<number>(porcentajeIVA);
  const [tipoCuentaPost, setTipoCuentaPost] = useState<string>(tipoCuenta);

  const [changesPost, setChangesPost] = useState({});
  const [changes, setChanges] = useState<{ field: string; value: any }[]>([]);

  function printChanges() {
    const formattedChanges = changes.reduce((formatted, change) => {
      formatted[change.field] = change.value;
      return formatted;
    }, {} as Record<string, any>);
    setChangesPost(formattedChanges);
    console.log("Cambios: ", formattedChanges);
  }

  useEffect(() => {
    const checkAndAddChange = (fieldName: string, initialValue: any, postValue: any) => {
      if (initialValue !== postValue) {
        setChanges((prevChanges) => [...prevChanges, { field: fieldName, value: postValue }]);
      } else {
        setChanges((prevChanges) => prevChanges.filter((change) => change.field !== fieldName));
      }
    };
    checkAndAddChange('numeroFactura', initialNumeroFactura, numeroFacturaPost);
    checkAndAddChange('receptor', initialReceptor, receptorPost);
    checkAndAddChange('nombreProveedor', initialNombreProveedor, nombreProveedorPost);
    checkAndAddChange('importeFactura', initialImporteFactura, importeFacturaPost);
    checkAndAddChange('porcentajeIVA', initialPorcentajeIVA, porcentajeIVAPost);
    checkAndAddChange('tipoCuenta', initialTipoCuenta, tipoCuentaPost);
  }, [
    numeroFacturaPost,
    receptorPost,
    nombreProveedorPost,
    importeFacturaPost,
    porcentajeIVAPost,
    tipoCuentaPost,
  ]);

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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <MdEdit className="h-6 w-6 text-yellow-600"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Editar registro
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* Aquí empieza el modal */}
                        <form>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Edita un registro de facturación existente.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label htmlFor="receptor" className="block text-sm font-medium leading-6 text-gray-900">
                                    Receptor
                                  </label>
                                  <div className="mt-2">
                                  <input
                                    type="text"
                                    name="receptor"
                                    value={receptorPost}
                                    id="receptor"
                                    className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${initialReceptor !== receptorPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}
                                    onChange={(e) => setReceptorPost(e.target.value)}
                                  />
                                  </div>
                                </div>
                                <div className="sm:col-span-3">
                                  <label htmlFor="tipo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tipo de cuenta
                                  </label>
                                  <ReceptorDropdown default={initialTipoCuenta} setTipo={setTipoCuentaPost} tipo={tipoCuentaPost}/>
                                </div>


                                <div className="sm:col-span-3">
                                <label htmlFor="numero" className="block text-sm font-medium leading-6 text-gray-900">
                                    Número de factura
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="numero"
                                      value={numeroFacturaPost}
                                      id="numero"
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${initialNumeroFactura !== numeroFacturaPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}
                                      onChange={(e) => setNumeroFacturaPost(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre proveedor/cliente
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="nombre"
                                      value={nombreProveedorPost}
                                      id="nombre"
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${initialNombreProveedor !== nombreProveedorPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}
                                      onChange={(e) => setNombreProveedorPost(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                <label htmlFor="importe" className="block text-sm font-medium leading-6 text-gray-900">
                                    Importe ($)
                                  </label>
                                  <div className="mt-2">
                                    <input 
                                      type="text" 
                                      name="importe" 
                                      value={importeFacturaPost}
                                      id="importe" 
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${initialImporteFactura !== importeFacturaPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}
                                      placeholder="0.00"
                                      onChange={(e) => setImporteFacturaPost(parseFloat(e.target.value))}
                                      />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                <label htmlFor="iva" className="block text-sm font-medium leading-6 text-gray-900">
                                    IVA (%)
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="iva"
                                      value={porcentajeIVAPost}
                                      id="iva"
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${initialPorcentajeIVA !== porcentajeIVAPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}
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
                    className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                    onClick={() => printChanges()}
                    disabled={changes.length === 0}
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                    onClick={() => handleCloseModal()}
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

export default UpdateModal;