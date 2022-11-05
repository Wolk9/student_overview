import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
    isStudentCardChecked: false,
    selectedStudent: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      id: 0,
      photo: "",
      color: "",
      colorFun: "",
    },
    selectedStudentsList: [],
    funNumbers: [],
    sumOfFunNumbersOfAllSelectedStudents: 0,
    averageFunNumberPerStudent: [],
    averageFunNumberOfAllSelectedStudents: 0,
    isFunColorPickerOpen: false,
    isDifficultyColorPickerOpen: false,
    isFunBoxChecked: true,
    isDifficultyBoxChecked: true,
    isAllBoxChecked: false,
    showAlert: false,
    isAverageBoxChecked: false,
    colorFun: "#334455",
    colorDifficulty: "#554433",
  },
  reducers: {
    setShowAlert(state, action) {
      return {
        ...state,
        showAlert: action.payload,
      };
    },
    toggleAddStudentModal(state, action) {
      return {
        ...state,
        addStudentModalOpen: !state.addStudentModalOpen,
      };
    },
    toggleEditStudentCard(state, action) {
      return {
        ...state,
        isStudentCardChecked: action.payload,
      };
    },
    setSelectedStudent(state, action) {
      return {
        ...state,
        selectedStudent: action.payload,
      };
    },
    editSelectedStudent(state, action) {
      // console.log(action.payload);
    },
    toggleFunColorPicker(state) {
      return {
        ...state,
        isFunColorPickerOpen: !state.isFunColorPickerOpen,
      };
    },
    toggleDifficultyColorPicker(state) {
      return {
        ...state,
        isDifficultyColorPickerOpen: !state.isDifficultyColorPickerOpen,
      };
    },
    setFunColor(state, action) {
      return { ...state, colorFun: action.payload };
    },
    setDifficultyColor(state, action) {
      return { ...state, colorDifficulty: action.payload };
    },
    toggleDifficultyCheckBox(state, action) {
      return {
        ...state,
        isDifficultyBoxChecked: !state.isDifficultyBoxChecked,
      };
    },
    toggleFunCheckBox(state, action) {
      return { ...state, isFunBoxChecked: !state.isFunBoxChecked };
    },
    addToSelectedStudentsList(state, action) {
      // console.log(action);
      const isInList = state.selectedStudentsList.includes(action.payload);
      // console.log("isInList", isInList);
      if (!isInList) {
        // console.log("ok, it is not in the list, so let's put in in the list!");
        return {
          ...state,
          selectedStudentsList: [...state.selectedStudentsList, action.payload],
        };
      } else {
        // console.log("nah, that one is already in the list. don't bother");
        return state;
      }
    },
    removeFromSelectedStudentsList(state, action) {
      // console.log(action);
      const isInList = state.selectedStudentsList.includes(action.payload);
      if (!isInList) {
        // console.log("ok, it is not in the list, so nothig to remove here");
        return state;
      } else {
        // console.log("Yup. Found it. I will eliminate this MF for you!");
        return {
          ...state,
          selectedStudentsList: state.selectedStudentsList.filter(
            (id) => id !== action.payload
          ),
        };
      }
    },
    flushSelectedStudentsList(state, action) {
      return { ...state, selectedStudentsList: [] };
    },
    toggleAllStudentsChecked(state, action) {
      return { ...state, isAllBoxChecked: action.payload };
    },
    toggleAverageCheckBox(state, action) {
      return { ...state, isAverageBoxChecked: action.payload };
    },
    setAverageFunOfAllSelectedStudents(state, action) {
      return {
        ...state,
        averageFunNumberOfAllSelectedStudents: action.payload,
      };
    },
    toggleAlert(state, action) {
      return {
        ...state,
        showAlert: action.payload,
      };
    },
  },
});

export const {
  setShowAlert,
  toggleAddStudentModal,
  toggleEditStudentCard,
  toggleAlert,
  setSelectedStudent,
  editSelectedStudent,
  toggleFunColorPicker,
  toggleDifficultyColorPicker,
  setFunColor,
  setDifficultyColor,
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  addToSelectedStudentsList,
  removeFromSelectedStudentsList,
  flushSelectedStudentsList,
  toggleAllStudentsChecked,
  toggleAverageCheckBox,
  setAverageFunOfAllSelectedStudents,
} = uiSlice.actions;
export default uiSlice.reducer;
