import { useNavigate, useParams } from "react-router-dom";
import { useStudentDetail } from "../service/query/useStudentDetail";
import { Spinner } from "@/components/ui/spinner";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import  { useEffect, useState } from "react";
// import { toast } from "sonner";
import { request } from "@/config/request";

export const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useStudentDetail(id as string);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const closePage = () => navigate(-1);

  const buildImageUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    try {
      const origin = new URL(request.defaults.baseURL as string).origin;
      return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
    } catch {
      return url;
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-muted-foreground">Student not found</p>
        <Button onClick={closePage}>Go Back</Button>
      </div>
    );
  }

  const student = data.data;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={closePage}>
          <UserIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{student.name}</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        {student.avatarUrl ? (
          <img
            src={previewUrl ?? buildImageUrl(student.avatarUrl)}
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-3xl font-bold">{student.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="text-lg font-semibold">{student.email}</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Grade</p>
          <p className="text-lg font-semibold">{student.grade || "-"}</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Behavior</p>
          <p className="text-lg font-semibold">{student.behavior || "-"}</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="text-lg font-semibold">{student.phone || "-"}</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Group</p>
          <p className="text-lg font-semibold">{student.group?.name || "-"}</p>
        </div>
      </div>
    </div>
  );
};
