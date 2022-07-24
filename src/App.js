import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./features/students/StudentsList";
import CoursesList from "./features/courses/CoursesList";
import AssignmentsList from "./features/assignments/AssignmentsList";
import { useSelector } from "react-redux";
import dataService from "./services/dataService";
import Overview from "./features/overview/Overview";
import { Container, Nav, Navbar } from "react-bootstrap";

const App = () => {
  // const [students, setStudents] = useState([]);
  const students = useSelector((state) => state.students);
  const courses = useSelector((state) => state.courses);
  const assignments = useSelector((state) => state.assignments);
  const show = useSelector((state) => state.ui.addStudentModalOpen);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">MdB StudentBoard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/students">Students</Nav.Link>
            <Nav.Link href="/courses">Courses</Nav.Link>
            <Nav.Link href="/assignments">Assignments</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route
          path="/students"
          element={<StudentsList students={students} show={show} />}
        />
        <Route
          path="/courses"
          element={<CoursesList courses={courses} show={show} />}
        />
        <Route
          path="/assignments"
          element={<AssignmentsList assignments={assignments} show={show} />}
        />
        }/>
      </Routes>
    </div>
  );
};

//TODO: add navigation section with links and url's that reflect the right student
//TODO: add courses and assignments from JSON Server

export default App;
