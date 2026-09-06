import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Contact = () => {
  return (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14 pb-20">

      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-xs sm:text-sm tracking-[0.25em] text-[#A66A45] mb-3">
          GET IN TOUCH
        </p>

        <Title text1="CONTACT" text2="YATRAKART" />
      </div>

      {/* Contact Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Image */}
        <div className="bg-[#EDE5DC]">
          <img
            src={assets.contact_img}
            alt="Contact YatraKart"
            className="w-full"
          />
        </div>

        {/* Information */}
        <div>
          <h2 className="text-xl sm:text-2xl font-medium text-[#222] mb-6">
            We'd Love to Hear From You
          </h2>

          <p className="text-sm text-[#6B6B6B] leading-7 mb-8">
            Have a question about an order, product, delivery, or anything
            else? Our team is here to help.
          </p>

          {/* Contact Details */}
          <div className="space-y-6">

            <div>
              <p className="text-xs tracking-[0.2em] text-[#A66A45] mb-2">
                EMAIL
              </p>

              <p className="text-sm text-[#333]">
                support@yatrakart.com
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-[#A66A45] mb-2">
                PHONE
              </p>

              <p className="text-sm text-[#333]">
                +91 78XXX XXX10
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-[#A66A45] mb-2">
                STORE HOURS
              </p>

              <p className="text-sm text-[#6B6B6B]">
                Monday – Saturday
              </p>

              <p className="text-sm text-[#6B6B6B]">
                10:00 AM – 6:00 PM
              </p>
            </div>

          </div>

          {/* Button */}
          <button
            type="button"
            className="mt-10 bg-[#222] text-white px-8 py-3 text-sm tracking-wide hover:bg-[#A66A45] transition"
          >
            CONTACT US
          </button>
        </div>

      </section>

      {/* Help Section */}
      <section className="mt-20 border-t border-[#DDD6CE] pt-14">

        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-3">
            CUSTOMER SUPPORT
          </p>

          <Title text1="HOW CAN" text2="WE HELP?" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="border border-[#DDD6CE] bg-white p-7">
            <h3 className="text-sm font-medium text-[#222] mb-3">
              ORDER SUPPORT
            </h3>

            <p className="text-sm text-[#6B6B6B] leading-6">
              Need help with an existing order? We're here to help
              with order and delivery questions.
            </p>
          </div>

          <div className="border border-[#DDD6CE] bg-white p-7">
            <h3 className="text-sm font-medium text-[#222] mb-3">
              PRODUCT QUESTIONS
            </h3>

            <p className="text-sm text-[#6B6B6B] leading-6">
              Have questions about sizing, products, or availability?
              Get in touch with our team.
            </p>
          </div>

          <div className="border border-[#DDD6CE] bg-white p-7">
            <h3 className="text-sm font-medium text-[#222] mb-3">
              GENERAL ENQUIRIES
            </h3>

            <p className="text-sm text-[#6B6B6B] leading-6">
              For any other questions or feedback, feel free to
              contact us.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default Contact;