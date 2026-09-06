import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <section className="my-20 border-y border-[#E5DED6] py-16">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">

        {/* Easy Exchange */}
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#EDE5DC] flex items-center justify-center">
            <img
              className="w-8"
              src={assets.exchange_icon}
              alt="Easy exchange"
            />
          </div>

          <p className="text-sm font-semibold text-[#222] tracking-wide">
            EASY EXCHANGE
          </p>

          <p className="text-sm text-[#6B6B6B] mt-2 leading-6">
            We offer a hassle-free exchange policy.
          </p>
        </div>

        {/* Return Policy */}
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#EDE5DC] flex items-center justify-center">
            <img
              className="w-8"
              src={assets.quality_icon}
              alt="Return policy"
            />
          </div>

          <p className="text-sm font-semibold text-[#222] tracking-wide">
            7-DAY RETURNS
          </p>

          <p className="text-sm text-[#6B6B6B] mt-2 leading-6">
            Enjoy a simple and convenient 7-day return policy.
          </p>
        </div>

        {/* Customer Support */}
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#EDE5DC] flex items-center justify-center">
            <img
              className="w-8"
              src={assets.support_img}
              alt="Customer support"
            />
          </div>

          <p className="text-sm font-semibold text-[#222] tracking-wide">
            CUSTOMER SUPPORT
          </p>

          <p className="text-sm text-[#6B6B6B] mt-2 leading-6">
            Our support team is here to help you 24/7.
          </p>
        </div>

      </div>

    </section>
  );
};

export default OurPolicy;