import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./navbar";

export const MainLayout = () => {
  const role = localStorage.getItem("role") as "admin" | "teacher" || "teacher";

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <main className="grow">
        <div className="p-3">
          <SidebarTrigger className="cursor-pointer" />
        </div>
        <div className="px-[30px] py-3">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
