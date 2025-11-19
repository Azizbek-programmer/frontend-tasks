import React from "react";
import { useSelector } from "react-redux";
import { LikedItem } from "../components/liked-item";

export const Like = () => {
  const { likeList } = useSelector((state) => state.product);

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-5">
        {likeList.map((item) => (
          <LikedItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
