import React from "react";
import { MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { SwatchesPicker } from "react-color";
import { addStudent } from "./studentSlice";
import { useDispatch, useSelector } from "react-redux";

export const StudentCard = ({
  edit,
  students,
  indexOfStudentToEdit,
  onSubmit,
  handleChange,
  handleClose,
  isDifficultyColorPickerOpen,
  isFunColorPickerOpen,
  onClickDifficultySwatch,
  onClickFunSwatch,
  onChangeDifficultyColor,
  onChangeFunColor,
  notInOverview,
}) => {
  const dispatch = useDispatch();
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);

  let newOrExistingStudent = students[indexOfStudentToEdit];

  if (edit == true) {
    console.log(
      "edit",
      "StudentCard: ",
      students,
      indexOfStudentToEdit,
      students[indexOfStudentToEdit]
    );
  } else {
    console.log("add");
    // dispatch(
    //   addStudent({
    //     firstName: "",
    //     LastName: "",
    //     phone: "",
    //     email: "",
    //     photo: "",
    //     colorDifficulty: "#ffffff",
    //     colorFun: "#000000",
    //   })
    // );
    newOrExistingStudent = selectedStudent;
  }

  const handleCancel = () => {
    console.log("cancel");
  };

  const handleSave = () => {
    console.log("cancel");
  };

  return (
    <div>
      <div className="card">
        <form onSubmit={onSubmit} onChange={(event) => handleChange(event)}>
          <div className="card-header">
            <div className="card-title h5 p-3">
              {edit ? (
                <p>Voeg een nieuwe student toe</p>
              ) : (
                <p>
                  Je kan hier de gegevens van
                  {" " +
                    newOrExistingStudent.firstName +
                    " " +
                    newOrExistingStudent.lastName}{" "}
                  veranderen
                </p>
              )}
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <MDBInput
                  type="text"
                  className="mb-4"
                  label="Voornaam"
                  value={newOrExistingStudent.firstName}
                  name="firstName"
                  id={newOrExistingStudent.id}
                />
              </div>
              <div className="col">
                <MDBInput
                  type="text"
                  className="mb-4"
                  label="Achternaam"
                  value={newOrExistingStudent.lastName}
                  name="lastName"
                  id={newOrExistingStudent.id}
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
                  value={newOrExistingStudent.email}
                  name="email"
                  id={newOrExistingStudent.id}
                />
                <MDBInput
                  type="text"
                  className="mb-4"
                  label="telefoon"
                  value={newOrExistingStudent.phone}
                  name="phone"
                  id={newOrExistingStudent.id}
                />
              </div>
            </div>
            <hr />
            <h6>Persoonlijke grafiek kleuren</h6>
            <div className="row">
              <div className="col">
                <div className="picker">
                  Moeilijkheid
                  <div
                    className="swatch"
                    style={{
                      backgroundColor: newOrExistingStudent.colorDifficulty,
                    }}
                    onClick={() => {
                      onClickDifficultySwatch();
                    }}
                  />
                  {isDifficultyColorPickerOpen && (
                    <div className="color-picker">
                      <SwatchesPicker
                        color={newOrExistingStudent.colorDifficulty}
                        width={220}
                        onChange={(color) => onChangeDifficultyColor(color)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <MDBCol>
                <div className="picker">
                  Plezier
                  <div
                    className="swatch"
                    style={{
                      backgroundColor: newOrExistingStudent.colorFun,
                    }}
                    onClick={() => onClickFunSwatch()}
                  />
                  {isFunColorPickerOpen && (
                    <div className="color-picker">
                      <SwatchesPicker
                        color={newOrExistingStudent.colorFun}
                        width={220}
                        onChange={(color) => onChangeFunColor(color)}
                      />
                    </div>
                  )}
                </div>
              </MDBCol>
            </div>
          </div>
          {notInOverview ? (
            <div className="d-flex justify-content-end card-footer">
              <div className="flex-row">
                <div className="flex-col">
                  <MDBBtn
                    outline
                    color="primary"
                    onClick={handleCancel}
                    type="cancel">
                    Cancel
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={handleSave} type="submit">
                    Opslaan
                  </MDBBtn>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};
