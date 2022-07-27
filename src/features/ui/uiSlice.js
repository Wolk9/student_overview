import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
    selectedStudent: "",
    isFunColorPickerOpen: false,
    isDifficultyColorPickerOpen: false,
    funColor: "#334455",
    difficultyColor: "#554433",
  },
  reducers: {
    openAddStudentModal(state, action) {
      state.addStudentModalOpen = action.payload;
    },
    selectedStudent(state, action) {
      state.selectedStudent = action.payload;
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
  openAddStudentModal,
  selectedStudent,
  toggleFunColorPicker,
  toggleDifficultyColorPicker,
  setFunColor,
  setDifficultyColor,
} = uiSlice.actions;
export default uiSlice.reducer;
