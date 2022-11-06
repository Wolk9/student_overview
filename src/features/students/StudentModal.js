import React, { useState } from "react";
import { CloseButton } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBModalTitle,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBModal,
  MDBCardBody,
  MDBModalDialog,
  MDBCard,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { SwatchesPicker } from "react-color";
import {
  toggleDifficultyColorPicker,
  setDifficultyColor,
  toggleFunColorPicker,
  setFunColor,
  toggleStudentModal,
} from "../ui/uiSlice";
import { StudentCard } from "./StudentCard";

const StudentModal = ({
  students,
  indexOfStudentToEdit,
  onSubmit,
  handleChange,
  isDifficultyColorPickerOpen,
  isFunColorPickerOpen,
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

  const handleClose = () => {
    console.log("Click on closed");
    dispatch(toggleStudentModal(false));
  };

  return (
    <>
      <MDBModal size="md" show={isStudentModalOpen}>
        <MDBModalBody>
          <MDBContainer>
            <StudentCard
              students={students}
              indexOfStudentToEdit={indexOfStudentToEdit}
              // setIndexOfStudentToEdit={setIndexOfStudentToEdit}
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
              handleClose={handleClose}
              notInOverview={true}
            />
          </MDBContainer>
        </MDBModalBody>
      </MDBModal>
    </>
  );
};

export default StudentModal;
