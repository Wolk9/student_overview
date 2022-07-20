import React from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editStudent } from "./studentSlice";

const StudentItem = ({ id, firstName, lastName, phone, email }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    console.log("Click on StudentEdit " + id + " happend");
    dispatch(editStudent({ id }));
  };

  return (
    <tr key={id}>
      <td>
        {firstName} {lastName}
      </td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>
        <Button onClick={handleEditClick}>edit</Button>
      </td>
    </tr>
  );
};

export default StudentItem;
