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
import { Chart } from "react-chartjs-2";

export const Overview = ({ studentNames, courses, students, assignments }) => {
  console.log(studentNames);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      yAxis: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "rating",
        },
        suggestedMin: 0,
        suggestedMax: 5,
        suggestedSteps: 1,
      },
    },
  };

  const getDiffPerAssignmentPerStudent = students.map((s) => {
    assignments
      .filter((a) => a.user_id === s.id)
      .map((a) => a.assignment.difficulty);
  });

  const dataset = {
    labels: courses.map((c) => c.code),
    datasets: [
      {
        id: 1,
        label: "assignment",
        data: getDiffPerAssignmentPerStudent,
      },
    ],
  };

  // const daefjwtaset = {
  //   labels: courses.map((c) => c.code),
  //   datasets: [
  //       {
  //       id: 1,
  //       label: 'assignments',
  //       data: {students.map((s) => (
  //         assignments
  //           .filter((assignment) => assignment.user_id === s.id)
  //           .map((a) => [a.assignment.difficulty),
  //         ,

  //const labels = courses.map((c) => c.code);
  // const data = students.map((s) => {
  //   return {
  //     labels: s.firstName + " " + s.lastName,
  //     // datasets: [
  //     //   {
  //     //     id: 1,
  //     //     label: "difficulty",
  //     //     data: assignments
  //     //       .filter((assignment) => assignment.user_id === s.id)
  //     //       .map((a) => a.assignment.difficulty),
  //     //   },
  //     //   {
  //     //     id: 2,
  //     //     label: "fun",
  //     //     data: assignments
  //     //       .filter((assignment) => assignment.user_id === s.id)
  //     //       .map((a) => a.assignment.fun),
  //     //   },
  //     // ],
  //     datasets: [
  //       {
  //         id: 1,
  //         label: "labeltje",
  //         data: [5, 6, 7],
  //       },
  //       {
  //         id: 2,
  //         label: "2e labeltje",
  //         data: [3, 1, 2],
  //       },
  //     ],
  //   };
  // });

  console.log("dtsts", dataset);

  // const data = {
  //   labels: labels,
  //   datasets: dtsts,
  // };
  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <MDBRow>
          <MDBCol size="8">
            <MDBCard>
              <MDBCardHeader>
                <MDBCardTitle>Overview</MDBCardTitle>
              </MDBCardHeader>
              <MDBCardBody>
                <Chart
                  type="bar"
                  datasetIdKey="id"
                  options={options}
                  data={dataset}
                />
              </MDBCardBody>
              <MDBCardFooter></MDBCardFooter>
            </MDBCard>
          </MDBCol>
          <MDBCol size="4">
            <MDBCard>
              <MDBCardHeader>
                <MDBCardTitle>Students</MDBCardTitle>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCheckbox label="all" defaultChecked />
                  </MDBCardBody>
                </MDBCard>
                <MDBCard>
                  <MDBCardBody>
                    {students.map((student) => (
                      <MDBRow key={student.id}>
                        <MDBCol>
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
                        <MDBCol>
                          <div
                            className="swatch"
                            style={{ backgroundColor: student.colorDifficulty }}
                          />
                        </MDBCol>
                        <MDBCol>
                          <div
                            className="swatch"
                            style={{ backgroundColor: student.colorFun }}
                          />
                        </MDBCol>
                      </MDBRow>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Overview;
