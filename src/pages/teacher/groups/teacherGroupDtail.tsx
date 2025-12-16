import { useParams, useNavigate } from "react-router-dom";
import { useTeacherGroupDetail } from "../service/query/useTeacherGroupDetail";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Users, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddGradeForm } from "../components/AddGradeForm";

export const TeacherGroupDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useTeacherGroupDetail(id as string);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

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
  const students = group.students ?? [];
  const teacher = group.teacher ?? { name: "No teacher", avatarUrl: "" };

  const openGradeModal = (studentId: string) => {
    setSelectedStudentId(studentId);
    setOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        Go Back
      </Button>

      <h1 className="text-3xl font-bold">{group.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-6 flex flex-col items-center">
          <Clock className="h-6 w-6 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Start Time</p>
          <p className="text-2xl font-bold">{group.startTime}</p>
        </div>
        <div className="bg-card border rounded-lg p-6 flex flex-col items-center">
          <Clock className="h-6 w-6 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">End Time</p>
          <p className="text-2xl font-bold">{group.endTime}</p>
        </div>
        <div className="bg-card border rounded-lg p-6 flex flex-col items-center">
          <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="text-2xl font-bold">{group.durationInMonths} months</p>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6 flex items-center gap-4">
        {teacher.avatarUrl ? (
          <img
            src={teacher.avatarUrl}
            alt={teacher.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl text-white">
            {teacher.name.charAt(0)}
          </div>
        )}
        <p className="font-semibold">{teacher.name}</p>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Users className="h-5 w-5" /> Students ({students.length})
        </h2>

        {students.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No students in this group yet
          </p>
        ) : (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  {(student as any).grade !== null &&
                    (student as any).grade !== undefined && (
                      <p className="text-sm text-muted-foreground">
                        Grade: {(student as any).grade}
                      </p>
                    )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      navigate(`/app/teacher/students/${student.id}`)
                    }
                  >
                    View
                  </Button>

                  <Button size="sm" onClick={() => openGradeModal(student.id)}>
                    Add Grade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
    </div>
  );
};
