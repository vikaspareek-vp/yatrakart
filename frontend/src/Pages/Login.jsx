import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const Login = () => {
  const { backendUrl, token, setToken, navigate } =
    useContext(ShopContext);

  const [currentState, setCurrentState] = useState("LOGIN");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "LOGIN") {
        const response = await axios.post(
          backendUrl + "/api/user/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          backendUrl + "/api/user/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14 pb-20 min-h-[70vh]">

      <div className="max-w-md mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-3">
            WELCOME TO YATRAKART
          </p>

          <h1 className="text-2xl sm:text-3xl font-medium text-[#222]">
            {currentState === "LOGIN"
              ? "WELCOME BACK"
              : "CREATE ACCOUNT"}
          </h1>

          <p className="text-sm text-[#6B6B6B] mt-3">
            {currentState === "LOGIN"
              ? "Sign in to continue your journey."
              : "Create an account and start exploring."}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="border border-[#DDD6CE] bg-white p-6 sm:p-8"
        >

          {/* Name */}
          {currentState === "REGISTER" && (
            <div className="mb-5">
              <label className="block text-xs tracking-wide text-[#6B6B6B] mb-2">
                NAME
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
                placeholder="Your name"
                required
                className="w-full border border-[#DDD6CE] px-4 py-3 text-sm outline-none focus:border-[#A66A45]"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs tracking-wide text-[#6B6B6B] mb-2">
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Your email"
              required
              className="w-full border border-[#DDD6CE] px-4 py-3 text-sm outline-none focus:border-[#A66A45]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs tracking-wide text-[#6B6B6B] mb-2">
              PASSWORD
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              placeholder="Your password"
              required
              className="w-full border border-[#DDD6CE] px-4 py-3 text-sm outline-none focus:border-[#A66A45]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#222] text-white py-3 text-sm tracking-wide hover:bg-[#A66A45] transition"
          >
            {currentState === "LOGIN"
              ? "SIGN IN"
              : "CREATE ACCOUNT"}
          </button>

          {/* Switch */}
          <div className="text-center mt-6">
            {currentState === "LOGIN" ? (
              <p className="text-sm text-[#6B6B6B]">
                Don't have an account?{" "}
                <span
                  onClick={() => setCurrentState("REGISTER")}
                  className="text-[#A66A45] cursor-pointer hover:underline"
                >
                  Create one
                </span>
              </p>
            ) : (
              <p className="text-sm text-[#6B6B6B]">
                Already have an account?{" "}
                <span
                  onClick={() => setCurrentState("LOGIN")}
                  className="text-[#A66A45] cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </p>
            )}
          </div>

        </form>

      </div>
    </main>
  );
};

export default Login;