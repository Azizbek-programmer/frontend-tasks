// import { Students } from "@/pages/admin/students/students";
import { Teachers } from "@/pages/admin/teachers/teachers";
import { Profile } from "@/pages/admin/profile";
import { Settings } from "@/pages/admin/settings";
import { TeacherDetail } from "@/pages/admin/teachers/teacher-dtail";
import { Groups } from "@/pages/admin/groups/groups";
import { GroupDetail } from "@/pages/admin/groups/group-detail";
// import { Groups } from "@/pages/admin/groups/groups";

export default [
  {
    path: "teachers",
    page: Teachers,
  },
  {
    path: "teacher/:id",
    page: TeacherDetail,
  },
  // groups
  {
    path: "groups",
    page: Groups,
  },
    {
    path: "group/:id",
    page: GroupDetail,
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
