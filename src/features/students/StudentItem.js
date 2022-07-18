import React from "react";
import { useDispatch } from "react-redux";
import { editStudent } from "./studentSlice";

const StudentItem = ({ id, name, age, gender }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    console.log("Click on StudentEdit " + id + " happend");
    dispatch(editStudent({ id }));
  };

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{age}</td>
      <td>
        <button onClick={handleEditClick}>edit</button>
      </td>
    </tr>
  );
};

export default StudentItem;
