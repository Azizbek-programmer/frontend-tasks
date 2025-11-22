import { Card } from "../components/card";
import { Form } from "../components/form";
import { useGetTasksListQuery } from "../store/service/user-api";

export const Home = () => {
  const { data, isLoading } = useGetTasksListQuery("/tasks");

  return (
    <div className="container">
      <Form />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data?.map((item) => {
            return <Card key={item.id} {...item} />;
          })}
        </>
      )}
    </div>
  );
};
