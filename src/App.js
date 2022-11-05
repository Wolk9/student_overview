import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./features/students/StudentsList";
import CoursesList from "./features/courses/CoursesList";
import AssignmentsList from "./features/assignments/AssignmentsList";
import dataService from "../src/services/dataService";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarLink,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import {
  setShowAlert,
  toggleAllStudentsChecked,
  toggleEditStudentCard,
  toggleAlert,
  addToSelectedStudentsList,
  removeFromSelectedStudentsList,
  toggleDifficultyColorPicker,
  toggleFunColorPicker,
  setDifficultyColor,
  setFunColor,
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  toggleAverageCheckBox,
  flushSelectedStudentsList,
  setAverageFunOfAllSelectedStudents,
} from "../src/features/ui/uiSlice";
import { editStudent } from "../src/features/students/studentSlice";
import Overview from "./features/overview/Overview";
import SingleStudentView from "../src/features/students/SingleStudentView";

const App = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const courses = useSelector((state) => state.courses);
  const assignments = useSelector((state) => state.assignments);
  const showaddmodal = useSelector((state) => state.ui.addStudentModalOpen);
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

  console.log(showAlert);
  console.log(isAverageBoxChecked);

  const averageFunNumberOfAllSelectedStudents = useSelector(
    (state) => state.ui.averageFunNumberOfAllSelectedStudents
  );

  const [formerLength, setFormerLength] = useState(0);

  const indexOfStudentToEdit = students.findIndex(
    (s) => s.id == selectedStudentsList[0]
  );

  // console.log(students[indexOfStudentToEdit], indexOfStudentToEdit);

  const handleSelectedStudentsURL = (e) => {};

  const studentCheckboxChange = (e) => {
    console.log("studentCheckboxChange");
    const indexOfStudent = students.findIndex((s) => s.id == e.target.name);
    console.log("index of the selected Student:", indexOfStudent);
    if (!isStudentChecked({ id: e.target.id })) {
      console.log("student is not checked");
      dispatch(addToSelectedStudentsList(students[indexOfStudent].id));
    } else {
      console.log("student", indexOfStudent, "is checked, so remove");
      dispatch(removeFromSelectedStudentsList(students[indexOfStudent].id));
      console.log("isStudentCardChecked:", isStudentCardChecked);
    }
    if (students.length === selectedStudentsList.length) {
      console.log("Alle studenten zijn geselecteerd");
      dispatch(toggleAllStudentsChecked(true));
      setFormerLength(selectedStudentsList.length);
    } else {
      console.log("Niet alle studenten zijn geselecteerd");
      dispatch(toggleAllStudentsChecked(false));
    }
    if (selectedStudentsList.length === 0) {
      console.log("SelectedStudentsList = 0");
      dispatch(toggleAverageCheckBox(false));
      dispatch(toggleEditStudentCard(false));
      setFormerLength(0);
    } else if (selectedStudentsList.length === 1) {
      console.log("er is nog maar één student over, average uit");
      dispatch(toggleAverageCheckBox(false));
      dispatch(toggleEditStudentCard(true));
      setFormerLength(1);
    } else if (selectedStudentsList.length > 1) {
      console.log("er is meer dan 1 geselecteerde student");
      dispatch(toggleEditStudentCard(false));
      setFormerLength(selectedStudentsList.length);
    }
  };

  const onSubmit = (event) => {
    // console.log("clicked on onSubmit");
    event.preventDefault();

    dispatch(toggleEditStudentCard());

    //TODO: redux result reflect into JSON server
    //TODO: format phone and email check and alert
  };

  const handleChange = (e) => {
    console.log("handleChange: \n", e.target.id, e.target.name, e.target.value);
    dispatch(
      editStudent({
        ...students[indexOfStudentToEdit],
        [e.target.name]: e.target.value,
      })
    );
    dataService.update("students", e.target.id, {
      ...students[indexOfStudentToEdit],
      [e.target.name]: e.target.value,
    });
  };

  const onClickDifficultySwatch = () => {
    // console.log("Clicked on DifficultySwatch");
    dispatch(toggleDifficultyColorPicker());
  };

  const onClickFunSwatch = () => {
    //  console.log("Clicked on FunSwatch");
    dispatch(toggleFunColorPicker());
  };

  const onChangeDifficultyColor = (color) => {
    // console.log("difficulty Value", e);
    dispatch(setDifficultyColor(color.hex));
    dispatch(
      editStudent({
        ...students[indexOfStudentToEdit],
        colorDifficulty: color.hex,
      })
    );
    const id = students[indexOfStudentToEdit].id;
    dataService.update("students", id, {
      ...students[indexOfStudentToEdit],
      colorDifficulty: color.hex,
    });
    dispatch(toggleDifficultyColorPicker());
  };
  const onChangeFunColor = (color) => {
    // console.log("fun Value", e);
    dispatch(setFunColor(color.hex));
    dispatch(
      editStudent({ ...students[indexOfStudentToEdit], colorFun: color.hex })
    );
    const id = students[indexOfStudentToEdit].id;
    dataService.update("students", id, {
      ...students[indexOfStudentToEdit],
      funColor: color.hex,
    });
    dispatch(toggleFunColorPicker());
  };

  const onCloseDifficultyColor = (x) => {
    // console.log("close Difficulty Color", x);
    dispatch(toggleDifficultyColorPicker());
  };

  const onCloseFunColor = (x) => {
    // console.log("Close Fun Color", x);
    dispatch(toggleFunColorPicker());
  };

  const isStudentChecked = (e) => {
    const checked = selectedStudentsList.some((s) => s == e.id);
    // console.log(e, checked);
    return checked;
  };

  const handleFunCheckboxChange = () => {
    // console.log("fun clicked");
    if (isDifficultyBoxChecked === true) {
      dispatch(toggleFunCheckBox());
    } else {
      dispatch(toggleFunCheckBox());
      dispatch(toggleDifficultyCheckBox());
    }
  };

  const handleDifficultyCheckBoxChange = () => {
    // console.log("difficulty clicked");
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
    console.log("handleAllBoxChange");
    dispatch(toggleAllStudentsChecked(!isAllBoxChecked));

    if (selectedStudentsList.length !== students.length) {
      console.log("er is nog niks geselecteerd, dus we selecteren ze allemaal");
      populateSelectedStudentList();
    } else {
      // console.log(
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
    console.log("gemiddelden zijn uitgeschakeld");
    dispatch(toggleAverageCheckBox(false));
  }

  return (
    <div className="App">
      <MDBNavbar expand="" dark bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/"> MdB StudentBoard </MDBNavbarBrand>
          <MDBNavbarNav className="me-auto">
            <MDBNavbarLink href="/">Home</MDBNavbarLink>
            <MDBNavbarLink href="/students">Studenten</MDBNavbarLink>
            <MDBNavbarLink href="/courses">Cursussen</MDBNavbarLink>
            <MDBNavbarLink href="/assignments">Opdrachten</MDBNavbarLink>
          </MDBNavbarNav>
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
              handleSelectedStudentsURL={handleSelectedStudentsURL}
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
            />
          }
        />

        <Route
          path="/students"
          element={
            <StudentsList
              students={students}
              indexOfStudentToEdit={indexOfStudentToEdit}
              showaddmodal={showaddmodal}
              isStudentCardChecked={isStudentCardChecked}
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
          }
        />
      </Routes>
    </div>
  );
};

export default App;
