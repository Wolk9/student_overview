import React, { useEffect } from "react";

import { MDBContainer, MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  toggleStudentModal,
  toggleEdit,
  addToSelectedStudentsList,
  editSelectedStudent,
  flushSelectedStudentsList,
  setTempNanoID,
} from "../ui/uiSlice";
import { addStudent } from "../students/studentSlice";
import StudentModal from "./StudentModal";
import { mdiAccountPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import DataTable from "react-data-table-component";
import { getByDisplayValue, getByTestId } from "@testing-library/react";
import { nanoid } from "@reduxjs/toolkit";

const StudentsList = ({
  indexOfStudentToEdit,
  onSubmit,
  handleChange,
  colorDifficulty,
  colorFun,
  onClickDifficultySwatch,
  onClickFunSwatch,
  onChangeDifficultyColor,
  onChangeFunColor,
  onCloseDifficultyColor,
  onCloseFunColor,
  isStudentChecked,
  handleAllBoxChange,
  depolulateSelectedStudentList,
  populateSelectedStudentList,
  handleDifficultyCheckBoxChange,
  handleFunCheckboxChange,
  studentCheckboxChange,
  isStudentModalOpen,
}) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);

  const isFunColorPickerOpen = useSelector(
    (state) => state.ui.isFunColorPickerOpen
  );
  const isDifficultyColorPickerOpen = useSelector(
    (state) => state.ui.isDifficultyColorPickerOpen
  );
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);

  const handleEditClick = (e) => {
    console.log("Click on StudentEdit happend", e);
    const indexOfStudent = students.findIndex((s) => s.id == e.id);
    console.log(students[indexOfStudent]);
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
            students={students}
            indexOfStudentToEdit={indexOfStudentToEdit}
            onSubmit={onSubmit}
            handleChange={handleChange}
            isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
            isFunColorPickerOpen={isFunColorPickerOpen}
            colorDifficulty={colorDifficulty}
            colorFun={colorFun}
            onClickDifficultySwatch={onClickDifficultySwatch}
            onClickFunSwatch={onClickFunSwatch}
            onChangeDifficultyColor={onChangeDifficultyColor}
            onChangeFunColor={onChangeFunColor}
            onCloseDifficultyColor={onCloseDifficultyColor}
            onCloseFunColor={onCloseFunColor}
            isStudentChecked={isStudentChecked}
            handleAllBoxChange={handleAllBoxChange}
            depolulateSelectedStudentList={depolulateSelectedStudentList}
            populateSelectedStudentList={populateSelectedStudentList}
            handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
            handleFunCheckboxChange={handleFunCheckboxChange}
            studentCheckboxChange={studentCheckboxChange}
            isStudentModalOpen={isStudentModalOpen}
          />
        )}
      </MDBContainer>
    </div>
  );
};

export default StudentsList;
