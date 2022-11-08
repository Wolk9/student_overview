import React from "react";
import { MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { SwatchesPicker } from "react-color";
import {
  toggleStudentModal,
  flushSelectedStudentsList,
  editSelectedStudent,
} from "../ui/uiSlice";
import { addStudent } from "../students/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import dataService from "../../services/dataService";

export const StudentCard = ({
  students,
  indexOfStudentToEdit,
  handleChange,
  isDifficultyColorPickerOpen,
  isFunColorPickerOpen,
  onClickDifficultySwatch,
  onClickFunSwatch,
  onChangeDifficultyColor,
  onChangeFunColor,
  inOverview,
  storeNewStudent,
}) => {
  const dispatch = useDispatch();
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);
  const tempNanoId = useSelector((state) => state.ui.tempNanoId);

  console.log("inOverview: ", inOverview);

  if (inOverview) {
  }

  let newOrExistingStudent = students[indexOfStudentToEdit];

  console.log(
    "edit",
    "StudentCard: ",
    students,
    indexOfStudentToEdit,
    students[indexOfStudentToEdit]
  );

  const handleSave = (e) => {
    // console.log("sluit");
    e.preventDefault();
    dispatch(toggleStudentModal(false));
    dispatch(flushSelectedStudentsList());
    dispatch(editSelectedStudent({}));
  };

  return (
    <div>
      <div className="card">
        <form onSubmit={handleSave} onChange={(event) => handleChange(event)}>
          <div className="card-header">
            <div className="card-title h5 p-3">
              <p>
                Je kan hier de gegevens van
                {" " +
                  newOrExistingStudent.firstName +
                  " " +
                  newOrExistingStudent.lastName}{" "}
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
          {!inOverview ? (
            <div className="d-flex justify-content-end card-footer">
              <div className="flex-row">
                <div className="flex-col">
                  <MDBBtn color="primary" onClick={handleSave} type="submit">
                    Sla op
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
