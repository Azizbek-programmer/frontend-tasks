import { Calendar, Home, Inbox, Search, Settings, Camera } from "lucide-react";

export const links = {
  admin: [
    {
      title: "Home",
      url: "/app/admin",
      icon: Home,
    },
    {
      title: "Teachers",
      url: "/app/admin/teachers",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
  teacher: [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Camera,
    },
  ],
};



