import React from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editStudent } from "./studentSlice";
import { mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

const StudentItem = ({
  id,
  firstName,
  lastName,
  phone,
  email,
  color,
  color2,
}) => {
  const dispatch = useDispatch();

  let funColor = color;
  let difficultyColor = color2;

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
        <MDBRow>
          <MDBCol>
            <div
              className="swatch"
              style={{ backgroundColor: difficultyColor }}
            />
          </MDBCol>
          <MDBCol>
            <div className="swatch" style={{ backgroundColor: funColor }} />
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
