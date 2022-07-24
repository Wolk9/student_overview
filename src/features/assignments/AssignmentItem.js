import React from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editAssignment } from "./assignmentSlice";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { Rating } from "react-simple-star-rating";

const AssignmentItem = ({ id, user, assignment, difficulty, fun }) => {
  const dispatch = useDispatch();

  //   const handleEditClick = () => {
  //     console.log("Click on AssignmentEdit " + id + " happend");
  //     dispatch(editAssignment({ id }));
  //   };
  return (
    <tr key={id}>
      <td>{user}</td>
      <td>{assignment}</td>
      <td>
        <Rating initialValue={difficulty} readonly={true} size={20} />
      </td>
      <td>
        <Rating initialValue={fun} readonly={true} size={20} />
      </td>

      {/* <td>
        <Icon path={mdiPencil} size={1} onClick={handleEditClick} />
      </td> */}
    </tr>
  );
};

export default AssignmentItem;
