import React from "react";
import { MDBCardText } from "mdb-react-ui-kit";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {} from "../ui/uiSlice";
import { StudentCard } from "../students/StudentCard";
import { SelectorCard } from "./SelectorCard";

// const SelectorCard = (props) => {
//   const {
//     students,
//     isFunBoxChecked,
//     isDifficultyBoxChecked,
//     isAllBoxChecked,
//     selectedStudentsList,
//     handleEditClick,
//     editStudentCardDisplay,
//   } = props;
//   const dispatch = useDispatch();

//   console.log(
//     isFunBoxChecked,
//     isDifficultyBoxChecked,
//     isAllBoxChecked,
//     editStudentCardDisplay,
//     selectedStudentsList
//   );

//   const handleFunCheckboxChange = () => {
//     console.log("fun clicked");
//     if (isDifficultyBoxChecked === true) {
//       dispatch(toggleFunCheckBox());
//     } else {
//       dispatch(toggleFunCheckBox());
//       dispatch(toggleDifficultyCheckBox());
//     }
//   };

//   const handleDifficultyCheckBoxChange = () => {
//     console.log("difficulty clicked");
//     if (isFunBoxChecked === true) {
//       dispatch(toggleDifficultyCheckBox());
//     } else {
//       dispatch(toggleDifficultyCheckBox());
//       dispatch(toggleFunCheckBox());
//     }
//   };

//   const populateSelectedStudentList = () => {
//     students.map((student) =>
//       dispatch(addToSelectedStudentsList({ id: student.id }))
//     );
//   };

//   const handleSelectedStudentsChange = (e) => {
//     console.log("Selected Students Changed", e);
//     const selectedStudent = students.find((s) => s.id === e.id);
//     dispatch(addToSelectedStudentsList(selectedStudent));
//   };

//   const isStudentChecked = (e) => {
//     const checked = selectedStudentsList.some((s) => s === e.id);
//     // console.log(e, checked);
//     return checked;
//   };

//   const handleAllBoxChange = () => {
//     console.log("handleAllBoxChange");

//     dispatch(toggleAllStudentsChecked(!isAllBoxChecked));
//     if (selectedStudentsList.length === 0) {
//       populateSelectedStudentList();
//     }
//   };

//   return (
//     <MDBCol size="4">
//       <MDBCard>
//         <MDBCardHeader>
//           <MDBCardTitle>Students</MDBCardTitle>
//         </MDBCardHeader>
//         <MDBCardBody>
//           <div style={{ backgroundColor: "#fafafa", borderRadius: "10px" }}>
//             <div className="d-flex align-content-end ">
//               <div className="p-2 d-inline-flex w-100"></div>
//               <div
//                 className="p-2 flex-grow-0"
//                 style={{ backgroundColor: "#ffffff" }}>
//                 <p className="rotate">Difficulty</p>
//               </div>
//               <div
//                 className="p-2 flex-grow-0"
//                 style={{ backgroundColor: "#f1f1f1" }}>
//                 <p className="rotate">Fun</p>
//               </div>
//             </div>
//             <div
//               className="d-flex align-content-end"
//               style={{ borderBottom: "1px solid #e9e9e9" }}>
//               <div className="p-2 d-inline-flex w-100">
//                 <div className="d-flex d-flex-shrink-0">
//                   <MDBCheckbox
//                     checked={isAllBoxChecked}
//                     onChange={() => handleAllBoxChange()}
//                   />
//                   <div className="d-flex w-100">all</div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   color: "white",
//                   width: "60px",
//                   textAlign: "center",
//                   backgroundColor: "#ffffff",
//                 }}
//                 className="p-2 flex-grow-0">
//                 <div>
//                   <MDBCheckbox
//                     checked={isDifficultyBoxChecked}
//                     onChange={() => handleDifficultyCheckBoxChange()}
//                   />
//                 </div>
//               </div>
//               <div
//                 style={{
//                   color: "white",
//                   width: "60px",
//                   textAlign: "center",
//                   backgroundColor: "#f1f1f1",
//                 }}
//                 className="p-2 flex-grow-0">
//                 <MDBCheckbox
//                   checked={isFunBoxChecked}
//                   onChange={() => handleFunCheckboxChange()}
//                 />
//               </div>
//               <div></div>
//             </div>
//             {students.map((student) => (
//               <div key={student.id} className="d-flex align-content-end">
//                 <div className="p-2 d-inline-flex w-100">
//                   <div className="d-flex flex-shrink-0">
//                     <MDBCheckbox
//                       // btn={true}
//                       size="sm"
//                       id={student.id}
//                       checked={isStudentChecked({ id: student.id })}
//                       onChange={() =>
//                         handleSelectedStudentsChange({ id: student.id })
//                       }
//                       // labelStyle={{
//                       //   background: student.color,
//                       //   color: "white",
//                       //   padding: "3px",
//                       //   marginTop: "3px",
//                       //   fontSize: "11px",
//                       //   minWidth: "100%",
//                       //   borderRadius: "5px",
//                       // }}
//                     />
//                   </div>
//                   <div
//                     key={student.id}
//                     id={student.id}
//                     className="d-flex w-100 text-nowrap studentName"
//                     onClick={() => handleEditClick({ id: student.id })}>
//                     {student.firstName + " " + student.lastName}
//                   </div>
//                 </div>

//                 <div
//                   className="p-2 flex-grow-0"
//                   style={{
//                     width: "60px",
//                     textAlign: "center",
//                     backgroundColor: "#ffffff",
//                   }}>
//                   <div
//                     className="swatch"
//                     style={{ backgroundColor: student.colorDifficulty }}
//                   />
//                 </div>
//                 <div
//                   className="p-2 flex-grow-0"
//                   style={{
//                     width: "60px",
//                     textAlign: "center",
//                     backgroundColor: "#f1f1f1",
//                   }}>
//                   <div
//                     className="swatch"
//                     style={{ backgroundColor: student.colorFun }}
//                   />
//                 </div>
//                 <MDBCol></MDBCol>
//               </div>
//             ))}
//           </div>
//         </MDBCardBody>
//       </MDBCard>
//     </MDBCol>
//   );
// };

export const Overview = ({
  courses,
  students,
  assignments,
  handleEditClick,
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
  isStudentChecked,
  handleSelectedStudentsChange,
  addToSelectedStudentsList,
  removeFromSelectedStudentsList,
  handleAllBoxChange,
  depolulateSelectedStudentList,
  populateSelectedStudentList,
  handleDifficultyCheckBoxChange,
  handleFunCheckboxChange,
  isFunBoxChecked,
  isDifficultyBoxChecked,
  isAllBoxChecked,
  selectedStudentsList,
  editStudentCardDisplay,
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  flushSelectedStudentsList,
  toggleAllStudentsChecked,
}) => {
  const options = {
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: "top",
    //   },
    //   title: {
    //     display: true,
    //     text: "Chart.js Bar Chart",
    //   },
    // },
  };

  const funData = selectedStudentsList.map((s) => {
    return {
      label: students
        .filter((x) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " fun"),
      data: courses.map((c) =>
        assignments
          .filter((a) => a.assignment.course_id === c.id)
          .filter((x) => x.user_id === s)
          .map((a) => a.assignment.fun)
      ),
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorFun),
    };
  });

  const difficultyData = selectedStudentsList.map((s) => {
    return {
      label: students
        .filter((x) => x.id === s)
        .map((x) => x.firstName + " " + x.lastName + " difficulty"),
      data: courses.map((c) =>
        assignments
          .filter((a) => a.assignment.course_id === c.id)
          .filter((x) => x.user_id === s)
          .map((a) => a.assignment.difficulty)
      ),
      backgroundColor: students
        .filter((x) => x.id === s)
        .map((x) => x.colorDifficulty),
    };
  });

  const selectedData2 = () => {
    if (isFunBoxChecked && isDifficultyBoxChecked) {
      // console.log("D & F checked");
      return funData.concat(difficultyData);
    } else if (isFunBoxChecked && !isDifficultyBoxChecked) {
      // console.log("F checked");
      return funData;
    } else if (!isFunBoxChecked && isDifficultyBoxChecked) {
      // console.log("D checked");
      return difficultyData;
    } else return;
  };

  const selectedData = selectedData2();

  const data = {
    labels: courses.map((c) => c.code),
    datasets: selectedData,
  };

  return (
    <div>
      <div className="container-fluid p-4 m4">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <div className="card-title h5 p-3">Overview</div>
              </div>
              <div className="card-body">
                {selectedStudentsList.length < 1 ? (
                  <MDBCardText>
                    Selecteer 1 of meerdere studenten uit de lijst hiernaast
                  </MDBCardText>
                ) : (
                  <Bar data={data} options={options} />
                )}
              </div>
            </div>
            {editStudentCardDisplay ? (
              <StudentCard
                students={students}
                indexOfStudentToEdit={indexOfStudentToEdit}
                setIndexOfStudentToEdit={setIndexOfStudentToEdit}
                onSubmit={onSubmit}
                handleChange={handleChange}
                isDifficultyColorPickerOpen={isDifficultyColorPickerOpen}
                isFunColorPickerOpen={isFunColorPickerOpen}
                colorDifficulty={colorDifficulty}
                colorFun={colorFun}
                onClickDifficultySwatch={onClickDifficultySwatch}
                onClickFunSwatch={onClickFunSwatch}
                onChangeDifficultyColor={onChangeDifficultyColor}
                onChangeFunColor={onChangeFunColor}
                onCloseDifficultyColor={onCloseDifficultyColor}
                onCloseFunColor={onCloseFunColor}
                isStudentChecked={isStudentChecked}
                handleAllBoxChange={handleAllBoxChange}
                depolulateSelectedStudentList={depolulateSelectedStudentList}
                populateSelectedStudentList={populateSelectedStudentList}
                handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
                handleFunCheckboxChange={handleFunCheckboxChange}
              />
            ) : (
              <></>
            )}
          </div>
          <SelectorCard
            students={students}
            isFunBoxChecked={isFunBoxChecked}
            isDifficultyBoxChecked={isDifficultyBoxChecked}
            isStudentChecked={isStudentChecked}
            selectedStudentsList={selectedStudentsList}
            isAllBoxChecked={isAllBoxChecked}
            handleEditClick={handleEditClick}
            editStudentCardDisplay={editStudentCardDisplay}
            toggleDifficultyCheckBox={toggleDifficultyCheckBox}
            toggleFunCheckBox={toggleFunCheckBox}
            addToSelectedStudentsList={addToSelectedStudentsList}
            removeFromSelectedStudentsList={removeFromSelectedStudentsList}
            flushSelectedStudentsList={flushSelectedStudentsList}
            toggleAllStudentsChecked={toggleAllStudentsChecked}
            setIndexOfStudentToEdit={setIndexOfStudentToEdit}
            handleSelectedStudentsChange={handleSelectedStudentsChange}
            handleAllBoxChange={handleAllBoxChange}
            depolulateSelectedStudentList={depolulateSelectedStudentList}
            populateSelectedStudentList={populateSelectedStudentList}
            handleDifficultyCheckBoxChange={handleDifficultyCheckBoxChange}
            handleFunCheckboxChange={handleFunCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
