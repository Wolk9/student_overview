import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import DataTable from "react-data-table-component";
import { Rating } from "react-simple-star-rating";

// import { openAddAssignmentModal } from "../ui/uiSlice";
// import AddAssignmentModal from "./AddAssignmentModal";
// import { mdiAccountPlus, mdiClockDigital } from "@mdi/js";
// import Icon from "@mdi/react";

const AssignmentsList = ({
  assignments,
  students,

  courses,
}) => {
  const getNamesUser = (user_id) => {
    const [result] = students.filter((student) => student.id === user_id);
    const nameResult = result.firstName + " " + result.lastName;
    return nameResult;
  };

  const getCourseName = (course_id) => {
    const [result] = courses.filter((course) => course.id === course_id);
    console.log(result);
    const code = result.code != undefined ? result.code : "";
    const project = result.project != undefined ? result.project : "";
    return code + " " + project;
  };

  const columns = [
    {
      name: "User",
      selector: (row) => getNamesUser(row.user_id),
      sortable: true,
    },
    {
      name: "Assignment",
      selector: (row) => getCourseName(row.assignment.course_id),
      sortable: true,
    },
    {
      name: "Difficulty",
      selector: (row) => (
        <Rating
          initialValue={row.assignment.difficulty}
          readonly={true}
          size={20}
        />
      ),
      sortable: true,
    },
    {
      name: "Fun",
      selector: (row) => (
        <Rating initialValue={row.assignment.fun} readonly={true} size={20} />
      ),
      sortable: true,
    },
  ];

  return (
    <div>
      {/* {show && <AddAssignmentModal show={show} />} */}
      <MDBContainer fluid className="p-4 m4">
        <DataTable
          title={assignments.length + " Assignments"}
          columns={columns}
          data={assignments}
          pagination
          dense
          responsive
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
                    assignment={getCourseName(assignment.assignment.course_id)}
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
