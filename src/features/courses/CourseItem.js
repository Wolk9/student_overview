import React from "react";
import { useDispatch } from "react-redux";

const CourseItem = ({ id, code, project }) => {
  const dispatch = useDispatch();

  //   const handleEditClick = () => {
  //     // console.log("Click on CourseEdit " + id + " happend");
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
