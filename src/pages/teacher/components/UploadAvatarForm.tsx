// components/teacher/UploadAvatarForm.tsx
import { useUploadTeacherAvatar } from "../service/mutation/useUploadTeacherAvatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface Props {
  closeModal: () => void;
}

export const UploadAvatarForm = ({ closeModal }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useUploadTeacherAvatar();

  const onSubmit = () => {
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Avatar updated successfully");
        closeModal();
      },
      onError: () => toast.error("Failed to update avatar"),
    });
  };

  return (
    <div className="space-y-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={onSubmit} disabled={isPending}>
        {isPending ? <Spinner /> : "Upload Avatar"}
      </Button>
    </div>
  );
};
