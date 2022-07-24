import React from "react";
import { Table, Button, Container, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import AssignmentItem from "./AssignmentItem";
import { useDispatch } from "react-redux";
import { openAddAssignmentModal } from "../ui/uiSlice";
// import AddAssignmentModal from "./AddAssignmentModal";
import { mdiAccountPlus } from "@mdi/js";
import Icon from "@mdi/react";

const AssignmentsList = ({ assignments, show }) => {
  const dispatch = useDispatch();

  //   const handleAddClick = () => {
  //     console.log("Click on AssignmentAdd happend");
  //     dispatch(openAddAssignmentModal(true));
  //   };

  return (
    <div>
      {/* {show && <AddAssignmentModal show={show} />} */}
      <Container fluid className="p-4 m4">
        <Card xs={4}>
          <Card.Header as="h5">List of Assignments</Card.Header>
          <Card.Body>
            <Table striped="columns" size="sm" className="p-4 m4">
              <thead>
                <tr>
                  <th>id</th>
                  <th>user</th>
                  <th>assignment</th>
                  <th>
                    {/* <Icon
                      path={mdiAccountPlus}
                      size={1}
                      onClick={handleAddClick}
                      color="primary"
                    /> */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <AssignmentItem
                    key={assignment.id}
                    id={assignment.id}
                    user_id={assignment.user_id}
                    assignment={assignment.assignment.course_id}
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
        </Card>
      </Container>
    </div>
  );
};

export default AssignmentsList;
