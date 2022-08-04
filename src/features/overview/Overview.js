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
} from "mdb-react-ui-kit";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  setSelectedStudentsList,
} from "../ui/uiSlice";

const SelectorCard = (props) => {
  const {
    students,
    isFunBoxChecked,
    isDifficultyBoxChecked,
    selectedStudentsList,
  } = props;
  const dispatch = useDispatch();

  console.log(isFunBoxChecked, isDifficultyBoxChecked, selectedStudentsList);

  const handleFunCheckboxChange = () => {
    console.log("fun clicked");
    dispatch(toggleFunCheckBox());
  };
  const handleDifficultyCheckBoxChange = () => {
    console.log("difficulty clicked");
    dispatch(toggleDifficultyCheckBox());
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
    console.log(e, checked);
    return checked;
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
                <MDBCheckbox
                  checked={isFunBoxChecked}
                  onChange={() => handleFunCheckboxChange()}
                />
              </MDBCol>
              <MDBCol size="1">
                <MDBCheckbox
                  checked={isDifficultyBoxChecked}
                  onChange={() => handleDifficultyCheckBoxChange()}
                />
              </MDBCol>
              <MDBCol size="1"></MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol className="ml-auto">
                <MDBCheckbox label="all" defaultChecked />
              </MDBCol>
              <MDBCol size="1">
                <h5 align="center">
                  <div className="swatch">D</div>
                </h5>
              </MDBCol>
              <MDBCol size="1">
                <h5 align="center">
                  <div className="swatch">F</div>
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

  const setOfData = selectedStudentsList.map((s) => {
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

  // Dit moet ook achter een selectedStudentsList.map
  // {
  //       label: students
  //         .filter((x) => x.id === s)
  //         .map((x) => x.firstName + " " + x.lastName + " difficulty"),
  //       data: courses.map((c) =>
  //         assignments
  //           .filter((a) => a.assignment.course_id === c.id)
  //           .filter((x) => x.user_id === s)
  //           .map((a) => a.assignment.difficulty)
  //       ),
  //       backgroundColor: students
  //         .filter((x) => x.id === s)
  //         .map((x) => x.colorDifficulty),
  //     }

  console.log(setOfData);

  const data = {
    labels: courses.map((c) => c.code),
    datasets: {},
  };
  // const dataDifficulty = (s) => {
  //   return {
  //     id: 1,
  //     label: "difficulty",
  //     data: courses.map((c) =>
  //       assignments
  //         .filter((a) => a.assignment.course_id === c.id)
  //         .filter((x) => x.user_id === s.id)
  //         .map((a) => a.assignment.difficulty * -1)
  //     ),
  //   };
  // };

  // const dataFun = (s) => {
  //   return {
  //     id: 2,
  //     label: "fun",
  //     data: courses.map((c) =>
  //       assignments
  //         .filter((a) => a.assignment.course_id === c.id)
  //         .filter((x) => x.user_id === s.id)
  //         .map((a) => a.assignment.fun)
  //     ),
  //   };
  // };

  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <MDBRow>
          <MDBCol size="8">
            <MDBCard>
              <MDBCardTitle>Overview</MDBCardTitle>
              Hier komt een gafiek
              {/* <Bar data={data} /> */}
            </MDBCard>
          </MDBCol>
          <SelectorCard
            students={students}
            isFunBoxChecked={isFunBoxChecked}
            isDifficultyBoxChecked={isDifficultyBoxChecked}
            selectedStudentsList={selectedStudentsList}
          />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Overview;
