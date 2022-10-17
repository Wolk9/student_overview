import React from "react";
import { MDBCheckbox } from "mdb-react-ui-kit";

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
          <div className="d-flex align-content-end ">
            <div className="p-2 d-inline-flex w-100"></div>
            <div
              className="p-2 flex-grow-0"
              style={{ backgroundColor: "#ffffff" }}>
              <p className="rotate">Moeilijkheid</p>
            </div>
            <div
              className="p-2 flex-grow-0"
              style={{ backgroundColor: "#f1f1f1" }}>
              <p className="rotate">Plezier</p>
            </div>
          </div>
          <div
            className="d-flex align-content-end"
            style={{ borderBottom: "1px solid #e9e9e9" }}>
            <div className="p-2 d-inline-flex w-100">
              <div className="d-flex d-flex-shrink-0 m-1">
                <MDBCheckbox
                  checked={isAllBoxChecked}
                  onChange={() => handleAllBoxChange()}
                />
                <div className="d-flex w-100">Allemaal</div>
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
          {selectedStudentsList.length >= 2 ? (
            <div
              className="d-flex align-content-end"
              style={{ borderBottom: "1px solid #e9e9e9" }}>
              <div className="p-2 d-inline-flex w-100">
                <div className="d-flex d-flex-shrink-0 m-1">
                  <MDBCheckbox
                    checked={isAverageBoxChecked}
                    onChange={() => handleAverageBoxChange()}
                  />
                  <div className="d-flex w-100">Gemiddelden</div>
                </div>
              </div>
              <div
                className="p-2 flex-grow-0"
                style={{
                  width: "60px",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
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
              <div
                className="p-2 flex-grow-0"
                style={{
                  width: "60px",
                  textAlign: "center",
                  backgroundColor: "#f1f1f1",
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
          ) : (
            <></>
          )}

          {students.map((student) => (
            <div key={student.id} className="d-flex align-content-end">
              <div className="p-2 d-inline-flex w-100">
                <div className="d-flex flex-shrink-0">
                  <MDBCheckbox
                    // btn={true}
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
                <div className="d-flex w-100 text-nowrap studentName">
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
                {!isAverageBoxChecked ? (
                  <div
                    className="swatch"
                    style={{ backgroundColor: student.colorDifficulty }}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div
                className="p-2 flex-grow-0"
                style={{
                  width: "60px",
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
              <div className="col"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
