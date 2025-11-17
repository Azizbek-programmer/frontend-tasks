import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./store/reducer/user-reducer";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { Card } from "./components/card";

function App() {
  const { count, userList } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { handleSubmit, reset, register } = useForm();

  const handler = (data) => {
    
    dispatch(addUser({ ...data, id: nanoid() }));
    reset();
  };

  return (
    <>
      <h1>{count}</h1>
      <form onSubmit={handleSubmit(handler)}>
        <input placeholder="name" type="text" {...register("userName")} />
        <button type="submit">send</button>
      </form>
      {userList.map((item) => 
      <Card key={item.id} {...item}/>
      )}
    </>
  );
}

export default App;
