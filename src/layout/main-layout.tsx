import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./navbar";

export const MainLayout = () => {
    const role = "admin"
  return (
    <SidebarProvider>
      <AppSidebar role={role}/>
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
