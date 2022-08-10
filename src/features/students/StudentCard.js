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
} from "mdb-react-ui-kit";
import { HexColorPicker } from "react-colorful";

export const StudentCard = (props) => {
  const {
    selectedStudent,
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

  const student = selectedStudent;

  console.log("StudentCard: ", student);
  return (
    <>
      <MDBContainer>
        <MDBCard>
          <MDBCardHeader>
            <MDBCardTitle>
              {student.firstName + " " + student.lastName}
            </MDBCardTitle>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="containder-fluid">
              <form
                onSubmit={onSubmit}
                onChange={(event) => handleChange(event)}>
                <div className="row-cols-auto d-flex">
                  <div className="p-2 column">
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="First Name"
                      value={student.firstName}
                      name="firstName"
                      id="firstName"
                    />
                  </div>
                  <div className="p-2 column">
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="Last Name"
                      value={student.lastName}
                      name="lastName"
                      id="lastName"
                    />
                  </div>
                  <div>
                    <div className="picker">
                      Difficulty
                      <div
                        className="swatch"
                        style={{
                          backgroundColor: student.colorDifficulty,
                        }}
                        onClick={() => {
                          onClickDifficultySwatch();
                        }}
                      />
                      {isDifficultyColorPickerOpen && (
                        <div className="popover">
                          <HexColorPicker
                            color={student.colorDifficulty}
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
                  </div>{" "}
                  <div className="picker">
                    Fun
                    <div
                      className="swatch"
                      style={{
                        backgroundColor: student.colorFun,
                      }}
                      onClick={() => {
                        onClickFunSwatch();
                      }}
                    />
                    {isFunColorPickerOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={student.colorFun}
                          name="colorFun"
                          onChange={(x) => onChangeFunColor(x)}
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
                </div>
                <div className="row-cols-auto d-flex">
                  <div className="p-2 column">
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="email"
                      value={student.email}
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="p-2 column">
                    <MDBInput
                      type="text"
                      className="mb-4"
                      label="phone"
                      value={student.phone}
                      name="phone"
                      id="phone"
                    />
                  </div>
                </div>
              </form>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};
