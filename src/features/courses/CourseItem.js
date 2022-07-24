import React from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editCourse } from "./courseSlice";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";

const CourseItem = ({ id, code, project }) => {
  const dispatch = useDispatch();

  //   const handleEditClick = () => {
  //     console.log("Click on CourseEdit " + id + " happend");
  //     dispatch(editCourse({ id }));
  //   };

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{code}</td>
      <td>{project}</td>
      {/* <td>
        <Icon path={mdiPencil} size={1} onClick={handleEditClick} />
      </td> */}
    </tr>
  );
};

export default CourseItem;
