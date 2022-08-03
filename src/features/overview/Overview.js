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

  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <MDBRow>
          <MDBCol size="8">
            <MDBCard>
              <MDBCardTitle>Overview</MDBCardTitle>
              Hier komt een gafiek
              {/* <Bar options={options} data={data} /> */}
            </MDBCard>
          </MDBCol>
          <SelectorCard students={students} />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Overview;
