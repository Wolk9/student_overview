import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Overview from "../overview/Overview";

const SingleStudentView = ({
  addToSelectedStudentsList,
  assignments,
  courses,
  handleAllBoxChange,
  handleChange,
  handleDifficultyCheckBoxChange,
  handleFunCheckboxChange,
  isAllBoxChecked,
  isAverageBoxChecked,
  isDifficultyBoxChecked,
  isDifficultyColorPickerOpen,
  isFunBoxChecked,
  isFunColorPickerOpen,
  isStudentChecked,
  onChangeDifficultyColor,
  onChangeFunColor,
  onClickDifficultySwatch,
  onClickFunSwatch,
  selectedStudentsList,
  setShowAlert,
  studentCheckboxChange,
  students,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { studentName } = useParams();
  // console.log("URL name: ", studentName);

  const test = /[-_. ]/;
  let [firstName, lastName] = studentName.split(test);

  if (studentName.search(test) == -1) {
    // console.log("zit geen dingetje in");
    lastName = "noname";
  }

  // console.log(firstName, lastName);

  const firstNameLC = firstName.toLowerCase();
  const lastNameLC = lastName.toLowerCase();

  // console.log("Extracted URL Name: ", firstName, lastName);
  // console.log("Lowercase Extracted Name: ", firstNameLC, lastNameLC);

  const studentsLC = students.map((student) => ({
    firstName: student.firstName.toLowerCase(),
    lastName: student.lastName.toLowerCase(),
  }));

  // console.log("Lowercase studentslist: ", studentsLC);

  const indexOfStudentToUse = studentsLC.findIndex(
    (student) =>
      student.firstName == firstNameLC || student.lastName == lastNameLC
  );

  useEffect(() => {
    if (indexOfStudentToUse != -1) {
      // console.log(
      //   "Index of student to use: ",
      //   indexOfStudentToUse,
      //   students[indexOfStudentToUse].firstName,
      //   students[indexOfStudentToUse].lastName
      // );
    } else {
      // console.log("Index of student to use: ", indexOfStudentToUse);

      dispatch(setShowAlert(true));
      navigate("/");
    }
  }, [indexOfStudentToUse]);

  useEffect(() => {
    if (selectedStudentsList.length > 1) {
      navigate("/");
    }
  }, [selectedStudentsList]);

  return (
    <>
      <Overview
        addToSelectedStudentsList={addToSelectedStudentsList}
        assignments={assignments}
        courses={courses}
        handleAllBoxChange={handleAllBoxChange}
        handleChange={handleChange}
        handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
        handleFunCheckboxChange={handleFunCheckboxChange}
        indexOfStudentToEdit={indexOfStudentToUse}
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
        singleStudentView={indexOfStudentToUse != -1 ? true : false}
        studentCheckboxChange={studentCheckboxChange}
        students={students}
      />
    </>
  );
};

export default SingleStudentView;
