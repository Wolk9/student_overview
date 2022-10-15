import React from "react";
import { useParams } from "react-router-dom";
import {
  MDBCardText,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import {} from "../ui/uiSlice";
import { StudentCard } from "../students/StudentCard";
import { SelectorCard } from "./SelectorCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Overview = ({
  courses,
  students,
  studentName,
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
  averageFunNumberOfAllSelectedStudents,
  setAverageFunOfAllSelectedStudents,
  studentCheckboxChange,
}) => {
  const dispatch = useDispatch();
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      xAxis: {
        tension: 4,
        type: "linear",
        min: 0,
        max: 5.5,
      },
      yAxis: {
        tension: 4,
        base: 1,
        postion: "right",
      },
      yAxis2: {
        type: "linear",
        display: false,
        base: 0,
        position: "left",
      },
    },

    // plugins: {
    //   legend: {
    //     position: "top",
    //   },
    //   title: {
    //     display: true,
    //     text: "Chart.js Bar Chart",
    //   },
    // },
  };

  console.log("SelectedStudentsList: ", selectedStudentsList);

  const funData = selectedStudentsList.map((s, sindex) => {
    return {
      type: "bar",
      inflateAmount: 1,
      order: 1,
      label: students
        .filter((x, index) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " fun"),
      data: courses.map((c) =>
        assignments
          .filter((a) => a.assignment.course_id === c.id)
          .filter((x) => x.user_id === s)
          .map((a) => a.assignment.fun)
      ),
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorFun),
    };
  });

  console.log(funData);

  const difficultyData = selectedStudentsList.map((s, index) => {
    return {
      type: "bar",
      inflateAmount: 1,
      order: 1,
      label: students
        .filter((x) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " difficulty"),
      data: courses.map((c) =>
        assignments
          .filter((a) => a.assignment.course_id === c.id)
          .filter((x) => x.user_id === s)
          .map((a) => a.assignment.difficulty)
      ),
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorDifficulty),
    };
  });

  const funNumbers = [];
  const difficultyNumbers = [];

  const divideArray = (array, divisor) => {
    console.log("array", array);
    console.log("divisor", divisor);
    const array2 = [];
    for (let x = 0; x < array.length; x++) {
      array2[x] = Math.round((array[x] / divisor + Number.EPSILON) * 100) / 100;
    }
    console.log(array2);
    return array2;
  };

  const funAverage = selectedStudentsList.map((s) => {
    const funNumbersToAdd = courses.map((c) =>
      assignments
        .filter((a) => a.user_id === s)
        .filter((a) => a.assignment.course_id === c.id)
        .map((x) => x.assignment.fun)
        .at(c)
    );
    // .reduce((acc, a) => acc + a);

    funNumbers.push(funNumbersToAdd);
    console.log("funNumbers after push", funNumbers);

    funNumbers.map((array) =>
      const funNumbersAverages = 
      array.map((c)=> )
    )



    const sumOfFunNumbersOfAllSelectedStudents = [];
    // funNumbers.reduce(
    // (acc, a) => acc + a
    // );

    const averageFunNumberPerCourse = divideArray(funNumbers, courses.length);

    const averageFunOfAllSelectedStudents =
      Math.round(
        (sumOfFunNumbersOfAllSelectedStudents /
          selectedStudentsList.length /
          courses.length +
          Number.EPSILON) *
          100
      ) / 100;

    // dispatch(
    //   setAverageFunOfAllSelectedStudents(averageFunOfAllSelectedStudents)
    // );

    console.log(
      "\n Collected funNumbers",
      funNumbers,
      "\n sumOfFunNumbersOfAllSelectedStudents:",
      sumOfFunNumbersOfAllSelectedStudents,
      "\n average per Student: ",
      averageFunNumberPerCourse,
      "\n Average of selected Students:",
      averageFunNumberOfAllSelectedStudents
    );

    // console.log(
    //   courses.map((a) =>
    //     students
    //       .filter((x) => x.id === s)
    //       .map((x, index) => (x = averageFunNumberPerCourse[index]))
    //   )
    // );

    console.log(
      averageFunNumberPerCourse
        .map((a) => students.filter((x) => x.id === s))
        .map((x, index) => averageFunNumberPerCourse[index])
    );

    return {
      type: "line",
      tension: 0,
      pointStyle: "star",
      radius: 5,
      order: 2,
      label: students
        .filter((x) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " fun Average"),
      data: students.map((c) =>
        averageFunNumberPerCourse
          .map((a) => courses.filter((x) => x.id === s))
          .map((x, index) => averageFunNumberPerCourse[index])
      ),
      yAxisID: "yAxis2",
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorFun),
    };
  });

  const difficultyAverage = selectedStudentsList.map((s) => {
    const difficultyNumberToAdd = courses
      .map((c) =>
        assignments
          .filter((a) => a.user_id === s)
          .filter((a) => a.assignment.course_id === c.id)
          .map((x) => x.assignment.difficulty)
          .at(c)
      )
      .reduce((acc, a) => acc + a);

    difficultyNumbers.push(difficultyNumberToAdd);
    console.log("difficultyNumbers after push", difficultyNumbers);

    const sumOfAllCollectedDifficultyNumbers = difficultyNumbers.reduce(
      (acc, a) => acc + a
    );

    const averageDifficultyNumberPerCourse = divideArray(
      difficultyNumbers,
      courses.length
    );

    const averageDifficultyNumbersOfAllSelectedStudents =
      Math.round(
        (sumOfAllCollectedDifficultyNumbers /
          selectedStudentsList.length /
          courses.length +
          Number.EPSILON) *
          100
      ) / 100;

    // dispatch(
    //   setAverageDifficultyOfAllSelectedStudents(averageDifficultyOfAllSelectedStudents)
    // );

    console.log(
      "\n Collected difficultyNumbers",
      difficultyNumbers,
      "\n sumOfAllCollectedDifficultyNumbers:",
      sumOfAllCollectedDifficultyNumbers,
      "\n average per Student: ",
      averageDifficultyNumberPerCourse,
      "\n Average of selected Students:",
      averageDifficultyNumbersOfAllSelectedStudents
    );

    // console.log(
    //   courses.map((a) =>
    //     students
    //       .filter((x) => x.id === s)
    //       .map((x, index) => (x = averageDifficultyNumberPerCourse[index]))
    //   )
    // );

    console.log(
      averageDifficultyNumberPerCourse
        .map((a) => students.filter((x) => x.id === s))
        .map((x, index) => averageDifficultyNumberPerCourse[index])
    );

    return {
      type: "line",
      tension: 0,
      pointStyle: "star",
      radius: 5,
      order: 2,
      label: students
        .filter((x) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " difficulty Average"),
      data: students.map((c) =>
        averageDifficultyNumberPerCourse
          .map((a) => courses.filter((x) => x.id === s))
          .map((x, index) => averageDifficultyNumberPerCourse[index])
      ),
      yAxisID: "yAxis2",
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorDifficulty),
    };
  });

  // const difficultyAverage = selectedStudentsList.map((s) => {
  //   return {
  //     type: "line",
  //     tension: 0.4,
  //     order: 2,
  //     label: students
  //       .filter((x) => x.id === s)
  //       .map((x) => x.firstName + " " + x.lastName + " difficulty Average"),
  //     data: courses.map(
  //       (c) =>
  //         assignments
  //           .filter((a) => a.assignment.course_id === c.id)
  //           .filter((x) => x.user_id === s)
  //           .map((a) => a.assignment.difficulty) / selectedStudentsList.length
  //     ),
  //     backgroundColor: students
  //       .filter((x) => x.id === s)
  //       .map((x) => x.colorDifficulty),
  //   };
  // });

  const selectedData2 = () => {
    const averageData = funAverage.concat(difficultyAverage);
    if (isAverageBoxChecked) {
      console.log("A checked");
      if (isFunBoxChecked && isDifficultyBoxChecked) {
        // console.log("D & F checked");
        //        return funData.concat(difficultyData).concat(averageData);
        return averageData;
      } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
        // console.log("F checked");
        return funData.concat(funAverage);
      } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
        // console.log("D checked");
        return difficultyData.concat(difficultyAverage);
      } else return;
    } else {
      console.log("A not checked");
      if (isFunBoxChecked && isDifficultyBoxChecked) {
        // console.log("D & F checked");
        return funData.concat(difficultyData);
      } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
        // console.log("F checked");
        return funData;
      } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
        // console.log("D checked");
        return difficultyData;
      } else return;
    }
  };

  const selectedData = selectedData2();

  console.log("selectedData", selectedData);

  console.log(indexOfStudentToEdit);

  const data = {
    labels: courses.map((c) => c.code),
    datasets: selectedData,
  };

  return (
    <div>
      <div className="container-fluid p-4 m4">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <div className="card-title h5 p-3">Overview</div>
              </div>
              <div className="card-body">
                {selectedStudentsList.length < 1 ? (
                  <MDBCardText>
                    Selecteer 1 of meerdere studenten uit de lijst hiernaast
                  </MDBCardText>
                ) : (
                  <div className="chart-container">
                    <Chart data={data} options={options} />
                  </div>
                )}
              </div>
            </div>
            {editStudentCardDisplay ? (
              <StudentCard
                students={students}
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
                isStudentChecked={isStudentChecked}
                handleAllBoxChange={handleAllBoxChange}
                depolulateSelectedStudentList={depolulateSelectedStudentList}
                populateSelectedStudentList={populateSelectedStudentList}
                handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
                handleFunCheckboxChange={handleFunCheckboxChange}
                studentCheckboxChange={studentCheckboxChange}
              />
            ) : (
              <></>
            )}
          </div>
          <SelectorCard
            students={students}
            isFunBoxChecked={isFunBoxChecked}
            isDifficultyBoxChecked={isDifficultyBoxChecked}
            isStudentChecked={isStudentChecked}
            selectedStudentsList={selectedStudentsList}
            isAllBoxChecked={isAllBoxChecked}
            handleEditClick={handleEditClick}
            editStudentCardDisplay={editStudentCardDisplay}
            toggleDifficultyCheckBox={toggleDifficultyCheckBox}
            toggleFunCheckBox={toggleFunCheckBox}
            addToSelectedStudentsList={addToSelectedStudentsList}
            removeFromSelectedStudentsList={removeFromSelectedStudentsList}
            flushSelectedStudentsList={flushSelectedStudentsList}
            toggleAllStudentsChecked={toggleAllStudentsChecked}
            setIndexOfStudentToEdit={setIndexOfStudentToEdit}
            handleSelectedStudentsChange={handleSelectedStudentsChange}
            handleAllBoxChange={handleAllBoxChange}
            handleAverageBoxChange={handleAverageBoxChange}
            depolulateSelectedStudentList={depolulateSelectedStudentList}
            populateSelectedStudentList={populateSelectedStudentList}
            handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
            handleFunCheckboxChange={handleFunCheckboxChange}
            isAverageBoxChecked={isAverageBoxChecked}
            averageFunNumberOfAllSelectedStudents={
              averageFunNumberOfAllSelectedStudents
            }
            studentCheckboxChange={studentCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
