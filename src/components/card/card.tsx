import { Link } from "react-router-dom";
import { CreateUser } from "../form/form";

interface UserLIst {
  name: string;
  email: string;
  username?: string;
  id: number;
}

export const Card = ({ email, name, username, id }: UserLIst) => {

  
  return (
    <div className="border rounded-2xl p-5 my-5 border-blue-400">
      <h2 className="text-4xl hover:text-blue-400">
        <Link to={`/product/${id}`}>{name}</Link>
      </h2>
      <p>{email}</p>
      <p>{username}</p>
      <CreateUser email={email} name={name} username={username} id={id} />

    </div>
  );
};
