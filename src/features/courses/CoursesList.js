import React from "react";
import { MDBContainer, MDBCol } from "mdb-react-ui-kit";
import DataTable from "react-data-table-component";

const CoursesList = ({ courses, show }) => {
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
      {/* {show && <AddCourseModal show={show} />} */}
      <MDBContainer fluid className="p-4 m4">
        <MDBCol>
          <DataTable
            title={courses.length + " Courses"}
            columns={columns}
            data={courses}
            pagination
            dense
            responsive
          />
        </MDBCol>
      </MDBContainer>
    </div>
  );
};

export default CoursesList;
