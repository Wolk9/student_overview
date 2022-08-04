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
                    checked={student.checked}
                    course={student.id}
                    value={student.id}
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

  const graphDataPerStudent = (s) => {
    return (
      {
        data: courses.map((c) =>
          assignments
            .filter((a) => a.assignment.course_id === c.id)
            .filter((x) => x.user_id === s.id)
            .map((a) => a.assignment.fun)
        ),
        backgroundColor: s.colorFun,
      },
      {
        data: courses.map((c) =>
          assignments
            .filter((a) => a.assignment.course_id === c.id)
            .filter((x) => x.user_id === s.id)
            .map((a) => a.assignment.fun)
        ),
        backgroundColor: s.colorDifficulty,
      }
    );
  };

  // const studentsOfChoice = (selection) => {
  //   console.log(selection);
  //   selection.map(
  //     (selected) => (
  //       console.log(selected),
  //       graphDataPerStudent(
  //         students.filter((s) => console.log(s), selected.id === s.id)
  //       )
  //     )
  //   );
  // };

  // console.log(
  //   studentsOfChoice([
  //     {
  //       id: 1,
  //       firstName: "Evelyn",
  //       lastName: "McGuire",
  //       phone: "+31 6 1234 5678",
  //       email: "mcguire@gmail.com",
  //       photo: "http://dummyimage.com/128x100.png/5fa2dd/ffffff",
  //       colorDifficulty: "#111184",
  //       colorFun: "rgb(255, 99, 232)",
  //     },
  //     {
  //       id: 2,
  //       firstName: "Aranka",
  //       lastName: "Smith",
  //       phone: "+31 6 1234 7618",
  //       email: "smith@gmail.com",
  //       photo: "http://dummyimage.com/128x100.png/dddddd/000000",
  //       colorDifficulty: "rgb(0, 60, 255)",
  //       colorFun: "rgb(0,60, 155)",
  //     },
  //   ])
  // );

  const data = {
    labels: courses.map((c) => c.code),
    datasets: selectedStudentsList.map(
      (s) => (
        {
          data: courses.map((c) =>
            assignments
              .filter((a) => a.assignment.course_id === c.id)
              .filter((x) => x.user_id === s)
              .map((a) => a.assignment.fun)
          ),
          backgroundColor: students
            .filter((x) => x.id === s)
            .map((x) => x.colorFun),
        },
        {
          data: courses.map((c) =>
            assignments
              .filter((a) => a.assignment.course_id === c.id)
              .filter((x) => x.user_id === s)
              .map((a) => a.assignment.fun)
          ),
          backgroundColor: students
            .filter((x) => x.id === s)
            .map((x) => x.colorDifficulty),
        }
      )
    ),
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
              <Bar data={data} />
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
