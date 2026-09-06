import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ _id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${_id}`}
      className="group cursor-pointer"
    >
      {/* Product Image */}
      <div className="overflow-hidden bg-[#EDE5DC]">
        <img
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          src={image[0]}
          alt={name}
        />
      </div>

      {/* Product Information */}
      <div className="pt-4">
        <p className="text-sm text-[#333] leading-5 line-clamp-1">
          {name}
        </p>

        <p className="mt-1 text-sm font-medium text-[#222]">
          {price} {currency}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;