<div key={student.id} className="d-flex align-content-end">
  <div className="p-2 d-inline-flex w-100">
    <div className="d-flex flex-shrink-0">
      {/* <MDBCheckbox
        // btn={true}
        size="sm"
        id={student.id}
        name={student.id}
        checked={isStudentChecked({ id: student.id })}
        onChange={(e) =>
          //handleSelectedStudentsChange({ id: student.id })
          studentCheckboxChange(e)
        }
      /> */}
    </div>
    <div className="d-flex-grow-0 w-100 text-nowrap studentName">
      {/* {student.firstName + " " + student.lastName} */}
    </div>
  </div>

  <div
    className="p-2 flex-end"
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
    className="p-2 flex-end"
    style={{
      width: "60px",
      textAlign: "center",
      backgroundColor: "#f1f1f1",
    }}>
    {!isAverageBoxChecked ? (
      <div className="swatch" style={{ backgroundColor: student.colorFun }} />
    ) : (
      <></>
    )}
  </div>
  <div className="col"></div>
</div>;
