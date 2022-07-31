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
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const SelectorCard = (props) => {
  const { students } = props;
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
                <MDBCheckbox defaultChecked />
              </MDBCol>
              <MDBCol size="1">
                <MDBCheckbox defaultChecked />
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
                    value={student.id}
                    name={student.id}
                    label={student.firstName + " " + student.lastName}
                    // labelStyle={{
                    //   background: student.color,
                    //   color: "white",
                    //   padding: "3px",
                    //   marginTop: "3px",
                    //   fontSize: "11px",
                    //   minWidth: "100%",
                    //   borderRadius: "5px",
                    // }}
                    defaultChecked
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
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: { padding: -1 },
    indexAxis: "y",
    scales: {
      x: {
        min: 0,
        max: 5,
      },
      x2: {
        type: "linear",
        min: 0,
        max: 5,
        reverse: true,
        position: "center",
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  // console.log(
  //   courses.map((c) =>
  //     students.map((s) =>
  //       assignments
  //         .filter((a) => a.assignment.course_id === c.id)
  //         .map((a) => [a.assignment.fun])
  //     )
  //   )
  // );

  const dataset = {
    labels: courses.map((c) => c.code),
    datasets: students.map((s) => ({
      id: s.id,
      label: s.firstName + " " + s.lastName,
      data: courses.map(
        (c) => (
          assignments
            .filter((a) => a.assignment.course_id === c.id)
            .filter((x) => x.user_id === s.id)
            .map((a) => a.assignment.difficulty),
          assignments
            .filter((a) => a.assignment.course_id === c.id)
            .filter((x) => x.user_id === s.id)
            .map((a) => a.assignment.fun)
        )
      ),
      backgroundColor: s.colorDifficulty,
      borderWidth: 0,
      xAxisID: "x2",
    })),
  };

  console.log("dataset", dataset);

  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <MDBRow>
          <MDBCol size="8">
            <MDBCard>
              <MDBCardHeader>
                <MDBCardTitle>Overview</MDBCardTitle>
              </MDBCardHeader>
              <MDBCardBody height="800px">
                <Bar options={options} data={dataset} />
              </MDBCardBody>
              <MDBCardFooter></MDBCardFooter>
            </MDBCard>
          </MDBCol>
          <SelectorCard students={students} />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Overview;
