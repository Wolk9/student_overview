import { configureStore } from "@reduxjs/toolkit";
import assignmentSlice, {
  setAssignments,
} from "../features/assignments/assignmentSlice";
import courseSlice, { setCourses } from "../features/courses/courseSlice";
import studentSlice, { setStudents } from "../features/students/studentSlice";
import uiSlice from "../features/ui/uiSlice";
import dataService from "../services/dataService";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    students: studentSlice,
    courses: courseSlice,
    assignments: assignmentSlice,
  },
});

dataService
  .getAll("students")
  .then((records) => store.dispatch(setStudents(records.data)));

dataService
  .getAll("courses")
  .then((records) => store.dispatch(setCourses(records.data)));

dataService
  .getAll("assignments")
  .then((records) => store.dispatch(setAssignments(records.data)));
