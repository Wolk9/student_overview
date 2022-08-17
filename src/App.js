import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./features/students/StudentsList";
import CoursesList from "./features/courses/CoursesList";
import AssignmentsList from "./features/assignments/AssignmentsList";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAllStudentsChecked,
  toggleAddStudentModal,
  toggleEditStudentCard,
  setSelectedStudent,
  editSelectedStudent,
  toggleDifficultyColorPicker,
  toggleFunColorPicker,
  setDifficultyColor,
  setFunColor,
} from "../src/features/ui/uiSlice";
import { editStudent } from "../src/features/students/studentSlice";
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
  const isAllBoxChecked = useSelector((state) => state.ui.isAllBoxChecked);
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);
  const selectedStudentsList = useSelector(
    (state) => state.ui.selectedStudentsList
  );
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

  const [studentEdit, setStudentEdit] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    photo: "",
    color: "",
    colorFun: "",
  });

  const [indexOfStudentToEdit, setIndexOfStudentToEdit] = useState();

  console.log(indexOfStudentToEdit);
  console.log(students[indexOfStudentToEdit]);

  useEffect(() => {
    if (students.length === selectedStudentsList.length) {
      dispatch(toggleAllStudentsChecked(true));
    } else {
      dispatch(toggleAllStudentsChecked(false));
    }
  }, [selectedStudentsList]);

  const handleEditClick = (e) => {
    // als er op de naam van de student geklikt wordt wordt dit uitgevoerd
    console.log("Click on StudentEdit " + e.id + " happend");
    if (showeditCard === true) {
      // als er op de naam geklikt wordt terwijl de kaart open is sluit hij de kaart hier eerst
      dispatch(toggleEditStudentCard());
    }
    // open de studentCard
    dispatch(toggleEditStudentCard());
    // selecteer de te bewerken student uit students aan de hand van het e.id in een array
    const pickedStudent = students.filter((student) => student.id === e.id);
    const indexOfStudentToEdit = students.findIndex(
      (selected) => selected.id === e.id
    );

    console.log(indexOfStudentToEdit);

    setIndexOfStudentToEdit(indexOfStudentToEdit);
    // console.log("pickedStudent", pickedStudent[0]);
    // zet de te bewerken gegevens in studentEdit. Dit is item 1 uit het array dus index 0
    //setStudentEdit(pickedStudent[0]);
    //dispatch(setSelectedStudent(pickedStudent[0]));
  };

  const onSubmit = (event) => {
    // console.log("clicked on onSubmit");
    event.preventDefault();
    // console.log(studentEdit);
    dispatch(editStudent(studentEdit));

    dispatch(toggleEditStudentCard());

    // console.log("EditStudentModal selectedStudent:", selectedStudent);

    //TODO: redux result reflect into JSON server
    //TODO: format phone and email check and alert
  };

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    console.log(
      "handleChange selectedStudent: ",
      students[indexOfStudentToEdit]
    );

    //setStudentEdit({ ...studentEdit, [event.target.name]: event.target.value });
    // dispatch(
    //   editStudent({ ...students, [event.target.name]: event.target.value })
    // );
    dispatch(
      editStudent({
        ...students[indexOfStudentToEdit],
        [event.target.name]: event.target.value,
      })
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
    // editSelectedStudent({
    //   ...selectedStudent,
    //   colorDifficulty: e,
    // });
    // setStudentEdit({ ...studentEdit, colorDifficulty: e });
    dispatch(
      editStudent({ ...students[indexOfStudentToEdit], colorDifficulty: e })
    );
    //dispatch(toggleDifficultyColorPicker());
  };
  const onChangeFunColor = (e) => {
    console.log("fun Value", e);
    dispatch(setFunColor(e));
    // editSelectedStudent({
    //   ...selectedStudent,
    //   colorFun: e,
    // });
    // setStudentEdit({ ...studentEdit, colorFun: e });
    dispatch(editStudent({ ...students[indexOfStudentToEdit], colorFun: e }));
    //dispatch(toggleFunColorPicker());
  };

  const onCloseDifficultyColor = (x) => {
    // console.log("close Difficulty Color", x);
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
              indexOfStudentToEdit={indexOfStudentToEdit}
              setIndexOfStudentToEdit={setIndexOfStudentToEdit}
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
              setStudentEdit={setStudentEdit}
              isAllBoxChecked={isAllBoxChecked}
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
