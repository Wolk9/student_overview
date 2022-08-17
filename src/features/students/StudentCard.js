import React from "react";
import { MDBContainer, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
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
    students,
    indexOfStudentToEdit,
    setIndexOfStudentToEdit,
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

  console.log("StudentCard: ", students[indexOfStudentToEdit]);
  return (
    <>
      <MDBContainer>
        <div className="card">
          <form onSubmit={onSubmit} onChange={(event) => handleChange(event)}>
            <div className="card-header">
              <div className="card-title">
                {students[indexOfStudentToEdit].firstName +
                  " " +
                  students[indexOfStudentToEdit].lastName}
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <MDBInput
                    type="text"
                    className="mb-4"
                    label="First Name"
                    value={students[indexOfStudentToEdit].firstName}
                    name="firstName"
                    id="firstName"
                  />
                </div>
                <div className="col">
                  <MDBInput
                    type="text"
                    className="mb-4"
                    label="Last Name"
                    value={students[indexOfStudentToEdit].lastName}
                    name="lastName"
                    id="lastName"
                  />
                </div>
              </div>
              <div className="row">
                {" "}
                <div className="col">
                  <MDBInput
                    type="text"
                    className="mb-4"
                    label="email"
                    value={students[indexOfStudentToEdit].email}
                    name="email"
                    id="email"
                  />
                  <MDBInput
                    type="text"
                    className="mb-4"
                    label="phone"
                    value={students[indexOfStudentToEdit].phone}
                    name="phone"
                    id="phone"
                  />
                </div>
              </div>
              <hr />
              <h6>Personal Graph Colors</h6>
              <div className="row">
                <div className="col">
                  <div className="picker">
                    Difficulty
                    <div
                      className="swatch"
                      style={{
                        backgroundColor:
                          students[indexOfStudentToEdit].colorDifficulty,
                      }}
                      onClick={() => {
                        onClickDifficultySwatch();
                      }}
                    />
                    {isDifficultyColorPickerOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={students[indexOfStudentToEdit].colorDifficulty}
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
                </div>
                <MDBCol>
                  <div className="picker">
                    Fun
                    <div
                      className="swatch"
                      style={{
                        backgroundColor:
                          students[indexOfStudentToEdit].colorFun,
                      }}
                      onClick={() => onClickFunSwatch()}
                    />
                    {isFunColorPickerOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={students[indexOfStudentToEdit].colorFun}
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
              </div>
            </div>
            <div className="card-footer">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn btn-outline-primary"
                  data-mdb-ripple-color="dark"
                  type="button"
                  aria-label="Close"
                  name="close">
                  close
                </button>

                <button
                  className="btn btn-primary"
                  data-mdb-ripple-color="dark"
                  type="button"
                  aria-label="submit"
                  name="submit"
                  onClick={onSubmit}>
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </MDBContainer>
    </>
  );
};
