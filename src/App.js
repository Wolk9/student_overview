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
  const isFunBoxChecked = useSelector((state) => state.ui.isFunBoxChecked);
  const isDifficultyBoxChecked = useSelector(
    (state) => state.ui.isDifficultyBoxChecked
  );
  const showAlert = useSelector((state) => state.ui.showAlert);
  const isStudentModalOpen = useSelector(
    (state) => state.ui.isStudentModalOpen
  );
  const [formerLength, setFormerLength] = useState(0);

  // Logic functions ------------------------------------------------------------

  let indexOfStudentToEdit = students.findIndex(
    (s) => s.id == selectedStudentsList[0]
  );

  const studentCheckboxChange = (e) => {
    const indexOfStudent = students.findIndex((s) => s.id == e.target.name);
    if (!isStudentChecked({ id: e.target.id })) {
      dispatch(addToSelectedStudentsList(students[indexOfStudent].id));
    } else {
      dispatch(removeFromSelectedStudentsList(students[indexOfStudent].id));
    }
    if (students.length === selectedStudentsList.length) {
      dispatch(toggleAllStudentsChecked(true));
      setFormerLength(selectedStudentsList.length);
    } else {
      dispatch(toggleAllStudentsChecked(false));
    }
    if (selectedStudentsList.length === 0) {
      dispatch(toggleAverageCheckBox(false));
      dispatch(toggleEditStudentCard(false));
      dispatch(toggleEdit(false));
      setFormerLength(0);
    } else if (selectedStudentsList.length === 1) {
      setFormerLength(1);
      dispatch(toggleAverageCheckBox(false));
      dispatch(toggleEditStudentCard(true));
      dispatch(toggleEdit(true));
    } else if (selectedStudentsList.length > 1) {
      dispatch(toggleEditStudentCard(false));
      setFormerLength(selectedStudentsList.length);
    }
  };

  const onSubmit = () => {
    dispatch(toggleEditStudentCard());
  };

  const handleChange = (e) => {
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
    dispatch(toggleDifficultyColorPicker());
  };

  const onClickFunSwatch = () => {
    dispatch(toggleFunColorPicker());
  };

  const onChangeDifficultyColor = (color) => {
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
    if (isDifficultyBoxChecked === true) {
      dispatch(toggleFunCheckBox());
    } else {
      dispatch(toggleDifficultyCheckBox());
    }
  };

  const handleDifficultyCheckBoxChange = () => {
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
    dispatch(toggleAllStudentsChecked(!isAllBoxChecked));

    if (selectedStudentsList.length !== students.length) {
      populateSelectedStudentList();
    } else {
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
              addToSelectedStudentsList={addToSelectedStudentsList}
              assignments={assignments}
              courses={courses}
              handleAllBoxChange={handleAllBoxChange}
              handleAverageBoxChange={handleAverageBoxChange}
              handleChange={handleChange}
              handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
              handleFunCheckboxChange={handleFunCheckboxChange}
              indexOfStudentToEdit={indexOfStudentToEdit}
              isAllBoxChecked={isAllBoxChecked}
              isAverageBoxChecked={isAverageBoxChecked}
              isDifficultyBoxChecked={isDifficultyBoxChecked}
              isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
              isFunBoxChecked={isFunBoxChecked}
              isFunColorPickerOpen={isFunColorPickerOpen}
              isStudentChecked={isStudentChecked}
              onChangeDifficultyColor={onChangeDifficultyColor}
              onChangeFunColor={onChangeFunColor}
              onClickDifficultySwatch={onClickDifficultySwatch}
              onClickFunSwatch={onClickFunSwatch}
              studentCheckboxChange={studentCheckboxChange}
              students={students}
            />
          }></Route>
        <Route
          path=":studentName"
          element={
            <SingleStudentView
              addToSelectedStudentsList={addToSelectedStudentsList}
              assignments={assignments}
              courses={courses}
              handleAllBoxChange={handleAllBoxChange}
              handleChange={handleChange}
              handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
              handleFunCheckboxChange={handleFunCheckboxChange}
              isAllBoxChecked={isAllBoxChecked}
              isAverageBoxChecked={isAverageBoxChecked}
              isDifficultyBoxChecked={isDifficultyBoxChecked}
              isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
              isFunBoxChecked={isFunBoxChecked}
              isFunColorPickerOpen={isFunColorPickerOpen}
              isStudentChecked={isStudentChecked}
              onChangeDifficultyColor={onChangeDifficultyColor}
              onChangeFunColor={onChangeFunColor}
              onClickDifficultySwatch={onClickDifficultySwatch}
              onClickFunSwatch={onClickFunSwatch}
              selectedStudentsList={selectedStudentsList}
              setShowAlert={setShowAlert}
              showAlert={showAlert}
              studentCheckboxChange={studentCheckboxChange}
              students={students}
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
            />
          }
        />

        <Route path="/courses" element={<CoursesList courses={courses} />} />
        <Route
          path="/assignments"
          element={
            <AssignmentsList
              assignments={assignments}
              students={students}
              courses={courses}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
