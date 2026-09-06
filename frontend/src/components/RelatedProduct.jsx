import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relProduct, setRelProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let copyProducts = products.slice();

      copyProducts = copyProducts.filter(
        (item) => category === item.category
      );

      copyProducts = copyProducts.filter(
        (item) => subCategory === item.subCategory
      );

      setRelProduct(copyProducts.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <section className="mt-20 mb-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs sm:text-sm tracking-[0.25em] text-[#A66A45] mb-3">
          YOU MAY ALSO LIKE
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="RELATED" text2="PRODUCTS" />
        </div>

        <p className="max-w-xl mx-auto mt-4 px-4 text-sm text-[#6B6B6B] leading-6">
          Discover more styles from the same collection, selected to
          complement your look.
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
        {relProduct.map((product) => (
          <ProductItem
            key={product._id}
            {...product}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;