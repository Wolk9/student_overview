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
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

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
                    course={student.id}
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

const StudentResultGraph = (props) => {
  const { data } = props;
  return (
    <div>
      <BarChart width={500} height={500} data={data}>
        <Bar dataKey="uv" fill="#8884d8" />
        <XAxis dataKey="course" />
      </BarChart>
    </div>
  );
};

export const Overview = ({ studentNames, courses, students, assignments }) => {
  const dataDifficulty = (s) => {
    return {
      id: 1,
      label: "difficulty",
      data: courses.map((c) =>
        assignments
          .filter((a) => a.assignment.course_id === c.id)
          .filter((x) => x.user_id === s.id)
          .map((a) => a.assignment.difficulty * -1)
      ),
    };
  };

  const dataFun = (s) => {
    return {
      id: 2,
      label: "fun",
      data: courses.map((c) =>
        assignments
          .filter((a) => a.assignment.course_id === c.id)
          .filter((x) => x.user_id === s.id)
          .map((a) => a.assignment.fun)
      ),
    };
  };

  const data = [
    {
      course: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      course: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      course: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      course: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      course: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      course: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      course: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  console.log("dataset", data);

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
                <StudentResultGraph data={data} />
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
