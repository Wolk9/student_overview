import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import DataTable from "react-data-table-component";
import { Rating } from "react-simple-star-rating";

// AssignmentsList is called from App

const AssignmentsList = ({ assignments, students, courses }) => {
  const getNamesUser = (user_id) => {
    const [result] = students.filter((student) => student.id === user_id);
    const nameResult = result.firstName + " " + result.lastName;
    return nameResult;
  };

  const getCourseName = (course_id) => {
    const [result] = courses.filter((course) => course.id === course_id);
    const code = result?.code ?? "";
    const project = result?.project ?? "";
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
      <MDBContainer fluid className="p-4 m4">
        <DataTable
          title={assignments.length + " Assignments"}
          columns={columns}
          data={assignments}
          pagination
          dense
          responsive
        />
      </MDBContainer>
    </div>
  );
};

export default AssignmentsList;
