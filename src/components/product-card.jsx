import { useDispatch, useSelector } from "react-redux";
import { formatter } from "../config/formater";
import { addProduct, toggleLike } from "../store/reducer/product-reducer";

export const ProductCard = (product) => {
  const price = +product?.price?.split(" ").join("");
  const { likeList } = useSelector((state) => state.product);
  const liked = likeList.some((item) => item.id === product.id);
  const dispatch = useDispatch();

  const addStore = () => {
    dispatch(addProduct({ ...product, price }));
  };

  const addLikeFC = () => {
    dispatch(addLike({ ...product, price }));
  };

  return (
    <div className=" bg-gray-300">
      <div className=" h-[266px] mb-[25px]">
        <img
          className="w-full h-full object-cover"
          src={product.img}
          alt="img"
        />
      </div>
      <h3>{product.title}</h3>
      
      <p>{formatter(price)} UZS</p>
      <div className="flex w-50 pl-15 justify-between">
        <button onClick={addStore} className="bg-gray-400 p-2 cursor-pointer">
          add
        </button>
        <button
          onClick={() => dispatch(toggleLike({ ...product, price }))}
          className="bg-gray-400 p-2 cursor-pointer"
        >LIKE
        </button>
      </div>
    </div>
  );
};
