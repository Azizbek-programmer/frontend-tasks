// components/teacher/UpdateTeacherForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSpecification } from "../../admin/service/query/useSpecification";
import { useUpdateTeacher } from "../service/mutation/useUpdateTeacher";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import type { TeacherDetailT } from "../type";

const formSchema = z.object({
  username: z.string().min(2),
  name: z.string().min(2),
  specification: z.array(z.string().min(1)),
});

interface Props {
  defaultValueData: TeacherDetailT;
  closeModal: () => void;
}

export const UpdateTeacherForm = ({ defaultValueData, closeModal }: Props) => {
  const { data: specs, isLoading: specLoading } = useSpecification();
  const { mutate, isPending } = useUpdateTeacher();
  const client = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      specification: [],
    },
  });

  useEffect(() => {
    if (defaultValueData) {
      form.reset({
        username: defaultValueData.data.username,
        name: defaultValueData.data.name,
        specification: defaultValueData.data.specifications?.map(s => s.id) || [],
      });
    }
  }, [defaultValueData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Teacher updated successfully");
        client.invalidateQueries({ queryKey: ["teacher_details"] });
        closeModal();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Error updating teacher");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="specification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specification</FormLabel>
              <FormControl>
                {specLoading ? (
                  <Spinner />
                ) : (
                  <Select
                    onValueChange={(value) => field.onChange([value])}
                    value={field.value[0] || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specification" />
                    </SelectTrigger>
                    <SelectContent>
                      {specs?.data.map((spec) => (
                        <SelectItem key={spec.id} value={spec.id}>
                          {spec.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : "Update"}
        </Button>
      </form>
    </Form>
  );
};
