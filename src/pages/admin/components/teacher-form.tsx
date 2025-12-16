import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/components/ui/password-input";

import { useCreateTeacher } from "../service/mutation/useCreateTeacher";
import { useEditTeacher } from "../service/mutation/useEditTeacher";
import { useSpecification } from "../service/query/useSpecification";
import { useQueryClient } from "@tanstack/react-query";

import type { TeacherDetailT } from "../type";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().optional(),
  specification: z.string().min(1),
  name: z.string().min(2).max(50),
});

interface FormProps {
  defaultValueData?: TeacherDetailT;
  closeModal?: () => void;
  teacherId?: string;
}

export const TeacherForm = ({ closeModal, defaultValueData, teacherId }: FormProps) => {
  const { data, isLoading } = useSpecification();

  const { mutate, isPending } = useCreateTeacher();
  const { mutate: editMutate, isPending: editPending } = useEditTeacher(
    teacherId as string
  );

  const client = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      specification: "",
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (defaultValueData) {
      form.reset({
        username: defaultValueData.data.username,
        specification: defaultValueData.data.specifications[0]?.id || "",
        name: defaultValueData.data.name,
        password: "",
      });
    }
  }, [defaultValueData, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (defaultValueData) {
      return editMutate(
        {
          name: data.name,
          username: data.username,
          specification: [data.specification],
        },
        {
          onSuccess: (res) => {
            toast.success(res.message.uz, { position: "bottom-right" });
            client.invalidateQueries({ queryKey: ["teacher_list"] });
            closeModal?.();
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    }

    mutate(
      {
        ...data,
        specification: [data.specification],
      },
      {
        onSuccess: (res) => {
          toast.success(res.message.uz, { position: "bottom-right" });
          client.invalidateQueries({ queryKey: ["teacher_list"] });
          closeModal?.();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[30px] space-y-[30px]">
        <FormField
          control={form.control}
          name="specification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specification</FormLabel>
              <FormControl>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full text-black">
                      <SelectValue placeholder="Specification" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.data.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
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
                <Input placeholder="username" {...field} />
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
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!defaultValueData && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">
          {(isPending || editPending) && <Spinner />}{" "}
          {defaultValueData ? "Change" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
