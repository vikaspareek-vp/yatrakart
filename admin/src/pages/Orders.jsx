import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleStatus = async (e, orderId) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );

      if (res.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 sm:px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-2">
          ORDER MANAGEMENT
        </p>

        <h1 className="text-2xl sm:text-3xl font-medium text-[#222]">
          Orders
        </h1>

        <p className="mt-2 text-sm text-[#6B6B6B]">
          View customer orders and manage their delivery status.
        </p>
      </div>

      {/* Orders */}
      <div className="space-y-4">

        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-[#DDD6CE] p-5 sm:p-6 lg:p-7"
            >

              {/* Top section */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">

                {/* Parcel */}
                <div className="w-12 h-12 bg-[#EDE5DC] flex items-center justify-center shrink-0">
                  <img
                    className="w-7 h-7"
                    src={assets.parcel_icon}
                    alt="parcel"
                  />
                </div>

                {/* Order + Customer */}
                <div className="flex-1 min-w-0">

                  {/* Products */}
                  <div className="mb-5">
                    <p className="text-xs tracking-[0.15em] text-[#A66A45] mb-2 uppercase">
                      Products
                    </p>

                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p
                          key={index}
                          className="text-sm text-[#333]"
                        >
                          {item.name}
                          <span className="text-[#777]">
                            {" "}× {item.quantity} · Size {item.size}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Customer */}
                  <div>
                    <p className="text-xs tracking-[0.15em] text-[#A66A45] mb-2 uppercase">
                      Customer
                    </p>

                    <p className="text-sm font-medium text-[#222]">
                      {order.address.firstName} {order.address.lastName}
                    </p>

                    <p className="mt-2 text-sm text-[#6B6B6B] leading-6">
                      {order.address.street},{" "}
                      {order.address.city},{" "}
                      {order.address.state},{" "}
                      {order.address.country},{" "}
                      {order.address.zipcode}
                    </p>

                    <p className="mt-1 text-sm text-[#6B6B6B]">
                      {order.address.phone}
                    </p>
                  </div>

                </div>

                {/* Order Information */}
                <div className="lg:w-52 border-t lg:border-t-0 lg:border-l border-[#E5DED6] pt-5 lg:pt-0 lg:pl-6">

                  <p className="text-xs tracking-[0.15em] text-[#A66A45] mb-3 uppercase">
                    Order Details
                  </p>

                  <div className="space-y-2 text-sm">
                    <p className="text-[#6B6B6B]">
                      Items:
                      <span className="text-[#222] ml-2">
                        {order.items.length}
                      </span>
                    </p>

                    <p className="text-[#6B6B6B]">
                      Method:
                      <span className="text-[#222] ml-2 capitalize">
                        {order.paymentMethod}
                      </span>
                    </p>

                    <p className="text-[#6B6B6B]">
                      Payment:
                      <span
                        className={`ml-2 ${
                          order.payment
                            ? "text-green-600"
                            : "text-[#A66A45]"
                        }`}
                      >
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                    </p>

                    <p className="text-[#6B6B6B]">
                      Date:
                      <span className="text-[#222] ml-2">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                </div>

                {/* Amount */}
                <div className="lg:w-32 lg:text-right">
                  <p className="text-xs tracking-[0.15em] text-[#A66A45] mb-2 uppercase">
                    Total
                  </p>

                  <p className="text-xl font-medium text-[#222]">
                    {currency}{order.amount}
                  </p>
                </div>

              </div>

              {/* Bottom section */}
              <div className="border-t border-[#E5DED6] mt-6 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <p className="text-xs text-[#888]">
                  Order ID: {order._id}
                </p>

                <div className="flex items-center gap-3">
                  <label className="text-sm text-[#555]">
                    Status
                  </label>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatus(e, order._id)}
                    className="px-4 py-2 border border-[#DDD6CE] bg-[#FAF8F5] text-sm text-[#333] outline-none focus:border-[#A66A45]"
                  >
                    <option value="Order Placed">
                      Order Placed
                    </option>

                    <option value="Packing">
                      Packing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Out for delivery">
                      Out for delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>
                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="bg-white border border-[#DDD6CE] py-16 text-center">
            <p className="text-sm text-[#777]">
              No orders available
            </p>

            <p className="mt-2 text-xs text-[#999]">
              Customer orders will appear here.
            </p>
          </div>
        )}

      </div>

    </main>
  );
};

export default Orders;