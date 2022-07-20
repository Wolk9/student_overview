import { configureStore } from "@reduxjs/toolkit";
import studentSlice, { setStudents } from "../features/students/studentSlice";
import uiSlice from "../features/ui/uiSlice";
import studentService from "../services/students";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    students: studentSlice,
  },
});

studentService
  .getAllStudents()
  .then((students) => store.dispatch(setStudents(students.data)));
