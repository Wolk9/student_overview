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
        max: 5,
      },
      yAxis: {
        tension: 4,
        base: 1,
        postion: "right",
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  console.log("SelectedStudentsList: ", selectedStudentsList);

  const funData = selectedStudentsList.map((s) => {
    return {
      type: "bar",
      inflateAmount: 1,
      order: 2,
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

  const difficultyData = selectedStudentsList.map((s) => {
    return {
      type: "bar",
      inflateAmount: 1,
      order: 2,
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

  let averagesOfFunNumbers = [];
  let averagesOfDifficultyNumbers = [];

  if (isAverageBoxChecked) {
    selectedStudentsList.map((s) => {
      const funNumbersToAdd = courses.map((c) =>
        assignments
          .filter((a) => a.user_id === s)
          .filter((a) => a.assignment.course_id === c.id)
          .map((x) => x.assignment.fun)
          .at(c)
      );

      funNumbers.push(funNumbersToAdd);

      console.log("funNumbers after push", funNumbers);

      return funNumbers;
    });

    selectedStudentsList.map((s) => {
      const difficultyNumbersToAdd = courses.map((c) =>
        assignments
          .filter((a) => a.user_id === s)
          .filter((a) => a.assignment.course_id === c.id)
          .map((x) => x.assignment.difficulty)
          .at(c)
      );

      difficultyNumbers.push(difficultyNumbersToAdd);

      console.log("difNumbers after push", difficultyNumbers);

      return difficultyNumbers;
    });

    averagesOfFunNumbers = funNumbers[0].map((_, id) => {
      const sumOfElementsOnThisIndex = funNumbers
        .map((array) => array[id])
        .reduce((acc, cur) => (acc += cur), 0);
      const averageOnThisIndex =
        sumOfElementsOnThisIndex / selectedStudentsList.length;
      return averageOnThisIndex;
    });

    averagesOfDifficultyNumbers = difficultyNumbers[0].map((_, id) => {
      const sumOfElementsOnThisIndex = difficultyNumbers
        .map((array) => array[id])
        .reduce((acc, cur) => (acc += cur), 0);
      const averageOnThisIndex =
        sumOfElementsOnThisIndex / selectedStudentsList.length;
      return averageOnThisIndex;
    });
  } else {
  }

  const funAverage = [
    {
      type: "line",
      fill: true,
      tension: 0,
      pointStyle: "star",
      radius: 5,
      order: 1,
      label: "fun Average",
      data: averagesOfFunNumbers,
      borderWidth: 3,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const difficultyAverage = [
    {
      type: "line",
      fill: true,
      tension: 0,
      pointStyle: "star",
      radius: 5,
      order: 1,
      label: "difficulty Average",
      data: averagesOfDifficultyNumbers,
      borderWidth: 3,
      borderColor: "rgb(253, 162, 235)",
      backgroundColor: "rgba(253, 162, 235, 0.5)",
    },
  ];

  const selectedData2 = () => {
    const averageData = funAverage.concat(difficultyAverage);
    const data = funData.concat(difficultyData);
    // if (isAverageBoxChecked) {
    //   console.log("A checked");
    //   if (isFunBoxChecked && isDifficultyBoxChecked) {
    //     return data.concat(averageData);
    //   } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
    //     return data.concat(funData.concat(funAverage));
    //   } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
    //     return data.concat(difficultyData.concat(difficultyAverage));
    //   } else return;
    if (isAverageBoxChecked) {
      console.log("A checked");
      if (isFunBoxChecked && isDifficultyBoxChecked) {
        return averageData;
      } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
        return funAverage;
      } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
        return difficultyAverage;
      } else return;
    } else {
      console.log("A not checked");
      if (isFunBoxChecked && isDifficultyBoxChecked) {
        return funData.concat(difficultyData);
      } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
        return funData;
      } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
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
          <div className="col-4">
            <div className="card">
              <div className="row">
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
                  removeFromSelectedStudentsList={
                    removeFromSelectedStudentsList
                  }
                  flushSelectedStudentsList={flushSelectedStudentsList}
                  toggleAllStudentsChecked={toggleAllStudentsChecked}
                  setIndexOfStudentToEdit={setIndexOfStudentToEdit}
                  handleSelectedStudentsChange={handleSelectedStudentsChange}
                  handleAllBoxChange={handleAllBoxChange}
                  handleAverageBoxChange={handleAverageBoxChange}
                  depolulateSelectedStudentList={depolulateSelectedStudentList}
                  populateSelectedStudentList={populateSelectedStudentList}
                  handleDifficultyCheckBoxChange={
                    handleDifficultyCheckBoxChange
                  }
                  handleFunCheckboxChange={handleFunCheckboxChange}
                  isAverageBoxChecked={isAverageBoxChecked}
                  averageFunNumberOfAllSelectedStudents={
                    averageFunNumberOfAllSelectedStudents
                  }
                  studentCheckboxChange={studentCheckboxChange}
                />
              </div>
              <div className="row">
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
                    depolulateSelectedStudentList={
                      depolulateSelectedStudentList
                    }
                    populateSelectedStudentList={populateSelectedStudentList}
                    handleDifficultyCheckBoxChange={
                      handleDifficultyCheckBoxChange
                    }
                    handleFunCheckboxChange={handleFunCheckboxChange}
                    studentCheckboxChange={studentCheckboxChange}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header">
                <div className="card-title h5 p-3">
                  {selectedStudentsList.length < 1 ? "Hints" : "Grafiek"}
                </div>
              </div>
              <div className="card-body">
                {selectedStudentsList.length < 1 ? (
                  <MDBCardText>
                    <h4>Studenten selector</h4>
                    <p>
                      De studenten selector zet de geselcteerde gegevens in een
                      grafiek. De keuzen spreken voor zich
                    </p>
                    <h5>Één of meerdere studenten selecteren</h5>
                    <h6>Éen student geselecteerd</h6>
                    <p>
                      Als je 1 student selecteerd kun je de gegevens van deze
                      student aanpassen in de dan verschijnende Edit Card.
                    </p>
                    <p>
                      Je kunt daarin ook de kleur van de gegevens in de grafiek
                      aanpassen voor die student.
                    </p>
                    <h6>Meerdere studenten geselecteerd</h6>
                    <p>
                      Er kunnen ook meerdere studenten tegelijk worden
                      geselecteerd. Je kunt dan ook de gemiddelden laten zien.
                    </p>
                    <p>
                      Gemiddelden worden logischerwijs niet getoont bij geen of
                      slechts een geselecteerde student.
                    </p>
                  </MDBCardText>
                ) : (
                  <div className="chart-container">
                    <Chart data={data} options={options} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
