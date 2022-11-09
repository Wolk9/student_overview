import React from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSelectedStudentsList,
  editSelectedStudent,
  flushSelectedStudentsList,
  toggleEdit,
  toggleStudentModal,
} from "../ui/uiSlice";
import StudentModal from "./StudentModal";

// StudentList is called from App

const StudentsList = ({
  handleChange,
  indexOfStudentToEdit,
  isStudentChecked,
  isStudentModalOpen,
  onChangeDifficultyColor,
  onChangeFunColor,
  onClickDifficultySwatch,
  onClickFunSwatch,
}) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);

  const isFunColorPickerOpen = useSelector(
    (state) => state.ui.isFunColorPickerOpen
  );
  const isDifficultyColorPickerOpen = useSelector(
    (state) => state.ui.isDifficultyColorPickerOpen
  );

  const handleEditClick = (e) => {
    const indexOfStudent = students.findIndex((s) => s.id == e.id);
    dispatch(toggleEdit(true));
    dispatch(flushSelectedStudentsList());
    dispatch(addToSelectedStudentsList(students[indexOfStudent].id));
    dispatch(editSelectedStudent(students[indexOfStudent]));
    dispatch(toggleStudentModal(true));
  };

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
      sortable: false,
    },
  ];

  return (
    <div>
      <MDBContainer fluid className="p-4 m4">
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
        {isStudentModalOpen && (
          <StudentModal
            handleChange={handleChange}
            indexOfStudentToEdit={indexOfStudentToEdit}
            isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
            isFunColorPickerOpen={isFunColorPickerOpen}
            isStudentChecked={isStudentChecked}
            isStudentModalOpen={isStudentModalOpen}
            onChangeDifficultyColor={onChangeDifficultyColor}
            onChangeFunColor={onChangeFunColor}
            onClickDifficultySwatch={onClickDifficultySwatch}
            onClickFunSwatch={onClickFunSwatch}
            students={students}
          />
        )}
      </MDBContainer>
    </div>
  );
};

export default StudentsList;
