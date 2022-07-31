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
import { Bar, Chart } from "react-chartjs-2";

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
  //   const options = {
  //     maintainAspectRatio: false,
  //     responsive: true,
  //     layout: { padding: -1 },
  //     indexAxis: "y",
  //     scales: {
  //       x: {
  //         min: -5,
  //         max: 5,
  //       },
  //     },
  //     elements: {
  //       bar: {
  //         borderWidth: 2,
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         position: "bottom",
  //       },
  //       title: {
  //         display: false,
  //         text: "Chart.js Horizontal Bar Chart",
  //       },
  //     },
  //   };

  const data = [
    { x: "Jan", net: 100, cogs: 50, gm: 50 },
    { x: "Feb", net: 120, cogs: 55, gm: 75 },
  ];
  const options = {
    data: {
      labels: ["Jan", "Feb"],
      datasets: [
        {
          label: "Net sales",
          data: data,
          parsing: {
            yAxisKey: "net",
          },
        },
        {
          label: "Cost of goods sold",
          data: data,
          parsing: {
            yAxisKey: "cogs",
          },
        },
        {
          label: "Gross margin",
          data: data,
          parsing: {
            yAxisKey: "gm",
          },
        },
      ],
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

  //     const dataset2 = {
  //         {
  //         labels: ['Jun', 'Jul', 'Aug'],
  //             datasets: [
  //       {
  //         id: 1,
  //         label: 'fun',
  //         data: [5, 6, 7],
  //       },
  //       {
  //         id: 2,
  //         label: 'difficulty',
  //         data: [3, 2, 1],
  //       },
  //     ],
  //   }};

  // const dataset = {
  //     labels: courses.map((c) => c.code),
  //     datasets: students.map((s) => ({
  //         id: s.id,
  //         label: s.firstName + " " + s.lastName,
  //         data: {{
  //         id: 1,
  //         label: 'difficulty',
  //         data: courses.map(
  //             (c) => (
  //                 assignments
  //                     .filter((a) => a.assignment.course_id === c.id)
  //                     .filter((x) => x.user_id === s.id)
  //                     .map((a) => a.assignment.difficulty * -1))),
  //     },
  //         {
  //             id: 2,
  //             label: 'fun',
  //             data: courses.map((c) => (
  //                 assignments
  //                     .filter((a) => a.assignment.course_id === c.id)
  //                     .filter((x) => x.user_id === s.id)
  //                     .map((a) => a.assignment.fun)
  //             )),
  //         }})),
  //         backgroundColor: s.colorDifficulty,
  //         borderWidth: 0,
  //     )};

  console.log("dataset");

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
                <Bar data={data} />
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
