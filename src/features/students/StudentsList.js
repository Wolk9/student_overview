import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import StudentItem from "./StudentItem";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "../ui/uiSlice";

const StudentsList = () => {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    console.log("Click on StudentAdd happend");
    dispatch(openAddStudentModal(true));
  };

  return (
    <Table striped="columns" size="sm">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>gender</th>
          <th>age</th>
          <th>
            <button onClick={handleAddClick}>add</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem
            key={student.id}
            id={student.id}
            name={student.name}
            gender={student.gender}
            age={student.age}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default StudentsList;
