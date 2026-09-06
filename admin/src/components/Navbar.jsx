import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <header className="flex items-center justify-between px-[4%] py-4 bg-white border-b border-[#DDD6CE]">

      {/* Logo */}
      <img
        className="w-[max(10%,100px)]"
        src={assets.logo}
        alt="YatraKart"
      />

      {/* Admin + Logout */}
      <div className="flex items-center gap-5">

        <div className="hidden sm:block text-right">
          <p className="text-xs tracking-[0.15em] text-[#A66A45]">
            YATRAKART
          </p>
          <p className="text-xs text-[#6B6B6B] mt-1">
            Admin Panel
          </p>
        </div>

        <button
          onClick={() => setToken("")}
          className="border border-[#222] px-4 py-2 sm:px-6 text-xs tracking-[0.12em] text-[#222] hover:bg-[#222] hover:text-white transition duration-300"
        >
          LOGOUT
        </button>

      </div>
    </header>
  );
};

export default Navbar;