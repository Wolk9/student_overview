import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./features/students/StudentsList";
import CoursesList from "./features/courses/CoursesList";
import AssignmentsList from "./features/assignments/AssignmentsList";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const navigate = useNavigate();
  const students = useSelector((state) => state.students);
  const courses = useSelector((state) => state.courses);
  const assignments = useSelector((state) => state.assignments);
  const showaddmodal = useSelector((state) => state.ui.addStudentModalOpen);
  const editStudentCardDisplay = useSelector(
    (state) => state.ui.editStudentCardDisplay
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
  const isAlertCardChecked = useSelector(
    (state) => state.ui.isAlertCardChecked
  );

  const averageFunNumberOfAllSelectedStudents = useSelector(
    (state) => state.ui.averageFunNumberOfAllSelectedStudents
  );

  const indexOfStudentToEdit = students.findIndex(
    (s) => s.id == selectedStudentsList[0]
  );

  // console.log(students[indexOfStudentToEdit], indexOfStudentToEdit);

  const prevSelectedStudentsList = useRef();

  //TODO: getState() uitzoeken

  useEffect(() => {
    console.log(
      "prevSelectedStudentsList.current.length",
      prevSelectedStudentsList.current.length
    );
    prevSelectedStudentsList.current = selectedStudentsList;
    if (students.length === selectedStudentsList.length) {
      dispatch(toggleAllStudentsChecked(true));
    } else {
      dispatch(toggleAllStudentsChecked(false));
    }

    if (selectedStudentsList.length === 0) {
      dispatch(toggleAverageCheckBox(false));
    } else if (selectedStudentsList.length === 1) {
      console.log("er is nog maar één student over, average uit");
      dispatch(toggleAverageCheckBox(false));
      dispatch(toggleEditStudentCard(true));
      if (prevSelectedStudentsList.current.length === 2) {
        AlertOn(5000);
      }
    }
  }, [selectedStudentsList]);

  const handleSelectedStudentsURL = (e) => {
    console.log("handleSelectedStudentsURL", e);
    const selectedStudent = students.find((s) => s.id === e.id);

    dispatch(addToSelectedStudentsList(selectedStudent));
  };

  const studentCheckboxChange = (e) => {
    console.log("studentCheckboxChange");
    const indexOfStudent = students.findIndex((s) => s.id == e.target.name);
    console.log("index of the selected Student:", indexOfStudent);
    if (!isStudentChecked({ id: e.target.id })) {
      console.log("student is not checked");
      dispatch(addToSelectedStudentsList(students[indexOfStudent].id));
    } else {
      console.log("student is checked");
      dispatch(removeFromSelectedStudentsList(students[indexOfStudent].id));
    }
  };

  const AlertOn = (timeout) => {
    dispatch(toggleAlert(true));
    setTimeout(() => {
      dispatch(toggleAlert(false));
    }, timeout);
  };

  const AlertOff = () => {
    dispatch(toggleAlert(false));
  };

  // const handleSelectedStudentsChange = (e) => {
  //   console.log("handleSelectedStudentsChange");
  //   if (selectedStudentsList.length === 1) {
  //     console.log("handleSelectedStudentsChange SelectedStudentsList = 1");
  //     const selectedStudent = students.find((s) => s.id === e.id);

  //     if (isStudentChecked(selectedStudent)) {
  //       console.log("student is geselecteerd, dus verwijderen");
  //       dispatch(removeFromSelectedStudentsList(selectedStudent));
  //     } else {
  //       console.log("student is niet geselecteerd dus selecteer maar");
  //       dispatch(addToSelectedStudentsList(selectedStudent));
  //     }
  //   } else if (
  //     selectedStudentsList.length > 1 &&
  //     selectedStudentsList.length !== students.length
  //   ) {
  //     console.log("handleSelectedStudentChange: > 1 maar niet allemaal");
  //     const selectedStudent = students.find((s) => s.id === e.id);
  //     if (isStudentChecked(selectedStudent)) {
  //       console.log("selected > 1 | !allemaal, student selected");
  //       if (selectedStudentsList.length === 2) {
  //         console.log("2 selected student selected");
  //         handleAverageBoxChange();
  //         dispatch(removeFromSelectedStudentsList(selectedStudent));
  //       } else {
  //         console.log("> 2 selected student selected");
  //         dispatch(removeFromSelectedStudentsList(selectedStudent));
  //       }
  //     } else if (!isStudentChecked(selectedStudent)) {
  //       dispatch(addToSelectedStudentsList(selectedStudent));
  //     }
  //   } else if (selectedStudentsList.length === students.length) {
  //     // console.log("handleSelectedStudentChange: allemaal");
  //   } else if (selectedStudentsList.length === 0) {
  //     // console.log("handleSelectedStudentChange: geen studenten geselecteerd");
  //     const selectedStudent = students.find((s) => s.id === e.id);
  //     // console.log(selectedStudent);
  //     dispatch(addToSelectedStudentsList(selectedStudent));

  //     // const indexOfStudentToEdit = students.findIndex(
  //     //   (selected) => selected.id === e.id
  //     // );
  //     // setIndexOfStudentToEdit(indexOfStudentToEdit);
  //   }
  // };

  const onSubmit = (event) => {
    // console.log("clicked on onSubmit");
    event.preventDefault();

    dispatch(toggleEditStudentCard());

    //TODO: redux result reflect into JSON server
    //TODO: format phone and email check and alert
  };

  const handleChange = (e) => {
    // console.log(event.target.name, event.target.value);
    dispatch(
      editStudent({
        ...students[indexOfStudentToEdit],
        [e.target.name]: e.target.value,
      })
    );
  };

  const onClickDifficultySwatch = () => {
    // console.log("Clicked on DifficultySwatch");
    dispatch(toggleDifficultyColorPicker());
  };

  const onClickFunSwatch = () => {
    //  console.log("Clicked on FunSwatch");
    dispatch(toggleFunColorPicker());
  };

  const onChangeDifficultyColor = (e) => {
    // console.log("difficulty Value", e);
    dispatch(setDifficultyColor(e));

    dispatch(
      editStudent({ ...students[indexOfStudentToEdit], colorDifficulty: e })
    );
  };
  const onChangeFunColor = (e) => {
    // console.log("fun Value", e);
    dispatch(setFunColor(e));

    // setStudentEdit({ ...studentEdit, colorFun: e });
    dispatch(editStudent({ ...students[indexOfStudentToEdit], colorFun: e }));
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
    console.log(
      "handleAverageBoxChange. Status isAverageBoxChecked =",
      isAverageBoxChecked
    );
    if (selectedStudentsList.length === 0) {
      alert("Er is niet zoiets...\n  ...als het gemiddelde van niets");
    } else if (selectedStudentsList.length === 1) {
      dispatch(toggleAverageCheckBox(false));
    } else {
      dispatch(toggleAverageCheckBox(true));
      if (isAverageBoxChecked === true) {
        dispatch(toggleAverageCheckBox(false));
      }
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <Overview
              alertOn={AlertOn}
              alertOff={AlertOff}
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
              isAlertCardChecked={isAlertCardChecked}
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
              editStudentCardDisplay={editStudentCardDisplay}
              averageFunNumberOfAllSelectedStudents={
                averageFunNumberOfAllSelectedStudents
              }
              setAverageFunOfAllSelectedStudents={
                setAverageFunOfAllSelectedStudents
              }
              studentCheckboxChange={studentCheckboxChange}
            />
          }></Route>
        <Route
          path=":studentName"
          element={
            <SingleStudentView
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
              isStudentChecked={isStudentChecked}
              handleSelectedStudentsURL={handleSelectedStudentsURL}
              addToSelectedStudentsList={addToSelectedStudentsList}
              removeFromSelectedStudentsList={removeFromSelectedStudentsList}
              handleAllBoxChange={handleAllBoxChange}
              depolulateSelectedStudentList={depolulateSelectedStudentList}
              populateSelectedStudentList={populateSelectedStudentList}
              handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
              handleFunCheckboxChange={handleFunCheckboxChange}
              isFunBoxChecked={isFunBoxChecked}
              isDifficultyBoxChecked={isDifficultyBoxChecked}
              isAverageBoxChecked={isAverageBoxChecked}
              isAlertCardChecked={isAlertCardChecked}
              selectedStudentsList={selectedStudentsList}
              editStudentCardDisplay={editStudentCardDisplay}
              averageFunNumberOfAllSelectedStudents={
                averageFunNumberOfAllSelectedStudents
              }
              setAverageFunOfAllSelectedStudents={
                setAverageFunOfAllSelectedStudents
              }
              studentCheckboxChange={studentCheckboxChange}
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
              editStudentCardDisplay={editStudentCardDisplay}
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
