import React from "react";
import { useSelector } from "react-redux";
import { LocalProduct } from "../components/local-product";
import { formatter } from "../config/formater";

export const Cart = () => {
  const { productList, count, totalPrice } = useSelector(
    (state) => state.product
  );

  return (
    <div className="container">
      <h1 className="text-4xl">{formatter(totalPrice)} UZS</h1>
      <p>{count}</p>
      <div className="grid grid-cols-4 gap-5">
        {productList.map((item) => (
          <LocalProduct key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
