
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {    
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
import { links } from "./layout-data"

export function AppSidebar({role}: {role: "admin" | "teacher"}) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
         <SidebarGroupContent>
            <SidebarMenu>
              {links[role].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}