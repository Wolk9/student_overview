import "chart.js/auto";
import { MDBModalBody, MDBModalTitle } from "mdb-react-ui-kit";
import React from "react";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { StudentCard } from "../students/StudentCard";
import { toggleAllStudentsChecked } from "../ui/uiSlice";
import { AlertMessage } from "./Alert";
import { SelectorCard } from "./SelectorCard";

const Overview = ({
  addToSelectedStudentsList,
  assignments,
  courses,
  handleAllBoxChange,
  handleAverageBoxChange,
  handleChange,
  handleDifficultyCheckBoxChange,
  handleFunCheckboxChange,
  indexOfStudentToEdit,
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
  singleStudentView,
  studentCheckboxChange,
  students,
}) => {
  const dispatch = useDispatch();

  if (singleStudentView) {
    dispatch(toggleAllStudentsChecked(false));
    dispatch(addToSelectedStudentsList(students[indexOfStudentToEdit].id));
  }

  const showAlert = useSelector((state) => state.ui.showAlert);

  const selectedStudentsList = useSelector(
    (state) => state.ui.selectedStudentsList
  );

  // Styling and content of ChartjS:
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

  // Creation of proper data components for ChartJS:

  const funData = selectedStudentsList.map((s) => {
    const data = courses.map((c) =>
      assignments
        .filter((a) => a.assignment.course_id === c.id)
        .filter((x) => x.user_id === s)
        .map((a) => a.assignment.fun)
        .at(c)
    );
    return {
      type: "bar",
      inflateAmount: 1,
      order: 2,
      label: students
        .filter((x, index) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " plezier"),
      data: data,
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorFun),
    };
  });

  const difficultyData = selectedStudentsList.map((s) => {
    const data = courses.map((c) =>
      assignments
        .filter((a) => a.assignment.course_id === c.id)
        .filter((x) => x.user_id === s)
        .map((a) => a.assignment.difficulty)
        .at(c)
    );
    return {
      type: "bar",
      inflateAmount: 1,
      order: 2,
      label: students
        .filter((x) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " moeilijkheid"),
      data: data,
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorDifficulty),
    };
  });

  let funNumbers = [];
  let difficultyNumbers = [];

  let averagesOfFunNumbers = [];
  let averagesOfDifficultyNumbers = [];

  if (isAverageBoxChecked) {
    funNumbers = [];
    selectedStudentsList.map((s) => {
      const funNumbersToAdd = courses.map((c) =>
        assignments
          .filter((a) => a.user_id === s)
          .filter((a) => a.assignment.course_id === c.id)
          .map((x) => x.assignment.fun)
          .at(c)
      );

      funNumbers.push(funNumbersToAdd);

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
      tension: 0.2,
      pointStyle: "circle",
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
      tension: 0.2,
      pointStyle: "rect",
      radius: 5,
      order: 1,
      label: "difficulty Average",
      data: averagesOfDifficultyNumbers,
      borderWidth: 3,
      borderColor: "rgb(253, 162, 235)",
      backgroundColor: "rgba(253, 162, 235, 0.5)",
    },
  ];

  // Construction of the definitive selection dependent concatenated data for ChartJS:

  const selectedData = () => {
    const averageData = funAverage.concat(difficultyAverage);
    if (isAverageBoxChecked) {
      if (isFunBoxChecked && isDifficultyBoxChecked) {
        return averageData;
      } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
        return funAverage;
      } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
        return difficultyAverage;
      } else return;
    } else {
      if (isFunBoxChecked && isDifficultyBoxChecked) {
        return funData.concat(difficultyData);
      } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
        return funData;
      } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
        return difficultyData;
      } else return;
    }
  };

  const data = {
    labels: courses.map((c) => c.code),
    datasets: selectedData(),
  };

  return (
    <div>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="card">
              <div className="row">
                <SelectorCard
                  handleAllBoxChange={handleAllBoxChange}
                  handleAverageBoxChange={handleAverageBoxChange}
                  handleDifficultyCheckBoxChange={
                    handleDifficultyCheckBoxChange
                  }
                  handleFunCheckboxChange={handleFunCheckboxChange}
                  isAllBoxChecked={isAllBoxChecked}
                  isAverageBoxChecked={isAverageBoxChecked}
                  isDifficultyBoxChecked={isDifficultyBoxChecked}
                  isFunBoxChecked={isFunBoxChecked}
                  isStudentChecked={isStudentChecked}
                  selectedStudentsList={selectedStudentsList}
                  studentCheckboxChange={studentCheckboxChange}
                  students={students}
                />
              </div>
              <div className="row">
                {selectedStudentsList.length === 1 ? (
                  <StudentCard
                    handleChange={handleChange}
                    indexOfStudentToEdit={indexOfStudentToEdit}
                    inOverview={true}
                    isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
                    isFunColorPickerOpen={isFunColorPickerOpen}
                    onChangeDifficultyColor={onChangeDifficultyColor}
                    onChangeFunColor={onChangeFunColor}
                    onClickDifficultySwatch={onClickDifficultySwatch}
                    onClickFunSwatch={onClickFunSwatch}
                    students={students}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="card">
              {showAlert ? (
                <AlertMessage
                  variant="success"
                  header={"Die kennen we niet"}
                  message={
                    "Van die URL kunnen we geen chocola van maken. Probeer het opnieuw"
                  }
                />
              ) : (
                <></>
              )}
              <div className="card-header">
                {selectedStudentsList.length < 1 ? (
                  <div className="card-title h5 p-3">Hints</div>
                ) : (
                  <div className="card-title h5 p-3">Grafiek</div>
                )}
              </div>

              <div className="card-body">
                {selectedStudentsList.length < 1 ? (
                  <div className="card-text">
                    <div>
                      <MDBModalTitle>Studenten selector</MDBModalTitle>
                      <MDBModalBody>
                        De studenten selector zet de geselcteerde gegevens in
                        een grafiek. De keuzen spreken voor zich. <br />
                        <br />
                        Als je 1 student selecteerd kun je de gegevens van deze
                        student aanpassen in de dan verschijnende Edit Card. Je
                        kunt daarin ook de kleur van de gegevens in de grafiek
                        aanpassen voor die student.
                        <br />
                      </MDBModalBody>
                      <hr />
                      <MDBModalTitle>
                        Meerdere studenten geselecteerd
                      </MDBModalTitle>
                      <MDBModalBody>
                        Er kunnen ook meerdere studenten tegelijk worden
                        geselecteerd. Je kunt dan ook de gemiddelden laten zien.
                        <br />
                        Gemiddelden worden logischerwijs niet getoont bij geen
                        of slechts één geselecteerde student.
                        <br />
                      </MDBModalBody>
                    </div>
                  </div>
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
