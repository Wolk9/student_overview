import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
    editStudentModalOpen: false,
    selectedStudent: {},
    isFunColorPickerOpen: false,
    isDifficultyColorPickerOpen: false,
    funColor: "#334455",
    difficultyColor: "#554433",
  },
  reducers: {
    toggleAddStudentModal(state, action) {
      state.addStudentModalOpen = !state.addStudentModalOpen;
    },
    toggleEditStudentModal(state, action) {
      state.editStudentModalOpen = !state.editStudentModalOpen;
    },
    selectedStudent(state, action) {
      state.selectedStudent = action.payload;
    },
    editStudent(state, action) {
      state.electedStudent = action.payload;
    },
    toggleFunColorPicker(state) {
      state.isFunColorPickerOpen = !state.isFunColorPickerOpen;
    },
    toggleDifficultyColorPicker(state) {
      state.isDifficultyColorPickerOpen = !state.isDifficultyColorPickerOpen;
    },
    setFunColor(state, action) {
      state.funColor = action.payload;
    },
    setDifficultyColor(state, action) {
      state.difficultyColor = action.payload;
    },
  },
});

export const {
  toggleAddStudentModal,
  toggleEditStudentModal,
  selectedStudent,
  toggleFunColorPicker,
  toggleDifficultyColorPicker,
  setFunColor,
  setDifficultyColor,
  editStudent,
} = uiSlice.actions;
export default uiSlice.reducer;
