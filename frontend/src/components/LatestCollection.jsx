import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="my-20">

      {/* Section Heading */}
      <div className="text-center mb-10">

        <p className="text-xs sm:text-sm tracking-[0.25em] text-gray-500 mb-3">
          EXPLORE OUR COLLECTION
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="LATEST" text2="COLLECTIONS" />
        </div>

        <p className="max-w-2xl mx-auto mt-4 px-4 text-sm text-gray-500 leading-6">
          Discover our newest styles, thoughtfully selected to bring
          comfort, quality, and modern fashion to your everyday wardrobe.
        </p>

      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
        {latestProducts.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
      </div>

    </section>
  );
};

export default LatestCollections;