import "bootstrap/dist/css/bootstrap.min.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarLink,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import SingleStudentView from "../src/features/students/SingleStudentView";
import { editStudent } from "../src/features/students/studentSlice";
import {
  addToSelectedStudentsList,
  editSelectedStudent,
  flushSelectedStudentsList,
  removeFromSelectedStudentsList,
  setAverageFunOfAllSelectedStudents,
  setDifficultyColor,
  setFunColor,
  setShowAlert,
  toggleAllStudentsChecked,
  toggleAverageCheckBox,
  toggleDifficultyCheckBox,
  toggleDifficultyColorPicker,
  toggleEdit,
  toggleEditStudentCard,
  toggleFunCheckBox,
  toggleFunColorPicker,
} from "../src/features/ui/uiSlice";
import dataService from "../src/services/dataService";
import "./App.css";
import AssignmentsList from "./features/assignments/AssignmentsList";
import CoursesList from "./features/courses/CoursesList";
import Overview from "./features/overview/Overview";
import StudentsList from "./features/students/StudentsList";

const App = () => {
  // Redux State interaction ----------------------------------------------------

  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const courses = useSelector((state) => state.courses);
  const assignments = useSelector((state) => state.assignments);
  const isStudentCardChecked = useSelector(
    (state) => state.ui.isStudentCardChecked
  );
  const isAllBoxChecked = useSelector((state) => state.ui.isAllBoxChecked);
  const isAverageBoxChecked = useSelector(
    (state) => state.ui.isAverageBoxChecked
  );
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
  const isFunBoxChecked = useSelector((state) => state.ui.isFunBoxChecked);
  const isDifficultyBoxChecked = useSelector(
    (state) => state.ui.isDifficultyBoxChecked
  );
  const showAlert = useSelector((state) => state.ui.showAlert);

  const averageFunNumberOfAllSelectedStudents = useSelector(
    (state) => state.ui.averageFunNumberOfAllSelectedStudents
  );
  const isStudentModalOpen = useSelector(
    (state) => state.ui.isStudentModalOpen
  );
  const [formerLength, setFormerLength] = useState(0);

  const edit = useSelector((state) => state.ui.edit);
  const tempNanoId = useSelector((state) => state.ui.tempNanoId);

  // Logic functions ------------------------------------------------------------

  let indexOfStudentToEdit = students.findIndex(
    (s) => s.id == selectedStudentsList[0]
  );

  console.log("App edit: ", edit);

  console.log(
    "huidige student om te editten: ",
    students[indexOfStudentToEdit],
    indexOfStudentToEdit
  );

  const studentCheckboxChange = (e) => {
    // console.log("studentCheckboxChange");
    const indexOfStudent = students.findIndex((s) => s.id == e.target.name);
    // console.log("index of the selected Student:", indexOfStudent);
    if (!isStudentChecked({ id: e.target.id })) {
      // console.log("student is not checked");
      dispatch(addToSelectedStudentsList(students[indexOfStudent].id));
    } else {
      // console.log("student", indexOfStudent, "is checked, so remove");
      dispatch(removeFromSelectedStudentsList(students[indexOfStudent].id));
      // console.log("isStudentCardChecked:", isStudentCardChecked);
    }
    if (students.length === selectedStudentsList.length) {
      // console.log("Alle studenten zijn geselecteerd");
      dispatch(toggleAllStudentsChecked(true));
      setFormerLength(selectedStudentsList.length);
    } else {
      // console.log("Niet alle studenten zijn geselecteerd");
      dispatch(toggleAllStudentsChecked(false));
    }
    if (selectedStudentsList.length === 0) {
      // console.log("SelectedStudentsList = 0");
      dispatch(toggleAverageCheckBox(false));
      dispatch(toggleEditStudentCard(false));
      dispatch(toggleEdit(false));
      setFormerLength(0);
    } else if (selectedStudentsList.length === 1) {
      // console.log("er is nog maar één student over, average uit");
      setFormerLength(1);
      dispatch(toggleAverageCheckBox(false));
      dispatch(toggleEditStudentCard(true));
      dispatch(toggleEdit(true));
    } else if (selectedStudentsList.length > 1) {
      // console.log("er is meer dan 1 geselecteerde student");
      dispatch(toggleEditStudentCard(false));
      setFormerLength(selectedStudentsList.length);
    }
  };

  const onSubmit = (event) => {
    // // console.log("clicked on onSubmit");

    dispatch(toggleEditStudentCard());

    //TODO: format phone and email check and alert
  };

  const handleChange = (e) => {
    console.log(
      "Edit: ",
      edit,
      ". HandleChange: \n",
      e.target.id,
      e.target.name,
      e.target.value
    );

    dispatch(
      editStudent({
        ...students[indexOfStudentToEdit],
        [e.target.name]: e.target.value,
      })
    );
    dispatch(
      editSelectedStudent({
        ...selectedStudent,
        [e.target.name]: e.target.value,
      })
    );
    dataService.update("students", e.target.id, {
      ...students[indexOfStudentToEdit],
      [e.target.name]: e.target.value,
    });
  };

  const onClickDifficultySwatch = () => {
    // // console.log("Clicked on DifficultySwatch");
    dispatch(toggleDifficultyColorPicker());
  };

  const onClickFunSwatch = () => {
    //  // console.log("Clicked on FunSwatch");
    dispatch(toggleFunColorPicker());
  };

  const onChangeDifficultyColor = (color) => {
    console.log("difficulty Value", color);
    dispatch(setDifficultyColor(color.hex));
    handleChange({
      target: {
        id: students[indexOfStudentToEdit].id,
        name: "colorDifficulty",
        value: color.hex,
      },
    });
    dispatch(toggleDifficultyColorPicker());
  };

  const onChangeFunColor = (color) => {
    console.log("fun Value", color.hex);
    dispatch(setFunColor(color.hex));
    handleChange({
      target: {
        id: students[indexOfStudentToEdit].id,
        name: "colorFun",
        value: color.hex,
      },
    });
    dispatch(toggleFunColorPicker());
  };

  const onCloseDifficultyColor = (x) => {
    dispatch(toggleDifficultyColorPicker());
  };

  const onCloseFunColor = (x) => {
    dispatch(toggleFunColorPicker());
  };

  const isStudentChecked = (e) => {
    const checked = selectedStudentsList.some((s) => s == e.id);
    return checked;
  };

  const handleFunCheckboxChange = () => {
    // // console.log("fun clicked");
    if (isDifficultyBoxChecked === true) {
      dispatch(toggleFunCheckBox());
    } else {
      dispatch(toggleDifficultyCheckBox());
    }
  };

  const handleDifficultyCheckBoxChange = () => {
    // // console.log("difficulty clicked");
    if (isFunBoxChecked === true) {
      dispatch(toggleDifficultyCheckBox());
    } else {
      dispatch(toggleDifficultyCheckBox());
      dispatch(toggleFunCheckBox());
    }
  };

  const populateSelectedStudentList = () => {
    students.map((student) => dispatch(addToSelectedStudentsList(student.id)));
  };

  const depolulateSelectedStudentList = () => {
    dispatch(flushSelectedStudentsList());
  };

  const handleAllBoxChange = () => {
    //
    // console.log("handleAllBoxChange");
    dispatch(toggleAllStudentsChecked(!isAllBoxChecked));

    if (selectedStudentsList.length !== students.length) {
      // console.log("er is nog niks geselecteerd, dus we selecteren ze allemaal");
      populateSelectedStudentList();
    } else {
      // // console.log(
      //   "ze zijn allemaal geselecteerd, dus we halen ze er allemaal uit"
      // );
      if (isAverageBoxChecked) {
        handleAverageBoxChange();
      }
      depolulateSelectedStudentList();
    }
  };

  const handleAverageBoxChange = () => {
    if (isAverageBoxChecked === true) {
      dispatch(toggleAverageCheckBox(false));
    } else {
      dispatch(toggleAverageCheckBox(true));
    }
  };

  if (formerLength != 0 && selectedStudentsList.length === 1) {
    // console.log("gemiddelden zijn uitgeschakeld");
    dispatch(toggleAverageCheckBox(false));
  }

  return (
    <div className="App">
      <MDBNavbar expand="sm" dark bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">WINC StudentBoard </MDBNavbarBrand>
          <MDBNavbarNav className="me-auto">
            <MDBNavbarLink href="/">Home</MDBNavbarLink>
            <MDBNavbarLink href="/students">Studenten</MDBNavbarLink>
            <MDBNavbarLink href="/courses">Cursussen</MDBNavbarLink>
            <MDBNavbarLink href="/assignments">Opdrachten</MDBNavbarLink>
          </MDBNavbarNav>
          <MDBNavbarBrand className="align-right pt-2">
            <h6>
              <i>Martin de Bes</i>
            </h6>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <Routes>
        <Route
          path="/"
          element={
            <Overview
              setShowAlert={setShowAlert}
              studentNames={studentNames}
              courses={courses}
              students={students}
              assignments={assignments}
              indexOfStudentToEdit={indexOfStudentToEdit}
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
              isAllBoxChecked={isAllBoxChecked}
              isAverageBoxChecked={isAverageBoxChecked}
              isStudentChecked={isStudentChecked}
              addToSelectedStudentsList={addToSelectedStudentsList}
              removeFromSelectedStudentsList={removeFromSelectedStudentsList}
              handleAllBoxChange={handleAllBoxChange}
              handleAverageBoxChange={handleAverageBoxChange}
              depolulateSelectedStudentList={depolulateSelectedStudentList}
              populateSelectedStudentList={populateSelectedStudentList}
              handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
              handleFunCheckboxChange={handleFunCheckboxChange}
              isFunBoxChecked={isFunBoxChecked}
              isDifficultyBoxChecked={isDifficultyBoxChecked}
              selectedStudentsList={selectedStudentsList}
              isStudentCardChecked={isStudentCardChecked}
              averageFunNumberOfAllSelectedStudents={
                averageFunNumberOfAllSelectedStudents
              }
              setAverageFunOfAllSelectedStudents={
                setAverageFunOfAllSelectedStudents
              }
              studentCheckboxChange={studentCheckboxChange}
              toggleAllStudentsChecked={toggleAllStudentsChecked}
              edit={edit}
            />
          }></Route>
        <Route
          path=":studentName"
          element={
            <SingleStudentView
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              studentNames={studentNames}
              courses={courses}
              students={students}
              assignments={assignments}
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
              isAllBoxChecked={isAllBoxChecked}
              isStudentChecked={isStudentChecked}
              addToSelectedStudentsList={addToSelectedStudentsList}
              removeFromSelectedStudentsList={removeFromSelectedStudentsList}
              handleAllBoxChange={handleAllBoxChange}
              handleAverageBoxChange={handleAverageBoxChange}
              depolulateSelectedStudentList={depolulateSelectedStudentList}
              populateSelectedStudentList={populateSelectedStudentList}
              handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
              handleFunCheckboxChange={handleFunCheckboxChange}
              isFunBoxChecked={isFunBoxChecked}
              isDifficultyBoxChecked={isDifficultyBoxChecked}
              isAverageBoxChecked={isAverageBoxChecked}
              selectedStudentsList={selectedStudentsList}
              isStudentCardChecked={isStudentCardChecked}
              averageFunNumberOfAllSelectedStudents={
                averageFunNumberOfAllSelectedStudents
              }
              setAverageFunOfAllSelectedStudents={
                setAverageFunOfAllSelectedStudents
              }
              studentCheckboxChange={studentCheckboxChange}
              toggleAllStudentsChecked={toggleAllStudentsChecked}
              edit={edit}
            />
          }
        />

        <Route
          path="/students"
          element={
            <StudentsList
              students={students}
              indexOfStudentToEdit={indexOfStudentToEdit}
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
              isStudentChecked={isStudentChecked}
              handleAllBoxChange={handleAllBoxChange}
              depolulateSelectedStudentList={depolulateSelectedStudentList}
              populateSelectedStudentList={populateSelectedStudentList}
              handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
              handleFunCheckboxChange={handleFunCheckboxChange}
              studentCheckboxChange={studentCheckboxChange}
              isStudentModalOpen={isStudentModalOpen}
              edit={edit}
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
          }
        />
      </Routes>
    </div>
  );
};

export default App;
