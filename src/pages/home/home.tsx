import { Card } from "@/components/card/card";
import { useGetUserList } from "./service/query/useGetUserList";
import { CardLoading } from "@/components/card/card-loading";
import { BackDrop } from "@/components/back-droup/back-drop";
import { CreateUser } from "@/components/form/form";

export const Home = () => {
  const { data, isLoading } = useGetUserList();

  return (
    <div className="container">
      <CreateUser />
      {isLoading ? (
        <>
          <CardLoading />
          <BackDrop />
        </>
      ) : (
        <div>
          {data?.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};
