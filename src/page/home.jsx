import React from "react";
import { ProductCard } from "../components/product-card";

export const Home = () => {
  const [produts, setProduts] = React.useState([]);

  React.useEffect(() => {
    fetch("https://market-backend-zeta.vercel.app/phones")
      .then((res) => res.json())
      .then((data) => {
        setProduts(data);
      });
  }, []);

  return (
    <div className="container">
      <div className="grid gap-2 grid-cols-4">
        {produts.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
