import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
       setCategory("Men");
        setSubcategory("Topwear");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  return (
    <main className="px-4 sm:px-8 py-8 bg-[#FAF8F5] min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.25em] text-[#A66A45] mb-2">
          INVENTORY
        </p>

        <h1 className="text-2xl sm:text-3xl font-medium text-[#222]">
          Add Product
        </h1>

        <p className="mt-2 text-sm text-[#6B6B6B]">
          Add a new product to your YatraKart collection.
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white border border-[#DDD6CE] p-5 sm:p-8 max-w-5xl"
      >

        {/* Images */}
        <section className="mb-9">
          <p className="text-sm font-medium text-[#222] mb-3">
            Product Images
          </p>

          <p className="text-xs text-[#888] mb-4">
            Upload up to four product images.
          </p>

          <div className="flex flex-wrap gap-3">

            {[1, 2, 3, 4].map((number) => {
              const image =
                number === 1
                  ? image1
                  : number === 2
                  ? image2
                  : number === 3
                  ? image3
                  : image4;

              const setImage =
                number === 1
                  ? setImage1
                  : number === 2
                  ? setImage2
                  : number === 3
                  ? setImage3
                  : setImage4;

              return (
                <label
                  key={number}
                  htmlFor={`image${number}`}
                  className="w-24 h-28 sm:w-28 sm:h-32 border border-[#DDD6CE] bg-[#FAF8F5] cursor-pointer overflow-hidden hover:border-[#A66A45] transition"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={
                      !image
                        ? assets.upload_area
                        : URL.createObjectURL(image)
                    }
                    alt={`upload ${number}`}
                  />

                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id={`image${number}`}
                    hidden
                  />
                </label>
              );
            })}

          </div>
        </section>

        {/* Product Information */}
        <section className="border-t border-[#E5DED6] pt-8">

          <p className="text-xs tracking-[0.2em] text-[#A66A45] mb-6">
            PRODUCT INFORMATION
          </p>

          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#333] mb-2">
              Product Name
            </label>

            <input
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-3 border border-[#DDD6CE] bg-[#FAF8F5] text-sm outline-none focus:border-[#A66A45] transition"
              type="text"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#333] mb-2">
              Product Description
            </label>

            <textarea
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full px-4 py-3 border border-[#DDD6CE] bg-[#FAF8F5] text-sm outline-none focus:border-[#A66A45] transition resize-none"
              rows="5"
              placeholder="Write a description for the product"
              required
            />
          </div>

          {/* Category / Subcategory / Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">

            <div>
              <label className="block text-sm font-medium text-[#333] mb-2">
                Category
              </label>

              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#DDD6CE] bg-[#FAF8F5] text-sm outline-none focus:border-[#A66A45]"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333] mb-2">
                Subcategory
              </label>

              <select
                name="subCategory"
                value={subCategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#DDD6CE] bg-[#FAF8F5] text-sm outline-none focus:border-[#A66A45]"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333] mb-2">
                Price
              </label>

              <input
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full px-4 py-3 border border-[#DDD6CE] bg-[#FAF8F5] text-sm outline-none focus:border-[#A66A45]"
                type="number"
                placeholder="25"
                required
              />
            </div>

          </div>

          {/* Sizes */}
          <div className="mb-7">
            <p className="text-sm font-medium text-[#333] mb-3">
              Available Sizes
            </p>

            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-5 py-2 text-sm border transition ${
                    sizes.includes(size)
                      ? "bg-[#A66A45] text-white border-[#A66A45]"
                      : "bg-[#FAF8F5] text-[#555] border-[#DDD6CE] hover:border-[#A66A45]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3 mb-8">
            <input
              name="bestseller"
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={() => setBestseller((prev) => !prev)}
              className="w-4 h-4 accent-[#A66A45]"
            />

            <label
              htmlFor="bestseller"
              className="text-sm text-[#444] cursor-pointer"
            >
              Add this product to Best Sellers
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="px-8 py-3 bg-[#222] text-white text-sm tracking-[0.12em] hover:bg-[#A66A45] transition duration-300"
          >
            ADD PRODUCT
          </button>

        </section>
      </form>
    </main>
  );
};

export default Add;