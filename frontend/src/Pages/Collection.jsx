import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    // Search
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // SubCategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sort
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <main className="pt-10 sm:pt-14">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm tracking-[0.3em] text-[#A66A45] mb-3">
          EXPLORE OUR STYLE
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="ALL" text2="COLLECTIONS" />
        </div>

        <p className="max-w-2xl mx-auto mt-4 px-5 text-sm text-[#6B6B6B] leading-6">
          Discover timeless essentials and contemporary styles,
          carefully selected for every part of your wardrobe.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">

        {/* ================= FILTER SIDEBAR ================= */}
        <aside className="sm:w-56 lg:w-60 shrink-0">

          {/* Mobile filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:hidden flex items-center justify-between border border-[#DDD6CE] bg-[#FAF8F5] px-4 py-3 text-sm tracking-wide"
          >
            <span className="font-medium">FILTERS</span>

            <img
              className={`w-3 transition-transform duration-300 ${
                showFilters ? "rotate-180" : ""
              }`}
              src={assets.dropdown_icon}
              alt="dropdown"
            />
          </button>

          {/* Filters */}
          <div
            className={`mt-3 sm:mt-0 ${
              showFilters ? "block" : "hidden sm:block"
            }`}
          >

            {/* Categories */}
            <div className="border border-[#DDD6CE] bg-white p-5">
              <p className="text-xs tracking-[0.2em] font-medium text-[#222222] mb-5">
                CATEGORIES
              </p>

              <div className="flex flex-col gap-4 text-sm text-[#6B6B6B]">

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value="Men"
                    onChange={toggleCategory}
                    className="accent-[#A66A45]"
                  />
                  <span className="group-hover:text-[#A66A45] transition-colors">
                    Men
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value="Women"
                    onChange={toggleCategory}
                    className="accent-[#A66A45]"
                  />
                  <span className="group-hover:text-[#A66A45] transition-colors">
                    Women
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value="Kids"
                    onChange={toggleCategory}
                    className="accent-[#A66A45]"
                  />
                  <span className="group-hover:text-[#A66A45] transition-colors">
                    Kids
                  </span>
                </label>

              </div>
            </div>

            {/* Type */}
            <div className="border border-[#DDD6CE] bg-white p-5 mt-4">
              <p className="text-xs tracking-[0.2em] font-medium text-[#222222] mb-5">
                TYPE
              </p>

              <div className="flex flex-col gap-4 text-sm text-[#6B6B6B]">

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value="Topwear"
                    onChange={toggleSubCategory}
                    className="accent-[#A66A45]"
                  />
                  <span className="group-hover:text-[#A66A45] transition-colors">
                    Topwear
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value="Bottomwear"
                    onChange={toggleSubCategory}
                    className="accent-[#A66A45]"
                  />
                  <span className="group-hover:text-[#A66A45] transition-colors">
                    Bottomwear
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value="Winterwear"
                    onChange={toggleSubCategory}
                    className="accent-[#A66A45]"
                  />
                  <span className="group-hover:text-[#A66A45] transition-colors">
                    Winterwear
                  </span>
                </label>

              </div>
            </div>

          </div>
        </aside>

        {/* ================= PRODUCTS ================= */}
        <section className="flex-1">

          {/* Products header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

            <div>
              <p className="text-xs tracking-[0.2em] text-[#6B6B6B]">
                {filterProducts.length} ITEMS
              </p>
            </div>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-[#DDD6CE] bg-[#FAF8F5] text-sm text-[#333] px-4 py-2.5 outline-none cursor-pointer focus:border-[#A66A45]"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

          </div>

          {/* Product grid */}
          {filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
              {filterProducts.map((item, index) => (
                <ProductItem key={index} {...item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg text-[#333333]">
                No products found
              </p>

              <p className="text-sm text-[#6B6B6B] mt-2">
                Try changing your search or filters.
              </p>
            </div>
          )}

        </section>
      </div>
    </main>
  );
};

export default Collection;