import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
    editStudentCardDisplay: false,
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
    avarageFunNumberOfAllSelectedStudents: 0,
    isFunColorPickerOpen: false,
    isDifficultyColorPickerOpen: false,
    isFunBoxChecked: true,
    isDifficultyBoxChecked: true,
    isAllBoxChecked: false,
    isAverageBoxChecked: false,
    colorFun: "#334455",
    colorDifficulty: "#554433",
  },
  reducers: {
    toggleAddStudentModal(state, action) {
      return {
        ...state,
        addStudentModalOpen: !state.addStudentModalOpen,
      };
    },
    openEditStudentCard(state, action) {
      return {
        ...state,
        editStudentCardDisplay: action.payload,
      };
    },
    setSelectedStudent(state, action) {
      return {
        ...state,
        selectedStudent: action.payload,
      };
    },
    editSelectedStudent(state, action) {
      console.log(action.payload);
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
      console.log(action);
      // This works, but in retrospect it is pretty complicated because the whole object
      // is stored while a list of indexes would be enough to register as a list
      // TODO: rewrite addToSelectedStudentsList and related action dispatches to store only indexes of selected students
      // console.log(action.payload);
      // const index = state.selectedStudentsList.findIndex(
      //   (s) => s === action.payload.id
      // );
      // // console.log(index);

      // if (index === -1) {
      //   //als index = -1 is er geen index en dus de student staat nog niet in de lijst
      //   state.selectedStudentsList.push(action.payload.id);
      // } else {
      //   //als index !== -1 staat hij wel in de lijst en moet de student er uit.
      // }
      const isInList = state.selectedStudentsList.includes(action.payload);
      console.log("isInList", isInList);
      if (!isInList) {
        console.log("ok, it is not in the list, so let's put in in the list!");
        return {
          ...state,
          selectedStudentsList: [...state.selectedStudentsList, action.payload],
        };
      } else {
        console.log("nah, that one is already in the list. don't bother");
        return state;
      }
    },
    removeFromSelectedStudentsList(state, action) {
      // TODO: rewrite removeFromSelectedStudentsList and related action dispatches to store only indexes of selected students
      const index = state.selectedStudentsList.findIndex(
        (s) => s === action.payload.id
      );
      if (index === -1) {
        //als index = -1 is er geen index en dus de student staat nog niet in de lijst
        return;
      } else {
        //als index !== -1 staat hij wel in de lijst en moet de student er uit.
        state.selectedStudentsList.splice(index, 1);
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
    setAvarageFunOfAllSelectedStudents(state, action) {
      return {
        ...state,
        avarageFunNumberOfAllSelectedStudents: action.payload,
      };
    },
  },
});

export const {
  toggleAddStudentModal,
  openEditStudentCard,
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
  setAvarageFunOfAllSelectedStudents,
} = uiSlice.actions;
export default uiSlice.reducer;
