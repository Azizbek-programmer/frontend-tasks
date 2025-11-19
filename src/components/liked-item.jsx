import { useDispatch } from "react-redux";
import { toggleLike } from "../store/reducer/product-reducer";
import { formatter } from "../config/formater";

export const LikedItem = (product) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="h-[266px] mb-[25px]">
        <img
          className="w-full h-full object-cover"
          src={product.img}
          alt=""
        />
      </div>

      <h3>{product.title}</h3>
      <p>{formatter(product.price)} UZS</p>

      <button
        onClick={() => dispatch(toggleLike({ id: product.id }))}
        className="bg-red-400 p-2 cursor-pointer"
      >
        remove
      </button>
    </div>
  );
};
