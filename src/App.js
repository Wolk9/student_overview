import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./features/students/StudentsList";
import CoursesList from "./features/courses/CoursesList";
import AssignmentsList from "./features/assignments/AssignmentsList";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddStudentModal,
  toggleEditStudentCard,
  setSelectedStudent,
  editSelectedStudent,
  toggleDifficultyColorPicker,
  toggleFunColorPicker,
  setDifficultyColor,
  setFunColor,
} from "../src/features/ui/uiSlice";
import Overview from "./features/overview/Overview";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarLink,
  MDBNavbarNav,
} from "mdb-react-ui-kit";

const App = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const courses = useSelector((state) => state.courses);
  const assignments = useSelector((state) => state.assignments);
  const showaddmodal = useSelector((state) => state.ui.addStudentModalOpen);
  const showeditCard = useSelector((state) => state.ui.editStudentCardDisplay);
  const selectedStudent = useSelector((state) => state.ui.selectedStudent[0]);
  const isDifficultyColorPickerOpen = useSelector(
    (state) => state.ui.isDifficultyColorPickerOpen
  );
  const isFunColorPickerOpen = useSelector(
    (state) => state.ui.isFunColorPickerOpen
  );
  const colorDifficulty = useSelector((state) => state.ui.colorDifficulty);
  const colorFun = useSelector((state) => state.ui.colorFun);

  const studentNames = students.map((student) => ({
    id: student.id,
    fullName: student.firstName + "_" + student.lastName,
  }));

  const handleEditClick = (e) => {
    console.log(e);
    console.log("Click on StudentEdit " + e.id + " happend");
    dispatch(toggleEditStudentCard());
    const pickedStudent = students.filter((student) => student.id === e.id);
    console.log("pickedStudent", pickedStudent);
    dispatch(setSelectedStudent(pickedStudent));
  };

  const onSubmit = (event) => {
    console.log("clicked on Submit");
    event.preventDefault();

    dispatch(toggleEditStudentCard());

    console.log("EditStudentModal selectedStudent:", selectedStudent);

    //TODO: redux result reflect into JSON server
    //TODO: format phone and email check and alert
  };

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    console.log("handleChange selectedStudent: ", selectedStudent);

    dispatch(
      editSelectedStudent({ key: event.target.name, value: event.target.value })
    );
  };

  const onClickDifficultySwatch = () => {
    console.log("Clicked on DifficultySwatch");
    dispatch(toggleDifficultyColorPicker());
  };

  const onClickFunSwatch = () => {
    console.log("Clicked on FunSwatch");
    dispatch(toggleFunColorPicker());
  };

  const onChangeDifficultyColor = (e) => {
    console.log("difficulty Value", e);
    dispatch(setDifficultyColor(e));
    editSelectedStudent({
      ...selectedStudent,
      colorDifficulty: e,
    });
    //dispatch(toggleDifficultyColorPicker());
  };
  const onChangeFunColor = (e) => {
    console.log("fun Value", e);
    dispatch(setFunColor(e));
    editSelectedStudent({
      ...selectedStudent,
      colorFun: e,
    });
    //dispatch(toggleFunColorPicker());
  };

  const onCloseDifficultyColor = (x) => {
    console.log("close Difficulty Color", x);
    dispatch(toggleDifficultyColorPicker());
  };

  const onCloseFunColor = (x) => {
    console.log("Close Fun Color", x);
    dispatch(toggleFunColorPicker());
  };

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
              handleEditClick={handleEditClick}
              selectedStudent={selectedStudent}
              onSubmit={onSubmit}
              handleChange={handleChange}
              isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
              isFunColorPickerOpen={isFunColorPickerOpen}
              colorDifficulty={colorDifficulty}
              colorFun={colorFun}
              onClickDifficultySwatch={onClickDifficultySwatch}
              onClickFunSwatch={onClickFunSwatch}
              onChangeDifficultyColor={onChangeDifficultyColor}
              onChangeFunColor={onChangeFunColor}
              onCloseDifficultyColor={onCloseDifficultyColor}
              onCloseFunColor={onCloseFunColor}
            />
          }
        />
        <Route
          path="/students"
          element={
            <StudentsList
              students={students}
              showaddmodal={showaddmodal}
              showeditCard={showeditCard}
              handleEditClick={handleEditClick}
              onSubmit={onSubmit}
              handleChange={handleChange}
              colorDifficulty={colorDifficulty}
              colorFun={colorFun}
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
              selectedStudent={selectedStudent}
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
