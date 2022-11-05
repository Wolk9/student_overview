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
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { SwatchesPicker } from "react-color";
import {
  toggleDifficultyColorPicker,
  setDifficultyColor,
  toggleFunColorPicker,
  setFunColor,
  toggleEditStudentCard,
} from "../ui/uiSlice";

const EditStudentModal = (props) => {
  const {
    showeditmodal,
    isFunColorPickerOpen,
    isDifficultyColorPickerOpen,
    onSubmit,
    handleChange,
    onClickDifficultySwatch,
    colorDifficulty,
    colorFun,
  } = props;
  const dispatch = useDispatch();
  const pickedStudent = useSelector((state) => state.ui.selectedStudent[0]);
  const [selectedStudent, editSelectedStudent] = useState(pickedStudent);

  console.log("selectedStudent: ", selectedStudent);
  console.log("pickedStudent: ", pickedStudent);

  const onClickFunSwatch = () => {
    console.log("Clicked on FunSwatch");
    dispatch(toggleFunColorPicker());
  };

  const onChangeDifficultyColor = (e) => {
    console.log("difficulty Value", e);
    dispatch(setDifficultyColor(e));
    editSelectedStudent({
      ...selectedStudent,
      colorDifficulty: e,
    });
    //dispatch(toggleDifficultyColorPicker());
  };
  const onChangeFunColor = (e) => {
    console.log("fun Value", e);
    dispatch(setFunColor(e));
    editSelectedStudent({
      ...selectedStudent,
      colorFun: e,
    });
    //dispatch(toggleFunColorPicker());
  };

  const onCloseDifficultyColor = (x) => {
    console.log("close Difficulty Color", x);
    dispatch(toggleDifficultyColorPicker());
  };

  const onCloseFunColor = (x) => {
    console.log("Close Fun Color", x);
    dispatch(toggleFunColorPicker());
  };

  const handleClose = () => {
    console.log("Click on closed");
    dispatch(toggleEditStudentCard());
  };

  return (
    <>
      <MDBModal show={showeditmodal}>
        <MDBModalHeader>
          <MDBModalTitle>
            Edit{" "}
            {/* {value.firstName !== undefined
              ? `${value2.firstName} ${value2.lastName}`
              : "Student"} */}
          </MDBModalTitle>
          <CloseButton onClick={handleClose} />
        </MDBModalHeader>
        <MDBModalBody>
          <MDBContainer>
            <MDBCardBody>
              <form
                onSubmit={onSubmit}
                onChange={(event) => handleChange(event)}>
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="First Name"
                      value={selectedStudent.firstName}
                      name="firstName"
                      id="firstName"
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="Last Name"
                      value={selectedStudent.lastName}
                      name="lastName"
                      id="lastName"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  {" "}
                  <MDBCol>
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="email"
                      value={selectedStudent.email}
                      name="email"
                      id="email"
                    />
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="phone"
                      value={selectedStudent.phone}
                      name="phone"
                      id="phone"
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <h6>Personal Graph Colors</h6>
                <MDBRow>
                  <MDBCol>
                    {" "}
                    <div className="picker">
                      Difficulty
                      <div
                        className="swatch"
                        style={{
                          backgroundColor: selectedStudent.colorDifficulty,
                        }}
                        onClick={() => {
                          onClickDifficultySwatch();
                        }}
                      />
                      {isDifficultyColorPickerOpen && (
                        <div className="popover">
                          <SwatchesPicker
                            color={selectedStudent.colorDifficulty}
                            name="colorDifficulty"
                            onChange={(x) => onChangeDifficultyColor(x)}
                          />
                          <MDBBtn
                            type="button"
                            aria-label="Close"
                            name="colorDifficulty"
                            onClick={() =>
                              onCloseDifficultyColor(colorDifficulty)
                            }>
                            Select
                          </MDBBtn>
                        </div>
                      )}
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <div className="picker">
                      Fun
                      <div
                        className="swatch"
                        style={{ backgroundColor: selectedStudent.colorFun }}
                        onClick={() => onClickFunSwatch()}
                      />
                      {isFunColorPickerOpen && (
                        <div className="popover">
                          <SwatchesPicker
                            color={selectedStudent.colorFun}
                            name="colorFun"
                            onChange={(x) => onChangeFunColor(colorFun)}
                          />
                          <MDBBtn
                            type="button"
                            aria-label="Close"
                            name="colorFun"
                            onClick={() => onCloseFunColor(colorFun)}>
                            Select
                          </MDBBtn>
                        </div>
                      )}
                    </div>
                  </MDBCol>
                </MDBRow>
                <hr />
              </form>
            </MDBCardBody>
          </MDBContainer>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBRow>
            <MDBBtn outline color="primary" onClick={handleClose}>
              cancel
            </MDBBtn>

            <MDBBtn color="primary" onClick={onSubmit} type="submit">
              save
            </MDBBtn>
          </MDBRow>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default EditStudentModal;
