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
    flushSelectedStudentsList,
    handleEditClick,
    editStudentCardDisplay,
    toggleDifficultyCheckBox,
    toggleFunCheckBox,
    addToSelectedStudentsList,
    removeFromSelectedStudentsList,
    toggleAllStudentsChecked,
    setStudentEdit,
  } = props;
  const dispatch = useDispatch();

  // console.log(
  //   isFunBoxChecked,
  //   isDifficultyBoxChecked,
  //   isAllBoxChecked,
  //   editStudentCardDisplay,
  //   selectedStudentsList
  // );

  console.log(
    "students: ",
    students.length,
    "geselecteerd: ",
    selectedStudentsList.length
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
      dispatch(addToSelectedStudentsList({ id: student.id }))
    );
  };

  const depolulateSelectedStudentList = () => {
    students.map((student) => dispatch(flushSelectedStudentsList()));
  };

  const handleSelectedStudentsChange = (e) => {
    console.log("Selected Students Changed", e);
    console.log(isStudentChecked({ id: e.id }));
    const selectedStudent = students.find((s) => s.id === e.id);
    //setStudentEdit(selectedStudent);
    if (isStudentChecked(selectedStudent)) {
      dispatch(removeFromSelectedStudentsList(selectedStudent));
    } else {
      dispatch(addToSelectedStudentsList(selectedStudent));
    }
  };

  const isStudentChecked = (e) => {
    const checked = selectedStudentsList.some((s) => s === e.id);
    // console.log(e, checked);
    return checked;
  };

  const handleAllBoxChange = () => {
    console.log("handleAllBoxChange");
    dispatch(toggleAllStudentsChecked(!isAllBoxChecked));

    if (selectedStudentsList.length !== students.length) {
      console.log("er is nog niks geselecteerd, dus we selecteren ze allemaal");
      populateSelectedStudentList();
    } else {
      console.log(
        "ze zijn allemaal geselecteerd, dus we halen ze er allemaal uit"
      );
      depolulateSelectedStudentList();
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
