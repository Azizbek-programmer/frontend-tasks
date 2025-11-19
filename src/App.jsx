import { Link, Route, Routes } from "react-router";
import { Home } from "./page/home";
import { Cart } from "./page/cart";
import { Like } from "./page/like";

function App() {
  return (
    <>
      <header className="flex justify-center gap-5 bg-amber-300 p-6">
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>cart</Link>
        <Link to={"/likes"}>like</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/likes" element={<Like />} />
      </Routes>
    </>
  );
}

export default App;
