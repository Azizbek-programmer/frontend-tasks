// src/pages/teacher/TeacherProfile.tsx
import React, { useState, useEffect, useRef } from "react";
import { useTeacherProfile } from "../teacher/service/query/useTeacherProfile";
import { useUploadTeacherAvatar } from "../teacher/service/mutation/useUploadTeacherAvatar";
import { Spinner } from "@/components/ui/spinner";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateTeacherForm } from "../teacher/components/UpdateTeacherForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const TeacherProfile = () => {
  const { data, isLoading, refetch } = useTeacherProfile();
  const uploadAvatar = useUploadTeacherAvatar();

  const [openModal, setOpenModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // preview xotirasini tozalash
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // backenddan kelgan rasm yo‘lini to‘liq URL qilish
  const buildImageUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  // avatar tanlanganda
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);

    // backendga yuborish
    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar.mutate(formData, {
      onSuccess: () => {
        refetch(); // yangi avatarni olib kelish
      },
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row gap-10">
        {/* AVATAR */}
        <div className="flex flex-col items-center">
          {avatarPreview || data?.data.avatarUrl ? (
            <img
              src={avatarPreview ?? buildImageUrl(data?.data.avatarUrl)}
              alt="avatar"
              className="w-48 h-48 object-cover rounded-full border-4 border-amber-400 mb-6"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded-full border-4 border-gray-300 mb-6">
              <UserIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}

          {/* hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatarChange}
          />

          {/* update avatar button */}
          <Button
            variant="outline"
            size="sm"
            disabled={uploadAvatar.isPending}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadAvatar.isPending ? "Uploading..." : "Update Avatar"}
          </Button>
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-gray-50 rounded-xl p-6 shadow-inner flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-gray-800">
              {data?.data.name || "No name"}
            </h2>
            <p className="text-gray-600">
              Username: {data?.data.username}
            </p>
            <p className="text-gray-600">Role: {data?.data.role}</p>

            <Button
              className="self-start mt-4 bg-blue-400"
              onClick={() => setOpenModal(true)}
            >
              Update Teacher
            </Button>
          </div>

          {data?.data.specifications?.length ? (
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                Specifications
              </h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {data.data.specifications.map((spec: any) => (
                  <li key={spec.id}>{spec.name}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {/* UPDATE TEACHER MODAL */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Teacher</DialogTitle>
          </DialogHeader>
          <UpdateTeacherForm
            defaultValueData={data!}
            closeModal={() => setOpenModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
