import { mdiConsoleNetworkOutline, mdiContentSaveAllOutline } from "@mdi/js";
import { createEntityAdapter, createSlice, current } from "@reduxjs/toolkit";
import dataService from "../../services/dataService";

// const studentAdapter = createEntityAdapter({
//   selectId: (student = student.id),
//   sortComparer: (a, b) => a.lastName.localCompare(b.lastName),
// });

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
      console.log(action.payload);
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
    addToSelectedStudentsList(state, action) {
      // console.log(action.payload);
      const index = state.selectedStudentsList.findIndex(
        (s) => s === action.payload.id
      );
      // console.log(index);

      if (index === -1) {
        //als index = -1 is er geen index en dus de student staat nog niet in de lijst
        state.selectedStudentsList.push(action.payload.id);
      } else {
        //als index !== -1 staat hij wel in de lijst en moet de student er uit.
      }
    },
    removeFromSelectedStudentsList(state, action) {
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
      state.selectedStudentsList = [];
    },
    toggleAllStudentsChecked(state, action) {
      // console.log("reducer toggleAllStudentsChecked fired", action.payload);
      // console.log(state.selectedStudentsList.length);

      state.isAllBoxChecked = action.payload;
      if (state.isAllBoxChecked) {
        // console.log("all box checked");
      } else {
        // console.log("all box unchecked");
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
  addToSelectedStudentsList,
  removeFromSelectedStudentsList,
  flushSelectedStudentsList,
  toggleAllStudentsChecked,
} = uiSlice.actions;
export default uiSlice.reducer;
