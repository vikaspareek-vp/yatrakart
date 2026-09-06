import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    setBestSeller(
      products.filter((item) => item.bestseller).slice(0, 6)
    );
  }, [products]);

  return (
    <section className="my-20">

      {/* Section Heading */}
      <div className="text-center mb-10">

        <p className="text-xs sm:text-sm tracking-[0.25em] text-[#A66A45] mb-3">
          MOST LOVED STYLES
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="BEST" text2="SELLERS" />
        </div>

        <p className="max-w-2xl mx-auto mt-4 px-4 text-sm text-[#6B6B6B] leading-6">
          Discover the styles our customers love most,
          from timeless essentials to modern everyday favorites.
        </p>

      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10">
        {bestSeller.map((item, index) => (
          <ProductItem key={index} {...item} />
        ))}
      </div>

    </section>
  );
};

export default BestSeller;