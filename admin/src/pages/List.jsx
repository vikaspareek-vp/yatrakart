import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to remove product"
      );
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 sm:px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-2">
          INVENTORY
        </p>

        <h1 className="text-2xl sm:text-3xl font-medium text-[#222]">
          All Products
        </h1>

        <p className="mt-2 text-sm text-[#6B6B6B]">
          Manage the products available in your YatraKart store.
        </p>
      </div>

      {/* Product List */}
      <div className="bg-white border border-[#DDD6CE]">

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[80px_3fr_1fr_1fr_80px] items-center px-5 py-4 border-b border-[#E5DED6] text-xs tracking-[0.1em] text-[#6B6B6B] uppercase">
          <p>Image</p>
          <p>Product</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* Products */}
        {list.length > 0 ? (
          list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[60px_1fr_40px] md:grid-cols-[80px_3fr_1fr_1fr_80px] items-center gap-3 md:gap-0 px-4 sm:px-5 py-4 border-b border-[#E5DED6] last:border-b-0 hover:bg-[#FAF8F5] transition"
            >

              {/* Image */}
              <img
                className="w-12 h-14 sm:w-14 sm:h-16 object-cover bg-[#EDE5DC]"
                src={item.image[0]}
                alt={item.name}
              />

              {/* Name */}
              <div className="min-w-0">
                <p className="text-sm text-[#222] truncate pr-3">
                  {item.name}
                </p>

                <p className="md:hidden mt-1 text-xs text-[#888]">
                  {item.category} · {currency}{item.price}
                </p>
              </div>

              {/* Category */}
              <p className="hidden md:block text-sm text-[#6B6B6B]">
                {item.category}
              </p>

              {/* Price */}
              <p className="hidden md:block text-sm text-[#222]">
                {currency}{item.price}
              </p>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeProduct(item._id)}
                className="w-8 h-8 flex items-center justify-center border border-[#DDD6CE] text-[#777] hover:border-red-400 hover:text-red-500 transition"
                title="Delete product"
              >
                ×
              </button>

            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-[#777]">
              No products available
            </p>

            <p className="mt-2 text-xs text-[#999]">
              Add a product to start building your inventory.
            </p>
          </div>
        )}

      </div>

    </main>
  );
};

export default List;