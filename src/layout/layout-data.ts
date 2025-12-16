import { Home, Users, Search, Settings, Group, User } from "lucide-react";

export const links = {
  admin: [
    { title: "Home", url: "/app/admin", icon: Home },
    { title: "Teachers", url: "/app/admin/teachers", icon: Users },
    { title: "Groups", url: "/app/admin/groups", icon: Group },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
  ],
  teacher: [
    { title: "Profile", url: "/app/teacher", icon: User },
    { title: "Groups", url: "/app/teacher/groups", icon: Group },
    { title: "Students", url: "/app/teacher/students", icon: Users },
  ],
};
