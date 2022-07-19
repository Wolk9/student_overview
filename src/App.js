import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentsList from "./features/students/StudentsList";
import { Container } from "react-bootstrap";
import AddStudentModal from "./features/students/AddStudentModal";
import { useSelector } from "react-redux";
import studentService from "./services/students";

const App = () => {
  // const [students, setStudents] = useState([]);
  const students = useSelector((state) => state.students);
  const show = useSelector((state) => state.ui.addStudentModalOpen);

  // useEffect(() => {
  //   studentService.getAllStudents().then((response) => {
  //     setStudents(response.data);
  //   });
  // }, []);

  console.log(show);
  console.log(students);

  return (
    <div className="App">
      {show && <AddStudentModal show={show} />}
      <Container>
        <center>
          <h3>Student Overview App</h3>
        </center>
        <StudentsList students={students} />
      </Container>
    </div>
  );
};

export default App;
