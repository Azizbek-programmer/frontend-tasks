import { useParams } from "react-router-dom";
import { useUser } from "./service/query/useUser";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useUser(id as string);

  if (isError) {
    return <h1 className="text-8xl">User not found</h1>;
  }

  return (
    <div className="container">
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <>
          <h2 className="text-4xl">{data?.name}</h2>
          <h2 className="text-4xl">{data?.email}</h2>
        </>
      )}
    </div>
  );
};
