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

export const Overview = ({ studentNames, courses, students, assignments }) => {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
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
              <MDBCardBody>
                <Bar options={options} data={dataset} />
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
