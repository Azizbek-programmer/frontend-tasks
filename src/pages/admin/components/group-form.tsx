import { Button } from "@/components/ui/button";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQueryClient } from "@tanstack/react-query";
import { useTeachersList } from "../service/query/useTeachersList";
import { Spinner } from "@/components/ui/spinner";
import { useCreateGroup } from "../service/mutation/useCreateGroup";
import type { GroupDetailT } from "../type";

const formSchema = z.object({
  startTime: z.string().min(2).max(50),
  endTime: z.string().min(2).max(50),
  durationInMonths: z.string(),
  teacherId: z.string(),
  name: z.string().min(2).max(50),
});

interface FormProps {
  closeModal: () => void;
  defaultValueData?: GroupDetailT;
  groupId?: string;
}

export const GroupForm = ({ closeModal }: FormProps) => {
  const client = useQueryClient();

  const { data, isLoading } = useTeachersList();
  const { mutate, isPending } = useCreateGroup();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
      durationInMonths: "",
      teacherId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(
      { ...data, durationInMonths: Number(data.durationInMonths) },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["groups"] });
          closeModal();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-[30px] space-y-[30px]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Teacher</FormLabel>
                <FormControl>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full text-black">
                        <SelectValue
                          className="text-black"
                          placeholder="Specification"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.data?.map((item) => (
                          <SelectItem value={item.id}>
                            {item?.name} {item.specifications[0]?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" placeholder="Time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="time" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="durationInMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  min={1}
                  max={8}
                  type="number"
                  placeholder="1234"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {isPending ? <Spinner /> : ""} submit
        </Button>
      </form>
    </Form>
  );
};
