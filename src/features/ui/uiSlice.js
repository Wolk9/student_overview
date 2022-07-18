import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addStudentModalOpen: false,
  },
  reducers: {
    openAddStudentModal(state, action) {
      state.addStudentModalOpen = action.payload;
    },
  },
});

export const { openAddStudentModal } = uiSlice.actions;
export default uiSlice.reducer;
