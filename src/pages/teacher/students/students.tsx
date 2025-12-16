import React, { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { TeacherTable } from "@/pages/admin/components/table";
import { Spinner } from "@/components/ui/spinner";
import { useMyStudents } from "../service/query/useMyStudents";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddGradeForm } from "../components/AddGradeForm";
import { useNavigate } from "react-router-dom";

type StudentRow = {
  id: string;
  count: number;
  name: string;
  email: string;
  grade: string;
  behavior: string;
};

export const MyStudents = () => {
  const { data, isLoading } = useMyStudents();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const openGradeModal = (studentId: string) => {
    setSelectedStudentId(studentId);
    setOpen(true);
  };

  const viewStudentDetail = (studentId: string) => {
    navigate(`/app/teacher/students/${studentId}`);
  };

  const columns: ColumnDef<StudentRow>[] = [
    { accessorKey: "count", header: "№" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "grade", header: "Grade" },
    { accessorKey: "behavior", header: "Behavior" },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => viewStudentDetail(row.original.id)}>
            View
          </Button>
          <Button size="sm" onClick={() => openGradeModal(row.original.id)}>
            Add Grade
          </Button>
        </div>
      ),
    },
  ];

  const students: StudentRow[] = React.useMemo(() => {
    if (!Array.isArray(data?.data)) return [];
    return data.data.map((item, index) => ({
      id: item.id,
      count: index + 1,
      name: item.name,
      email: item.email,
      grade: item.grade ?? "-",
      behavior: item.behavior ?? "-",
    }));
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <TeacherTable columns={columns} data={students} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Grade</DialogTitle>
          </DialogHeader>

          {selectedStudentId && (
            <AddGradeForm
              studentId={selectedStudentId}
              closeModal={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
