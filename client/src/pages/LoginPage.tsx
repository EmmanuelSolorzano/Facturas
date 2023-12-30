import React, { useState } from "react";
import httpClient from "../httpClient";
import NavBar from "../components/NavBar";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <NavBar />
    <div className="w-full max-w-md mx-2">
    <div className="bg-gray-800 shadow-md rounded px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-white font-bold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <button
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0"
            type="button"
            onClick={() => logInUser()}
          >
            Sign In
          </button>
          <a
            className="text-white hover:text-white"
            href="#"  
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default LoginPage;
