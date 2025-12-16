import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { TeacherTable } from "../components/table";
import { useTeachersListPagination } from "../service/query/useTeachersList";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToggle } from "@/hooks/useToggle";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TeacherForm } from "../components/teacher-form";
import { TecherFormWrapper } from "../components/techer-form-wrapper";
import { useDeleteTeacher } from "../service/mutation/useDeleteTeacher";

type Payment = {
  count: number;
  name: string;
  id?: string;
  specification: string;
  isActive: "Active" | "Blocked";
  groups: number;
  username: string;
};

export const Teachers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { data, isLoading, isFetching } =
    useTeachersListPagination(page);

  const { mutate: deleteTeacher } = useDeleteTeacher();
  const { close, isOpen, open } = useToggle();
  const { close: close2, isOpen: isOpen2, open: open2 } = useToggle();
  const [editId, setEditID] = React.useState("");

  const navigate = useNavigate();

  const buttons = Array(data?.totalPages || 1).fill(null);

  const teachers: Payment[] = React.useMemo(() => {
    if (!Array.isArray(data?.data)) return [];
    return data.data.map((item, index) => ({
      groups: item.groups?.length || 0,
      id: item.id,
      count: (Number(page) - 1) * data.pageSize + index + 1,
      isActive: item.isActive ? "Active" : "Blocked",
      name: item.name,
      specification: item.specifications.map(s => s.name).join(", "),
      username: item.username,
    }));
  }, [data, page]);

  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "count", header: "Count" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "specification", header: "Specification" },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "groups", header: "Groups" },
    { accessorKey: "isActive", header: "Status" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const teacher = row.original;

        const editTeacher = () => {
          if (teacher.id) {
            setEditID(teacher.id);
            open2();
          }
        };

        const removeTeacher = () => {
          if (
            teacher.id &&
            confirm("Are you sure you want to delete this teacher?")
          ) {
            deleteTeacher(teacher.id);
          }
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={editTeacher}>
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  navigate(`/app/admin/teacher/${teacher.id}`)
                }
              >
                View
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={removeTeacher}
                className="text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const closeEditModal = () => {
    setEditID("");
    close2();
  };

  return (
    <div>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <>
          {/* CREATE */}
          <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Teacher</DialogTitle>
                <DialogDescription>
                  <TeacherForm closeModal={close} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* EDIT */}
          <Dialog open={isOpen2} onOpenChange={closeEditModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Teacher</DialogTitle>
                <DialogDescription>
                  <TecherFormWrapper
                    closeModal={closeEditModal}
                    id={editId}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button className="mb-5" onClick={open}>
            Create
          </Button>

          <TeacherTable columns={columns} data={teachers} />

          {/* PAGINATION */}
          {isFetching ? (
            <Skeleton className="h-[30px] w-[300px]" />
          ) : (
            <div className="flex justify-end gap-3 mt-5">
              {buttons.map((_, index) => (
                <Button
                  key={index}
                  onClick={() =>
                    setSearchParams({ page: `${index + 1}` })
                  }
                  variant={
                    index + 1 === Number(page)
                      ? "default"
                      : "outline"
                  }
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
