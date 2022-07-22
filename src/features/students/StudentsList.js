import React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import StudentItem from "./StudentItem";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "../ui/uiSlice";
import AddStudentModal from "./AddStudentModal";

const StudentsList = ({ students, show }) => {
  const dispatch = useDispatch();
  console.log(students);

  const handleAddClick = () => {
    console.log("Click on StudentAdd happend");
    dispatch(openAddStudentModal(true));
  };

  return (
    <div>
      {show && <AddStudentModal show={show} />}
      <Container fluid>
        <Table striped="columns" size="sm">
          <thead>
            <tr>
              <th>name</th>
              <th>phone</th>
              <th>email</th>
              <th>
                <Button onClick={handleAddClick}>add</Button>
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
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default StudentsList;
