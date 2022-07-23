import React from "react";
import { Table, Button, Container, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import StudentItem from "./StudentItem";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "../ui/uiSlice";
import AddStudentModal from "./AddStudentModal";
import { mdiAccountPlus } from "@mdi/js";
import Icon from "@mdi/react";

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
      <Container fluid className="p-4 m4">
        <Card xs={4}>
          <Table striped="columns" size="sm" className="p-4 m4">
            <thead>
              <tr>
                <th>name</th>
                <th>phone</th>
                <th>email</th>
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
                />
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default StudentsList;
