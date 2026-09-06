import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center w-full gap-3 px-4 py-3 text-sm transition duration-300
    ${
      isActive
        ? "bg-[#EDE5DC] text-[#A66A45] border-r-2 border-[#A66A45]"
        : "text-[#555] hover:bg-[#FAF8F5] hover:text-[#A66A45]"
    }`;

  return (
    <aside className="w-[18%] min-h-screen bg-white border-r border-[#DDD6CE]">

      <div className="flex flex-col gap-2 pt-8 px-3 sm:px-5">

        {/* Add Product */}
        <NavLink to="/add" className={linkStyle}>
          <img
            className="w-5 h-5"
            src={assets.add_icon}
            alt="add product"
          />

          <p className="hidden md:block">
            Add Product
          </p>
        </NavLink>

        {/* List Products */}
        <NavLink to="/list" className={linkStyle}>
          <img
            className="w-5 h-5"
            src={assets.add_icon}
            alt="list products"
          />

          <p className="hidden sm:block">
            List Products
          </p>
        </NavLink>

        {/* Orders */}
        <NavLink to="/orders" className={linkStyle}>
          <img
            className="w-5 h-5"
            src={assets.order_icon}
            alt="orders"
          />

          <p className="hidden sm:block">
            Orders
          </p>
        </NavLink>

      </div>
    </aside>
  );
};

export default Sidebar;