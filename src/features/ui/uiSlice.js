import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
    selectedStudent: "",
  },
  reducers: {
    openAddStudentModal(state, action) {
      state.addStudentModalOpen = action.payload;
    },
    selectedStudent(state, action) {
      state.selectedStudent = action.payload;
    },
  },
});

export const { openAddStudentModal, selectedStudent } = uiSlice.actions;
export default uiSlice.reducer;
