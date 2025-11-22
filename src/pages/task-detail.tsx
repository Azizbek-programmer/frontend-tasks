import { useParams } from "react-router";
import { useGetTaskDetailQuery } from "../store/service/user-api";

export const TaskDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetTaskDetailQuery(id as string);

  return (
    <div className="container">
      {isLoading ? <h2>ADHAMJON.....</h2> : ""}
      {data ? (
        <>
          <h1 className="text-red-400 text-7xl">{data.title}</h1>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
