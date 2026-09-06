import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-10 sm:mb-14">

        <p className="text-xs sm:text-sm tracking-[0.3em] text-[#A66A45] mb-3">
          YOUR SELECTION
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="YOUR" text2="CART" />
        </div>

      </div>

      {/* ================= EMPTY CART ================= */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">

          <p className="text-lg text-[#333333]">
            Your cart is empty
          </p>

          <p className="text-sm text-[#6B6B6B] mt-2">
            Discover something you'll love from our collection.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="mt-7 bg-[#222222] text-white px-8 py-3 text-sm tracking-[0.1em] hover:bg-[#A66A45] transition-colors"
          >
            EXPLORE COLLECTION
          </button>

        </div>
      ) : (
        <>
          {/* ================= CART ITEMS ================= */}
          <div className="border-t border-[#DDD6CE]">

            {cartData.map((item, i) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              if (!productData) return null;

              return (
                <div
                  key={i}
                  className="py-6 border-b border-[#DDD6CE] grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_150px_40px] items-center gap-4 sm:gap-8"
                >

                  {/* Product */}
                  <div className="flex items-start gap-4 sm:gap-6">

                    <div className="w-20 sm:w-24 bg-[#EDE5DC] shrink-0">
                      <img
                        className="w-full aspect-[3/4] object-cover"
                        src={productData.image[0]}
                        alt={productData.name}
                      />
                    </div>

                    <div className="pt-1">

                      <p className="text-sm sm:text-base font-medium text-[#222222]">
                        {productData.name}
                      </p>

                      <p className="mt-2 text-sm text-[#333333]">
                        {productData.price} {currency}
                      </p>

                      <div className="flex items-center gap-2 mt-3">

                        <span className="text-xs text-[#6B6B6B]">
                          SIZE
                        </span>

                        <span className="px-3 py-1 border border-[#DDD6CE] bg-[#FAF8F5] text-xs">
                          {item.size}
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center">

                    <input
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value >= 1) {
                          updateQuantity(
                            item._id,
                            item.size,
                            value
                          );
                        }
                      }}
                      className="w-14 sm:w-20 border border-[#DDD6CE] bg-[#FAF8F5] px-2 py-2 text-center text-sm outline-none focus:border-[#A66A45]"
                      type="number"
                      min="1"
                      value={item.quantity}
                    />

                  </div>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, 0)
                    }
                    className="flex justify-center cursor-pointer"
                  >
                    <img
                      className="w-4 sm:w-5 opacity-60 hover:opacity-100 transition-opacity"
                      src={assets.bin_icon}
                      alt="Remove item"
                    />
                  </button>

                </div>
              );
            })}

          </div>

          {/* ================= CART TOTAL ================= */}
          <div className="flex justify-end my-16 sm:my-20">

            <div className="w-full sm:w-[450px]">

              <CartTotal />

              <div className="w-full text-end">

                <button
                  onClick={() => navigate("/place-order")}
                  className="mt-7 bg-[#222222] text-white px-8 py-3.5 text-sm tracking-[0.1em] hover:bg-[#A66A45] transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>

              </div>

            </div>

          </div>
        </>
      )}

    </main>
  );
};

export default Cart;