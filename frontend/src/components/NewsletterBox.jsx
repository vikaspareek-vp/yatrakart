import React from "react";

const NewsletterBox = () => {

  const handleNewsletter = (e) => {
    e.preventDefault();
  };

  return (
    <section className="my-20">

      <div className="bg-[#EDE5DC] px-6 sm:px-12 py-14 sm:py-16 text-center">

        {/* Heading */}
        <p className="text-2xl sm:text-3xl font-medium text-[#222]">
          Subscribe & Get 20% Off
        </p>

        {/* Description */}
        <p className="text-sm text-[#6B6B6B] mt-4 max-w-lg mx-auto leading-6">
          Join the YatraKart community and receive 20% off your
          first purchase, along with updates on our latest collections.
        </p>

        {/* Form */}
        <form
          onSubmit={handleNewsletter}
          className="w-full sm:w-[550px] flex items-center gap-2 my-8 mx-auto bg-white border border-[#D8CEC3] p-1"
        >
          <input
            required
            className="flex-1 px-4 py-3 outline-none text-sm bg-transparent"
            type="email"
            placeholder="Enter your email address"
          />

          <button
            className="bg-[#222] text-white text-xs px-6 sm:px-10 py-3 hover:bg-[#A66A45] transition"
            type="submit"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-xs text-[#8A8179]">
          No spam. Just fashion updates and exclusive offers.
        </p>

      </div>

    </section>
  );
};

export default NewsletterBox;