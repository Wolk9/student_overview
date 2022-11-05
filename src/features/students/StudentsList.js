import React from "react";

import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleAddStudentModal } from "../ui/uiSlice";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import { mdiAccountPlus } from "@mdi/js";
import Icon from "@mdi/react";
import DataTable from "react-data-table-component";

const StudentsList = ({
  students,
  showaddmodal,
  showeditmodal,
  onSubmit,
  handleChange,
  colorDifficulty,
  colorFun,
}) => {
  const dispatch = useDispatch();
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);
  const isFunColorPickerOpen = useSelector(
    (state) => state.ui.isFunColorPickerOpen
  );
  const isDifficultyColorPickerOpen = useSelector(
    (state) => state.ui.isDifficultyColorPickerOpen
  );

  const handleAddClick = () => {
    console.log("Click on StudentAdd happend");
    dispatch(toggleAddStudentModal());
  };

  const handleEditClick = (e) => {
    console.log("Click on StudentEdit happend", e);
    const indexOfStudentToEdit = students.findIndex((s) => s.id == e.id);
    console.log(students[indexOfStudentToEdit].firstName);
  };

  console.log(showaddmodal, showeditmodal, selectedStudent);

  const columns = [
    {
      name: "Naam",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
      width: "40%",
    },
    {
      name: "Telefoon",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Kleuren",
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
          isFunColorPickerOpen={isFunColorPickerOpen}
          isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
          onSubmit={onSubmit}
          handleChange={handleChange}
          colorDifficulty={colorDifficulty}
          colorFun={colorFun}
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
