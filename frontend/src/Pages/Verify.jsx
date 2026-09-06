import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyPayment = () => {
  const {
    navigate,
    token,
    setCartItems,
    backendUrl
  } = useContext(ShopContext);

  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const handleVerifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const res = await axios.post(
        backendUrl + "/api/order/verifystripe",
        {
          success,
          orderId
        },
        {
          headers: { token }
        }
      );

      if (res.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token && orderId) {
      handleVerifyPayment();
    }
  }, [token, orderId]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-20">

      <div className="w-full max-w-md text-center">

        <div className="mx-auto w-12 h-12 border-2 border-[#DDD6CE] border-t-[#A66A45] rounded-full animate-spin"></div>

        <p className="mt-8 text-xs tracking-[0.25em] text-[#A66A45]">
          PAYMENT VERIFICATION
        </p>

        <h1 className="mt-3 text-2xl font-medium text-[#222]">
          Verifying Your Payment
        </h1>

        <p className="mt-4 text-sm text-[#6B6B6B] leading-6">
          Please wait while we confirm your payment and update your order.
        </p>

      </div>

    </main>
  );
};

export default VerifyPayment;