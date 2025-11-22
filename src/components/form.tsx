import { useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../store/service/user-api";

interface Inputs {
  title: string;
  description: string;
}

export const Form = () => {
  const { handleSubmit, register, reset } = useForm<Inputs>();
  const [mutate, { isLoading }] = useCreateTaskMutation();

  const submit = (data: Inputs) => {
    mutate(data)
      .unwrap()
      .then((res) => {
        console.log(res);
      });
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input {...register("title")} className="bg-amber-300" type="text" />
        </div>
        <div>
          <input
            {...register("description")}
            className="bg-amber-300"
            type="text"
          />
        </div>
        <button className="p-2 bg-green-300">
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};
