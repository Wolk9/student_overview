import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBCardText,
} from "mdb-react-ui-kit";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  setSelectedStudentsList,
  toggleAllStudentsChecked,
} from "../ui/uiSlice";
import { mdiCogSyncOutline } from "@mdi/js";

const SelectorCard = (props) => {
  const {
    students,
    isFunBoxChecked,
    isDifficultyBoxChecked,
    isAllBoxChecked,
    selectedStudentsList,
  } = props;
  const dispatch = useDispatch();

  console.log(
    isFunBoxChecked,
    isDifficultyBoxChecked,
    isAllBoxChecked,
    selectedStudentsList
  );

  const handleFunCheckboxChange = () => {
    console.log("fun clicked");
    if (isDifficultyBoxChecked === true) {
      dispatch(toggleFunCheckBox());
    } else {
      dispatch(toggleFunCheckBox());
      dispatch(toggleDifficultyCheckBox());
    }
  };

  const handleDifficultyCheckBoxChange = () => {
    console.log("difficulty clicked");
    if (isFunBoxChecked === true) {
      dispatch(toggleDifficultyCheckBox());
    } else {
      dispatch(toggleDifficultyCheckBox());
      dispatch(toggleFunCheckBox());
    }
  };

  const populateSelectedStudentList = () => {
    students.map((student) =>
      dispatch(setSelectedStudentsList({ id: student.id }))
    );
  };

  const handleSelectedStudentsChange = (e) => {
    console.log("Selected Students Changed", e);
    const selectedStudent = students.find((s) => s.id === e.id);
    dispatch(setSelectedStudentsList(selectedStudent));
  };

  const isStudentChecked = (e) => {
    const checked = selectedStudentsList.some((s) => s === e.id);
    // console.log(e, checked);
    return checked;
  };

  const handleAllBoxChange = () => {
    console.log("handleAllBoxChange");

    dispatch(toggleAllStudentsChecked(!isAllBoxChecked));
    if (selectedStudentsList.length === 0) {
      populateSelectedStudentList();
    }
  };

  return (
    <MDBCol size="4">
      <MDBCard>
        <MDBCardHeader>
          <MDBCardTitle>Students</MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCardBody>
            <MDBRow>
              <MDBCol className="ml-auto"></MDBCol>
              <MDBCol size="1">
                {" "}
                <MDBCheckbox
                  checked={isDifficultyBoxChecked}
                  onChange={() => handleDifficultyCheckBoxChange()}
                />
              </MDBCol>
              <MDBCol size="1">
                <MDBCheckbox
                  checked={isFunBoxChecked}
                  onChange={() => handleFunCheckboxChange()}
                />
              </MDBCol>
              <MDBCol size="1"></MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol className="ml-auto">
                <MDBCheckbox
                  label="all"
                  checked={isAllBoxChecked}
                  onChange={() => handleAllBoxChange()}
                />
              </MDBCol>
              <MDBCol size="1">
                <h5 align="right">
                  <div>D</div>
                </h5>
              </MDBCol>
              <MDBCol size="1">
                <h5 align="right">
                  <div>F</div>
                </h5>
              </MDBCol>
              <MDBCol size="1"></MDBCol>
            </MDBRow>
            {students.map((student) => (
              <MDBRow key={student.id}>
                <MDBCol className="ml-auto">
                  <MDBCheckbox
                    // btn={true}
                    size="sm"
                    id={student.id}
                    checked={isStudentChecked({ id: student.id })}
                    label={student.firstName + " " + student.lastName}
                    onChange={() =>
                      handleSelectedStudentsChange({ id: student.id })
                    }
                    // labelStyle={{
                    //   background: student.color,
                    //   color: "white",
                    //   padding: "3px",
                    //   marginTop: "3px",
                    //   fontSize: "11px",
                    //   minWidth: "100%",
                    //   borderRadius: "5px",
                    // }}
                  />
                </MDBCol>
                <MDBCol size="1">
                  <div
                    className="swatch"
                    style={{ backgroundColor: student.colorDifficulty }}
                  />
                </MDBCol>
                <MDBCol size="1">
                  <div
                    className="swatch"
                    style={{ backgroundColor: student.colorFun }}
                  />
                </MDBCol>
                <MDBCol size="1"></MDBCol>
              </MDBRow>
            ))}
          </MDBCardBody>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export const Overview = ({ studentNames, courses, students, assignments }) => {
  const isFunBoxChecked = useSelector((state) => state.ui.isFunBoxChecked);
  const isDifficultyBoxChecked = useSelector(
    (state) => state.ui.isDifficultyBoxChecked
  );
  const isAllBoxChecked = useSelector((state) => state.ui.isAllBoxChecked);
  const selectedStudentsList = useSelector(
    (state) => state.ui.selectedStudentsList
  );
  const options = {
    responsive: true,
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

  const funData = selectedStudentsList.map((s) => {
    return {
      label: students
        .filter((x) => x.id === s)
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

  const difficultyData = selectedStudentsList.map((s) => {
    return {
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

  const selectedData2 = () => {
    if (isFunBoxChecked && isDifficultyBoxChecked) {
      console.log("D & F checked");
      return funData.concat(difficultyData);
    } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
      console.log("F checked");
      return funData;
    } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
      console.log("D checked");
      return difficultyData;
    } else return;
  };

  const selectedData = selectedData2();

  const data = {
    labels: courses.map((c) => c.code),
    datasets: selectedData,
  };

  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <MDBRow>
          <MDBCol size="8">
            <MDBCard>
              <MDBCardTitle>Overview</MDBCardTitle>
              <MDBCardBody>
                {selectedStudentsList.length < 1 ? (
                  <MDBCardText>
                    Selecteer 1 of meerdere studenten uit de lijst hiernaast
                  </MDBCardText>
                ) : (
                  <Bar data={data} />
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <SelectorCard
            students={students}
            isFunBoxChecked={isFunBoxChecked}
            isDifficultyBoxChecked={isDifficultyBoxChecked}
            selectedStudentsList={selectedStudentsList}
            isAllBoxChecked={isAllBoxChecked}
          />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Overview;
