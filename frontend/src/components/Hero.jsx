import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5]">

      <div className="flex flex-col sm:flex-row min-h-[550px]">

        {/* Left Side */}
        <div className="w-full sm:w-1/2 flex items-center">
          <div className="px-8 sm:px-12 lg:px-20 py-14">

            {/* Small heading */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-black"></span>

              <p className="text-xs sm:text-sm tracking-[0.2em] font-medium">
                NEW COLLECTION
              </p>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-[#222]">
              Discover Your
              <br />
              <span className="font-semibold">
                Everyday Style
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-7 max-w-md mt-6">
              Explore our latest collection of modern styles,
              carefully selected for your everyday look.
            </p>

            {/* Button */}
            <button
              onClick={() => navigate("/collection")}
              className="mt-8 bg-black text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition"
            >
              SHOP NOW
            </button>

          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-1/2">
          <img
            src={assets.hero_img}
            alt="Latest collection"
            className="w-full h-full min-h-[400px] sm:min-h-[550px] object-cover"
          />
        </div>

      </div>

    </section>
  );
};

export default Hero;