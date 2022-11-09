import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import DataTable from "react-data-table-component";

// CourseList is called from App

const CoursesList = ({ courses }) => {
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "project",
      selector: (row) => row.project,
    },
  ];

  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
        <MDBCol>
          <DataTable
            title={courses.length + " Courses"}
            columns={columns}
            data={courses}
            dense
            responsive
          />
        </MDBCol>
      </MDBContainer>
    </div>
  );
};

export default CoursesList;
