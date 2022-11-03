import React from "react";
import { MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { HexColorPicker } from "react-colorful";
import { GithubPicker } from "react-color";

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
    <div>
      <div className="card">
        <form onSubmit={onSubmit} onChange={(event) => handleChange(event)}>
          <div className="card-header">
            <div className="card-title h5 p-3">
              <p>
                Je kan hier de gegvens van
                {" " +
                  students[indexOfStudentToEdit].firstName +
                  " " +
                  students[indexOfStudentToEdit].lastName}{" "}
                veranderen
              </p>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <MDBInput
                  type="text"
                  className="mb-4"
                  label="Voornaam"
                  value={students[indexOfStudentToEdit].firstName}
                  name="firstName"
                  id={students[indexOfStudentToEdit].id}
                />
              </div>
              <div className="col">
                <MDBInput
                  type="text"
                  className="mb-4"
                  label="Achternaam"
                  value={students[indexOfStudentToEdit].lastName}
                  name="lastName"
                  id={students[indexOfStudentToEdit].id}
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
                  id={students[indexOfStudentToEdit].id}
                />
                <MDBInput
                  type="text"
                  className="mb-4"
                  label="telefoon"
                  value={students[indexOfStudentToEdit].phone}
                  name="phone"
                  id={students[indexOfStudentToEdit].id}
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
                      backgroundColor:
                        students[indexOfStudentToEdit].colorDifficulty,
                    }}
                    onClick={() => {
                      onClickDifficultySwatch();
                    }}
                  />
                  {isDifficultyColorPickerOpen && (
                    <div className="">
                      <GithubPicker
                        color={students[indexOfStudentToEdit].colorDifficulty}
                        // value={students[indexOfStudentToEdit].colorDifficulty}
                        // name="colorDifficulty"
                        // id={students[indexOfStudentToEdit].id}
                        onChange={(color) => onChangeDifficultyColor(color)}
                      />
                      {/* <MDBBtn
                        type="button"
                        aria-label="Close"
                        name="colorDifficulty"
                        id={students[indexOfStudentToEdit].id}
                        onClick={(color) => onCloseDifficultyColor(color)}>
                        Selecteer
                      </MDBBtn> */}
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
                      backgroundColor: students[indexOfStudentToEdit].colorFun,
                    }}
                    onClick={() => onClickFunSwatch()}
                  />
                  {isFunColorPickerOpen && (
                    <div className="">
                      <GithubPicker
                        color={students[indexOfStudentToEdit].colorFun}
                        // value={students[indexOfStudentToEdit].colorFun}
                        // name="colorFun"
                        // id={students[indexOfStudentToEdit].id}
                        onChange={(color) => onChangeFunColor(color)}
                      />
                      {/* <MDBBtn
                        type="button"
                        aria-label="Close"
                        name="colorFun"
                        id={students[indexOfStudentToEdit].id}
                        onChange={(color) => onCloseFunColor(color)}>
                        Selecteer
                      </MDBBtn> */}
                    </div>
                  )}
                </div>
              </MDBCol>
            </div>
          </div>
          <div className="card-footer"></div>
        </form>
      </div>
    </div>
  );
};
