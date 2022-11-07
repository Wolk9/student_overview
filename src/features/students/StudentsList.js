import React, { useEffect } from "react";

import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  toggleStudentModal,
  toggleEdit,
  addToSelectedStudentsList,
  editSelectedStudent,
  flushSelectedStudentsList,
} from "../ui/uiSlice";
import StudentModal from "./StudentModal";
import { mdiAccountPlus } from "@mdi/js";
import Icon from "@mdi/react";
import DataTable from "react-data-table-component";

const StudentsList = ({
  students,
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
  const edit = useSelector((state) => state.ui.edit);
  const isFunColorPickerOpen = useSelector(
    (state) => state.ui.isFunColorPickerOpen
  );
  const isDifficultyColorPickerOpen = useSelector(
    (state) => state.ui.isDifficultyColorPickerOpen
  );

  const handleAddClick = () => {
    // console.log("Click on StudentAdd happend");
    dispatch(toggleStudentModal(true));
    dispatch(toggleEdit(true));
  };

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

  // console.log("StudentList edit: ", edit);

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
        {isStudentModalOpen && (
          <StudentModal
            edit={edit}
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
