import React from "react";
import { Link, useLocation } from "react-router-dom";
import httpClient from "../httpClient";

export default function NavBar() {
    const location = useLocation();

    const logoutUser = async () => {
        await httpClient.post("http://127.0.0.1:5000/logout");
        window.location.href = "/";
      };

    return (
        <nav className="bg-gray-800 top-0 w-full px-4 py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center">
                                <Link to="/" className="text-white text-2xl font-bold ml-2">
                                    <img
                                        className="mx-auto h-10 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                </Link>
                                <Link to="/" className="text-white text-2xl font-bold ml-3">
                                    <p className="">Inicio</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {location.pathname === "/" && (
                        <div className="flex">
                           <a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium" onClick={logoutUser}>Cerrar sesión</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};