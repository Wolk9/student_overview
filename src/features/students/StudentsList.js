import React from "react";
import { Table, Button, Col, Card } from "react-bootstrap";
import { MDBContainer } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import StudentItem from "./StudentItem";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "../ui/uiSlice";
import AddStudentModal from "./AddStudentModal";
import { mdiAccountPlus } from "@mdi/js";
import Icon from "@mdi/react";

const StudentsList = ({ students, show }) => {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    console.log("Click on StudentAdd happend");
    dispatch(openAddStudentModal(true));
  };

  return (
    <div>
      {show && <AddStudentModal show={show} students={students} />}
      <MDBContainer fluid className="p-4 m4">
        <Card xs={4}>
          <Card.Header as="h5">List of Students</Card.Header>
          <Card.Body>
            <Table striped="columns" size="sm" className="p-4 m4">
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
            </Table>
          </Card.Body>
          <Card.Footer className="text-muted">
            A total of {students.length} students registered
          </Card.Footer>
        </Card>
      </MDBContainer>
    </div>
  );
};

export default StudentsList;
