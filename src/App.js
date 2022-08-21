import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./features/students/StudentsList";
import CoursesList from "./features/courses/CoursesList";
import AssignmentsList from "./features/assignments/AssignmentsList";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAllStudentsChecked,
  openEditStudentCard,
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

  const [indexOfStudentToEdit, setIndexOfStudentToEdit] = useState();

  // console.log(students[indexOfStudentToEdit], indexOfStudentToEdit);

  useEffect(() => {
    if (students.length === selectedStudentsList.length) {
      dispatch(toggleAllStudentsChecked(true));
    } else {
      dispatch(toggleAllStudentsChecked(false));
    }
    if (selectedStudentsList.length === 1) {
      dispatch(openEditStudentCard(true));
    } else if (selectedStudentsList !== 1) {
      dispatch(openEditStudentCard(false));
    }
  }, [selectedStudentsList, students, dispatch]);

  const handleEditClick = (e) => {
    // als er op de naam van de student geklikt wordt wordt dit uitgevoerd
    console.log("Click on StudentEdit " + e.id + " happend");
    // hoeveel studenten zijn er geselecteerd?
    const numberOfStudentsSelected = selectedStudentsList.length;
    console.log(numberOfStudentsSelected);

    // open de editCard
    dispatch(openEditStudentCard(true));

    // vind de index van de geklikte student
    const indexOfStudentToEdit = students.findIndex(
      (selected) => selected.id === e.id
    );
    // zet de gevonden index in indexOfStudentToEdit
    setIndexOfStudentToEdit(indexOfStudentToEdit);
    console.log(indexOfStudentToEdit);

    console.log("editStudentCardDisplay", editStudentCardDisplay);

    // maak de lijst met geselecteerde studenten leeg
    // depolulateSelectedStudentList();
    // vink de betreffende checkbox en show daarmee tevens de grafiek

    handleSelectedStudentsChange(e);
  };

  const handleSelectedStudentsChange = (e) => {
    // console.log("Selected Students Changed", e);
    // console.log("is student", e.id, "checked", isStudentChecked({ id: e.id }));
    // console.log(
    //   "start handleSelectedStudentsChange aantal:",
    //   selectedStudentsList.length
    // );

    if (selectedStudentsList.length === 1) {
      // console.log("handleSelectedStudentChange: 1 geselecteerd");
      const selectedStudent = students.find((s) => s.id === e.id);

      if (isStudentChecked(selectedStudent)) {
        dispatch(removeFromSelectedStudentsList(selectedStudent));
      } else {
        dispatch(addToSelectedStudentsList(selectedStudent));
        const indexOfStudentToEdit = students.findIndex(
          (selected) => selected.id === e.id
        );
        setIndexOfStudentToEdit(indexOfStudentToEdit);
      }
    } else if (
      selectedStudentsList.length > 1 &&
      selectedStudentsList.length !== students.length
    ) {
      // console.log("handleSelectedStudentChange: > 1 maar niet allemaal");
      const selectedStudent = students.find((s) => s.id === e.id);
      if (isStudentChecked(selectedStudent)) {
        dispatch(removeFromSelectedStudentsList(selectedStudent));
      } else if (!isStudentChecked(selectedStudent)) {
        dispatch(addToSelectedStudentsList(selectedStudent));
      }
    } else if (selectedStudentsList.length === students.length) {
      // console.log("handleSelectedStudentChange: allemaal");
    } else if (selectedStudentsList.length === 0) {
      // console.log("handleSelectedStudentChange: geen studenten geselecteerd");
      const selectedStudent = students.find((s) => s.id === e.id);
      // console.log(selectedStudent);
      dispatch(addToSelectedStudentsList(selectedStudent));

      const indexOfStudentToEdit = students.findIndex(
        (selected) => selected.id === e.id
      );
      setIndexOfStudentToEdit(indexOfStudentToEdit);
    }
  };

  const onSubmit = (event) => {
    // console.log("clicked on onSubmit");
    event.preventDefault();

    dispatch(openEditStudentCard());

    //TODO: redux result reflect into JSON server
    //TODO: format phone and email check and alert
  };

  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);

    dispatch(
      editStudent({
        ...students[indexOfStudentToEdit],
        [event.target.name]: event.target.value,
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
    const checked = selectedStudentsList.some((s) => s === e.id);
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
    students.map((student) =>
      dispatch(addToSelectedStudentsList({ id: student.id }))
    );
  };

  const depolulateSelectedStudentList = () => {
    students.map((student) => dispatch(flushSelectedStudentsList()));
  };

  const handleAllBoxChange = () => {
    // console.log("handleAllBoxChange");
    dispatch(toggleAllStudentsChecked(!isAllBoxChecked));

    if (selectedStudentsList.length !== students.length) {
      // console.log("er is nog niks geselecteerd, dus we selecteren ze allemaal");
      populateSelectedStudentList();
    } else {
      // console.log(
      //   "ze zijn allemaal geselecteerd, dus we halen ze er allemaal uit"
      // );
      depolulateSelectedStudentList();
    }
  };

  const handleAverageBoxChange = () => {
    console.log(
      "handleAverageBoxChange. Status isAverageBoxChecked =",
      isAverageBoxChecked
    );
    dispatch(toggleAverageCheckBox(!isAverageBoxChecked));
  };
  console.log("Status isAverageBoxChecked =", isAverageBoxChecked);
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
              isAllBoxChecked={isAllBoxChecked}
              isAverageBoxChecked={isAverageBoxChecked}
              isStudentChecked={isStudentChecked}
              handleSelectedStudentsChange={handleSelectedStudentsChange}
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
            />
          }>
          <Route
            path=":studentNames.fullName"
            element={
              <Overview
                studentNames={studentNames}
                courses={courses}
                students={students}
                assignments={assignments}
                handleEditClick={handleEditClick}
                indexOfStudentToEdit={studentNames.id}
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
                isAllBoxChecked={isAllBoxChecked}
                isStudentChecked={isStudentChecked}
                handleSelectedStudentsChange={handleSelectedStudentsChange}
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
                selectedStudentsList={selectedStudentsList}
                editStudentCardDisplay={editStudentCardDisplay}
              />
            }
          />
        </Route>
        <Route
          path="/students"
          element={
            <StudentsList
              students={students}
              indexOfStudentToEdit={indexOfStudentToEdit}
              showaddmodal={showaddmodal}
              editStudentCardDisplay={editStudentCardDisplay}
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
          }
        />
      </Routes>
    </div>
  );
};

//TODO: add navigation section with links and url's that reflect the right student

export default App;
