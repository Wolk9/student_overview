import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  const labels = courses.map((c) => c.code);
  const dtsts = students.map((s) => {
    return {
      label: s.firstName + " " + s.lastName,
      datasets: [
        {
          label: "difficulty",
          data: assignments
            .filter((assignment) => assignment.user_id === s.id)
            .map((a) => a.assignment.difficulty),
          parsing: {
            yAxisKey: "difficulty",
          },
        },
        {
          label: "fun",
          data: assignments
            .filter((assignment) => assignment.user_id === s.id)
            .map((a) => a.assignment.fun),
          parsing: {
            yAxisKey: "fun",
          },
        },
      ],
      backgroundColor: s.color,
    };
  });

  console.log("dtsts", dtsts);

  const data = {
    labels,
    datasets: dtsts,
  };
  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <MDBRow>
          <MDBCol size="9">
            <MDBCard>
              <MDBCardHeader>
                <MDBCardTitle>Overview</MDBCardTitle>
              </MDBCardHeader>
              <MDBCardBody>
                <Chart type="bar" options={options} data={data} />
              </MDBCardBody>
              <MDBCardFooter></MDBCardFooter>
            </MDBCard>
          </MDBCol>
          <MDBCol size="3">
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
                        <MDBCheckbox
                          btn={true}
                          size="sm"
                          id={student.id}
                          value={student.id}
                          name={student.id}
                          label={student.firstName + " " + student.lastName}
                          labelStyle={{
                            background: student.color,
                            color: "white",
                            padding: "3px",
                            marginTop: "3px",
                            fontSize: "11px",
                            minWidth: "100%",
                            borderRadius: "5px",
                          }}
                          disableWrapper
                          defaultChecked
                        />
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
