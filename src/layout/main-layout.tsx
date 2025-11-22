import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <header className="p-5 bg-amber-400"></header>
      <Outlet />
    </>
  );
};
