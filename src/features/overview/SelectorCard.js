import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

export const SelectorCard = (props) => {
  const {
    students,
    isFunBoxChecked,
    isDifficultyBoxChecked,
    isAllBoxChecked,
    selectedStudentsList,
    handleEditClick,
    editStudentCardDisplay,
    toggleDifficultyCheckBox,
    toggleFunCheckBox,
    setSelectedStudentsList,
    toggleAllStudentsChecked,
  } = props;
  const dispatch = useDispatch();

  console.log(
    isFunBoxChecked,
    isDifficultyBoxChecked,
    isAllBoxChecked,
    editStudentCardDisplay,
    selectedStudentsList
  );

  const handleFunCheckboxChange = () => {
    console.log("fun clicked");
    if (isDifficultyBoxChecked === true) {
      dispatch(toggleFunCheckBox());
    } else {
      dispatch(toggleFunCheckBox());
      dispatch(toggleDifficultyCheckBox());
    }
  };

  const handleDifficultyCheckBoxChange = () => {
    console.log("difficulty clicked");
    if (isFunBoxChecked === true) {
      dispatch(toggleDifficultyCheckBox());
    } else {
      dispatch(toggleDifficultyCheckBox());
      dispatch(toggleFunCheckBox());
    }
  };

  const populateSelectedStudentList = () => {
    students.map((student) =>
      dispatch(setSelectedStudentsList({ id: student.id }))
    );
  };

  const handleSelectedStudentsChange = (e) => {
    console.log("Selected Students Changed", e);
    const selectedStudent = students.find((s) => s.id === e.id);
    dispatch(setSelectedStudentsList(selectedStudent));
  };

  const isStudentChecked = (e) => {
    const checked = selectedStudentsList.some((s) => s === e.id);
    // console.log(e, checked);
    return checked;
  };

  const handleAllBoxChange = () => {
    console.log("handleAllBoxChange");

    dispatch(toggleAllStudentsChecked(!isAllBoxChecked));
    if (selectedStudentsList.length === 0) {
      populateSelectedStudentList();
    }
  };

  return (
    <MDBCol size="4">
      <MDBCard>
        <MDBCardHeader>
          <MDBCardTitle>Students</MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody>
          <div style={{ backgroundColor: "#fafafa", borderRadius: "10px" }}>
            <div className="d-flex align-content-end ">
              <div className="p-2 d-inline-flex w-100"></div>
              <div
                className="p-2 flex-grow-0"
                style={{ backgroundColor: "#ffffff" }}>
                <p className="rotate">Difficulty</p>
              </div>
              <div
                className="p-2 flex-grow-0"
                style={{ backgroundColor: "#f1f1f1" }}>
                <p className="rotate">Fun</p>
              </div>
            </div>
            <div
              className="d-flex align-content-end"
              style={{ borderBottom: "1px solid #e9e9e9" }}>
              <div className="p-2 d-inline-flex w-100">
                <div className="d-flex d-flex-shrink-0">
                  <MDBCheckbox
                    checked={isAllBoxChecked}
                    onChange={() => handleAllBoxChange()}
                  />
                  <div className="d-flex w-100">all</div>
                </div>
              </div>
              <div
                style={{
                  color: "white",
                  width: "60px",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                }}
                className="p-2 flex-grow-0">
                <div>
                  <MDBCheckbox
                    checked={isDifficultyBoxChecked}
                    onChange={() => handleDifficultyCheckBoxChange()}
                  />
                </div>
              </div>
              <div
                style={{
                  color: "white",
                  width: "60px",
                  textAlign: "center",
                  backgroundColor: "#f1f1f1",
                }}
                className="p-2 flex-grow-0">
                <MDBCheckbox
                  checked={isFunBoxChecked}
                  onChange={() => handleFunCheckboxChange()}
                />
              </div>
              <div></div>
            </div>
            {students.map((student) => (
              <div key={student.id} className="d-flex align-content-end">
                <div className="p-2 d-inline-flex w-100">
                  <div className="d-flex flex-shrink-0">
                    <MDBCheckbox
                      // btn={true}
                      size="sm"
                      id={student.id}
                      checked={isStudentChecked({ id: student.id })}
                      onChange={() =>
                        handleSelectedStudentsChange({ id: student.id })
                      }
                      // labelStyle={{
                      //   background: student.color,
                      //   color: "white",
                      //   padding: "3px",
                      //   marginTop: "3px",
                      //   fontSize: "11px",
                      //   minWidth: "100%",
                      //   borderRadius: "5px",
                      // }}
                    />
                  </div>
                  <div
                    key={student.id}
                    id={student.id}
                    className="d-flex w-100 text-nowrap studentName"
                    onClick={() => handleEditClick({ id: student.id })}>
                    {student.firstName + " " + student.lastName}
                  </div>
                </div>

                <div
                  className="p-2 flex-grow-0"
                  style={{
                    width: "60px",
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                  }}>
                  <div
                    className="swatch"
                    style={{ backgroundColor: student.colorDifficulty }}
                  />
                </div>
                <div
                  className="p-2 flex-grow-0"
                  style={{
                    width: "60px",
                    textAlign: "center",
                    backgroundColor: "#f1f1f1",
                  }}>
                  <div
                    className="swatch"
                    style={{ backgroundColor: student.colorFun }}
                  />
                </div>
                <MDBCol></MDBCol>
              </div>
            ))}
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};
