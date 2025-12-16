import { useNavigate, useParams } from "react-router-dom";
import { useTeacherDetail } from "../service/query/useTeacherDetail";
import { Spinner } from "@/components/ui/spinner";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherForm } from "../components/teacher-form";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUploadTeacherImage } from "../service/mutation/useUploadTeacherImage";
import { request } from "@/config/request";
import { useQueryClient } from "@tanstack/react-query";

export const TeacherDetail = () => {
  const { id } = useParams();
  const client = useQueryClient();
  const { data, isLoading, isFetching } = useTeacherDetail(id as string);
  const { mutate, isPending } = useUploadTeacherImage(id as string);
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const closeModal = () => {
    navigate(-1);
  };

  const uploadIMage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!e.target.files || e.target.files.length === 0) {
      console.log("No file selected");
      return;
    }

    const file = e.target.files[0];
    console.log("Selected file:", file);

    // set a local preview so user sees the image immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    if (file.size > maxSize) {
      toast("File hajmi katta", { position: "bottom-right" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // 🔥 log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`FormData: ${key}`, value);
    }

    mutate(formData, {
      onSuccess: (res) => {
        console.log("Upload success response:", res);
        client.invalidateQueries({ queryKey: ["teacher", id] });
        toast("OK", { position: "bottom-right" });
        // server returned updated avatar; clear preview (will show server image)
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
      },
      onError: (err) => {
        console.log("Upload error:", err);
        // keep preview to allow retry; optionally show toast
      },
    });
  };

  const buildImageUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    try {
      const origin = new URL(request.defaults.baseURL as string).origin;
      return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
    } catch (e) {
      return url;
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {data?.data.avatarUrl ? (
            <div>
              <div className="rounded-full ml-5 overflow-hidden flex items-center justify-center border h-[90px] w-[90px]">
                {isPending || isFetching ? (
                  <Spinner />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={previewUrl ?? buildImageUrl(data.data.avatarUrl)}
                    alt="avatar"
                    onError={(e) => {
                      console.log("Failed to load avatar", data.data.avatarUrl);
                      (e.currentTarget as HTMLImageElement).src = "";
                    }}
                  />
                )}
              </div>

              <label htmlFor="upload_image" className="cursor-pointer hover:text-amber-400">
                Change image
              </label>
              <input
                hidden
                accept="image/png, image/jpg, image/jpeg"
                id="upload_image"
                type="file"
                onChange={uploadIMage}
              />
            </div>
          ) : (
            <>
              <Button className="rounded-full border h-[90px] w-[90px]" variant={"ghost"}>
                <UserIcon className="size-16" />
              </Button>
              <label htmlFor="upload_image">Upload image</label>
              <input
                hidden
                accept="image/png, image/jpg, image/jpeg"
                id="upload_image"
                type="file"
                onChange={uploadIMage}
              />
            </>
          )}

          <TeacherForm
            closeModal={closeModal}
            teacherId={id}
            defaultValueData={data}
          />
        </div>
      )}
    </div>
  );
};
