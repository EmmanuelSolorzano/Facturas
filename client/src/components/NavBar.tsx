import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    

    return (
            <nav className="bg-gray-800 fixed top-0 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center">
                                    <Link to="/" className="text-white text-2xl font-bold ml-2">
                                        <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
                                    </Link>
                                    <Link to="/" className="text-white text-2xl font-bold ml-2">
                                        <p>Home</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <a href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Login</a>
                            <a href="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Register</a>
                        </div>
                    </div>
                </div>
            </nav>
    );
};

export default NavBar;
