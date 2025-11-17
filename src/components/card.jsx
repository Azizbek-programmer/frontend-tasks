import { deleteUser, updateUser } from "../store/reducer/user-reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const Card = ({ userName, id }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(userName);

  const deleteItem = () => {
    dispatch(deleteUser({ id }));
  };

  const saveEdit = () => {
    dispatch(updateUser({ id, newName }));
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={saveEdit}>save</button>
        </>
      ) : (
        <>
          <h1>{userName}</h1>
          <button onClick={() => setIsEdit(true)}>edit</button>
          <button onClick={deleteItem}>delete</button>
        </>
      )}
    </>
  );
};
