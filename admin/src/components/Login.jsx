import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        backendUrl + "/api/user/admin",
        { email, password }
      );

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error("Admin login failed");
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="text-3xl tracking-[0.18em] font-semibold text-[#222]">
            YATRAKART
          </h1>

          <p className="mt-3 text-xs tracking-[0.25em] text-[#A66A45]">
            ADMIN PANEL
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#DDD6CE] px-7 sm:px-10 py-9 shadow-sm">

          <div className="mb-8">
            <h2 className="text-2xl font-medium text-[#222]">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-[#6B6B6B]">
              Sign in to manage your YatraKart store.
            </p>
          </div>

          <form onSubmit={onSubmitHandler}>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#333] mb-2">
                Email Address
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 border border-[#DDD6CE] bg-[#FAF8F5] text-sm text-[#222] outline-none focus:border-[#A66A45] transition"
                type="email"
                placeholder="admin@yatrakart.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-7">
              <label className="block text-sm font-medium text-[#333] mb-2">
                Password
              </label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#DDD6CE] bg-[#FAF8F5] text-sm text-[#222] outline-none focus:border-[#A66A45] transition"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login */}
            <button
              className="w-full py-3 bg-[#222] text-white text-sm tracking-[0.15em] hover:bg-[#A66A45] transition duration-300"
              type="submit"
            >
              SIGN IN
            </button>

          </form>

          {/* Footer text */}
          <p className="text-center text-xs text-[#888] mt-7">
            Secure access for YatraKart administrators
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;