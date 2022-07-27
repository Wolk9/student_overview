import React from "react";
import { Table, Button, Col, Card } from "react-bootstrap";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import StudentItem from "./StudentItem";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "../ui/uiSlice";
import { editStudent } from "./studentSlice";
import AddStudentModal from "./AddStudentModal";
import { mdiAccountPlus, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import DataTable from "react-data-table-component";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const CustomLoader = () => (
  <div style={{ padding: "24px" }}>
    <Spinner />
  </div>
);

const StudentsList = ({ students, show }) => {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    console.log("Click on StudentAdd happend");
    dispatch(openAddStudentModal(true));
  };

  const funColor = students.color;
  const difficultyColor = students.color2;

  const handleEditClick = (e) => {
    console.log("Click on StudentEdit " + e.id + " happend");
    dispatch(editStudent(e.id));
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
      width: "40%",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Colors",
      selector: (row) => (
        <MDBRow>
          <MDBCol>
            <div className="swatch" style={{ backgroundColor: row.color }} />
          </MDBCol>
          <MDBCol>
            <div className="swatch" style={{ backgroundColor: row.color2 }} />
          </MDBCol>
        </MDBRow>
      ),
      width: "10%",
    },
    {
      name: "",
      selector: (row) => (
        <Icon
          path={mdiPencil}
          size={1}
          key={row.id}
          onClick={(e) => handleEditClick(e)}
        />
      ),
      width: "10%",
    },
  ];

  return (
    <div>
      {show && <AddStudentModal show={show} students={students} />}
      <MDBContainer fluid className="p-4 m4">
        <DataTable
          title={students.length + " Students"}
          columns={columns}
          data={students}
          pagination
          dense
          responsive
          progressComponent={<CustomLoader />}
          onRowClicked={(e) => handleEditClick(e)}
        />

        {/* <Table striped="columns" size="sm" className="p-4 m4">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Color</th>
                  <th>
                    <Icon
                      path={mdiAccountPlus}
                      size={1}
                      onClick={handleAddClick}
                      color="primary"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <StudentItem
                    key={student.id}
                    id={student.id}
                    firstName={student.firstName}
                    lastName={student.lastName}
                    phone={student.phone}
                    email={student.email}
                    color={student.color}
                    color2={student.color2}
                  />
                ))}
              </tbody>
            </Table> */}
      </MDBContainer>
    </div>
  );
};

export default StudentsList;
