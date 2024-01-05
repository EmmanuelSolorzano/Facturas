import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdCloudDownload } from "react-icons/io";


const ReadModal = (props: any) =>  {
  const { numeroFactura, receptor, nombreProveedor, creador, subtotal, retencion, fecha, tipoCuenta } = props;

  function descargarRegistro() {
    console.log('Descargando registro...');
    console.log('Número de factura: ' + numeroFactura);
    console.log('Receptor: ' + receptor);
    console.log('Nombre del proveedor: ' + nombreProveedor);
    console.log('Creador: ' + creador);
    console.log('Importe: ' + subtotal);
    console.log('IVA: ' + retencion);
    console.log('Fecha: ' + fecha);
    console.log('Tipo de cuenta: ' + tipoCuenta);
  }

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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <MdRemoveRedEye className="h-6 w-6 text-indigo-600"/>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Visualizar registro
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* Aquí empieza el modal */}
                        <form>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Visualizar el registro de facturación.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 ">
                                    Receptor
                                  </label>
                                  <p className='font-bold text-sm'>{receptor}</p>
                                </div>
                                <div className="sm:col-span-3">
                                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tipo de cuenta
                                  </label>
                                  <p className='font-bold text-sm'>{tipoCuenta === 'Cliente' ? 'Cliente (por cobrar)' : 'Proveedor (por pagar)'}</p>
                                </div>


                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Número de factura
                                  </label>
                                   <p className='font-bold text-sm'>{numeroFactura}</p>
                                </div>

                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre proveedor/cliente
                                  </label>
                                    <p className='font-bold text-sm'>{nombreProveedor}</p>
                                </div>

                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Importe ($)
                                  </label>
                                    <p className='font-bold text-sm'>{subtotal}</p>
                                </div>

                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    IVA (%)
                                  </label>
                                    <p className='font-bold text-sm'>{retencion}</p>
                                </div>

                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Fecha de creación
                                  </label>
                                    <p className='font-bold text-sm'>{fecha}</p>
                                </div>

                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Creador
                                  </label>
                                    <p className='font-bold text-sm'>{creador}</p>
                                </div>

                                
                              </div>
                              
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <div className="col-span-full">
                                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    PDF
                                  </label>
                                  <div className="max-w-2xl mx-auto">
                                    <button
                                      type="button"
                                      className="inline-flex w-full justify-center rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                    >
                                      Descargar<IoMdCloudDownload className="h-6 w-6 text-white ml-2"/>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:col-span-3">
                              <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                  XML
                                </label>
                                <div className="max-w-2xl mx-auto">
                                    <button
                                      type="button"
                                      className="inline-flex w-full justify-center rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                    >
                                      Descargar<IoMdCloudDownload className="h-6 w-6 text-white ml-2"/>
                                    </button>
                                </div>
                              </div>
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
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={() => descargarRegistro()}
                  >
                    Descargar registro
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                    onClick={() => props.setShowModal(false)}
                    ref={cancelButtonRef}
                  >
                    Cerrar
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

export default ReadModal;