import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEvaluateStudent } from "../service/mutation/useEvaluateStudent";

const formSchema = z.object({
  grade: z.number().min(0).max(100),
  behavior: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddGradeFormProps {
  studentId: string;
  closeModal: () => void;
}

export const AddGradeForm = ({
  studentId,
  closeModal,
}: AddGradeFormProps) => {
  const { mutate, isPending } = useEvaluateStudent(studentId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grade: 0,
      behavior: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Grade successfully added");
        closeModal();
      },
      onError: () => {
        toast.error("Failed to add grade");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* GRADE */}
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BEHAVIOR */}
        <FormField
          control={form.control}
          name="behavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Behavior</FormLabel>
              <FormControl>
                <Input placeholder="Optional comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Spinner /> : "Save Grade"}
        </Button>
      </form>
    </Form>
  );
};
