import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentsList from "./features/students/StudentsList";
import { Container } from "react-bootstrap";
import AddStudentModal from "./features/students/AddStudentModal";
import { useSelector } from "react-redux";

function App() {
  const show = useSelector((state) => state.ui.addStudentModalOpen);

  console.log(show);

  return (
    <div className="App">
      {show && <AddStudentModal show={show} />}
      <Container>
        <center>
          <h3>Student Overview App</h3>
        </center>
        <StudentsList />
      </Container>
    </div>
  );
}

export default App;
