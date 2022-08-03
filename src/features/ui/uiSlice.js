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
    selectedStudentsList: [],
    isFunColorPickerOpen: false,
    isDifficultyColorPickerOpen: false,
    isFunBoxChecked: true,
    isDifficultyBoxChecked: true,
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
    toggleDifficultyCheckBox(state, action) {
      state.isDifficultyBoxChecked = !state.isDifficultyBoxChecked;
    },
    toggleFunCheckBox(state, action) {
      state.isFunBoxChecked = !state.isFunBoxChecked;
    },
    setSelectedStudentsList(state, action) {
      const student = action.payload;
      console.log(student);
      
      return {
        ...state.selectedStudentsList,
        student;
    },
    changeSelectedStudentsList(state, action) {},
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
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  setSelectedStudentsList,
} = uiSlice.actions;
export default uiSlice.reducer;
