import React from "react";
import { useTeachersList } from "../service/query/useTeachersList";
import type { ColumnDef } from "@tanstack/react-table";
import { TeacherTable } from "../components/table";
import { Spinner } from "@/components/ui/spinner";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

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
  const { data, isLoading } = useTeachersList();

  const teachers: Payment[] = React.useMemo(() => {
    if (!Array.isArray(data?.data)) return [];
    return data.data.map((item, index) => ({
      groups: item.groups?.length || 0,
      id: item.id,
      count: index + 1,
      isActive: item.isActive ? "Active" : "Blocked",
      name: item.name,
      specification: item.specification,
      username: item.username,
    }));
  }, [data]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "count",
      header: "Count",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "specification",
      header: "Specification",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "groups",
      header: "Groups",
    },
    {
      accessorKey: "isActive",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => {
        // const teacher = row.original;
        return <Button>lorem</Button>;
      },
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <TeacherTable columns={columns} data={teachers} />
      )}
    </div>
  );
};
