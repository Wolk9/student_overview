import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentsList from "./features/students/StudentsList";
import { useSelector } from "react-redux";
import studentService from "./services/students";
import Overview from "./features/overview/Overview";
import { Container, Nav, Navbar } from "react-bootstrap";

const App = () => {
  // const [students, setStudents] = useState([]);
  const students = useSelector((state) => state.students);
  const show = useSelector((state) => state.ui.addStudentModalOpen);

  console.log(show);
  console.log(students);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">MdB StudentBoard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/students">Students</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route
          path="/students"
          element={<StudentsList students={students} show={show} />}
        />
      </Routes>
    </div>
  );
};

//TODO: add navigation section with links and url's that reflect the right student
//TODO: add courses and assignments from JSON Server

export default App;
