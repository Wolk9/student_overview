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
import { Bar } from "react-chartjs-2";
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
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = courses.map((c) => c.code);
  const dtsts = students.map((s) => {
    return {
      label: s.firstName + " " + s.lastName,
      data: assignments.map(
        (a) => a.assignment.difficulty + " " + a.assignment.fun
      ),
    };
  });
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
                <Bar options={options} data={data} />
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
                {studentNames.map((student) => (
                  <MDBRow key={student.id}>
                    <MDBCheckbox
                      id={student.id}
                      label={student.fullName}
                      defaultChecked
                    />
                  </MDBRow>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Overview;
