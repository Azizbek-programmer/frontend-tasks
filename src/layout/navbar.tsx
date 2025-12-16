import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { links } from "./layout-data";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ActiveLink } from "@/components/active-link";
import { Button } from "@/components/ui/button";
import Cookie from "js-cookie";

export function AppSidebar({ role }: { role: "admin" | "teacher" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Cookie.remove("token");
    Cookie.remove("role");
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-3">
        <Link to={`/app/${role}`}>
          <img src={logo} alt="img" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroupContent className="p-0">
          <SidebarMenu>
            {links[role].map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <ActiveLink href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </ActiveLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Button variant="ghost" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
