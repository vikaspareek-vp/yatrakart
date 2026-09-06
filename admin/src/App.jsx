import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5]">

      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Admin Navbar */}
          <Navbar setToken={setToken} />

          {/* Admin Layout */}
          <div className="flex w-full">

            {/* Sidebar */}
            <Sidebar />

            {/* Page Content */}
            <div className="flex-1 min-w-0">
              <Routes>

                <Route
                  path="/"
                  element={<Navigate to="/add" />}
                />

                <Route
                  path="/add"
                  element={<Add token={token} />}
                />

                <Route
                  path="/list"
                  element={<List token={token} />}
                />

                <Route
                  path="/orders"
                  element={<Orders token={token} />}
                />

              </Routes>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default App;