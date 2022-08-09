import { createSlice, current } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
    editStudentCardDisplay: false,
    selectedStudent: [
      {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        id: 0,
        photo: "",
        color: "",
        colorFun: "",
      },
    ],
    selectedStudentsList: [],
    isFunColorPickerOpen: false,
    isDifficultyColorPickerOpen: false,
    isFunBoxChecked: true,
    isDifficultyBoxChecked: true,
    isAllBoxChecked: false,
    colorFun: "#334455",
    colorDifficulty: "#554433",
  },
  reducers: {
    toggleAddStudentModal(state, action) {
      state.addStudentModalOpen = !state.addStudentModalOpen;
    },
    toggleEditStudentCard(state, action) {
      state.editStudentCardDisplay = !state.editStudentCardDisplay;
    },
    setSelectedStudent(state, action) {
      state.selectedStudent = action.payload;
    },
    editSelectedStudent(state, action) {
      console.log(action);
    },
    toggleFunColorPicker(state) {
      state.isFunColorPickerOpen = !state.isFunColorPickerOpen;
    },
    toggleDifficultyColorPicker(state) {
      state.isDifficultyColorPickerOpen = !state.isDifficultyColorPickerOpen;
    },
    setFunColor(state, action) {
      state.colorFun = action.payload;
    },
    setDifficultyColor(state, action) {
      state.colorDifficulty = action.payload;
    },
    toggleDifficultyCheckBox(state, action) {
      state.isDifficultyBoxChecked = !state.isDifficultyBoxChecked;
    },
    toggleFunCheckBox(state, action) {
      state.isFunBoxChecked = !state.isFunBoxChecked;
    },
    setSelectedStudentsList(state, action) {
      console.log(action.payload);
      const index = state.selectedStudentsList.findIndex(
        (s) => s === action.payload.id
      );
      console.log(index);
      if (index === -1) {
        console.log("index = -1");
        state.selectedStudentsList.push(action.payload.id);
      } else {
        console.log("index is not -1 but", index);
        // const indexToDelete = state.selectedStudentsList.indexOf(
        //   (e) => e.id === action.payload.id
        // );
        state.selectedStudentsList.splice(index, 1);
      }
    },
    toggleAllStudentsChecked(state, action) {
      console.log("reducer toggleAllStudentsChecked fired", action.payload);
      state.isAllBoxChecked = !state.isAllBoxChecked;
      if (state.selectedStudentsList.length !== 0) {
        state.selectedStudentsList = [];
      } else {
        console.log("dus de lengte van de lijst is 0");
      }
    },
  },
});

export const {
  toggleAddStudentModal,
  toggleEditStudentCard,
  setSelectedStudent,
  editSelectedStudent,
  toggleFunColorPicker,
  toggleDifficultyColorPicker,
  setFunColor,
  setDifficultyColor,
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  setSelectedStudentsList,
  toggleAllStudentsChecked,
} = uiSlice.actions;
export default uiSlice.reducer;
