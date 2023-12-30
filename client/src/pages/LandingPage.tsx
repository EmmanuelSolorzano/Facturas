import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";
import NavBar from "../components/NavBar";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const logoutUser = async () => {
    await httpClient.post("http://127.0.0.1:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://127.0.0.1:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to this React Application</h1>
          {user != null ? (
            <div>
              <h2 className="text-2xl">Logged in</h2>
              <h3 className="text-xl">ID: {user.id}</h3>
              <h3 className="text-xl">Email: {user.email}</h3>

              <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={logoutUser}>Logout</button>
            </div>
          ) : (
            <div>
              <p className="text-xl">You are not logged in</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
