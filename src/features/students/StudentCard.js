import React from "react";
import { MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { HexColorPicker } from "react-colorful";

export const StudentCard = ({
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
}) => {
  console.log(
    "StudentCard: ",
    students,
    indexOfStudentToEdit,
    students[indexOfStudentToEdit]
  );
  return (
    <>
      <div className="card">
        <form onSubmit={onSubmit} onChange={(event) => handleChange(event)}>
          <div className="card-header">
            <div className="card-title h5 p-3">
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
                        onClick={() => onCloseDifficultyColor(colorDifficulty)}>
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
                      backgroundColor: students[indexOfStudentToEdit].colorFun,
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
          <div className="card-footer"></div>
        </form>
      </div>
    </>
  );
};
