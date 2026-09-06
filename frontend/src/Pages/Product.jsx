import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  const fetchProductData = () => {
    products.forEach((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    addToCart(productData._id, size);
    navigate("/cart");
  };

  return productData ? (
    <main className="border-t border-[#DDD6CE] pt-10 sm:pt-14">

      {/* ================= PRODUCT ================= */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* ================= IMAGES ================= */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">

          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-[18%]">

            {productData.image.map((item, index) => (
              <button
                key={index}
                onClick={() => setImage(item)}
                className={`flex-shrink-0 border transition-all duration-200 ${
                  image === item
                    ? "border-[#A66A45]"
                    : "border-transparent hover:border-[#DDD6CE]"
                }`}
              >
                <img
                  src={item}
                  alt={`${productData.name} ${index + 1}`}
                  className="w-20 sm:w-full aspect-[3/4] object-cover"
                />
              </button>
            ))}

          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#EDE5DC]">
            <img
              src={image}
              alt={productData.name}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>

        </div>

        {/* ================= PRODUCT INFORMATION ================= */}
        <div className="flex-1 lg:pt-2">

          {/* Category */}
          <p className="text-xs tracking-[0.25em] text-[#A66A45] uppercase">
            {productData.category}
          </p>

          {/* Name */}
          <h1 className="mt-3 text-2xl sm:text-3xl font-medium text-[#222222] leading-tight">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-4">

            <img
              src={assets.star_icon}
              alt="star"
              className="w-3.5"
            />

            <img
              src={assets.star_icon}
              alt="star"
              className="w-3.5"
            />

            <img
              src={assets.star_icon}
              alt="star"
              className="w-3.5"
            />

            <img
              src={assets.star_icon}
              alt="star"
              className="w-3.5"
            />

            <img
              src={assets.star_dull_icon}
              alt="star"
              className="w-3.5"
            />

            <span className="ml-2 text-sm text-[#6B6B6B]">
              (132 reviews)
            </span>

          </div>

          {/* Price */}
          <p className="mt-6 text-2xl font-medium text-[#222222]">
            {productData.price} {currency}
          </p>

          {/* Description */}
          <p className="mt-6 max-w-xl text-sm text-[#6B6B6B] leading-7">
            {productData.description}
          </p>

          {/* ================= SIZE ================= */}
          <div className="mt-8">

            <p className="text-sm font-medium text-[#222222] mb-4">
              SELECT SIZE
            </p>

            <div className="flex flex-wrap gap-3">

              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`min-w-14 px-4 py-2.5 text-sm border transition-all duration-200 ${
                    item === size
                      ? "border-[#A66A45] bg-[#A66A45] text-white"
                      : "border-[#DDD6CE] bg-[#FAF8F5] text-[#333333] hover:border-[#A66A45]"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* ================= ADD TO CART ================= */}
          <button
            onClick={handleAddToCart}
            className="mt-9 bg-[#222222] text-white px-10 py-3.5 text-sm tracking-[0.12em] transition-colors duration-200 hover:bg-[#A66A45] active:scale-[0.98]"
          >
            ADD TO CART
          </button>

          {/* Divider */}
          <div className="border-t border-[#DDD6CE] mt-9 pt-6">

            <div className="flex flex-col gap-2 text-sm text-[#6B6B6B]">

              <p>✓ 100% Original Product</p>

              <p>✓ Cash on Delivery Available</p>

              <p>✓ Easy Returns & Exchange Within 7 Days</p>

            </div>

          </div>

        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <section className="mt-20 sm:mt-24">

        <div className="flex">

          <button className="border border-[#DDD6CE] bg-white px-6 py-3 text-sm font-medium text-[#222222]">
            Description
          </button>

          <button className="border-y border-r border-[#DDD6CE] px-6 py-3 text-sm text-[#6B6B6B]">
            Reviews (132)
          </button>

        </div>

        <div className="border-x border-b border-[#DDD6CE] bg-white p-6 sm:p-8">

          <p className="text-sm text-[#6B6B6B] leading-7">
            {productData.description}
          </p>

          <p className="mt-4 text-sm text-[#6B6B6B] leading-7">
            Designed for everyday comfort and effortless style, this piece
            is made to complement your wardrobe with a versatile and timeless
            look.
          </p>

        </div>

      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />

    </main>
  ) : (
    <div className="min-h-[50vh]" />
  );
};

export default Product;