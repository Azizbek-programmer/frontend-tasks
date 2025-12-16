import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { TeacherTable } from "../../admin/components/table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTeacherGroupsList } from "../service/query/useTeacherGroupsList";

type Groups = {
  name: string;
  studentCount: number;
  startTime: string;
  endTime: string;
  durationInMonths: string;
  teacherName: string;
  teacherAvatarUrl: string;
  id: string;
};

export const TeacherGroups = () => {
  const { data, isLoading } = useTeacherGroupsList();
  const navigate = useNavigate();

  const columns: ColumnDef<Groups>[] = [
    { accessorKey: "name", header: "Group Name" },
    { accessorKey: "studentCount", header: "Students" },
    { accessorKey: "startTime", header: "Start Time" },
    { accessorKey: "endTime", header: "End Time" },
    { accessorKey: "durationInMonths", header: "Duration (Months)" },
    {
      accessorKey: "teacherName",
      header: "Teacher",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.teacherAvatarUrl ? (
            <img
              src={row.original.teacherAvatarUrl}
              alt={row.original.teacherName}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
              {row.original.teacherName.charAt(0)}
            </div>
          )}
          <span>{row.original.teacherName}</span>
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/app/teacher/groups/${row.original.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  const groups: Groups[] = React.useMemo(() => {
    if (!Array.isArray(data?.data)) return [];
    return data.data.map((item) => ({
      id: item.id,
      name: item.name || "",
      studentCount: item.studentCount || item.students?.length || 0,
      startTime: item.startTime?.slice(0, 5) || "N/A",
      endTime: item.endTime?.slice(0, 5) || "N/A",
      durationInMonths: `${item.durationInMonths || 0}`,
      teacherName: item.teacher?.name || "No teacher",
      teacherAvatarUrl: item.teacher?.avatarUrl || "",
    }));
  }, [data]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Groups</h1>
      {isLoading ? <Spinner /> : <TeacherTable columns={columns} data={groups} />}
    </div>
  );
};
