import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/pages/home/service/mutation/useCreateUser";
import { Spinner } from "../ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "@/pages/home/service/mutation/useUpdateUser";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  username: z.string().min(2).max(50),
});

interface DefaultValue {
  name?: string;
  email?: string;
  username?: string;
  id?: number;
}

export const CreateUser = (defaultValue: DefaultValue) => {
  const [open, setOpen] = React.useState(false);
  const { mutate, isPending } = useCreateUser();
  const { mutate: update, isPending: updateLoading } = useUpdateUser(
    defaultValue?.id as number
  );

  const client = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      ...defaultValue,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (defaultValue?.id) {
      update(data, {
        onSuccess: () => {
          client.setQueriesData(
            { queryKey: ["user_list"] },
            (oldData: DefaultValue[]) => {
              const result = oldData.map((item) =>
                item.id === defaultValue.id
                  ? { ...data, id: defaultValue.id }
                  : item
              );
              return result;
            }
          );
          form.reset();
          setOpen(false);
        },
        onError: (error) => {
          form.setError("username", { message: error.message });
        },
      });
    } else {
      mutate(data, {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["user_list"] });
          form.reset();
          setOpen(false);
        },
        onError: (error) => {
          form.setError("username", { message: error.message });
        },
      });
    }
  };

  return (
    <>
      <Button className="mt-5 cursor-pointer" onClick={() => setOpen(true)}>
        {defaultValue.id ? "Edit" : "Create"}
      </Button>
      <Dialog onOpenChange={(res) => setOpen(res)} open={open}>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                {isPending || updateLoading ? <Spinner /> : ""}
                {defaultValue.id ? "Update" : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
