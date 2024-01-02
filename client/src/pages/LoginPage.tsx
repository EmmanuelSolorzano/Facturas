import React, { useState } from "react";
import httpClient from "../httpClient";
import NavBar from "../components/NavBar";
import FailureModal from "../components/modals/FailureModal";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [failureModal, setFailureModal] = useState(false);

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      console.log(resp);

      window.location.href = "/";
    } catch (error: any) {
        if(error?.response?.status){
            setError(error.response.data["error"]);
        }
        else{
          setFailureModal(true);
          setError("");
        }
    }
  };

  return (
    <>
      <NavBar />
      <FailureModal showModal={failureModal} setShowModal={setFailureModal} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sistema de cuentas por pagar y cobrar
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => logInUser()}
              >
                Iniciar sesión
              </button>
            </div>
            <div className="justify-center flex">
              {error !== "" && (
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-s font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  {error}
                </span>
              )}
            </div>
              
            <div>
            
            </div>
          </form>
        </div>
      </div>
    </>
  );
};