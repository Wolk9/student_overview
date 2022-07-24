import React from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editAssignment } from "./assignmentSlice";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";

const AssignmentItem = ({ id, user_id, assignment, difficulty, fun }) => {
  const dispatch = useDispatch();

  //   const handleEditClick = () => {
  //     console.log("Click on AssignmentEdit " + id + " happend");
  //     dispatch(editAssignment({ id }));
  //   };
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{user_id}</td>
      <td>{assignment}</td>
      <td>{difficulty}</td>
      <td>{fun}</td>

      {/* <td>
        <Icon path={mdiPencil} size={1} onClick={handleEditClick} />
      </td> */}
    </tr>
  );
};

export default AssignmentItem;
