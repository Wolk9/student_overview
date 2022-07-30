import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./features/students/StudentsList";
import CoursesList from "./features/courses/CoursesList";
import AssignmentsList from "./features/assignments/AssignmentsList";
import { useSelector } from "react-redux";
import Overview from "./features/overview/Overview";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarLink,
  MDBNavbarNav,
} from "mdb-react-ui-kit";

const App = () => {
  const students = useSelector((state) => state.students);
  const courses = useSelector((state) => state.courses);
  const assignments = useSelector((state) => state.assignments);
  const showaddmodal = useSelector((state) => state.ui.addStudentModalOpen);
  const showeditmodal = useSelector((state) => state.ui.editStudentModalOpen);
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
        <Route
          path="/"
          element={
            <Overview
              studentNames={studentNames}
              courses={courses}
              students={students}
              assignments={assignments}
            />
          }
        />
        <Route
          path="/students"
          element={
            <StudentsList
              students={students}
              showaddmodal={showaddmodal}
              showeditmodal={showeditmodal}
            />
          }
        />

        <Route path="/courses" element={<CoursesList courses={courses} />} />
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
                showaddmodal={showaddmodal}
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
