import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Overview from "../overview/Overview";

const SingleStudentView = ({
  showAlert,
  setShowAlert,
  courses,
  students,
  studentNames,
  assignments,
  handleEditClick,
  indexOfStudentToEdit,
  setIndexOfStudentToEdit,
  onSubmit,
  handleChange,
  isDifficultyColorPickerOpen,
  isFunColorPickerOpen,
  colorDifficulty,
  colorFun,
  onClickDifficultySwatch,
  onClickFunSwatch,
  onChangeDifficultyColor,
  onChangeFunColor,
  onCloseDifficultyColor,
  onCloseFunColor,
  isStudentChecked,
  handleSelectedStudentsChange,
  handleSelectedStudentsURL,
  addToSelectedStudentsList,
  removeFromSelectedStudentsList,
  handleAllBoxChange,
  handleAverageBoxChange,
  depolulateSelectedStudentList,
  populateSelectedStudentList,
  handleDifficultyCheckBoxChange,
  handleFunCheckboxChange,
  isFunBoxChecked,
  isDifficultyBoxChecked,
  isAverageBoxChecked,
  isAllBoxChecked,
  selectedStudentsList,
  isStudentCardChecked,
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  flushSelectedStudentsList,
  toggleAllStudentsChecked,
  studentCheckboxChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { studentName } = useParams();
  console.log("URL name: ", studentName);

  const test = /[-_. ]/;
  let [firstName, lastName] = studentName.split(test);

  if (studentName.search(test) == -1) {
    console.log("zit geen dingetje in");
    lastName = "noname";
  }

  console.log(firstName, lastName);

  const firstNameLC = firstName.toLowerCase();
  const lastNameLC = lastName.toLowerCase();

  console.log("Extracted URL Name: ", firstName, lastName);
  console.log("Lowercase Extracted Name: ", firstNameLC, lastNameLC);

  const studentsLC = students.map((student) => ({
    firstName: student.firstName.toLowerCase(),
    lastName: student.lastName.toLowerCase(),
  }));

  console.log("Lowercase studentslist: ", studentsLC);

  const indexOfStudentToUse = studentsLC.findIndex(
    (student) =>
      student.firstName == firstNameLC || student.lastName == lastNameLC
  );

  if (indexOfStudentToUse >= 0) {
    console.log(
      "Index of student to use: ",
      indexOfStudentToUse,
      students[indexOfStudentToUse].firstName,
      students[indexOfStudentToUse].lastName
    );
  } else {
    console.log("Index of student to use: ", indexOfStudentToUse);
    dispatch(setShowAlert(true));
    navigate("/");
  }

  // const studentToUse = () => {
  //   console.log(students);
  //   const isStudentNameInStudents = studentsLC.findIndex((s) => {});

  //   console.log(isStudentNameInStudents, selectedStudentsList.length);
  //   console.log(
  //     isStudentNameInStudents === -1 && selectedStudentsList.length <= 1
  //   );
  //   if (isStudentNameInStudents !== -1 && selectedStudentsList.length <= 1) {
  //     console.log("ja");
  //     const studentId = students[isStudentNameInStudents].id;
  //     console.log(studentId);
  //     handleSelectedStudentsURL({ id: studentId });
  //   } else {
  //     console.log("nee");
  //   }
  // };

  // studentToUse();

  return (
    <>
      <Overview
        showAlert={showAlert}
        studentName={studentName}
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
        isStudentCardChecked={isStudentCardChecked}
        studentCheckboxChange={studentCheckboxChange}
      />
    </>
  );
};

export default SingleStudentView;
