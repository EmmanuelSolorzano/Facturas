import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MdEdit } from "react-icons/md";
import ReceptorDropdown from './utils/ReceptorDropdown';
import AutocompleteCustom from '../Autocomplete';

const UpdateModal = (props: any) =>  {

  const cancelButtonRef = useRef(null);

  const { numeroFactura, receptor, nombreProveedor, subtotal, retencion, tipoCuenta } = props;

  function handleCloseModal() {
    props.setShowModal(false);
    setNumeroFacturaPost(initialNumeroFactura);
    setReceptorPost(initialReceptor);
    setNombreProveedorPost(initialNombreProveedor);
    setsubtotalPost(initialsubtotal);
    setretencionPost(initialretencion);
    setTipoCuentaPost(initialTipoCuenta);
    setReceptorError(null);
    setNumeroFacturaError(null);
    setNombreProveedorError(null);
    setsubtotalError(null);
    setretencionError(null);
    setIva(subtotal * 0.16);
    setImporte(subtotal - retencion + (subtotal * 0.16));
    setChanges([]);
    setChangesPost({});
  };

  //Validate changes
  const initialNumeroFactura = numeroFactura;
  const initialReceptor = receptor;
  const initialNombreProveedor = nombreProveedor;
  const initialsubtotal = subtotal;
  const initialretencion = retencion;
  const initialTipoCuenta = tipoCuenta;

  const [subtotalText, setsubtotalText] = useState<string>(subtotal);
  const [retencionText, setretencionText] = useState<string>(retencion);

  const [numeroFacturaPost, setNumeroFacturaPost] = useState<string>(numeroFactura);
  const [receptorPost, setReceptorPost] = useState<string>(receptor);
  const [nombreProveedorPost, setNombreProveedorPost] = useState<string>(nombreProveedor);
  const [subtotalPost, setsubtotalPost] = useState<number>(subtotal);
  const [retencionPost, setretencionPost] = useState<number>(retencion);
  const [tipoCuentaPost, setTipoCuentaPost] = useState<string>(tipoCuenta);

  const [iva, setIva] = useState<number>(subtotal * 0.16);
  const [importe, setImporte] = useState<number>(subtotal - retencion + (subtotal * 0.16));

  const [changesPost, setChangesPost] = useState({});
  const [changes, setChanges] = useState<{ field: string; value: any }[]>([]);

  function printChanges() {
    const formattedChanges = changes.reduce((formatted, change) => {
      formatted[change.field] = change.value;
      return formatted;
    }, {} as Record<string, any>);
    setChangesPost(formattedChanges);
    console.log("Cambios: ", formattedChanges);
    props.successTtl('Registro actualizado');
    props.successMsg(<>El registro se ha <strong>actualizado</strong> con éxito.</>);
    handleCloseModal();
    props.loading(true);
    setTimeout(() => {
      props.loading(false);
      props.success(true);
    }, 3000);
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
    checkAndAddChange('subtotal', initialsubtotal, subtotalPost);
    checkAndAddChange('retencion', initialretencion, retencionPost);
    checkAndAddChange('tipoCuenta', initialTipoCuenta, tipoCuentaPost);
  }, [
    numeroFacturaPost,
    receptorPost,
    nombreProveedorPost,
    subtotalPost,
    retencionPost,
    tipoCuentaPost,
  ]);

  //REGEX Validation
  const [receptorError, setReceptorError] = useState<string | null>(null);
  const [numeroFacturaError, setNumeroFacturaError] = useState<string | null>(null);
  const [nombreProveedorError, setNombreProveedorError] = useState<string | null>(null);
  const [subtotalError, setsubtotalError] = useState<string | null>(null);
  const [retencionError, setretencionError] = useState<string | null>(null);

  const handleReceptorChange = (value: any) => {
    const inputValue = value;
    const regex = /^(?=\S)(?!.*\s{2,})[\p{L}0-9., ]{1,24}$/u;
    setReceptorPost(inputValue);
    if (regex.test(inputValue)) {
      setReceptorError(null);
    } else {
      setReceptorError('Ingrese caracteres válidos (mayúsculas, minúsculas, comas, puntos y números). Longitud máxima de 24 carácteres.');
    }
  };

  const handleNumeroFacturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^[a-zA-Z0-9]{1,24}$/;
    setNumeroFacturaPost(inputValue);
    if (regex.test(inputValue)) {
      setNumeroFacturaError(null);
    } else {
      setNumeroFacturaError('Ingrese caracteres válidos (mayúsculas, minúsculas y números). Longitud máxima de 24 carácteres.');
    }
  };

  const handleNombreProveedorChange = (value: any) => {
    const inputValue = value;
    const regex = /^(?=\S)(?!.*\s{2,})[\p{L}0-9., ]{1,24}$/u;
    setNombreProveedorPost(inputValue);
    if (regex.test(inputValue)) {
      setNombreProveedorError(null);
    } else {
      setNombreProveedorError('Ingrese caracteres válidos (mayúsculas, minúsculas, comas, puntos y números). Longitud máxima de 24 carácteres.');
    }
  }

  const handlesubtotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^\d{1,8}(\.\d{1,2})?$/;
    setsubtotalText(inputValue);
    if (regex.test(inputValue)) {
      if (parseFloat(inputValue) < retencionPost) {
        setsubtotalError('El subtotal no puede ser menor a la retención.');
      }
      else{
        setsubtotalError(null);
        setsubtotalPost(parseFloat(inputValue));
        if (retencionError === 'La retención no puede ser mayor al subtotal.'){
          setretencionError(null);
        }
        setIva(parseFloat(inputValue) * 0.16);
        setImporte(parseFloat(inputValue) - retencionPost + (parseFloat(inputValue) * 0.16));
      }
    } else {
      setsubtotalError('Ingrese caracteres válidos (números y 1 punto decimal). Se compone hasta de 8 números enteros y 2 decimales. Longitud máxima de 10 números.');
    }
  }

  const handleretencionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^\d{1,8}(\.\d{1,2})?$/;

    setretencionText(inputValue);
    if (regex.test(inputValue)) {
      if (parseFloat(inputValue) > subtotalPost) {
        setretencionError('La retención no puede ser mayor al subtotal.');
      }
      else {
        setretencionError(null);
        setretencionPost(parseFloat(inputValue));
        if (subtotalError === 'La retención no puede ser menor al subtotal.'){
          setsubtotalError(null);
        }
        setImporte(subtotalPost - parseFloat(inputValue) + (subtotalPost * 0.16));
        setIva(subtotalPost * 0.16);
      }
    } else {
      setretencionError('Ingrese caracteres válidos (números y 1 punto decimal). Se compone hasta de 8 números enteros y 2 decimales. Longitud máxima de 10 números.');
    }
  }

  // Estado para deshabilitar el botón
  const [disableButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if (
      receptorError !== null ||
      numeroFacturaError !== null ||
      nombreProveedorError !== null ||
      subtotalError !== null ||
      retencionError !== null ||
      numeroFacturaPost === "" ||
      receptorPost === "" ||
      nombreProveedorPost === "" ||
      subtotalPost === 0 ||
      retencionError === "" ||
      tipoCuentaPost === ""
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [
    receptorError,
    numeroFacturaError,
    nombreProveedorError,
    subtotalError,
    retencionError,
    numeroFacturaPost,
    receptorPost,
    nombreProveedorPost,
    subtotalPost,
    retencionError,
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
                                  <AutocompleteCustom who={'Receptor'} error={receptorError} handleChange={handleReceptorChange} default={initialReceptor} update={true} post={receptorPost}/>
                                  {receptorError && (
                                    <div className="text-xs text-justify bottom-0 left-0 p-2 text-red-500">
                                      {receptorError}
                                  </div>
                                  )}
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
                                  <AutocompleteCustom who={'Proveedor'} error={nombreProveedorError} handleChange={handleNombreProveedorChange} default={initialNombreProveedor} update={true} post={nombreProveedorPost}/>
                                    {nombreProveedorError && (
                                    <div className="text-xs text-justify bottom-0 left-0 p-2 text-red-500">
                                      {nombreProveedorError}
                                  </div>
                                  )}
                                  </div>
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
                                      value={numeroFacturaPost}
                                      id="numero"
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${numeroFacturaError ? 'ring-red-300' : initialNumeroFactura !== numeroFacturaPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}
                                      onChange={handleNumeroFacturaChange}
                                    />
                                    {numeroFacturaError && (
                                    <div className="text-xs text-justify bottom-0 left-0 p-2 text-red-500">
                                      {numeroFacturaError}
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
                                  <ReceptorDropdown default={initialTipoCuenta} setTipo={setTipoCuentaPost} tipo={tipoCuentaPost}/>
                                </div>

                                

                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="importe" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    Subtotal
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                  <div className="mt-2">
                                    <input 
                                      type="text" 
                                      name="subtotal" 
                                      id="subtotal" 
                                      value={subtotalText}
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${subtotalError ? 'ring-red-300' : initialsubtotal !== subtotalPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}                                   
                                      placeholder="0.00"
                                      onChange={handlesubtotalChange}
                                      />
                                      {subtotalError && (
                                        <div className="text-xs text-justify bottom-0 left-0 p-2 text-red-500">
                                          {subtotalError}
                                      </div>
                                      )}
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="iva" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    Retención
                                  </label>
                                  <p className="mt-1 text-lg leading-6 text-red-500">*</p>
                                </div>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="retencion"
                                      id="retencion"
                                      value={retencionText}
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${retencionError ? 'ring-red-300' : initialretencion !== retencionPost ? 'ring-yellow-600 ring-2' : 'focus:ring-indigo-600'} sm:text-sm sm:leading-6 `}                                    
                                      placeholder="0.00"
                                      onChange={handleretencionChange}
                                    />
                                    {retencionError && (
                                        <div className="text-xs text-justify bottom-0 left-0 p-2 text-red-500">
                                          {retencionError}
                                      </div>
                                      )}
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="iva" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    IVA
                                  </label>
                                  
                                </div>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="iva"
                                      value={iva.toFixed(2)}
                                      id="iva"
                                      className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-gray-300 bg-gray-200 font-bold
                                      ${subtotalError || retencionError ? 'ring-red-300 focus:ring-red-300 ring-2' : 'ring-gray-300 focus:ring-indigo-600'}
                                      `}                                      
                                      disabled={true}
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <div className="flex items-center">
                                  <label htmlFor="importe" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                    Importe total
                                  </label>

                                </div>
                                  <div className="mt-2">
                                    <input 
                                      type="text" 
                                      name="importe" 
                                      value={importe.toFixed(2)}
                                      id="importe" 
                                        className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-gray-300 bg-indigo-200 font-bold
                                        ${subtotalError || retencionError ? 'ring-red-300 focus:ring-red-300 ring-2' : 'ring-gray-300 focus:ring-indigo-600'}
                                        `}
                                      disabled={true}
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
                    disabled={changes.length === 0 || disableButton}
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