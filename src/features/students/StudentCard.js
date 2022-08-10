import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBCardText,
  MDBInput,
  MDBBtn,
  MDBFooter,
} from "mdb-react-ui-kit";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { HexColorPicker } from "react-colorful";

const DifficultySwatch = (student) => {
  return (
    <>
      {" "}
      <div
        className="swatch"
        style={{
          backgroundColor: student.colorDifficulty,
        }}
        // onClick={() => {
        //   onClickDifficultySwatch();
        // }}
      />
    </>
  );
};

export const StudentCard = (props) => {
  const {
    studentEdit,
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
  } = props;

  const student = studentEdit;

  console.log("StudentCard: ", studentEdit);
  return (
    <>
      <MDBContainer>
        <MDBCard>
          <form onSubmit={onSubmit} onChange={(event) => handleChange(event)}>
            <MDBCardHeader>
              <MDBCardTitle>
                {student.firstName + " " + student.lastName}
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    type="text"
                    className="mb-4"
                    label="First Name"
                    value={studentEdit.firstName}
                    name="firstName"
                    id="firstName"
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    type="text"
                    className="mb-4"
                    label="Last Name"
                    value={studentEdit.lastName}
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
                    value={studentEdit.email}
                    name="email"
                    id="email"
                  />
                  <MDBInput
                    type="text"
                    className="mb-4"
                    label="phone"
                    value={studentEdit.phone}
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
                        backgroundColor: studentEdit.colorDifficulty,
                      }}
                      onClick={() => {
                        onClickDifficultySwatch();
                      }}
                    />
                    {isDifficultyColorPickerOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={studentEdit.colorDifficulty}
                          name="colorDifficulty"
                          onChange={(e) => onChangeDifficultyColor(e)}
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
                      style={{ backgroundColor: studentEdit.colorFun }}
                      onClick={() => onClickFunSwatch()}
                    />
                    {isFunColorPickerOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={studentEdit.colorFun}
                          name="colorFun"
                          onChange={(e) => onChangeFunColor(e)}
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
            </MDBCardBody>
            <MDBFooter>
              <MDBRow>
                <MDBCol>
                  <MDBBtn type="button" aria-label="Close" name="close">
                    close
                  </MDBBtn>
                </MDBCol>
                <MDBCol>
                  <MDBBtn
                    type="button"
                    aria-label="submit"
                    name="submit"
                    onClick={onSubmit}>
                    submit
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBFooter>
          </form>
        </MDBCard>
      </MDBContainer>
    </>
  );
};
