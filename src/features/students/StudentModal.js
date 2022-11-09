import { MDBContainer, MDBModal, MDBModalBody } from "mdb-react-ui-kit";
import React from "react";
import { StudentCard } from "./StudentCard";

// StudentModal is called from StudentList when a user is edited.

const StudentModal = ({
  handleChange,
  indexOfStudentToEdit,
  isDifficultyColorPickerOpen,
  isFunColorPickerOpen,
  isStudentModalOpen,
  onChangeDifficultyColor,
  onChangeFunColor,
  onClickDifficultySwatch,
  onClickFunSwatch,
  students,
}) => {
  return (
    <>
      <MDBModal size="md" show={isStudentModalOpen}>
        <MDBModalBody>
          <MDBContainer>
            <StudentCard
              handleChange={handleChange}
              indexOfStudentToEdit={indexOfStudentToEdit}
              inOverview={false}
              isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
              isFunColorPickerOpen={isFunColorPickerOpen}
              onChangeDifficultyColor={onChangeDifficultyColor}
              onChangeFunColor={onChangeFunColor}
              onClickDifficultySwatch={onClickDifficultySwatch}
              onClickFunSwatch={onClickFunSwatch}
              students={students}
            />
          </MDBContainer>
        </MDBModalBody>
      </MDBModal>
    </>
  );
};

export default StudentModal;
