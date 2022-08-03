import React from "react";

import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  toggleAddStudentModal,
  toggleEditStudentModal,
  setSelectedStudent,
} from "../ui/uiSlice";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import { mdiAccountPlus } from "@mdi/js";
import Icon from "@mdi/react";
import DataTable from "react-data-table-component";

const StudentsList = ({ students, showaddmodal, showeditmodal }) => {
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    console.log("Click on StudentAdd happend");
    dispatch(toggleAddStudentModal());
  };

  const handleEditClick = (e) => {
    console.log(e);
    console.log("Click on StudentEdit " + e.id + " happend");
    dispatch(toggleEditStudentModal());
    const pickedStudent = students.filter((student) => student.id === e.id);
    console.log("pickedStudent", pickedStudent);
    dispatch(setSelectedStudent(pickedStudent));
  };

  console.log(showaddmodal, showeditmodal, selectedStudent);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
      width: "40%",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Colors",
      selector: (row) => (
        <MDBRow>
          <MDBCol>
            <div
              className="swatch"
              style={{ backgroundColor: row.colorDifficulty }}
            />
          </MDBCol>
          <MDBCol>
            <div className="swatch" style={{ backgroundColor: row.colorFun }} />
          </MDBCol>
        </MDBRow>
      ),
      width: "10%",
    },
  ];

  return (
    <div>
      {showaddmodal && (
        <AddStudentModal showaddmodal={showaddmodal} students={students} />
      )}
      {showeditmodal && (
        <EditStudentModal
          showeditmodal={showeditmodal}
          students={students}
          selectedStudent={selectedStudent}
        />
      )}
      <MDBContainer fluid className="p-4 m4">
        <MDBRow className="p-4">
          <MDBCol>
            <div align="right">
              <Icon
                path={mdiAccountPlus}
                size={1}
                onClick={handleAddClick}
                color="#0077ff"
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBCol>
          <DataTable
            title={students.length + " Students"}
            columns={columns}
            data={students}
            pagination
            dense
            responsive
            onRowClicked={(e) => handleEditClick(e)}
          />
        </MDBCol>
      </MDBContainer>
    </div>
  );
};

export default StudentsList;
