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
import { Nav, Navbar } from "react-bootstrap";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import { selectedStudent } from "../src/features/ui/uiSlice";

const App = () => {
  // const [students, setStudents] = useState([]);
  const students = useSelector((state) => state.students);
  const courses = useSelector((state) => state.courses);
  const assignments = useSelector((state) => state.assignments);
  const show = useSelector((state) => state.ui.addStudentModalOpen);
  const pickedStudent = useSelector((state) => state.ui.selectedStudent);

  const studentNames = students.map((student) => ({
    id: student.id,
    fullName: student.firstName + "_" + student.lastName,
  }));

  return (
    <div className="App">
      <MDBNavbar expand="lg" dark bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/"> MdB StudentBoard </MDBNavbarBrand>
          <MDBNavbarNav className="me-auto">
            <MDBNavbarLink href="/">Home</MDBNavbarLink>
            <MDBNavbarLink href="/students">Students</MDBNavbarLink>
            <MDBNavbarLink href="/courses">Courses</MDBNavbarLink>
            <MDBNavbarLink href="/assignments">Assignments</MDBNavbarLink>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
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
          element={
            <AssignmentsList
              key={assignments.id}
              assignments={assignments}
              students={students}
              studentNames={studentNames}
              pickedStudent={pickedStudent}
              courses={courses}
              show={show}
            />
          }>
          {/* <Route
            path="/assignments/:studentName"
            element={
              <AssignmentsList
                key={selectedStudent.id}
                assignments={assignments}
                students={students}
                studentNames={studentNames}
                selectedStudent={selectedStudent}
                courses={courses}
                show={show}
              />
            }
          /> */}
        </Route>
      </Routes>
    </div>
  );
};

//TODO: add navigation section with links and url's that reflect the right student
//TODO: add courses and assignments from JSON Server

export default App;
