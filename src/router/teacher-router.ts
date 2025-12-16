  import { TeacherGroups } from "@/pages/teacher/groups/groups";
  import { MyStudents } from "@/pages/teacher/students/students";
  import { TeacherProfile } from "@/pages/teacher/profile";
  import { TeacherGroupDetail } from "@/pages/teacher/groups/teacherGroupDtail";
import { StudentDetail } from "@/pages/teacher/students/StudentDetail";

export default [
  {
    path: "teacher",
    page: TeacherProfile,
  },
  {
    path: "groups",
    page: TeacherGroups,
  },
  {
    path: "students",
    page: MyStudents,
  },
  {
    path: "students/:id",
    page: StudentDetail,
  },
  {
    path: "groups/:id",
    page: TeacherGroupDetail,
  },
];


