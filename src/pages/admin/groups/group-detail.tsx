import { useNavigate, useParams } from "react-router-dom";
import { useGroupDetail } from "../service/query/useGroupDetail";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Clock, Calendar } from "lucide-react";
import { CreateStudentForm } from "@/pages/admin/components/create-student-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { GroupForm } from "../components/group-form";
import { useToggle } from "@/hooks/useToggle";

export const GroupDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGroupDetail(id as string);
  const navigate = useNavigate();

  // ✏️ Edit group dialog
  const {
    isOpen: isEditOpen,
    open: openEdit,
    close: closeEdit,
  } = useToggle();

  // ➕ Add student dialog
  const {
    isOpen: isStudentOpen,
    open: openStudent,
    close: closeStudent,
  } = useToggle();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-muted-foreground">Group not found</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const group = data.data;

  return (
    <>
      {/* ✏️ Edit Group Dialog */}
      <Dialog open={isEditOpen} onOpenChange={closeEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Update group information
            </DialogDescription>
          </DialogHeader>
          <GroupForm
            closeModal={closeEdit}
            defaultValueData={data}
            groupId={id}
          />
        </DialogContent>
      </Dialog>

      {/* ➕ Add Student Dialog */}
      <Dialog open={isStudentOpen} onOpenChange={closeStudent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Student</DialogTitle>
            <DialogDescription>
              Create student and assign to this group
            </DialogDescription>
          </DialogHeader>

          <CreateStudentForm
            closeModal={closeStudent}
            defaultGroupId={group.id}
          />
        </DialogContent>
      </Dialog>

      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{group.name}</h1>
              <p className="text-muted-foreground">
                {group.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
          <Button onClick={openEdit}>Edit Group</Button>
        </div>

        {/* Group info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Start Time
              </p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{group.startTime}</div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                End Time
              </p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{group.endTime}</div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Duration
              </p>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {group.durationInMonths} months
            </div>
          </div>
        </div>

        {/* Teacher */}
        {group.teacher && (
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Teacher</h2>
            <div className="flex items-center gap-4">
              {group.teacher.avatarUrl ? (
                <img
                  src={group.teacher.avatarUrl}
                  alt={group.teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {group.teacher.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {group.teacher.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{group.teacher.username}
                </p>
                <div className="flex gap-2 mt-1">
                  {group.teacher.specifications.map((spec) => (
                    <span
                      key={spec.id}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {spec.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students */}
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Students ({group.students.length})
            </h2>

            {/* ✅ ADD STUDENT BUTTON */}
            <Button size="sm" onClick={openStudent}>
              Add Student
            </Button>
          </div>

          {group.students.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No students in this group yet
            </p>
          ) : (
            <div className="space-y-3">
              {group.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      @{student.username} • {student.phone}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      student.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {student.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
