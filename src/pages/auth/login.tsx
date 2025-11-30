import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

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
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "./service/useLogin";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  role: z.enum(["ADMIN", "TEACHER"]),

});

export const Login = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Admin1",
      password: "Admin!",
      role: "ADMIN",
    },
  });

const onSubmit = (data: z.infer<typeof formSchema>) => {
  console.log("Form data:", data);

  mutate(data, {
    onSuccess: (res) => {
      console.log("res in onSuccess:", res); 
    },
    onError: (error) => {
      console.log("Error:", error.message || error);
    },
  });
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-purple-700 to-indigo-600">
      <Button className="absolute top-[30px] right-[30px]">Sign up</Button>

      <div className="w-[500px] bg-gradient-to-b from-gray-100 to-gray-300 shadow-2xs rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.value || "Role"}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full border-2 border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="TEACHER">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username Input */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="border-2 border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Password"
                      className="border-2 border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{isPending ? <Spinner /> : "Submit"} </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
