import React from "react";
import { Table, Button, Container, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import CourseItem from "./CourseItem";
import { useDispatch } from "react-redux";
import { openAddCourseModal } from "../ui/uiSlice";
// import AddCourseModal from "./AddCourseModal";
import { mdiAccountPlus } from "@mdi/js";
import Icon from "@mdi/react";

const CoursesList = ({ courses, show }) => {
  const dispatch = useDispatch();

  //   const handleAddClick = () => {
  //     console.log("Click on CourseAdd happend");
  //     dispatch(openAddCourseModal(true));
  //   };

  return (
    <div>
      {/* {show && <AddCourseModal show={show} />} */}
      <Container fluid className="p-4 m4">
        <Card xs={4}>
          <Card.Header as="h5">List of Courses</Card.Header>
          <Card.Body>
            <Table striped="columns" size="sm" className="p-4 m4">
              <thead>
                <tr>
                  <th>id</th>
                  <th>code</th>
                  <th>project</th>
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
                {courses.map((course) => (
                  <CourseItem
                    key={course.id}
                    id={course.id}
                    code={course.code}
                    project={course.project}
                  />
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer className="text-muted">
            A total of {courses.length} courses registered
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default CoursesList;
