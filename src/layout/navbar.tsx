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

// Menu items.
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { ActiveLink } from "@/components/active-link";

export function AppSidebar({ role }: { role: "admin" | "teacher" }) {
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
      <SidebarFooter />
    </Sidebar>
  );
}
