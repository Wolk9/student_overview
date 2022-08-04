import { createSlice, current } from "@reduxjs/toolkit";

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
        const indexToDelete = state.selectedStudentsList.indexOf(
          (e) => e.id === action.payload.id
        );
        state.selectedStudentsList.splice(indexToDelete, 1);
      }
    },
    toggleStudentChecked(state, action) {
      console.log("reducer toggleStudentChecked fired", action.payload);
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
  toggleDifficultyCheckBox,
  toggleFunCheckBox,
  setSelectedStudentsList,
  toggleStudentChecked,
} = uiSlice.actions;
export default uiSlice.reducer;
