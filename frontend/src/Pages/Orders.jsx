import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const {
    backendUrl,
    currency,
    token,
    navigate,
  } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const getAllOrdersData = async () => {
    try {
      if (!token) {
        return null;
      }

      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        let allOrderItems = [];

        res.data.orders.map((order) => {
          order.items.map((item) => {
            if (typeof item === "object") {
              item["orderId"] = order._id;
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;

              allOrderItems.push(item);
            } else {
              console.warn("Item is not an object");
            }
          });
        });

        setOrderData(allOrderItems.reverse());
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllOrdersData();
  }, [token]);

  return (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14">

      {/* ================= HEADER ================= */}

      <div className="text-center mb-10 sm:mb-14">

        <p className="text-xs sm:text-sm tracking-[0.3em] text-[#A66A45] mb-3">
          YOUR PURCHASE HISTORY
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="MY" text2="ORDERS" />
        </div>

        <p className="max-w-xl mx-auto mt-4 px-5 text-sm text-[#6B6B6B] leading-6">
          View your recent purchases and keep track of your deliveries.
        </p>

      </div>

      {/* ================= ORDERS ================= */}

      {orderData.length > 0 ? (
        <div className="border-t border-[#DDD6CE]">

          {orderData.map((item, i) => (
            <div
              key={i}
              className="py-7 border-b border-[#DDD6CE] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >

              {/* ================= PRODUCT ================= */}

              <div className="flex items-start gap-5 sm:gap-6">

                {/* Image */}

                <div className="w-20 sm:w-24 bg-[#EDE5DC] shrink-0">
                  <img
                    className="w-full aspect-[3/4] object-cover"
                    src={item.image[0]}
                    alt={item.name}
                  />
                </div>

                {/* Product details */}

                <div>

                  <p className="text-sm sm:text-base font-medium text-[#222222]">
                    {item.name}
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#333333]">
                    {item.price} {currency}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-[#6B6B6B]">

                    <p>
                      Size:{" "}
                      <span className="text-[#333333]">
                        {item.size}
                      </span>
                    </p>

                    <p>
                      Quantity:{" "}
                      <span className="text-[#333333]">
                        {item.quantity}
                      </span>
                    </p>

                  </div>

                  {/* Date */}

                  <p className="mt-3 text-xs text-[#6B6B6B]">
                    ORDERED ON{" "}
                    <span className="text-[#333333]">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>

                  {/* Payment */}

                  <p className="mt-1 text-xs text-[#6B6B6B]">
                    PAYMENT{" "}
                    <span className="text-[#333333]">
                      {item.paymentMethod}
                    </span>
                  </p>

                </div>

              </div>

              {/* ================= STATUS + TRACK ================= */}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-5 lg:min-w-[300px]">

                {/* Status */}

                <div className="flex items-center gap-3">

                  <span className="w-2 h-2 rounded-full bg-[#A66A45]" />

                  <p className="text-sm text-[#333333]">
                    {item.status}
                  </p>

                </div>

                {/* Track button */}

                <button
                  onClick={() => {
                    navigate(`/track-order/${item.orderId}`);
                  }}
                  className="border border-[#222222] px-5 py-2.5 text-xs tracking-[0.1em] text-[#222222] hover:bg-[#222222] hover:text-white transition-colors"
                >
                  TRACK ORDER
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        /* ================= EMPTY ORDERS ================= */

        <div className="flex flex-col items-center justify-center py-24 text-center">

          <p className="text-lg text-[#333333]">
            No orders yet
          </p>

          <p className="text-sm text-[#6B6B6B] mt-2">
            Your completed purchases will appear here.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="mt-7 bg-[#222222] text-white px-8 py-3 text-sm tracking-[0.1em] hover:bg-[#A66A45] transition-colors"
          >
            START SHOPPING
          </button>

        </div>
      )}

    </main>
  );
};

export default Orders;