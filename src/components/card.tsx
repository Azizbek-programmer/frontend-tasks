import { Link } from "react-router";
import type { TaskList } from "../store/service/user-api";
import { useDeleteTaskMutation } from "../store/service/user-api";

export const Card = ({ description, id, title }: TaskList) => {
  const [mutate, { isLoading }] = useDeleteTaskMutation();

  const deleteTask = () => {
    mutate(id)
      .unwrap()
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <h1 className="text-4xl">
        <Link to={`/task/${id}`}>{title}</Link>
      </h1>
      <p>{description}</p>
      <button onClick={deleteTask} className="bg-red-400 p-3">
        {isLoading ? "Loading..." : "delete"}
      </button>
    </div>
  );
};
