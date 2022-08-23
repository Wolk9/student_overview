import React from "react";
import { useParams } from "react-router-dom";
import Overview from "../overview/Overview";

const SingleStudentView = ({
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
  editStudentCardDisplay,
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  flushSelectedStudentsList,
  toggleAllStudentsChecked,
}) => {
  const { studentName } = useParams();
  console.log(studentName);

  const [firstName, lastName] = studentName.split("_");
  console.log(firstName, lastName);

  const studentToUse = () => {
    console.log(students);
    const isStudentNameInStudents = students.findIndex(
      (s) => s.firstName === firstName && s.lastName === lastName
    );

    console.log(isStudentNameInStudents, selectedStudentsList.length);
    console.log(
      isStudentNameInStudents === -1 && selectedStudentsList.length <= 1
    );
    if (isStudentNameInStudents !== -1 && selectedStudentsList.length <= 1) {
      console.log("ja");
      const studentId = students[isStudentNameInStudents].id;
      console.log(studentId);
      handleSelectedStudentsURL({ id: studentId });
    } else {
      console.log("nee");
    }
  };

  studentToUse();

  return (
    <>
      <Overview
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
        editStudentCardDisplay={editStudentCardDisplay}
      />
    </>
  );
};

export default SingleStudentView;
