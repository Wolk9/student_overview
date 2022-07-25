import React from "react";
import { Table, Card, Nav, NavDropdown, Col, Row } from "react-bootstrap";
import { MDBContainer } from "mdb-react-ui-kit";
// import { useSelector } from "react-redux";

import AssignmentItem from "./AssignmentItem";
import { useDispatch } from "react-redux";
import StudentsList from "../students/StudentsList";
import { selectedStudent } from "../ui/uiSlice";
import DataTable from "react-data-table-component";

// import { openAddAssignmentModal } from "../ui/uiSlice";
// import AddAssignmentModal from "./AddAssignmentModal";
// import { mdiAccountPlus, mdiClockDigital } from "@mdi/js";
// import Icon from "@mdi/react";

const AssignmentsList = ({
  assignments,
  students,
  studentNames,
  pickedStudent,
  courses,
  show,
}) => {
  const dispatch = useDispatch();

  const selectStudent = (picked) => {
    const pickedStudent = students.filter((student) => student.id === picked);
    console.log("pickedStudent", pickedStudent);
    dispatch(selectedStudent(pickedStudent));
  };

  const getNamesUser = (user_id) => {
    const [result] = students.filter((student) => student.id === user_id);
    const nameResult = result.firstName + " " + result.lastName;
    return nameResult;
  };

  const getCourseCode = (course_id) => {
    const [result] = courses.filter((course) => course.id === course_id);
    return (
      result.code + " " + (result.project !== undefined ? result.project : "")
    );
  };
  //   const handleAddClick = () => {
  //     console.log("Click on AssignmentAdd happend");
  //     dispatch(openAddAssignmentModal(true));
  //   };

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Assignment",
      selector: (row) => row.assignment.course_id,
      sortable: true,
    },
    {
      name: "Difficulty",
      selector: (row) => row.assignment.difficulty,
      sortable: true,
    },
    {
      name: "Fun",
      selector: (row) => row.assignment.fun,
      sortable: true,
    },
  ];

  return (
    <div>
      {/* {show && <AddAssignmentModal show={show} />} */}
      <MDBContainer fluid className="p-4 m4">
        <DataTable
          title="Assignment"
          columns={columns}
          data={assignments}
          pagination
          dense
          responsive
          selectableRows
        />
        {/* <Card xs={4}>
          <Card.Header as="h5">
            <Row>
              <Col>List of Assignments</Col>
              <Col>
                <NavDropdown id="students" title="Pick a student">
                  {studentNames ? (
                    studentNames.map((student) => (
                      <>
                        <NavDropdown.Item
                          key={student.id}
                          onClick={() => selectStudent(student.id)}>
                          {student.fullName}
                        </NavDropdown.Item>
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </NavDropdown>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            /* <Table striped="columns" size="sm" className="p-4 m4">
              <thead>
                <tr>
                  <th>user</th>
                  <th>assignment</th>
                  <th>difficulty</th>
                  <th>fun</th>
                  <th>
                    <Icon
                      path={mdiAccountPlus}
                      size={1}
                      onClick={handleAddClick}
                      color="primary"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <AssignmentItem
                    key={assignment.id}
                    id={assignment.id}
                    user={getNamesUser(assignment.user_id)}
                    assignment={getCourseCode(assignment.assignment.course_id)}
                    difficulty={assignment.assignment.difficulty}
                    fun={assignment.assignment.fun}
                  />
                ))}
              </tbody>
            </Table> 
          </Card.Body>
          <Card.Footer className="text-muted">
            A total of {assignments.length} assignments registered
          </Card.Footer>
        </Card> */}
      </MDBContainer>
    </div>
  );
};

export default AssignmentsList;
