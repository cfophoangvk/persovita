import { Link } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import Badge from "./Badge";

const ProductItem = (props: { product: Product }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="relative h-44 mb-4 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
        <img
          src={props.product.image}
          alt={props.product.name}
          className="object-contain h-full w-full"
        />
        <div className="absolute top-3 left-3 space-y-1">
          <Badge text={props.product.feature} />
        </div>
      </div>

      <h3 className="font-semibold mb-1">
        <Link
          to={`/products/${props.product.id}`}
          className="hover:text-teal-600 transition"
        >
          {props.product.name}
        </Link>
      </h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {props.product.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">
          {props.product.price
            ? `${props.product.price.toLocaleString()} VND`
            : "Contact"}
        </div>
        <button
          onClick={() => {}}
          className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center hover:bg-teal-200 transition"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
