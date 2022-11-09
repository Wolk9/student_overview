import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import { useDispatch } from "react-redux";
import { editStudent } from "./studentSlice";

const StudentItem = ({
  id,
  firstName,
  lastName,
  phone,
  email,
  color,
  colorFun,
}) => {
  const dispatch = useDispatch();

  let colorFun = color;
  let colorDifficulty = colorFun;

  const handleEditClick = () => {
    // console.log("Click on StudentEdit " + id + " happend");
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
        <MDBRow>
          <MDBCol>
            <div
              className="swatch"
              style={{ backgroundColor: colorDifficulty }}
            />
          </MDBCol>
          <MDBCol>
            <div className="swatch" style={{ backgroundColor: colorFun }} />
          </MDBCol>
        </MDBRow>
      </td>
      <td>
        <Icon path={mdiPencil} size={1} onClick={handleEditClick} />
      </td>
    </tr>
  );
};

export default StudentItem;
