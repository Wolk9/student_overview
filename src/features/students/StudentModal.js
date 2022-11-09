import { MDBContainer, MDBModal, MDBModalBody } from "mdb-react-ui-kit";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleStudentModal } from "../ui/uiSlice";
import { StudentCard } from "./StudentCard";

const StudentModal = ({
  edit,
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
  storeNewStudent,
}) => {
  const dispatch = useDispatch();

  console.log("StudentModal Edit: ", edit);

  const handleClose = () => {
    // console.log("Click on closed");
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
