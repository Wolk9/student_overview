import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
    editStudentModalOpen: false,
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
    isFunColorPickerOpen: false,
    isDifficultyColorPickerOpen: false,
    colorFun: "#334455",
    colorDifficulty: "#554433",
  },
  reducers: {
    toggleAddStudentModal(state, action) {
      state.addStudentModalOpen = !state.addStudentModalOpen;
    },
    toggleEditStudentModal(state, action) {
      state.editStudentModalOpen = !state.editStudentModalOpen;
    },
    setSelectedStudent(state, action) {
      state.selectedStudent = action.payload;
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
  },
});

export const {
  toggleAddStudentModal,
  toggleEditStudentModal,
  setSelectedStudent,
  toggleFunColorPicker,
  toggleDifficultyColorPicker,
  setFunColor,
  setDifficultyColor,
} = uiSlice.actions;
export default uiSlice.reducer;
