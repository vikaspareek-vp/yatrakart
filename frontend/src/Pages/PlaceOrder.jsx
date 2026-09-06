import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
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
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];

              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        items: orderItems,
        address: formData,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const res = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: { token },
            }
          );

          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }

          break;
        }

        case "stripe": {
          const stripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            {
              headers: { token },
            }
          );

          if (stripe.data.success) {
            const { session_url } = stripe.data;

            window.location.replace(session_url);
          } else {
            toast.error(stripe.data.message);
          }

          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="border-t border-[#DDD6CE] pt-10 sm:pt-14 min-h-[80vh]"
    >
      {/* ================= HEADER ================= */}

      <div className="text-center mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm tracking-[0.3em] text-[#A66A45] mb-3">
          COMPLETE YOUR PURCHASE
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="PLACE" text2="ORDER" />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">

        {/* ================= DELIVERY INFORMATION ================= */}

        <div className="w-full lg:max-w-[600px]">

          <div className="mb-6">
            <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-2">
              STEP 01
            </p>

            <h2 className="text-xl sm:text-2xl font-medium text-[#222222]">
              Delivery Information
            </h2>
          </div>

          <div className="flex flex-col gap-4">

            {/* First + Last Name */}

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
                type="text"
                placeholder="First name"
              />

              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
                type="text"
                placeholder="Last name"
              />
            </div>

            {/* Email */}

            <input
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
              type="email"
              placeholder="Email address"
            />

            {/* Street */}

            <input
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
              type="text"
              placeholder="Street address"
            />

            {/* City + State */}

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
                type="text"
                placeholder="City"
              />

              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
                type="text"
                placeholder="State"
              />
            </div>

            {/* Zip + Country */}

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
                type="text"
                placeholder="Zipcode"
              />

              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
                type="text"
                placeholder="Country"
              />
            </div>

            {/* Phone */}

            <input
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              className="border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm outline-none focus:border-[#A66A45] w-full"
              type="text"
              placeholder="Phone number"
            />

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="w-full lg:max-w-[450px]">

          {/* Cart Total */}

          <div>
            <div className="mb-5">
              <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-2">
                ORDER SUMMARY
              </p>

              <h2 className="text-xl font-medium text-[#222222]">
                Your Order
              </h2>
            </div>

            <div className="border border-[#DDD6CE] bg-white p-5">
              <CartTotal />
            </div>
          </div>

          {/* Payment */}

          <div className="mt-10">

            <div className="mb-5">
              <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-2">
                STEP 02
              </p>

              <h2 className="text-xl font-medium text-[#222222]">
                Payment Method
              </h2>
            </div>

            <div className="flex flex-col gap-3">

              {/* Stripe */}

              <button
                type="button"
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-4 border p-4 text-left transition-all ${
                  method === "stripe"
                    ? "border-[#A66A45] bg-[#EDE5DC]"
                    : "border-[#DDD6CE] bg-white"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                    method === "stripe"
                      ? "border-[#A66A45] bg-[#A66A45]"
                      : "border-[#AAA]"
                  }`}
                />

                <img
                  className="h-5"
                  src={assets.stripe_logo}
                  alt="Stripe"
                />

                <span className="text-sm text-[#333333]">
                  Pay securely with Stripe
                </span>
              </button>

              {/* COD */}

              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-4 border p-4 text-left transition-all ${
                  method === "cod"
                    ? "border-[#A66A45] bg-[#EDE5DC]"
                    : "border-[#DDD6CE] bg-white"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                    method === "cod"
                      ? "border-[#A66A45] bg-[#A66A45]"
                      : "border-[#AAA]"
                  }`}
                />

                <span className="text-sm font-medium text-[#333333]">
                  Cash on Delivery
                </span>
              </button>

            </div>
          </div>

          {/* Place Order */}

          <button
            type="submit"
            className="w-full mt-8 bg-[#222222] text-white py-4 text-sm tracking-[0.12em] hover:bg-[#A66A45] transition-colors"
          >
            PLACE ORDER
          </button>

        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;