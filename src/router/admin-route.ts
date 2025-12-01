import { Students } from "@/pages/admin/students/students";
import { Teachers } from "@/pages/admin/teachers/teachers";
import { Profile } from "@/pages/admin/profile";
import { Settings } from "@/pages/admin/settings";

export default [
  {
    path: "teachers",
    page: Teachers,
  },
  {
    path: "students",
    page: Students,
  },
  {
    path: "profile",
    page: Profile,
  },
  {
    path: "settings",
    page: Settings,
  },
];
