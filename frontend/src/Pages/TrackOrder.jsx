import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const TrackOrder = () => {
  const { orderId } = useParams();
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const foundOrder = response.data.orders.find(
          (order) => order._id === orderId
        );

        setOrder(foundOrder);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getOrder();
    }
  }, [token, orderId]);

  if (!order) {
    return (
      <main className="border-t border-[#DDD6CE] pt-14">
        <div className="text-center py-20">
          <p className="text-sm text-[#6B6B6B]">
            Loading order details...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14 pb-20">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-3">
          ORDER DETAILS
        </p>

        <Title text1="TRACK" text2="ORDER" />

        <p className="text-sm text-[#6B6B6B] mt-3">
          Order ID: {order._id}
        </p>
      </div>

      {/* Order Items */}
      <div className="border border-[#DDD6CE] bg-white">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 p-5 sm:p-6 border-b border-[#E5DED6] last:border-b-0"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-24 h-28 sm:w-28 sm:h-32 object-cover bg-[#EDE5DC]"
            />

            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium text-[#222]">
                {item.name}
              </h3>

              <p className="mt-2 text-sm text-[#6B6B6B]">
                Price: {item.price} {currency}
              </p>

              <p className="text-sm text-[#6B6B6B]">
                Size: {item.size}
              </p>

              <p className="text-sm text-[#6B6B6B]">
                Quantity: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status */}
      <div className="mt-8 border border-[#DDD6CE] bg-[#FAF8F5] p-6 sm:p-8">
        <p className="text-xs tracking-[0.2em] text-[#A66A45] mb-4">
          DELIVERY STATUS
        </p>

        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#A66A45]" />

          <p className="text-base font-medium text-[#222]">
            {order.status}
          </p>
        </div>

        <p className="text-sm text-[#6B6B6B] mt-3">
          Your order is currently being processed. We will keep you
          updated as its status changes.
        </p>
      </div>

      {/* Order Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Payment */}
        <div className="border border-[#DDD6CE] p-6">
          <p className="text-xs tracking-[0.2em] text-[#A66A45] mb-4">
            PAYMENT
          </p>

          <p className="text-sm text-[#333]">
            Method:{" "}
            <span className="text-[#6B6B6B]">
              {order.paymentMethod}
            </span>
          </p>

          <p className="text-sm text-[#333] mt-2">
            Payment Status:{" "}
            <span className="text-[#6B6B6B]">
              {order.payment ? "Paid" : "Pending"}
            </span>
          </p>
        </div>

        {/* Delivery */}
        <div className="border border-[#DDD6CE] p-6">
          <p className="text-xs tracking-[0.2em] text-[#A66A45] mb-4">
            DELIVERY ADDRESS
          </p>

          <p className="text-sm text-[#333]">
            {order.address.firstName} {order.address.lastName}
          </p>

          <p className="text-sm text-[#6B6B6B] mt-2">
            {order.address.street}
          </p>

          <p className="text-sm text-[#6B6B6B]">
            {order.address.city}, {order.address.state}
          </p>

          <p className="text-sm text-[#6B6B6B]">
            {order.address.zipcode}
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="mt-8 flex justify-end">
        <div className="w-full sm:w-80 border-t border-[#222] pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B6B6B]">Order Total</span>

            <span className="font-medium text-[#222]">
              {order.amount} {currency}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TrackOrder;