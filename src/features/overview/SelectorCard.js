import React from "react";
import { MDBCheckbox } from "mdb-react-ui-kit";

//TODO: review scss. Aligning when view is small is not nice. Overlapping text and widths that thighten.

export const SelectorCard = ({
  students,
  selectedStudentsList,
  isFunBoxChecked,
  isDifficultyBoxChecked,
  isAllBoxChecked,
  isAverageBoxChecked,
  isStudentChecked,
  handleAllBoxChange,
  handleAverageBoxChange,
  handleDifficultyCheckBoxChange,
  handleFunCheckboxChange,
  studentCheckboxChange,
}) => {
  return (
    <div>
      <div className="card-header">
        <div className="card-title h5 p-3">Studenten</div>
      </div>
      <div className="card-body">
        <div style={{ backgroundColor: "#fafafa", borderRadius: "10px" }}>
          <div className="d-flex justify-content-between mw-100">
            <div className="d-flex justify-content-start">
              <div className="p-2"></div>
            </div>
            <div className="d-flex justify-content-end w-25">
              <div
                className="d-flex justify-content-center"
                style={{ backgroundColor: "#ffffff" }}>
                <p className="rotate" style={{ width: "45px" }}>
                  Moeilijkheid
                </p>
              </div>
              <div
                className="d-flex pb-2 justify-content-center"
                style={{ backgroundColor: "#f1f1f1" }}>
                <p className="rotate" style={{ width: "45px" }}>
                  Plezier
                </p>
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-between mw-100"
            style={{ borderBottom: "1px solid #e9e9e9" }}>
            <div className="d-flex justify-content-start">
              <div className="p-2">
                <MDBCheckbox
                  checked={isAllBoxChecked}
                  onChange={() => handleAllBoxChange()}
                />
              </div>
              <div className="pt-2 text-truncate studentName">Allemaal</div>
            </div>
            <div className="d-flex justify-content-end">
              <div
                style={{
                  width: "45px",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                }}
                className="d-flex justify-content-center">
                <div className="p-2">
                  <MDBCheckbox
                    checked={isDifficultyBoxChecked}
                    onChange={() => handleDifficultyCheckBoxChange()}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "45px",
                  textAlign: "center",
                  backgroundColor: "#f1f1f1",
                }}
                className="d-flex justify-content-center">
                <div className="p-2">
                  <MDBCheckbox
                    checked={isFunBoxChecked}
                    onChange={() => handleFunCheckboxChange()}
                  />
                </div>
              </div>
            </div>
          </div>
          {selectedStudentsList.length >= 2 ? (
            <div
              className="d-flex justify-content-between mw-100"
              style={{ borderBottom: "1px solid #e9e9e9" }}>
              <div className="d-flex justify-content-start">
                <div className="p-2">
                  <MDBCheckbox
                    checked={isAverageBoxChecked}
                    onChange={() => handleAverageBoxChange()}
                  />
                </div>
                <div className="pt-2 text-truncate studentName">
                  Gemiddelden
                </div>
              </div>
              <div className="d-flex justify-content-end w-25">
                <div className="d-flex justify-content-center">
                  <div
                    className="p-2"
                    style={{
                      width: "45px",
                      textAlign: "center",
                      backgroundColor: "#ffffff",
                    }}>
                    {isAverageBoxChecked ? (
                      <div
                        className="swatch"
                        style={{ backgroundColor: "rgb(253, 162, 235)" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="p-2"
                    style={{
                      width: "45px",
                      textAlign: "center",
                      backgroundColor: "#f1f1f1",
                    }}>
                    {isAverageBoxChecked ? (
                      <div
                        className="swatch"
                        style={{ backgroundColor: "rgb(53, 162, 235)" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {students.map((student) => (
            <div
              key={student.id}
              className="d-flex justify-content-between mw-100">
              <div className="d-flex justify-content-start">
                <div className="p-2">
                  <MDBCheckbox
                    size="sm"
                    id={student.id}
                    name={student.id}
                    checked={isStudentChecked({ id: student.id })}
                    onChange={(e) =>
                      //handleSelectedStudentsChange({ id: student.id })
                      studentCheckboxChange(e)
                    }
                  />
                </div>
                <div className="pt-2 text-truncate studentName">
                  {student.firstName + " " + student.lastName}
                </div>
              </div>
              <div className="d-flex justify-content-end w-25">
                <div
                  className="d-flex justify-content-center"
                  style={{ width: "45px" }}>
                  <div
                    className="p-2"
                    style={{
                      width: "45px",
                      textAlign: "center",
                      backgroundColor: "#ffffff",
                    }}>
                    {!isAverageBoxChecked ? (
                      <div
                        className="swatch"
                        style={{ backgroundColor: student.colorDifficulty }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center"
                  style={{ width: "45px" }}>
                  <div
                    className="p-2"
                    style={{
                      width: "45px",
                      textAlign: "center",
                      backgroundColor: "#f1f1f1",
                    }}>
                    {!isAverageBoxChecked ? (
                      <div
                        className="swatch"
                        style={{ backgroundColor: student.colorFun }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
