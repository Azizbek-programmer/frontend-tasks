import { formatter } from "../config/formater";
import { useDispatch } from "react-redux";
import {
  incrementPrice,
  decrementPrice,
  deleteProduct,
} from "../store/reducer/product-reducer";

export const LocalProduct = (product) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="h-[266px] mb-[25px]">
        <img
          className="w-full h-full object-cover"
          src={product.img}
          alt="img"
        />
      </div>
      <h3>{product.title}</h3>
      <p>{formatter(product.userPrice)} UZS</p>
      <button
        onClick={() => dispatch(incrementPrice({ id: product.id }))}
        className="bg-amber-400 p-2 cursor-pointer outline-none"
      >
        +
      </button>
      <span>{product.userCount}</span>
      {product.userCount < 2 ? (
        <button
          onClick={() => dispatch(deleteProduct({ id: product.id }))}
          className="bg-amber-400 p-2 cursor-pointer outline-none"
        >
          X
        </button>
      ) : (
        <button
          onClick={() => dispatch(decrementPrice({ id: product.id }))}
          className="bg-amber-400 p-2 cursor-pointer outline-none"
        >
          -
        </button>
      )}
    </div>
  );
};
