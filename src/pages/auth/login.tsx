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
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "./service/useLogin";
import { Spinner } from "@/components/ui/spinner";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
});

export const Login = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Admin1",
      password: "Admin123!",
      role: "Admin",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: (res) => {
        // token va role-ni cookie va localStorage ga yozamiz
        Cookie.set("token", res.data.token);
        Cookie.set("role", res.data.user.role.toLowerCase());
        localStorage.setItem("role", res.data.user.role.toLowerCase());

        toast.success(res.message.uz, { position: "bottom-right" });

        navigate(`/app/${res.data.user.role.toLowerCase()}`);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
      <Button className="absolute right-5 top-5 cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30">
        Sign up
      </Button>

      <div className="w-[450px] bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Log In
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ROLE */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-white/20 border-white/30 text-white placeholder:text-gray-200">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-200" />
                </FormItem>
              )}
            />

            {/* USERNAME */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200" />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="1234"
                      {...field}
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 bg-white/30 text-white border border-white/40 hover:bg-white/40 backdrop-blur-md"
            >
              {isPending ? <Spinner /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
