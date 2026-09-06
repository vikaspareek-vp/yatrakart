import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  return (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14 pb-20">

      {/* Page Heading */}
      <div className="text-center mb-14">
        <p className="text-xs sm:text-sm tracking-[0.25em] text-[#A66A45] mb-3">
          OUR STORY
        </p>

        <Title text1="ABOUT" text2="YATRAKART" />
      </div>

      {/* Story Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

        <div className="bg-[#EDE5DC]">
          <img
            src={assets.about_img}
            alt="YatraKart fashion collection"
            className="w-full"
          />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-medium text-[#222] mb-5">
            Fashion for Every Journey
          </h2>

          <p className="text-sm text-[#6B6B6B] leading-7 mb-5">
            YatraKart is an online fashion destination created to make
            everyday shopping simple, comfortable, and enjoyable.
          </p>

          <p className="text-sm text-[#6B6B6B] leading-7 mb-5">
            From timeless essentials to modern styles, we bring together
            carefully selected pieces designed for different occasions
            and everyday journeys.
          </p>

          <p className="text-sm text-[#6B6B6B] leading-7">
            Our focus is on providing a smooth shopping experience,
            reliable service, and fashion that fits naturally into
            your everyday life.
          </p>
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="mt-20">

        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-3">
            WHY YATRAKART
          </p>

          <Title text1="WHAT" text2="WE VALUE" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="border border-[#DDD6CE] p-7 bg-white">
            <h3 className="text-sm font-medium tracking-wide text-[#222] mb-4">
              QUALITY
            </h3>

            <p className="text-sm text-[#6B6B6B] leading-6">
              We focus on products that combine comfort, style, and
              dependable quality.
            </p>
          </div>

          <div className="border border-[#DDD6CE] p-7 bg-white">
            <h3 className="text-sm font-medium tracking-wide text-[#222] mb-4">
              SIMPLICITY
            </h3>

            <p className="text-sm text-[#6B6B6B] leading-6">
              From discovering products to placing an order, we aim
              to keep the shopping experience simple.
            </p>
          </div>

          <div className="border border-[#DDD6CE] p-7 bg-white">
            <h3 className="text-sm font-medium tracking-wide text-[#222] mb-4">
              CUSTOMER FIRST
            </h3>

            <p className="text-sm text-[#6B6B6B] leading-6">
              We value customer satisfaction and strive to provide
              helpful and reliable service.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default About;