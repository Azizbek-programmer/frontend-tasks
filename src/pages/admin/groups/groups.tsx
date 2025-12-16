import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { TeacherTable } from "../components/table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GroupForm } from "../components/group-form";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteGroup } from "../service/mutation/useDeleteGroup";
import { toast } from "sonner";
import { useGroupsListPagination } from "../service/query/useGroupsList";

type Groups = {
  count: number;
  studentCount: number;
  name: string;
  id?: string;
  isActive: "Active" | "Blocked";
  startTime: string;
  endTime: string;
  teacherId?: string;
  durationInMonths: string;
  teacherName: string;
  teacherAvatarUrl: string;
};

const PAGE_SIZE = 10;

export const Groups = () => {
  const { close, isOpen, open } = useToggle();
  const client = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Math.max(Number(searchParams.get("page")) || 1, 1);

  const { data, isLoading } = useGroupsListPagination(currentPage.toString());

  const columns: ColumnDef<Groups>[] = [
    { accessorKey: "count", header: "Count" },
    { accessorKey: "studentCount", header: "Student Count" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "startTime", header: "Start Time" },
    { accessorKey: "endTime", header: "End Time" },
    { accessorKey: "durationInMonths", header: "Duration In Months" },
    { accessorKey: "teacherName", header: "Teacher Name" },
    {
      accessorKey: "teacherAvatarUrl",
      header: "T Image",
      cell: ({ row }) => {
        const g = row.original;
        return g.teacherId ? (
          <Link
            to={`/app/admin/teacher/${g.teacherId}`}
            className="block w-[30px] h-[30px] rounded-full overflow-hidden border hover:border-blue-500"
          >
            <img src={g.teacherAvatarUrl} className="w-full h-full object-cover" />
          </Link>
        ) : null;
      },
    },
    { accessorKey: "isActive", header: "Status" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const group = row.original;
        const { mutate: deleteGroup, isPending } = useDeleteGroup(group.id || "");
        const [openDelete, setOpenDelete] = React.useState(false);

        const handleDelete = () => {
          deleteGroup(undefined, {
            onSuccess: () => {
              toast.success("Group deleted");
              client.invalidateQueries({ queryKey: ["groups"] });
              setOpenDelete(false);
            },
            onError: (e: any) => {
              toast.error(e?.response?.data?.message || "Delete failed");
            },
          });
        };

        return (
          <>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/app/admin/group/${group.id}`)}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setOpenDelete(true)}
              >
                Delete
              </Button>
            </div>

            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This will delete <b>{group.name}</b>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDelete(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
  ];

  const groups: Groups[] = React.useMemo(() => {
  if (!Array.isArray(data?.data)) return [];

  return data.data.map((item, index) => ({
    count: (currentPage - 1) * PAGE_SIZE + index + 1,
    id: item.id,
    studentCount: item.students?.length || 0, // ✅ student count
    isActive: item.isActive ? "Active" : "Blocked",
    name: item.name,
    teacherName: item.teacher?.name || "No teacher", // ✅ teacher name
    teacherAvatarUrl: item.teacher?.avatarUrl || "", // ✅ teacher avatar
    teacherId: item.teacher?.id,
    startTime: item.startTime || "N/A",
    endTime: item.endTime || "N/A",
    durationInMonths: `${item.durationInMonths || 0}`,
  }));
}, [data, currentPage]);


  const totalPages = data?.totalPages ?? 1;
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription>
                  <GroupForm closeModal={close} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button onClick={open} className="mb-5">
            Create
          </Button>

          <TeacherTable columns={columns} data={groups} />

          {/* PAGINATION */}
          {totalPages > 1 && (
  <div className="flex justify-end gap-2 mt-5">
    {Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;
      return (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => setSearchParams({ page: String(page) })}
        >
          {page}
        </Button>
      );
    })}
  </div>
)}
        </>
      )}
    </div>
  );
};
